import importlib.util
import json
import unittest
from pathlib import Path
from unittest.mock import patch
spec = importlib.util.spec_from_file_location('youtube_playlist', Path(__file__).resolve().parents[1] / 'server/youtube_playlist.py')
youtube = importlib.util.module_from_spec(spec)
spec.loader.exec_module(youtube)

def page(ids, total=None, playlist_id=youtube.PLAYLIST_ID):
    playlist = {'playlistId': playlist_id, 'totalVideos': len(ids) if total is None else total, 'contents': [
        {'playlistPanelVideoRenderer': {'videoId': video_id, 'title': {'simpleText': 'Title ' + video_id}, 'lengthText': {'simpleText': '4:00'}}} for video_id in ids]}
    return 'var ytInitialData = ' + json.dumps({'contents': {'playlist': playlist}}) + ';</script>'

class PlaylistTests(unittest.TestCase):
    def test_deletion_and_order_are_source_driven(self):
        self.assertEqual([v['id'] for v in youtube.parse_playlist(page(['bbbbbbbbbbb', 'aaaaaaaaaaa']))], ['bbbbbbbbbbb', 'aaaaaaaaaaa'])
    def test_empty_playlist_is_valid(self):
        self.assertEqual(youtube.parse_playlist(page([])), [])
    def test_missing_truncated_and_wrong_playlists_fail(self):
        for value in ['var ytInitialData = {};', page(['aaaaaaaaaaa'], total=2), page([], playlist_id='other')]:
            with self.assertRaises(ValueError): youtube.parse_playlist(value)
    def test_upstream_failure_is_explicitly_stale(self):
        youtube._cache = {'videos': [{'id': 'aaaaaaaaaaa'}], 'updatedAt': 1}
        youtube._last_attempt = 0
        with patch.object(youtube.urllib.request, 'urlopen', side_effect=OSError):
            self.assertTrue(youtube.get_playlist()['stale'])
        youtube._cache = None
        with self.assertRaises(RuntimeError): youtube.get_playlist()

if __name__ == '__main__': unittest.main()
