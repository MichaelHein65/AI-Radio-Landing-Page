"""Public playlist metadata for the landing page (no media or visitor credentials)."""
import json
import re
import threading
import time
import urllib.request

PLAYLIST_ID = 'PLX76Ja8Hu-0g'
SOURCE = 'https://www.youtube.com/watch?v=cPAO5vW0ztQ&list=' + PLAYLIST_ID + '&hl=de'
_lock = threading.Lock()
_cache = None
_last_attempt = 0.0
_last_failed = False


def find_playlist(value):
    if isinstance(value, dict):
        if value.get('playlistId') == PLAYLIST_ID and 'contents' in value and 'totalVideos' in value:
            return value
        for child in value.values():
            found = find_playlist(child)
            if found is not None:
                return found
    elif isinstance(value, list):
        for child in value:
            found = find_playlist(child)
            if found is not None:
                return found
    return None


def parse_playlist(page):
    match = re.search(r'var ytInitialData\s*=\s*', page)
    if not match:
        raise ValueError('YouTube metadata missing')
    data, _ = json.JSONDecoder().raw_decode(page[match.end():])
    playlist = find_playlist(data)
    if playlist is None:
        raise ValueError('Playlist metadata missing')
    total = int(playlist['totalVideos'])
    items = [entry['playlistPanelVideoRenderer'] for entry in playlist['contents'] if 'playlistPanelVideoRenderer' in entry]
    # Never publish a truncated window as the complete playlist.
    if len(items) != total:
        raise ValueError('Incomplete playlist metadata')
    def text(value):
        return value.get('simpleText') or ''.join(run.get('text', '') for run in value.get('runs', []))
    videos = []
    for item in items:
        video_id = item.get('videoId', '')
        title = text(item.get('title', {}))
        if not re.fullmatch(r'[\w-]{11}', video_id) or not title:
            raise ValueError('Invalid playlist entry')
        videos.append({'id': video_id, 'title': title, 'duration': text(item.get('lengthText', {}))})
    return videos


def get_playlist():
    global _cache, _last_attempt, _last_failed
    with _lock:
        # Coalesce requests from concurrent visitors; never cache at the CDN/browser.
        if time.monotonic() - _last_attempt >= 5:
            try:
                request = urllib.request.Request(SOURCE, headers={'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'de'})
                with urllib.request.urlopen(request, timeout=12) as response:
                    page = response.read(8 * 1024 * 1024).decode('utf-8')
                videos = parse_playlist(page)
                _cache = {'playlistId': PLAYLIST_ID, 'videos': videos, 'updatedAt': int(time.time() * 1000)}
                _last_failed = False
            except (OSError, ValueError, KeyError, TypeError):
                _last_failed = True
            finally:
                _last_attempt = time.monotonic()
        if _cache is None:
            raise RuntimeError('Playlist temporarily unavailable')
        return {**_cache, 'stale': _last_failed}
