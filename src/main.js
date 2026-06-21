import * as THREE from "three";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Headphones,
  Images,
  Mail,
  MessageCircle,
  Moon,
  Pause,
  Play,
  Radio,
  Sun,
  Table2,
  createIcons
} from "lucide";
import "./styles.css";

const iconSet = {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Headphones,
  Images,
  Mail,
  MessageCircle,
  Moon,
  Pause,
  Play,
  Radio,
  Sun,
  Table2
};

const app = document.querySelector("#app");
const state = {
  config: null,
  selectedDayId: null,
  selectedIndex: 0,
  showTable: false,
  isPlaying: false,
  volume: 0.82,
  comments: [],
  commentsLoaded: false,
  commentsVisible: false,
  commentsStatus: "Einträge noch nicht geladen.",
  theme: getInitialTheme(),
  carouselDragProgress: 0,
  carouselAnimationFrame: 0,
  carouselReturnTimer: 0,
  playbackStarting: false,
  playbackRequested: false,
  playerLockedByOther: false,
  playerLockTimer: 0,
  playerLockWatchTimer: 0,
  tabId: createStreamSessionId(),
  streamRetryCount: 0,
  streamRetryTimer: 0,
  streamSessionId: "",
  nowPlaying: null,
  nowPlayingTimer: 0,
  lastPlaybackStartAttemptAt: 0,
  lastStreamRestartAt: 0,
  audioHandlersBound: false,
  mediaSessionKey: "",
  audio: new Audio(),
  sphere: null
};

const weekdayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const dayNameById = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag"
};
const PLAYER_LOCK_KEY = "ai-radio-active-player";
const PLAYER_LOCK_TTL_MS = 12000;
const PLAYER_LOCK_HEARTBEAT_MS = 3000;
const CAROUSEL_MIN_DRAG_PX = 52;
const CAROUSEL_DIRECTION_DRAG_UNITS = 0.24;
const CAROUSEL_VELOCITY_STEP_UNITS = 0.34;
const CAROUSEL_FAST_VELOCITY_UNITS = 0.72;
const CAROUSEL_MAX_THROW_STEPS = 3;
const TEXTBOOK_SHOW_BY_PROGRAM_SHOW = {
  "pure_metal": "02-a-chronicles-of-fire-and-steel",
  "11_open_road_country": "03-a-ai-radio-country-roads-collection",
  "14_northern_skies": "05-a-indie-reflections",
  "08_morning_soul": "06-a-soul-between-light-and-shadow",
  "18_granuaile_the_sea_and_the_crown": "07-a-granuaile-the-sea-and-the-crown",
  "20_blue_structures_eine_reise_durch_den_jazz": "08-a-blue-structures-eine-reise-durch-den-jazz",
  "17_blues_at_five": "09-a-blues-at-five",
  "07_kingston_skies_reggae": "11-a-kingston-skies",
  "golden_days_neon_nights": "12-a-golden-days-neon-nights",
  "rap_no_peace_in_the_signal": "13-a-political-rap-special",
  "balkan_disco": "14-a-balkan-disco-de",
  "r_b_velvet_after_midnight": "15-a-velvet-after-midnight",
  "saxophone_tunes": "16-a-saxophone-tunes",
  "chanson_lectrique": "17-a-chanson-lectrique",
  "13_global_noon": "01-b-weltklang"
};

init();

async function init() {
  const response = await fetch("/data/program.json", { cache: "no-store" });
  state.config = await response.json();
  state.selectedDayId = weekdayOrder[new Date().getDay()];
  state.selectedIndex = getCurrentSlotIndex();
  state.streamSessionId = createStreamSessionId();
  setupAudioEventHandlers();
  setupPlayerLock();
  applyTheme();
  render();
  refreshNowPlaying();
  startTicks();
}

function render() {
  const { station } = state.config;
  const activeSlot = getActiveSlot();
  const nextSlot = getNextSlot();
  const selectedDay = getSelectedDay();
  const selectedSlots = getSlotsForDay(selectedDay.id);
  const selectedShow = selectedSlots[state.selectedIndex]?.show ?? activeSlot.show;

  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#top" aria-label="${station.name}">
        <img src="/assets/img/ai-radio-icon.webp" alt="" decoding="async" />
        <span>${station.name}</span>
      </a>
      <nav class="nav-links" aria-label="Hauptnavigation">
        <a href="#programm">Programm</a>
        <a href="#community">Community</a>
        <a href="${station.podcastUrl}">Podcast</a>
      </nav>
      <button class="theme-action" id="themeToggle" type="button" aria-pressed="${state.theme === "light"}">
        <i data-lucide="${state.theme === "light" ? "moon" : "sun"}"></i>
        <span>${state.theme === "light" ? "Dunkel" : "Hell"}</span>
      </button>
    </header>

    <main id="top">
      <section class="hero-band">
        <div class="hero-inner">
          <div class="hero-copy">
            <p class="kicker"><i data-lucide="radio"></i> Live aus Mike's AI Radio</p>
            <h1>Mike's AI Radio</h1>
            <p class="lead">Ein direkter Einstieg in neue AI-Musik: aktuelle Sendung, nächste Shows und Community auf einer Seite.</p>

            <div class="player-panel" aria-label="Webradio Player">
              <img class="now-show-thumb" id="heroNowCover" src="${activeSlot.show.cover}" alt="" decoding="async" />
              <div>
                <span class="panel-label">Jetzt live</span>
                <strong id="heroNowTitle">${escapeHtml(activeSlot.show.shortTitle)}</strong>
                <small id="heroNowMeta">${formatHourRange(activeSlot.hour)} · ${escapeHtml(activeSlot.show.subtitle)}</small>
                <small class="now-track" id="heroNowTrack">${escapeHtml(getNowPlayingText())}</small>
              </div>
              <div class="player-actions">
                <button class="primary-action" id="playToggle" type="button" ${state.playbackStarting ? "disabled" : ""}>
                  <i data-lucide="${state.isPlaying ? "pause" : "play"}"></i>
                  <span>${getPlaybackButtonText()}</span>
                </button>
              </div>
            </div>
            <div class="next-show-strip" aria-label="Nächste Sendung">
              <img id="nextShowCover" src="${nextSlot.show.cover}" alt="" loading="lazy" decoding="async" />
              <div>
                <span>Nächste Sendung</span>
                <strong id="nextShowTitle">${escapeHtml(nextSlot.show.shortTitle)}</strong>
                <small id="nextShowTime">${formatHourRange(nextSlot.hour)} · ${escapeHtml(nextSlot.show.subtitle)}</small>
              </div>
            </div>
            <div class="media-links" aria-label="Podcast und Textbooks">
              <a class="media-link podcast-link" href="${station.podcastUrl}">
                <i data-lucide="headphones"></i>
                <span>
                  <strong>Podcast</strong>
                  <small>Sendungen nachhören</small>
                </span>
              </a>
              <a class="media-link textbook-link" id="textbookLink" href="${getTextbookUrl(activeSlot)}" target="_blank" rel="noopener">
                <i data-lucide="book-open"></i>
                <span>
                  <strong>Textbooks</strong>
                  <small>Begleittexte lesen</small>
                </span>
              </a>
            </div>
          </div>

          <div class="hero-stage" aria-label="Aktuelles Sendungsbild als drehende Sphäre">
            <div id="sphereMount" class="sphere-mount"></div>
          </div>
        </div>
      </section>

      <section class="program-band" id="programm">
        <div class="section-heading">
          <div>
            <p class="kicker"><i data-lucide="calendar-days"></i> Programm Vorschau</p>
            <h2>Die nächsten Stunden im Blick</h2>
          </div>
          <button class="secondary-action" id="tableToggle" type="button">
            <i data-lucide="${state.showTable ? "images" : "table-2"}"></i>
            <span>${state.showTable ? "Karussell zeigen" : "Programmplan"}</span>
          </button>
        </div>

        <div class="day-tabs" role="tablist" aria-label="Wochentage">
          ${state.config.weekdays.map((day) => `
            <button class="day-tab ${day.id === state.selectedDayId ? "is-active" : ""}" type="button" data-day="${day.id}" role="tab" aria-selected="${day.id === state.selectedDayId}">
              <span>${escapeHtml(day.label)}</span>
              <small>${escapeHtml(day.name)}</small>
            </button>
          `).join("")}
        </div>

        <div class="program-focus">
          <button class="icon-action carousel-nav" id="prevShow" type="button" aria-label="Vorherige Sendung">
            <i data-lucide="chevron-left"></i>
          </button>
          <div class="carousel-shell" id="carouselShell" tabindex="0" aria-label="Sendungskarussell">
            ${renderCarousel(selectedSlots)}
          </div>
          <button class="icon-action carousel-nav" id="nextShow" type="button" aria-label="Nächste Sendung">
            <i data-lucide="chevron-right"></i>
          </button>
        </div>

        <div class="selected-show">
          <img src="${selectedShow.cover}" alt="" loading="lazy" decoding="async" />
          <div>
            <span>${escapeHtml(selectedDay.name)} · ${formatHourRange(selectedSlots[state.selectedIndex]?.hour ?? activeSlot.hour)}</span>
            <h3>${escapeHtml(selectedShow.title)}</h3>
            <p>${escapeHtml(selectedShow.description)}</p>
          </div>
        </div>

        <div class="schedule-wrap ${state.showTable ? "is-visible" : ""}" id="scheduleWrap">
          <div class="schedule-header">
            <h3>Programmplan ${escapeHtml(dayNameById[state.selectedDayId] ?? selectedDay.name)}</h3>
          </div>
          <div class="schedule-grid">
            ${selectedSlots.map((slot, index) => `
              <button class="schedule-row ${isActiveSlot(slot) ? "is-live" : ""}" type="button" data-index="${index}">
                <time>${String(slot.hour).padStart(2, "0")}:00</time>
                <img src="${slot.show.cover}" alt="" loading="lazy" decoding="async" />
                <span>${escapeHtml(slot.show.shortTitle)}</span>
                ${isActiveSlot(slot) ? "<strong>Live</strong>" : ""}
              </button>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="listen-band">
        <div class="listen-grid">
          <article class="stat-tile">
            <span>Stream</span>
            <strong id="streamStatus">${getStreamStatusText()}</strong>
          </article>
          <article class="stat-tile">
            <span>Jetzt läuft</span>
            <strong id="nowPlayingTitle">${escapeHtml(getNowPlayingText())}</strong>
          </article>
          <article class="stat-tile">
            <span>Uhrzeit</span>
            <strong id="clockValue">--:--:--</strong>
          </article>
        </div>
      </section>

      <section class="community-band" id="community">
        <div class="community-layout">
          <div class="community-copy">
            <p class="kicker"><i data-lucide="message-circle"></i> Community</p>
            <h2>Sag kurz, was dich erreicht</h2>
            <p>Ein Satz reicht. Wer eine E-Mail hinterlässt, kann Rückmeldungen und besondere Radio-Updates bekommen.</p>
          </div>
          <form class="comment-form" id="commentForm">
            <div class="form-row">
              <label for="commentAuthor">Name</label>
              <input id="commentAuthor" name="author" maxlength="24" placeholder="Gast" autocomplete="name" />
            </div>
            <div class="form-row">
              <label for="commentEmail">E-Mail für Updates</label>
              <input id="commentEmail" name="email" type="email" maxlength="254" placeholder="name@example.com" autocomplete="email" />
            </div>
            <div class="form-row">
              <label for="commentText">Kommentar</label>
              <textarea id="commentText" name="comment" maxlength="280" placeholder="Was soll im Radio mehr passieren?"></textarea>
            </div>
            <label class="consent-line" for="privacyConsent">
              <input id="privacyConsent" type="checkbox" />
              <span>Ich bin mit der Verarbeitung meiner Angaben einverstanden. Details stehen in der <a href="/datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a>.</span>
            </label>
            <div class="form-footer">
              <span id="commentStatus">Noch nicht gesendet.</span>
              <button class="primary-action" id="postComment" type="submit">
                <i data-lucide="mail"></i>
                <span>Eintragen</span>
              </button>
            </div>
          </form>
          <div class="entry-panel">
            <button class="secondary-action entry-toggle" id="entryListToggle" type="button" aria-expanded="${state.commentsVisible}">
              <i data-lucide="message-circle"></i>
              <span>${state.commentsVisible ? "Einträge ausblenden" : "Einträge anzeigen"}</span>
            </button>
            <div class="entry-list-wrap ${state.commentsVisible ? "is-visible" : ""}" id="entryListWrap">
              <p class="entry-status" id="entryListStatus">${escapeHtml(state.commentsStatus)}</p>
              <ul class="entry-list" id="entryList">
                ${renderCommentEntries()}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <span>Mike's AI Radio ${new Date().getFullYear()}</span>
      <nav aria-label="Rechtliches">
        <a href="/impressum.html">Impressum</a>
        <a href="/datenschutz.html">Datenschutz</a>
        <a href="/verbraucherstreitbeilegung.html">Streitbeilegung</a>
      </nav>
    </footer>
  `;

  createIcons({ icons: iconSet });
  bindEvents();
  syncAudioElement();
  updateMediaSession();
  updateClock();
  state.sphere?.dispose?.();
  state.sphere = initHeroSphere(document.querySelector("#sphereMount"), getActiveSlot().show.cover);
}

function renderCarousel(slots) {
  return slots.map((slot, index) => {
    const relative = getRelativePosition(index, state.selectedIndex, slots.length) + state.carouselDragProgress;
    const isSelected = index === state.selectedIndex;
    const shouldLoadImage = Math.abs(relative) <= 3.4 || isSelected || isActiveSlot(slot);
    const pose = getCarouselPose(relative);
    const style = [
      `--x:${pose.x}`,
      `--y:${pose.y}`,
      `--z-offset:${pose.zOffset}`,
      `--rotate-y:${pose.rotateY}`,
      `--scale:${pose.scale}`,
      `--opacity:${pose.opacity}`,
      `--saturation:${pose.saturation}`,
      `--z:${pose.zIndex}`
    ].join(";");

    return `
      <button class="show-card ${isSelected ? "is-selected" : ""} ${isActiveSlot(slot) ? "is-live" : ""}" type="button" data-index="${index}" style="${style}">
        ${shouldLoadImage ? `<img src="${slot.show.cover}" alt="" draggable="false" loading="lazy" decoding="async" />` : ""}
        <span class="show-time">${String(slot.hour).padStart(2, "0")}:00</span>
        ${isActiveSlot(slot) ? "<span class=\"live-chip\">Live</span>" : ""}
        <span class="show-text">
          <strong>${escapeHtml(slot.show.shortTitle)}</strong>
          <small>${escapeHtml(slot.show.subtitle)}</small>
        </span>
      </button>
    `;
  }).join("");
}

function bindEvents() {
  document.querySelector("#playToggle")?.addEventListener("click", togglePlayback);
  document.querySelector("#themeToggle")?.addEventListener("click", toggleTheme);

  document.querySelector("#tableToggle")?.addEventListener("click", () => {
    state.showTable = !state.showTable;
    render();
  });

  document.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      clearCarouselReturnTimer();
      state.selectedDayId = button.dataset.day;
      state.selectedIndex = state.selectedDayId === weekdayOrder[new Date().getDay()] ? getCurrentSlotIndex() : 0;
      render();
    });
  });

  document.querySelector("#prevShow")?.addEventListener("click", () => spinCarouselBy(-1, { scheduleReturn: true }));
  document.querySelector("#nextShow")?.addEventListener("click", () => spinCarouselBy(1, { scheduleReturn: true }));
  const carouselShell = document.querySelector("#carouselShell");
  carouselShell?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") spinCarouselBy(-1, { scheduleReturn: true });
    if (event.key === "ArrowRight") spinCarouselBy(1, { scheduleReturn: true });
  });

  let dragStart = null;
  let dragCurrent = 0;
  let dragStartTime = 0;
  let lastDragX = 0;
  let lastDragTime = 0;
  let dragVelocity = 0;
  let didDrag = false;
  let dragFrame = 0;
  const paintCarousel = (progress) => {
    if (!carouselShell) return;
    const slots = getSlotsForDay(state.selectedDayId);
    for (const card of carouselShell.querySelectorAll(".show-card")) {
      const index = Number(card.dataset.index);
      const relative = getRelativePosition(index, state.selectedIndex, slots.length) + progress;
      const pose = getCarouselPose(relative);
      card.style.setProperty("--x", pose.x);
      card.style.setProperty("--y", pose.y);
      card.style.setProperty("--z-offset", pose.zOffset);
      card.style.setProperty("--rotate-y", pose.rotateY);
      card.style.setProperty("--scale", pose.scale);
      card.style.setProperty("--opacity", pose.opacity);
      card.style.setProperty("--saturation", pose.saturation);
      card.style.setProperty("--z", String(pose.zIndex));
      card.style.pointerEvents = Math.abs(relative) > 2.65 ? "none" : "";
    }
  };
  const applyCarouselDrag = (progress) => {
    window.cancelAnimationFrame(dragFrame);
    dragFrame = window.requestAnimationFrame(() => {
      paintCarousel(progress);
    });
  };
  carouselShell?.addEventListener("pointerdown", (event) => {
    window.cancelAnimationFrame(state.carouselAnimationFrame);
    clearCarouselReturnTimer();
    dragStart = event.clientX;
    dragCurrent = event.clientX;
    dragStartTime = event.timeStamp;
    lastDragX = event.clientX;
    lastDragTime = event.timeStamp;
    dragVelocity = 0;
    didDrag = false;
    state.carouselDragProgress = 0;
    carouselShell.classList.add("is-dragging");
    carouselShell.classList.remove("is-coasting", "is-spinning");
    carouselShell.setPointerCapture(event.pointerId);
  });
  carouselShell?.addEventListener("pointermove", (event) => {
    if (dragStart === null) return;
    dragCurrent = event.clientX;
    const delta = dragCurrent - dragStart;
    const elapsed = Math.max(1, event.timeStamp - lastDragTime);
    const instantVelocity = (event.clientX - lastDragX) / elapsed;
    dragVelocity = dragVelocity * 0.72 + instantVelocity * 0.28;
    lastDragX = event.clientX;
    lastDragTime = event.timeStamp;
    didDrag = didDrag || Math.abs(delta) > 8;
    const cardStep = Math.max(190, Math.min(260, carouselShell.clientWidth * 0.22));
    const progress = Math.max(-1.15, Math.min(1.15, delta / cardStep));
    state.carouselDragProgress = progress;
    applyCarouselDrag(progress);
  });
  carouselShell?.addEventListener("pointerup", (event) => {
    if (dragStart === null) return;
    const delta = event.clientX - dragStart;
    carouselShell.classList.remove("is-dragging");
    dragStart = null;
    const elapsed = Math.max(1, event.timeStamp - dragStartTime);
    const releaseVelocity = Math.abs(dragVelocity) > 0.01 ? dragVelocity : delta / elapsed;
    const cardStep = Math.max(190, Math.min(260, carouselShell.clientWidth * 0.22));
    const dragUnits = delta / cardStep;
    const velocityUnits = releaseVelocity * 170 / cardStep;
    const hasDirectionalDrag = Math.abs(dragUnits) >= CAROUSEL_DIRECTION_DRAG_UNITS || Math.abs(delta) >= CAROUSEL_MIN_DRAG_PX;
    const hasDirectionalVelocity = Math.abs(velocityUnits) >= CAROUSEL_VELOCITY_STEP_UNITS;
    const directionUnits = hasDirectionalDrag ? dragUnits : velocityUnits;
    const projectedUnits = hasDirectionalDrag
      ? dragUnits + Math.sign(dragUnits) * Math.max(0, Math.sign(dragUnits) * velocityUnits) * 0.9
      : velocityUnits;
    const rawStep = Math.round(Math.abs(projectedUnits));
    const velocityStep = Math.abs(velocityUnits) >= CAROUSEL_FAST_VELOCITY_UNITS ? 2 : 1;
    const stepCount = Math.max(hasDirectionalDrag ? 1 : 0, rawStep, hasDirectionalVelocity ? velocityStep : 0);
    if (stepCount > 0) {
      spinCarouselBy((directionUnits < 0 ? 1 : -1) * Math.min(CAROUSEL_MAX_THROW_STEPS, stepCount), {
        fromProgress: state.carouselDragProgress,
        velocity: releaseVelocity,
        scheduleReturn: true
      });
    } else {
      state.carouselDragProgress = 0;
      applyCarouselDrag(0);
      scheduleCarouselReturn();
    }
  });
  carouselShell?.addEventListener("pointercancel", () => {
    dragStart = null;
    state.carouselDragProgress = 0;
    carouselShell.classList.remove("is-dragging");
    applyCarouselDrag(0);
  });

  document.querySelectorAll("[data-index]").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (didDrag) {
        event.preventDefault();
        didDrag = false;
        return;
      }
      const nextIndex = Number(button.dataset.index);
      if (button.classList.contains("show-card")) {
        spinCarouselBy(getShortestCarouselStep(state.selectedIndex, nextIndex, getSlotsForDay(state.selectedDayId).length), {
          scheduleReturn: true
        });
      } else {
        clearCarouselReturnTimer();
        state.selectedIndex = nextIndex;
        render();
      }
    });
  });

  document.querySelector("#commentForm")?.addEventListener("submit", submitComment);
  document.querySelector("#entryListToggle")?.addEventListener("click", toggleEntryList);
}

function moveSelection(step) {
  const nextSelection = resolveCarouselSelection(step);
  state.selectedDayId = nextSelection.dayId;
  state.selectedIndex = nextSelection.index;
  render();
}

function spinCarouselBy(step, options = {}) {
  const slots = getSlotsForDay(state.selectedDayId);
  if (!slots.length || step === 0) {
    return;
  }

  const carouselShell = document.querySelector("#carouselShell");
  if (!carouselShell) {
    moveSelection(step);
    return;
  }

  window.cancelAnimationFrame(state.carouselAnimationFrame);
  const maxStep = Number.isFinite(options.maxStep) ? Math.max(1, options.maxStep) : 3;
  const boundedStep = Math.max(-maxStep, Math.min(maxStep, Math.round(step)));
  const nextSelection = resolveCarouselSelection(boundedStep);
  const startProgress = Number.isFinite(options.fromProgress) ? options.fromProgress : state.carouselDragProgress;
  const targetProgress = -boundedStep;
  const distance = Math.abs(targetProgress - startProgress);
  const speed = Math.min(1.6, Math.abs(options.velocity ?? 0));
  const duration = Number.isFinite(options.duration)
    ? Math.max(240, options.duration)
    : Math.max(520, Math.min(1120, 620 + distance * 190 - speed * 120));
  const startTime = performance.now();

  state.carouselDragProgress = startProgress;
  carouselShell.classList.add("is-spinning");
  carouselShell.classList.remove("is-coasting", "is-dragging");
  paintCarouselFrame(startProgress);

  const tick = (now) => {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = easeOutQuint(t);
    const progress = startProgress + (targetProgress - startProgress) * eased;
    state.carouselDragProgress = progress;
    paintCarouselFrame(progress);

    if (t < 1) {
      state.carouselAnimationFrame = window.requestAnimationFrame(tick);
      return;
    }

    const dayChanged = nextSelection.dayId !== state.selectedDayId;
    state.selectedDayId = nextSelection.dayId;
    state.selectedIndex = nextSelection.index;
    state.carouselDragProgress = 0;
    carouselShell.classList.remove("is-spinning");
    if (dayChanged) {
      render();
    } else {
      paintCarouselFrame(0);
      updateCarouselSelectionUi();
      updateSelectedShowSummary();
    }
    if (options.scheduleReturn) {
      scheduleCarouselReturn();
    }
    if (typeof options.onComplete === "function") {
      options.onComplete();
    }
  };

  state.carouselAnimationFrame = window.requestAnimationFrame(tick);
}

function scheduleCarouselReturn() {
  clearCarouselReturnTimer();

  state.carouselReturnTimer = window.setTimeout(() => {
    const todayId = weekdayOrder[new Date().getDay()];
    const currentIndex = getCurrentSlotIndex();
    if (currentIndex < 0 || (state.selectedDayId === todayId && currentIndex === state.selectedIndex)) {
      return;
    }
    spinCarouselToSelection(todayId, currentIndex, { returning: true });
  }, 5000);
}

function clearCarouselReturnTimer() {
  if (state.carouselReturnTimer) {
    window.clearTimeout(state.carouselReturnTimer);
    state.carouselReturnTimer = 0;
  }
}

function spinCarouselToIndex(targetIndex, options = {}) {
  spinCarouselToSelection(state.selectedDayId, targetIndex, options);
}

function spinCarouselToSelection(targetDayId, targetIndex, options = {}) {
  const slots = getSlotsForDay(state.selectedDayId);
  const targetSlots = getSlotsForDay(targetDayId);
  if (!slots.length || !targetSlots.length || targetIndex < 0 || targetIndex >= targetSlots.length) {
    return;
  }
  const step = targetDayId === state.selectedDayId
    ? getShortestCarouselStep(state.selectedIndex, targetIndex, slots.length, options.returning ? slots.length : 3)
    : getShortestCarouselStepToSelection(targetDayId, targetIndex);
  if (step !== 0) {
    if (options.returning && Math.abs(step) > 1) {
      spinCarouselBy(Math.sign(step), {
        maxStep: 1,
        duration: 340,
        velocity: 0.12,
        scheduleReturn: false,
        onComplete: () => {
          clearCarouselReturnTimer();
          state.carouselReturnTimer = window.setTimeout(() => {
            spinCarouselToSelection(targetDayId, targetIndex, options);
          }, 45);
        }
      });
      return;
    }

    spinCarouselBy(step, {
      maxStep: options.returning ? 1 : 3,
      duration: options.returning ? 340 : undefined,
      velocity: options.returning ? 0.12 : 0.28,
      scheduleReturn: false
    });
  }
}

function paintCarouselFrame(progress) {
  const carouselShell = document.querySelector("#carouselShell");
  if (!carouselShell) return;
  const slots = getSlotsForDay(state.selectedDayId);
  for (const card of carouselShell.querySelectorAll(".show-card")) {
    const index = Number(card.dataset.index);
    const relative = getRelativePosition(index, state.selectedIndex, slots.length) + progress;
    const pose = getCarouselPose(relative);
    card.style.setProperty("--x", pose.x);
    card.style.setProperty("--y", pose.y);
    card.style.setProperty("--z-offset", pose.zOffset);
    card.style.setProperty("--rotate-y", pose.rotateY);
    card.style.setProperty("--scale", pose.scale);
    card.style.setProperty("--opacity", pose.opacity);
    card.style.setProperty("--saturation", pose.saturation);
    card.style.setProperty("--z", String(pose.zIndex));
    card.style.pointerEvents = Math.abs(relative) > 2.65 ? "none" : "";
    if (Math.abs(relative) <= 3.4 && slots[index]) {
      ensureCardImage(card, slots[index].show.cover);
    }
  }
}

function ensureCardImage(card, cover) {
  if (!cover || card.querySelector("img")) return;
  const image = document.createElement("img");
  image.src = cover;
  image.alt = "";
  image.draggable = false;
  image.loading = "lazy";
  image.decoding = "async";
  card.prepend(image);
}

function updateCarouselSelectionUi() {
  const slots = getSlotsForDay(state.selectedDayId);
  for (const card of document.querySelectorAll(".show-card")) {
    const index = Number(card.dataset.index);
    const slot = slots[index];
    card.classList.toggle("is-selected", index === state.selectedIndex);
    card.classList.toggle("is-live", Boolean(slot && isActiveSlot(slot)));
  }
}

function updateSelectedShowSummary() {
  const selectedDay = getSelectedDay();
  const selectedSlots = getSlotsForDay(selectedDay.id);
  const slot = selectedSlots[state.selectedIndex];
  if (!slot) return;

  const image = document.querySelector(".selected-show img");
  const meta = document.querySelector(".selected-show span");
  const title = document.querySelector(".selected-show h3");
  const description = document.querySelector(".selected-show p");
  if (image) image.src = slot.show.cover;
  if (meta) meta.textContent = `${selectedDay.name} · ${formatHourRange(slot.hour)}`;
  if (title) title.textContent = slot.show.title;
  if (description) description.textContent = slot.show.description;
}

function getShortestCarouselStep(fromIndex, toIndex, total, maxStep = 3) {
  let step = toIndex - fromIndex;
  if (step > total / 2) step -= total;
  if (step < -total / 2) step += total;
  return Math.max(-maxStep, Math.min(maxStep, step));
}

function getTotalCarouselSlotCount() {
  return weekdayOrder.reduce((total, dayId) => total + getSlotsForDay(dayId).length, 0);
}

function getCarouselGlobalIndex(dayId, slotIndex) {
  let total = 0;
  for (const currentDayId of weekdayOrder) {
    if (currentDayId === dayId) {
      return total + slotIndex;
    }
    total += getSlotsForDay(currentDayId).length;
  }
  return slotIndex;
}

function getShortestCarouselStepToSelection(targetDayId, targetIndex) {
  const total = getTotalCarouselSlotCount();
  if (!total) return 0;

  const fromGlobal = getCarouselGlobalIndex(state.selectedDayId, state.selectedIndex);
  const toGlobal = getCarouselGlobalIndex(targetDayId, targetIndex);
  let step = toGlobal - fromGlobal;
  if (step > total / 2) step -= total;
  if (step < -total / 2) step += total;
  return step;
}

function getAdjacentDayId(dayId, direction) {
  const index = weekdayOrder.indexOf(dayId);
  if (index < 0) return dayId;
  const offset = direction >= 0 ? 1 : -1;
  return weekdayOrder[(index + offset + weekdayOrder.length) % weekdayOrder.length];
}

function resolveCarouselSelection(step) {
  let dayId = state.selectedDayId;
  let index = state.selectedIndex + Math.round(step);
  let guard = 0;

  while (guard < weekdayOrder.length * 2) {
    const slots = getSlotsForDay(dayId);
    if (!slots.length) {
      return { dayId: state.selectedDayId, index: state.selectedIndex };
    }
    if (index >= 0 && index < slots.length) {
      return { dayId, index };
    }
    if (index >= slots.length) {
      index -= slots.length;
      dayId = getAdjacentDayId(dayId, 1);
    } else {
      dayId = getAdjacentDayId(dayId, -1);
      const previousSlots = getSlotsForDay(dayId);
      index += previousSlots.length;
    }
    guard += 1;
  }

  return { dayId: state.selectedDayId, index: state.selectedIndex };
}

function easeOutQuint(value) {
  return 1 - Math.pow(1 - value, 5);
}

function getCarouselPose(relative) {
  const rawDistance = Math.abs(relative);
  const clampedRelative = Math.max(-3.35, Math.min(3.35, relative));
  const distance = Math.abs(clampedRelative);
  const angle = clampedRelative * 36;
  const radians = angle * Math.PI / 180;
  const x = Math.sin(radians) * 17.4;
  const z = (Math.cos(radians) - 1) * 14.2;
  const y = distance * 0.85;
  const visibility = rawDistance > 3.35 ? 0 : 1;

  return {
    x: `${x.toFixed(3)}rem`,
    y: `${y.toFixed(3)}rem`,
    zOffset: `${z.toFixed(3)}rem`,
    rotateY: `${(-angle * 0.96).toFixed(3)}deg`,
    scale: Math.max(0.56, 1 - distance * 0.145).toFixed(3),
    opacity: (visibility * Math.max(0, 1 - rawDistance * 0.3)).toFixed(3),
    saturation: Math.max(0.42, 1 - distance * 0.18).toFixed(3),
    zIndex: Math.round(100 - distance * 10)
  };
}

async function togglePlayback() {
  if (state.playbackStarting) {
    return;
  }

  if (state.isPlaying) {
    state.playbackStarting = false;
    state.playbackRequested = false;
    clearStreamRetryTimer();
    stopCurrentAudioStream();
    state.isPlaying = false;
    releasePlayerLock();
    updateMediaSession();
    render();
    return;
  }

  const now = Date.now();
  if (now - state.lastPlaybackStartAttemptAt < 5000) {
    return;
  }
  state.lastPlaybackStartAttemptAt = now;

  acquirePlayerLock();

  try {
    state.playbackStarting = true;
    state.playbackRequested = true;
    state.streamRetryCount = 0;
    clearStreamRetryTimer();
    updatePlaybackUi();
    logPlayerEvent("play-attempt", { reason: "play" });
    setAudioStreamSource("play", { force: true });
    await state.audio.play();
    state.isPlaying = true;
  } catch {
    logPlayerEvent("play-failed", { reason: "play" });
    state.playbackRequested = false;
    state.isPlaying = false;
    releasePlayerLock();
  } finally {
    state.playbackStarting = false;
  }
  updateMediaSession();
  render();
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  window.localStorage.setItem("ai-radio-theme", state.theme);
  applyTheme();
  render();
}

function getInitialTheme() {
  const saved = window.localStorage.getItem("ai-radio-theme");
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
}

async function submitComment(event) {
  event.preventDefault();
  const status = document.querySelector("#commentStatus");
  const form = event.currentTarget;
  const text = form.querySelector("#commentText").value.trim();
  const consent = form.querySelector("#privacyConsent").checked;

  if (!text) {
    status.textContent = "Bitte erst einen kurzen Kommentar schreiben.";
    return;
  }
  if (!consent) {
    status.textContent = "Bitte die kurze Einwilligung bestätigen.";
    return;
  }

  const payload = {
    author: form.querySelector("#commentAuthor").value.trim().slice(0, 24),
    email: form.querySelector("#commentEmail").value.trim().slice(0, 254),
    comment: text.slice(0, 280)
  };

  if (isLocalPreview()) {
    status.textContent = "Lokaler Prototyp: nichts wurde an den Pi gesendet.";
    state.comments.unshift({
      author: payload.author || "Gast",
      text: payload.comment,
      ts: Date.now()
    });
    state.commentsStatus = "Lokaler Prototyp: Beispiel-Eintrag nur hier angezeigt.";
    state.commentsLoaded = true;
    state.commentsVisible = true;
    updateEntryListUi();
    form.reset();
    return;
  }

  status.textContent = "Sende ...";
  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    status.textContent = payload.email
      ? "Danke. Bitte prüfe die Bestätigungs-E-Mail."
      : "Danke. Dein Kommentar ist gespeichert.";
    state.commentsLoaded = false;
    state.commentsVisible = true;
    await loadCommentEntries();
    updateEntryListUi();
    form.reset();
  } catch (error) {
    status.textContent = `Senden fehlgeschlagen: ${error.message}`;
  }
}

async function toggleEntryList() {
  state.commentsVisible = !state.commentsVisible;
  if (state.commentsVisible && !state.commentsLoaded) {
    state.commentsStatus = "Lade Einträge ...";
    updateEntryListUi();
    await loadCommentEntries();
  }
  updateEntryListUi();
}

async function loadCommentEntries() {
  try {
    const response = await fetch("/api/comments", {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    state.comments = sanitizeCommentEntries(payload.comments);
    state.commentsLoaded = true;
    state.commentsStatus = state.comments.length
      ? `${state.comments.length} Einträge geladen.`
      : "Noch keine Einträge vorhanden.";
  } catch {
    state.comments = [];
    state.commentsLoaded = true;
    state.commentsStatus = isLocalPreview()
      ? "Lokale Vorschau: Die Pi-API ist hier nicht aktiv."
      : "Einträge konnten gerade nicht geladen werden.";
  }
}

function sanitizeCommentEntries(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      author: typeof item.author === "string" && item.author.trim() ? item.author.trim().slice(0, 24) : "Gast",
      text: typeof item.text === "string" ? item.text.trim().slice(0, 280) : "",
      ts: Number.isFinite(item.ts) ? item.ts : Date.now()
    }))
    .filter((item) => item.text)
    .slice(0, 30);
}

function renderCommentEntries() {
  if (!state.comments.length) {
    return `<li class="entry-empty">Keine Einträge zu zeigen.</li>`;
  }
  return state.comments.map((entry) => `
    <li class="entry-item">
      <div>
        <strong>${escapeHtml(entry.author)}</strong>
        <time>${escapeHtml(formatEntryTime(entry.ts))}</time>
      </div>
      <p>${escapeHtml(entry.text)}</p>
    </li>
  `).join("");
}

function updateEntryListUi() {
  const toggle = document.querySelector("#entryListToggle");
  const wrap = document.querySelector("#entryListWrap");
  const status = document.querySelector("#entryListStatus");
  const list = document.querySelector("#entryList");

  toggle?.setAttribute("aria-expanded", String(state.commentsVisible));
  const toggleText = toggle?.querySelector("span");
  if (toggleText) {
    toggleText.textContent = state.commentsVisible ? "Einträge ausblenden" : "Einträge anzeigen";
  }
  wrap?.classList.toggle("is-visible", state.commentsVisible);
  if (status) {
    status.textContent = state.commentsStatus;
  }
  if (list) {
    list.innerHTML = renderCommentEntries();
  }
}

function formatEntryTime(value) {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function getSlotsForDay(dayId) {
  const day = state.config.weekdays.find((item) => item.id === dayId) ?? state.config.weekdays[0];
  const rawSlots = day.slots === "default" ? state.config.defaultSlots : day.slots;
  return rawSlots.map((slot) => ({
    ...slot,
    showId: slot.show,
    show: state.config.shows[slot.show]
  })).filter((slot) => slot.show);
}

function getSelectedDay() {
  return state.config.weekdays.find((item) => item.id === state.selectedDayId) ?? state.config.weekdays[0];
}

function getActiveSlot(date = new Date()) {
  const dayId = weekdayOrder[date.getDay()];
  const slots = getSlotsForDay(dayId);
  const hour = date.getHours();
  return slots.find((slot) => slot.hour === hour) ?? slots[0];
}

function getNextSlot(date = new Date()) {
  const dayId = weekdayOrder[date.getDay()];
  const slots = getSlotsForDay(dayId);
  if (!slots.length) {
    return getActiveSlot(date);
  }
  const currentIndex = Math.max(0, slots.findIndex((slot) => slot.hour === date.getHours()));
  return slots[(currentIndex + 1) % slots.length];
}

function getCurrentSlotIndex(date = new Date()) {
  const slots = getSlotsForDay(weekdayOrder[date.getDay()]);
  const hour = date.getHours();
  return Math.max(0, slots.findIndex((slot) => slot.hour === hour));
}

function isActiveSlot(slot) {
  const now = new Date();
  return state.selectedDayId === weekdayOrder[now.getDay()] && slot.hour === now.getHours();
}

function formatHourRange(hour) {
  return `${String(hour).padStart(2, "0")}:00-${String((hour + 1) % 24).padStart(2, "0")}:00`;
}

function getRelativePosition(index, selectedIndex, total) {
  let distance = index - selectedIndex;
  if (distance > total / 2) distance -= total;
  if (distance < -total / 2) distance += total;
  return distance;
}

function getStreamUrl(streamUrl) {
  return isLocalPreview() ? "https://ai-radio.cc/stream.mp3" : streamUrl;
}

function isLocalPreview() {
  return ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
}

function setupPlayerLock() {
  refreshPlayerLockState();
  state.playerLockWatchTimer = window.setInterval(refreshPlayerLockState, PLAYER_LOCK_HEARTBEAT_MS);
  window.addEventListener("storage", (event) => {
    if (event.key === PLAYER_LOCK_KEY) {
      refreshPlayerLockState();
    }
  });
  window.addEventListener("pagehide", releasePlayerLock);
  window.addEventListener("beforeunload", releasePlayerLock);
}

function getPlayerLock() {
  try {
    const raw = window.localStorage.getItem(PLAYER_LOCK_KEY);
    if (!raw) return null;
    const lock = JSON.parse(raw);
    if (!lock || typeof lock !== "object") return null;
    if (Number(lock.expiresAt) <= Date.now()) {
      try {
        window.localStorage.removeItem(PLAYER_LOCK_KEY);
      } catch {
        // Ignore storage errors while clearing an expired lock.
      }
      return null;
    }
    return lock;
  } catch {
    try {
      window.localStorage.removeItem(PLAYER_LOCK_KEY);
    } catch {
      // Ignore storage errors while clearing a malformed lock.
    }
    return null;
  }
}

function isLockedByOther(lock = getPlayerLock()) {
  return Boolean(lock && lock.tabId && lock.tabId !== state.tabId);
}

function acquirePlayerLock() {
  const lock = getPlayerLock();
  if (isLockedByOther(lock)) {
    logPlayerEvent("takeover-other-tab", { reason: "other-tab" });
  }

  if (!writePlayerLock()) {
    return true;
  }
  startPlayerLockHeartbeat();
  state.playerLockedByOther = false;
  return true;
}

function writePlayerLock() {
  const now = Date.now();
  try {
    window.localStorage.setItem(PLAYER_LOCK_KEY, JSON.stringify({
      tabId: state.tabId,
      sessionId: state.streamSessionId,
      updatedAt: now,
      expiresAt: now + PLAYER_LOCK_TTL_MS
    }));
    return true;
  } catch {
    return false;
  }
}

function startPlayerLockHeartbeat() {
  if (state.playerLockTimer) return;
  state.playerLockTimer = window.setInterval(() => {
    if (!state.playbackRequested && !state.playbackStarting && !state.isPlaying) {
      releasePlayerLock();
      return;
    }
    writePlayerLock();
  }, PLAYER_LOCK_HEARTBEAT_MS);
}

function releasePlayerLock() {
  const lock = getPlayerLock();
  if (lock && lock.tabId === state.tabId) {
    try {
      window.localStorage.removeItem(PLAYER_LOCK_KEY);
    } catch {
      // Ignore storage errors while closing the tab.
    }
  }
  if (state.playerLockTimer) {
    window.clearInterval(state.playerLockTimer);
    state.playerLockTimer = 0;
  }
  state.playerLockedByOther = false;
}

function refreshPlayerLockState() {
  const nextLocked = isLockedByOther();
  if (nextLocked && (state.isPlaying || state.playbackRequested || state.playbackStarting)) {
    stopPlaybackForOtherTab();
  }
  if (state.playerLockedByOther === nextLocked) return;
  state.playerLockedByOther = nextLocked;
  updatePlaybackUi();
}

function stopPlaybackForOtherTab() {
  state.playbackStarting = false;
  state.playbackRequested = false;
  state.isPlaying = false;
  clearStreamRetryTimer();
  stopCurrentAudioStream();
  logPlayerEvent("stopped-for-other-tab", { reason: "other-tab" });
  updatePlaybackUi();
  updateMediaSession();
}

function syncAudioElement() {
  state.audio.preload = "none";
  state.audio.volume = state.volume;
  state.audio.muted = false;
}

function setupAudioEventHandlers() {
  if (state.audioHandlersBound) return;
  state.audioHandlersBound = true;
  state.audio.preload = "none";

  state.audio.addEventListener("playing", () => {
    clearStreamRetryTimer();
    state.playbackStarting = false;
    state.isPlaying = true;
    logPlayerEvent("playing");
    updatePlaybackUi();
    updateMediaSession();
  });
  state.audio.addEventListener("canplay", clearStreamRetryTimer);
  state.audio.addEventListener("canplaythrough", clearStreamRetryTimer);

  state.audio.addEventListener("pause", () => {
    if (!state.playbackRequested) {
      clearStreamRetryTimer();
      state.isPlaying = false;
      logPlayerEvent("pause");
      updatePlaybackUi();
      updateMediaSession();
    }
  });

  state.audio.addEventListener("waiting", () => scheduleStreamReconnect("waiting", 2500));
  state.audio.addEventListener("stalled", () => scheduleStreamReconnect("stalled", 1200));
  state.audio.addEventListener("error", () => scheduleStreamReconnect("error", 400));
  state.audio.addEventListener("ended", () => scheduleStreamReconnect("ended", 400));
}

function scheduleStreamReconnect(reason, delayMs) {
  if (!state.playbackRequested) return;
  if (state.streamRetryTimer) return;
  logPlayerEvent(`audio-${reason}`, { reason });
  state.streamRetryTimer = window.setTimeout(() => {
    state.streamRetryTimer = 0;
    restartStream(reason);
  }, delayMs);
}

function clearStreamRetryTimer() {
  if (!state.streamRetryTimer) return;
  window.clearTimeout(state.streamRetryTimer);
  state.streamRetryTimer = 0;
}

async function restartStream(reason) {
  if (!state.playbackRequested || state.playbackStarting) return;

  const now = Date.now();
  const minGapMs = 3500;
  if (now - state.lastStreamRestartAt < minGapMs) {
    scheduleStreamReconnect(reason, minGapMs - (now - state.lastStreamRestartAt));
    return;
  }

  state.lastStreamRestartAt = now;
  state.playbackStarting = true;
  state.streamRetryCount += 1;
  updatePlaybackUi();
  logPlayerEvent("reconnect-attempt", { reason });
  setAudioStreamSource(`retry-${reason}-${state.streamRetryCount}`, { force: true });

  try {
    await state.audio.play();
    state.isPlaying = true;
  } catch {
    state.isPlaying = false;
    logPlayerEvent("reconnect-failed", { reason });
    scheduleStreamReconnect("play-failed", 3500);
  } finally {
    state.playbackStarting = false;
  }
  updatePlaybackUi();
  updateMediaSession();
}

function setAudioStreamSource(reason, options = {}) {
  const baseUrl = new URL(getStreamUrl(state.config.station.streamUrl), window.location.href);
  baseUrl.searchParams.set("ts", String(Date.now()));
  baseUrl.searchParams.set("sid", state.streamSessionId || createStreamSessionId());
  baseUrl.searchParams.set("rv", String(state.streamRetryCount + 1));
  baseUrl.searchParams.set("reason", reason);
  const nextSrc = baseUrl.href;

  if (!options.force && state.audio.src === nextSrc) return;
  if (options.force) {
    stopCurrentAudioStream();
  }
  state.audio.src = nextSrc;
  state.audio.preload = "none";
  state.audio.volume = state.volume;
  state.audio.muted = false;
}

function stopCurrentAudioStream() {
  state.audio.pause();
  state.audio.removeAttribute("src");
  state.audio.load();
}

function logPlayerEvent(event, details = {}) {
  if (isLocalPreview()) return;
  const payload = {
    event,
    session_id: state.streamSessionId,
    retry_count: state.streamRetryCount,
    is_playing: state.isPlaying,
    playback_starting: state.playbackStarting,
    ready_state: state.audio.readyState,
    network_state: state.audio.networkState,
    reason: details.reason || ""
  };
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/player-event", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/player-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  }).catch(() => {});
}

function createStreamSessionId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function updatePlaybackUi() {
  const button = document.querySelector("#playToggle");
  const status = document.querySelector("#streamStatus");
  if (status) {
    status.textContent = getStreamStatusText();
  }
  if (!button) return;
  button.disabled = state.playbackStarting;
  button.innerHTML = `
    <i data-lucide="${state.isPlaying ? "pause" : "play"}"></i>
    <span>${getPlaybackButtonText()}</span>
  `;
  createIcons({ icons: iconSet });
}

function getPlaybackButtonText() {
  if (state.playbackStarting) return "Verbinde";
  return state.isPlaying ? "Pause" : "Start";
}

function getStreamStatusText() {
  if (state.playbackStarting) return "Verbinde";
  return state.isPlaying ? "Verbunden" : "Bereit";
}

function getTextbookUrl(slot = getActiveSlot()) {
  const baseUrl = state.config?.station?.textbookUrl || "/podcast/ai-radio/textbooks/";
  const showId = String(slot?.showId || slot?.showKey || "").trim();
  const textbookShowId = TEXTBOOK_SHOW_BY_PROGRAM_SHOW[showId];
  if (!textbookShowId) return baseUrl;
  try {
    const url = new URL(baseUrl, window.location.href);
    url.searchParams.set("show", textbookShowId);
    return url.href;
  } catch {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}show=${encodeURIComponent(textbookShowId)}`;
  }
}

function getNowPlayingText() {
  const track = String(state.nowPlaying?.track || "").trim();
  return track || getActiveSlot().show.shortTitle;
}

function isNowPlayingFresh(payload) {
  const updatedTs = Number(payload?.updated_ts || 0);
  const serverTs = Number(payload?.server_ts || Date.now());
  return Boolean(updatedTs > 0 && serverTs - updatedTs < 8 * 60 * 1000);
}

async function refreshNowPlaying() {
  if (isLocalPreview()) return;
  try {
    const response = await fetch("/api/now-playing", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    state.nowPlaying = payload.status === "playing" && isNowPlayingFresh(payload) ? payload : null;
  } catch {
    state.nowPlaying = null;
  }
  updateNowPlayingUi();
  updateMediaSession();
}

function updateNowPlayingUi() {
  const text = getNowPlayingText();
  const heroTrack = document.querySelector("#heroNowTrack");
  if (heroTrack) heroTrack.textContent = text;
  const nowPlayingTitle = document.querySelector("#nowPlayingTitle");
  if (nowPlayingTitle) nowPlayingTitle.textContent = text;
}

function updateMediaSession() {
  if (!state.config) return;
  const station = state.config.station;
  const active = getActiveSlot();
  const track = String(state.nowPlaying?.track || "").trim();
  const showTitle = active.show.shortTitle || active.show.title || station.name;
  const title = track || showTitle;
  const artist = track ? showTitle : `${formatHourRange(active.hour)} · ${active.show.subtitle}`;
  const album = station.name;
  const coverUrl = new URL(active.show.cover, window.location.href).href;
  const jpegFallbackUrl = coverUrl.replace(/-512\.webp$/, "-512.jpg");
  const key = `${title}|${artist}|${coverUrl}|${state.isPlaying}`;

  document.title = state.isPlaying ? `${title} · ${station.name}` : station.name;

  if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") return;
  navigator.mediaSession.playbackState = state.isPlaying ? "playing" : "paused";
  if (state.mediaSessionKey === key) return;
  state.mediaSessionKey = key;

  navigator.mediaSession.metadata = new MediaMetadata({
    title,
    artist,
    album,
    artwork: [
      { src: coverUrl, sizes: "512x512", type: "image/webp" },
      { src: jpegFallbackUrl, sizes: "512x512", type: "image/jpeg" }
    ]
  });

  navigator.mediaSession.setActionHandler?.("play", () => {
    if (!state.isPlaying) togglePlayback();
  });
  navigator.mediaSession.setActionHandler?.("pause", () => {
    if (state.isPlaying) togglePlayback();
  });
}

function startTicks() {
  window.setInterval(() => {
    const active = getActiveSlot();
    const next = getNextSlot();
    document.querySelector("#heroNowTitle") && (document.querySelector("#heroNowTitle").textContent = active.show.shortTitle);
    document.querySelector("#heroNowMeta") && (document.querySelector("#heroNowMeta").textContent = `${formatHourRange(active.hour)} · ${active.show.subtitle}`);
    const nowCover = document.querySelector("#heroNowCover");
    if (nowCover && nowCover.getAttribute("src") !== active.show.cover) {
      nowCover.setAttribute("src", active.show.cover);
    }
    document.querySelector("#nextShowTitle") && (document.querySelector("#nextShowTitle").textContent = next.show.shortTitle);
    document.querySelector("#nextShowTime") && (document.querySelector("#nextShowTime").textContent = `${formatHourRange(next.hour)} · ${next.show.subtitle}`);
    const nextCover = document.querySelector("#nextShowCover");
    if (nextCover && nextCover.getAttribute("src") !== next.show.cover) {
      nextCover.setAttribute("src", next.show.cover);
    }
    const textbookLink = document.querySelector("#textbookLink");
    if (textbookLink) {
      textbookLink.setAttribute("href", getTextbookUrl(active));
    }
    updateNowPlayingUi();
    state.sphere?.setImage(active.show.cover);
    updateMediaSession();
    updateClock();
  }, 1000);
  state.nowPlayingTimer = window.setInterval(refreshNowPlaying, 5000);
}

function updateClock() {
  const clock = document.querySelector("#clockValue");
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());
}

function initHeroSphere(container, imageUrl) {
  if (!container) return null;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 5.1);

  const geometry = new THREE.SphereGeometry(1.3, 96, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 0x181512,
    roughness: 0.42,
    metalness: 0.02,
    emissive: new THREE.Color(0x101010),
    emissiveIntensity: 0.18
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.rotation.y = -0.55;
  scene.add(sphere);

  const rimLight = new THREE.PointLight(0xff8a54, 4.2, 10);
  rimLight.position.set(-3.2, 2.1, 3.5);
  scene.add(rimLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
  keyLight.position.set(2.8, 2.6, 4.2);
  scene.add(keyLight);
  scene.add(new THREE.AmbientLight(0x7bd7cf, 1.1));

  const loader = new THREE.TextureLoader();
  let activeImage = "";
  function setImage(nextImage) {
    if (!nextImage || nextImage === activeImage) return;
    activeImage = nextImage;
    loader.load(nextImage, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const oldMap = material.map;
      material.map = texture;
      material.color.set(0xffffff);
      material.emissive.set(0x2a2520);
      material.emissiveIntensity = 0.38;
      material.needsUpdate = true;
      oldMap?.dispose();
    });
  }

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    const side = Math.max(280, Math.min(width, height || width));
    renderer.setSize(side, side, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  let frameId = 0;
  function animate() {
    sphere.rotation.y += 0.0042;
    sphere.rotation.x = Math.sin(performance.now() * 0.00045) * 0.08;
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(animate);
  }

  setImage(imageUrl);
  resize();
  animate();
  window.addEventListener("resize", resize);

  function dispose() {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("resize", resize);
    material.map?.dispose();
    material.dispose();
    geometry.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  return { setImage, dispose };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
