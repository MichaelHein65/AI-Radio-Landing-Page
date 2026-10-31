import test from 'node:test';
import assert from 'node:assert/strict';
import { VideoQueue } from '../src/youtube-player.js';

function setup(t) {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const players = [];
  const queue = new VideoQueue({ videos: Array.from({length: 6}, (_, i) => ({id: `video${i}`})), createPlayer: async options => {
    const player = { events: options.events, loaded: [options.videoId], destroyed: false,
      loadVideoById(id) { this.loaded.push(id); }, playVideo() {}, seekTo(seconds) { this.seek = seconds; }, getCurrentTime() { return 42; }, destroy() { this.destroyed = true; } };
    players.push(player);
    return player;
  }});
  t.after(() => queue.close());
  const ready = () => players.at(-1).events.onReady({target:players.at(-1)});
  const state = data => players.at(-1).events.onStateChange({data});
  return {queue, players, ready, state};
}

test('advances through video 3, 4 and 5 without replacing the iframe; stops at the end', async t => {
  const {queue,players,ready,state} = setup(t);
  await queue.open({}); ready();
  for (let index=0; index<6; index++) {
    assert.equal(queue.index,index);
    state(1); state(0); state(0); // duplicate ended events must not skip a title
  }
  assert.equal(players.length,1);
  assert.equal(queue.status,'ended');
  assert.deepEqual(players[0].loaded,['video0','video1','video2','video3','video4','video5']);
});
test('manual selection supersedes pending skip and paused videos do not time out', async t => {
  const {queue,players,ready,state} = setup(t);
  await queue.open({}); ready();
  players[0].events.onError({data:150});
  queue.select(3); state(2);
  t.mock.timers.tick(60000);
  assert.equal(queue.index,3); assert.equal(queue.status,'paused'); assert.equal(players.length,1);
});
test('unavailable video is skipped, initialization errors are retried only once', async t => {
  const {queue,players,ready} = setup(t);
  await queue.open({}); ready();
  players[0].events.onError({data:100}); t.mock.timers.tick(2500);
  assert.equal(queue.index,1);
  players[0].events.onError({data:5}); await Promise.resolve(); ready();
  assert.equal(players.length,2); assert.equal(players[1].seek,42);
  players[1].events.onError({data:5});
  assert.equal(queue.status,'error'); assert.equal(players.length,2);
});
test('autoplay blocking is actionable, close invalidates late events and timers', async t => {
  const {queue,players,ready} = setup(t);
  await queue.open({}); ready();
  players[0].events.onAutoplayBlocked(); t.mock.timers.tick(60000);
  assert.equal(queue.status,'blocked');
  queue.close(); players[0].events.onStateChange({data:1}); t.mock.timers.tick(60000);
  assert.equal(queue.status,'closed'); assert.ok(players[0].destroyed);
});
test('closing during API loading destroys late player without restarting playback', async t => {
  let resolve;
  const player={destroyed:false,destroy(){this.destroyed=true;}};
  const queue=new VideoQueue({videos:[{id:'video0'}],createPlayer:()=>new Promise(r=>resolve=r)});
  const opening=queue.open({}); queue.close(); resolve(player); await opening;
  assert.equal(queue.status,'closed'); assert.ok(player.destroyed);
});
test('refresh reflects deletion and reorder without interrupting the current video', async t => {
  const {queue,players,ready,state} = setup(t);
  await queue.open({}); ready(); queue.select(3); state(1);
  queue.replaceVideos([{id:'video5'},{id:'video3'},{id:'video0'}]);
  assert.equal(queue.index,1); assert.equal(queue.status,'playing');
  assert.deepEqual(players[0].loaded,['video0','video3']);
  state(0); assert.equal(players[0].loaded.at(-1),'video0');
});
test('removing current video advances to a valid selection; empty playlist stops playback', async t => {
  const {queue,players,ready} = setup(t);
  await queue.open({}); ready(); queue.select(3);
  queue.replaceVideos([{id:'video0'},{id:'newVideo'}]);
  assert.equal(queue.index,1); assert.equal(players[0].loaded.at(-1),'newVideo');
  queue.replaceVideos([]);
  assert.equal(queue.status,'closed'); assert.ok(players[0].destroyed); assert.equal(queue.videos.length,0);
});
test('unavailable markers follow video IDs when the playlist changes', async t => {
  const {queue,players,ready} = setup(t);
  await queue.open({}); ready(); players[0].events.onError({data:150});
  queue.replaceVideos([{id:'newVideo'},{id:'video0'},{id:'video1'}]);
  assert.deepEqual([...queue.unavailable],[1]);
  t.mock.timers.tick(2500); assert.equal(queue.index,2);
});
