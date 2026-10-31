// One stable iframe; the page owns the queue instead of YouTube's embedded playlist.
let apiPromise;
export function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const previous = window.onYouTubeIframeAPIReady;
    const timer = window.setTimeout(() => fail(), 20000);
    function fail() {
      window.clearTimeout(timer);
      script.remove();
      apiPromise = null;
      reject(new Error('YouTube API unavailable'));
    }
    window.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timer);
      previous?.();
      resolve(window.YT);
    };
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = fail;
    document.head.append(script);
  });
  return apiPromise;
}

export async function createYouTubePlayer({ mount, videoId, events }) {
  const YT = await loadYouTubeAPI();
  // Closing or re-rendering during API download must not resurrect the player.
  if (!mount.isConnected) return null;
  const iframe = document.createElement('iframe');
  const params = new URLSearchParams({ enablejsapi: '1', origin: window.location.origin, autoplay: '1', playsinline: '1', rel: '0' });
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
  iframe.title = 'YouTube · AI Radio';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  mount.replaceChildren(iframe);
  return new YT.Player(iframe, { events });
}

export class VideoQueue {
  constructor({ videos, createPlayer = createYouTubePlayer, onChange = () => {}, beforePlay = () => {} }) {
    Object.assign(this, { videos, createPlayer, onChange, beforePlay });
    this.index = 0;
    this.status = 'closed';
    this.generation = 0;
    this.unavailable = new Set();
    this.retried = false;
    this.hasPlayed = false;
  }
  notify(status) { this.status = status; this.onChange(this); }
  clearTimer() { if (this.timer != null) clearTimeout(this.timer); this.timer = null; }
  watch() {
    this.clearTimer();
    this.timer = setTimeout(() => { this.timer = null; this.fail(5); }, 20000);
  }
  async open(mount, index = this.index) {
    this.close(false);
    this.mount = mount;
    this.index = index;
    this.retried = false;
    this.beforePlay();
    await this.connect();
  }
  async connect(startSeconds = 0) {
    const generation = ++this.generation;
    this.ready = false;
    this.hasPlayed = false;
    this.notify('loading');
    this.watch();
    const valid = () => generation === this.generation && this.status !== 'closed';
    try {
      const player = await this.createPlayer({
        mount: this.mount, videoId: this.videos[this.index].id,
        events: {
          onReady: event => {
            if (!valid()) return;
            this.player = event.target;
            this.ready = true;
            if (startSeconds > 0) this.player.seekTo(startSeconds, true);
            this.player.playVideo();
          },
          onStateChange: event => {
            if (!valid()) return;
            if (event.data === 1) { this.hasPlayed = true; this.clearTimer(); this.notify('playing'); }
            else if (event.data === 2) { this.clearTimer(); this.notify('paused'); }
            else if (event.data === 3) { this.watch(); this.notify('loading'); }
            else if (event.data === 0 && this.hasPlayed) {
              this.hasPlayed = false;
              this.next();
            }
          },
          onError: event => { if (valid()) this.fail(event.data); },
          onAutoplayBlocked: () => { if (valid()) { this.clearTimer(); this.notify('blocked'); } }
        }
      });
      if (!valid()) { player?.destroy(); return; }
      if (!player) { this.clearTimer(); this.notify('error'); return; }
      this.player = player;
    } catch {
      if (valid()) { this.clearTimer(); this.notify('error'); }
    }
  }
  select(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.videos.length) return;
    this.clearTimer();
    this.index = index;
    this.hasPlayed = false;
    this.retried = false;
    this.beforePlay();
    if (this.ready && this.player?.loadVideoById) {
      this.notify('loading');
      this.watch();
      this.player.loadVideoById(this.videos[index].id);
    } else {
      // A newer choice supersedes an API download or a failed initialization.
      ++this.generation;
      this.player?.destroy();
      this.player = null;
      void this.connect();
    }
  }
  replaceVideos(videos) {
    const currentId = this.videos[this.index]?.id;
    const unavailableIds = new Set([...this.unavailable].map(index => this.videos[index]?.id));
    this.videos = videos;
    this.unavailable = new Set(videos.map((video, index) => unavailableIds.has(video.id) ? index : -1).filter(index => index >= 0));
    if (!videos.length) { this.index = 0; this.close(); return; }
    const currentIndex = videos.findIndex(video => video.id === currentId);
    if (currentIndex >= 0) {
      this.index = currentIndex;
      this.onChange(this);
    } else if (this.status !== 'closed') {
      this.select(Math.min(this.index, videos.length - 1));
    } else this.index = 0;
  }
  next() {
    this.clearTimer();
    const next = this.videos.findIndex((_, index) => index > this.index && !this.unavailable.has(index));
    if (next >= 0) this.select(next);
    else this.notify('ended');
  }
  fail(code) {
    this.clearTimer();
    if ([100, 101, 150].includes(code)) {
      this.unavailable.add(this.index);
      this.notify('unavailable');
      this.timer = setTimeout(() => { this.timer = null; this.next(); }, 2500);
    } else if (code === 5 && !this.retried) {
      this.retried = true;
      const seconds = this.player?.getCurrentTime?.() || 0;
      ++this.generation;
      this.player?.destroy();
      this.player = null;
      void this.connect(seconds);
    } else this.notify('error');
  }
  retry() {
    this.clearTimer();
    if (this.status === 'blocked' && this.ready) {
      this.watch();
      this.player.playVideo();
      return;
    }
    this.retried = false;
    this.unavailable.delete(this.index);
    ++this.generation;
    this.player?.destroy();
    this.player = null;
    void this.connect();
  }
  close(notify = true) {
    ++this.generation;
    this.clearTimer();
    this.player?.destroy();
    this.player = null;
    this.ready = false;
    this.status = 'closed';
    if (notify) this.onChange(this);
  }
}
