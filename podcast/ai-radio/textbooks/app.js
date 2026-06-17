(function () {
  const data = window.TEXTBOOK_DATA || { shows: [] };
  const requestedShowId = getRequestedShowId();
  const state = {
    showId: requestedShowId || data.shows[0]?.id || "",
    songIndex: 0,
    drag: null,
    carouselOffset: 0,
    songOffset: 0,
    suppressClick: false,
  };

  const showCarousel = document.getElementById("showCarousel");
  const reader = document.getElementById("reader");
  const songTrack = document.getElementById("songTrack");

  function getRequestedShowId() {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("show") || params.get("sendung") || "";
    const normalized = slugify(requested);
    if (!normalized) return "";
    const match = data.shows.find((show) => show.id === normalized || slugify(show.title) === normalized);
    return match?.id || "";
  }

  function currentShowIndex() {
    const index = data.shows.findIndex((show) => show.id === state.showId);
    return index >= 0 ? index : 0;
  }

  function currentShow() {
    return data.shows[currentShowIndex()];
  }

  function wrap(index, length) {
    return ((index % length) + length) % length;
  }

  function slugify(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replaceAll("ä", "ae")
      .replaceAll("ö", "oe")
      .replaceAll("ü", "ue")
      .replaceAll("ß", "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function relativePosition(index, selectedIndex, count) {
    let distance = index - selectedIndex;
    if (distance > count / 2) distance -= count;
    if (distance < -count / 2) distance += count;
    return distance;
  }

  function selectShow(index) {
    if (!data.shows.length) return;
    state.showId = data.shows[wrap(index, data.shows.length)].id;
    state.songIndex = 0;
    state.carouselOffset = 0;
    renderCarousel();
    renderReader();
  }

  function selectSong(index, keepScroll) {
    const show = currentShow();
    if (!show?.songs.length) return;
    state.songIndex = wrap(index, show.songs.length);
    state.songOffset = 0;
    renderReader();
    if (!keepScroll) {
      const panel = activeLyricsPanel();
      if (panel) panel.scrollTop = 0;
    }
  }

  function renderCarousel() {
    showCarousel.textContent = "";
    if (!data.shows.length) return;

    for (const [index, show] of data.shows.entries()) {
      const node = document.createElement("button");
      node.type = "button";
      node.className = "show-card";
      node.dataset.index = String(index);
      node.setAttribute("aria-pressed", index === currentShowIndex() ? "true" : "false");
      node.addEventListener("click", () => {
        if (state.suppressClick) return;
        selectShow(index);
      });
      node.dataset.cover = show.cover;
      node.innerHTML = `
        <span>
          <strong>${escapeHtml(show.title)}</strong>
          <small>${escapeHtml(show.number)} · ${show.songs.length}</small>
        </span>
      `;
      showCarousel.append(node);
    }

    positionCarousel(false);
  }

  function positionCarousel(animate) {
    const cards = Array.from(showCarousel.children);
    const selectedIndex = currentShowIndex();
    const count = data.shows.length;
    const width = showCarousel.clientWidth || 360;
    const height = showCarousel.clientHeight || 200;
    const cardWidth = Math.min(width * 0.82, height * 0.9, 342);
    const spacing = cardWidth * 0.7;

    void animate;

    for (const card of cards) {
      const index = Number(card.dataset.index);
      const relative = relativePosition(index, selectedIndex, count);
      const xOffset = relative * spacing + state.carouselOffset;
      const progress = xOffset / spacing;
      const distance = Math.abs(progress);
      const visible = distance < 2.25;
      const scale = Math.max(0.74, 1 - distance * 0.18);
      const opacity = Math.max(0.38, 1 - distance * 0.3);
      const saturation = Math.max(0.62, 1 - distance * 0.22);
      const blur = distance < 0.22 ? 0 : Math.min(distance * 3.8, 5.8);
      const rotate = -progress * 7;
      const yOffset = distance * 12;

      card.hidden = !visible;
      card.classList.toggle("active", distance < 0.35);
      card.style.width = `${cardWidth}px`;
      card.style.height = `${cardWidth}px`;
      card.style.opacity = String(opacity);
      card.style.filter = `saturate(${saturation}) blur(${blur}px)`;
      card.style.zIndex = String(Math.round(100 - distance * 10));
      card.style.transform = `translate3d(calc(-50% + ${xOffset}px), ${yOffset}px, 0) scale(${scale}) rotateY(${rotate}deg)`;
      if (visible) ensureCardImage(card);
    }
  }

  function ensureCardImage(card) {
    if (card.querySelector("img")) return;
    const cover = card.dataset.cover;
    if (!cover) return;
    const image = document.createElement("img");
    image.src = cover;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    card.prepend(image);
  }

  function renderReader() {
    const show = currentShow();
    if (!show?.songs.length) return;

    reader.style.setProperty("--reader-image", `url("${show.cover}")`);
    songTrack.textContent = "";

    for (const offset of [-1, 0, 1]) {
      const index = wrap(state.songIndex + offset, show.songs.length);
      const song = show.songs[index];
      const slide = document.createElement("article");
      slide.className = `song-slide${offset === 0 ? " active" : ""}`;
      slide.dataset.offset = String(offset);
      slide.innerHTML = `
        <header class="song-header">
          <div>
            <p>${escapeHtml(show.number)} · ${escapeHtml(show.title)}</p>
            <h2>${escapeHtml(song.title)}</h2>
            <p>${index + 1} / ${show.songs.length}</p>
          </div>
          <nav class="song-nav" aria-label="Lieder wechseln">
            <button type="button" data-step="-1" aria-label="Vorheriges Lied">‹</button>
            <button type="button" data-step="1" aria-label="Nächstes Lied">›</button>
          </nav>
        </header>
        <div class="lyrics-panel">
          <pre>${escapeHtml(song.lyrics || "Kein Text vorhanden.")}</pre>
        </div>
      `;
      songTrack.append(slide);
    }

    songTrack.querySelectorAll(".song-nav button").forEach((button) => {
      button.addEventListener("click", () => selectSong(state.songIndex + Number(button.dataset.step)));
    });

    positionSongTrack(false);
  }

  function positionSongTrack(animate) {
    void animate;
    songTrack.style.transform = `translate3d(calc(-100% + ${state.songOffset}px), 0, 0)`;
  }

  function activeLyricsPanel() {
    return songTrack.querySelector(".song-slide.active .lyrics-panel");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll("'", "&#39;");
  }

  function dragStart(event, type) {
    if (event.button !== undefined && event.button !== 0) return;
    if (event.target.closest(".song-nav")) return;

    state.drag = {
      type,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      mode: "",
      moved: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function dragMove(event) {
    const drag = state.drag;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const now = performance.now();
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    const frameDelta = event.clientX - drag.lastX;
    const elapsed = Math.max(1, now - drag.lastTime);
    drag.velocity = frameDelta / elapsed;
    drag.lastX = event.clientX;
    drag.lastTime = now;

    if (!drag.mode) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;
      drag.mode = Math.abs(deltaX) > Math.abs(deltaY) * 1.08 ? "horizontal" : "vertical";
    }

    if (drag.mode !== "horizontal") return;
    if (event.cancelable) event.preventDefault();
    drag.moved = true;

    if (drag.type === "carousel") {
      state.carouselOffset = deltaX;
      positionCarousel(false);
    } else {
      state.songOffset = deltaX;
      positionSongTrack(false);
    }
  }

  function dragEnd(event) {
    const drag = state.drag;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = drag.lastX - drag.startX;
    const horizontal = drag.mode === "horizontal";
    const shouldPage = horizontal && (Math.abs(deltaX) > pageThreshold(drag.type) || Math.abs(drag.velocity) > 0.55);
    const step = shouldPage ? (deltaX < 0 ? 1 : -1) : 0;

    if (drag.type === "carousel" && drag.moved) {
      state.suppressClick = true;
      window.setTimeout(() => {
        state.suppressClick = false;
      }, 250);
    }

    state.drag = null;

    if (drag.type === "carousel") {
      finishCarouselDrag(step);
    } else {
      finishSongDrag(step);
    }
  }

  function dragCancel(event) {
    const drag = state.drag;
    if (!drag || drag.pointerId !== event.pointerId) return;
    state.drag = null;
    if (drag.type === "carousel") finishCarouselDrag(0);
    else finishSongDrag(0);
  }

  function pageThreshold(type) {
    if (type === "carousel") {
      return Math.min(110, Math.max(58, showCarousel.clientWidth * 0.18));
    }
    return Math.min(130, Math.max(62, reader.clientWidth * 0.19));
  }

  function finishCarouselDrag(step) {
    const fromOffset = state.carouselOffset;
    if (!step) {
      animateValue(fromOffset, 0, 380, springEase, (value) => {
        state.carouselOffset = value;
        positionCarousel(false);
      });
      return;
    }

    const selected = currentShowIndex();
    const width = showCarousel.clientWidth || 360;
    const height = showCarousel.clientHeight || 200;
    const cardWidth = Math.min(width * 0.82, height * 0.9, 342);
    const spacing = cardWidth * 0.7;

    selectShow(selected + step);
    state.carouselOffset = fromOffset + step * spacing;
    positionCarousel(false);
    animateValue(state.carouselOffset, 0, 430, springEase, (value) => {
      state.carouselOffset = value;
      positionCarousel(false);
    });
  }

  function finishSongDrag(step) {
    const fromOffset = state.songOffset;
    if (!step) {
      animateValue(fromOffset, 0, 300, easeOutCubic, (value) => {
        state.songOffset = value;
        positionSongTrack(false);
      });
      return;
    }

    const width = reader.clientWidth || 360;
    const target = step > 0 ? -width : width;
    animateValue(fromOffset, target, 260, easeOutCubic, (value) => {
      state.songOffset = value;
      positionSongTrack(false);
    }, () => {
      selectSong(state.songIndex + step);
    });
  }

  function animateValue(from, to, duration, easing, onUpdate, onDone) {
    const start = performance.now();
    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      onUpdate(from + (to - from) * easing(progress));
      if (progress < 1) requestAnimationFrame(frame);
      else onDone?.();
    }
    requestAnimationFrame(frame);
  }

  function springEase(t) {
    return 1 - Math.exp(-6 * t) * Math.cos(10 * t);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  showCarousel.addEventListener("pointerdown", (event) => dragStart(event, "carousel"));
  showCarousel.addEventListener("pointermove", dragMove);
  showCarousel.addEventListener("pointerup", dragEnd);
  showCarousel.addEventListener("pointercancel", dragCancel);
  reader.addEventListener("pointerdown", (event) => dragStart(event, "song"));
  reader.addEventListener("pointermove", dragMove);
  reader.addEventListener("pointerup", dragEnd);
  reader.addEventListener("pointercancel", dragCancel);
  window.addEventListener("resize", () => {
    positionCarousel(false);
    positionSongTrack(false);
  });

  renderCarousel();
  renderReader();
})();
