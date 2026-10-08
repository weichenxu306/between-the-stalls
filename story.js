(() => {
  "use strict";

  function initializeStory() {
    const root = document.documentElement;
    const story = document.getElementById("storyRun");
    const stage = story?.querySelector(".story-stage");
    const scenes = story ? Array.from(story.querySelectorAll(".story-scene[data-scene]")) : [];
    const scenePhotos = story ? Array.from(story.querySelectorAll("#scenePhoto .scene-image[data-photo], #scenePhoto .scene-caption[data-photo]")) : [];
    const chapterButtons = Array.from(document.querySelectorAll("[data-story-jump]"));
    const motionButton = document.getElementById("motionToggle");
    const readingProgress = document.getElementById("readingProgress");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobilePreference = window.matchMedia("(max-width: 768px)");
    const chapterPositions = [0, 0.22, 0.45, 0.68, 0.91];
    const validSceneIndex = index => Number.isInteger(index) && index >= 0 && index < scenes.length && index < chapterPositions.length;
    const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
    const range = (value, start, end) => clamp((value - start) / (end - start));
    let savedMotion = null;
    let reducedMotion = motionPreference.matches;
    let storyVisible = false;
    let frame = 0;
    let chapterFrame = 0;

    try {
      savedMotion = window.localStorage.getItem("market-research-motion");
      if (savedMotion === "reduced" || savedMotion === "full") reducedMotion = savedMotion === "reduced";
    } catch {
      // The motion preference remains usable when browser storage is unavailable.
    }

    function updateMotionLabel() {
      if (!motionButton) return;
      motionButton.dataset.zh = reducedMotion ? "开启动效" : "减少动态";
      motionButton.dataset.en = reducedMotion ? "Enable Motion" : "Reduce Motion";
      motionButton.textContent = root.lang.startsWith("zh") ? motionButton.dataset.zh : motionButton.dataset.en;
      motionButton.setAttribute("aria-pressed", String(reducedMotion));
      motionButton.setAttribute("aria-label", motionButton.textContent);
    }

    function storyGeometry() {
      const rectangle = story.getBoundingClientRect();
      const stageHeight = stage ? stage.clientHeight : window.innerHeight;
      return {
        top: rectangle.top + window.scrollY,
        distance: Math.max(1, rectangle.height - stageHeight)
      };
    }

    function setChapterState(active) {
      chapterButtons.forEach(button => {
        const selected = Number(button.dataset.storyJump) === active;
        button.classList.toggle("is-active", selected);
        if (button.tagName === "BUTTON") button.setAttribute("aria-pressed", String(selected));
        else button.removeAttribute("aria-pressed");
        if (selected) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
    }

    function renderStory() {
      if (!story || reducedMotion || !storyVisible) return;
      const geometry = storyGeometry();
      const progress = clamp((window.scrollY - geometry.top) / geometry.distance);
      const keyframes = mobilePreference.matches
        ? [
          { at: 0, x: 0, y: 0, w: 100, h: 100, radius: 0, dim: 0.32 },
          { at: 0.16, x: 10, y: 48, w: 80, h: 38, radius: 4, dim: 0.04 },
          { at: 0.29, x: 10, y: 48, w: 80, h: 38, radius: 4, dim: 0.04 },
          { at: 0.36, x: 10, y: 54, w: 80, h: 30, radius: 4, dim: 0.04 },
          { at: 0.52, x: 10, y: 54, w: 80, h: 30, radius: 4, dim: 0.04 },
          { at: 0.59, x: 10, y: 54, w: 80, h: 30, radius: 4, dim: 0.04 },
          { at: 0.75, x: 10, y: 54, w: 80, h: 30, radius: 4, dim: 0.04 },
          { at: 0.83, x: 6, y: 28, w: 88, h: 22, radius: 4, dim: 0.04 },
          { at: 1, x: 6, y: 28, w: 88, h: 22, radius: 4, dim: 0.04 }
        ]
        : [
          { at: 0, x: 0, y: 0, w: 100, h: 100, radius: 0, dim: 0.32 },
          { at: 0.16, x: 51, y: 20, w: 43, h: 65, radius: 4, dim: 0.04 },
          { at: 0.29, x: 51, y: 20, w: 43, h: 65, radius: 4, dim: 0.04 },
          { at: 0.36, x: 6, y: 21, w: 42, h: 64, radius: 4, dim: 0.04 },
          { at: 0.52, x: 6, y: 21, w: 42, h: 64, radius: 4, dim: 0.04 },
          { at: 0.59, x: 51, y: 20, w: 43, h: 65, radius: 4, dim: 0.04 },
          { at: 0.75, x: 51, y: 20, w: 43, h: 65, radius: 4, dim: 0.04 },
          { at: 0.83, x: 40, y: 34, w: 20, h: 36, radius: 4, dim: 0.08 },
          { at: 1, x: 40, y: 34, w: 20, h: 36, radius: 4, dim: 0.08 }
        ];
      const nextFrame = keyframes.findIndex(keyframe => keyframe.at > progress);
      const segment = nextFrame < 0 ? keyframes.length - 2 : Math.max(0, nextFrame - 1);
      const from = keyframes[segment];
      const to = keyframes[segment + 1];
      const blend = range(progress, from.at, to.at);
      const propertyNames = { x: "x", y: "y", w: "w", h: "h", radius: "radius", dim: "dim" };
      Object.entries(propertyNames).forEach(([key, property]) => {
        const value = from[key] + (to[key] - from[key]) * blend;
        const unit = key === "radius" ? "px" : key === "dim" ? "" : "%";
        story.style.setProperty(`--photo-${property}`, `${value.toFixed(4)}${unit}`);
      });

      const opacity = [
        1 - range(progress, 0.08, 0.15),
        range(progress, 0.10, 0.16) * (1 - range(progress, 0.29, 0.34)),
        range(progress, 0.30, 0.36) * (1 - range(progress, 0.52, 0.57)),
        range(progress, 0.53, 0.59) * (1 - range(progress, 0.75, 0.80)),
        range(progress, 0.76, 0.83)
      ];
      const boundaries = [0.15, 0.34, 0.57, 0.80];
      const nextScene = boundaries.findIndex(boundary => progress < boundary);
      const active = nextScene < 0 ? scenes.length - 1 : nextScene;
      const consumerPhoto = range(progress, 0.30, 0.36);
      const merchantPhoto = range(progress, 0.53, 0.59);
      const frameworkPhoto = range(progress, 0.76, 0.83);
      const photoOpacity = [
        1 - consumerPhoto + frameworkPhoto,
        consumerPhoto * (1 - merchantPhoto),
        merchantPhoto * (1 - frameworkPhoto)
      ];
      const activePhoto = photoOpacity.indexOf(Math.max(...photoOpacity));
      photoOpacity.forEach((value, index) => story.style.setProperty(`--photo-${index}`, value.toFixed(5)));
      scenePhotos.forEach(photo => photo.setAttribute("aria-hidden", String(Number(photo.dataset.photo) !== activePhoto)));
      story.style.setProperty("--story-progress", progress.toFixed(5));
      story.style.setProperty("--scene-line", range(progress, 0.83, 0.96).toFixed(5));
      story.dataset.activeScene = String(active);
      opacity.forEach((value, index) => story.style.setProperty(`--scene-${index}`, value.toFixed(5)));
      scenes.forEach(scene => {
        const index = Number(scene.dataset.scene);
        const hidden = index !== active || opacity[index] < 0.2;
        if (hidden && scene.contains(document.activeElement)) {
          const chapter = chapterButtons.find(button => button.tagName === "BUTTON" && Number(button.dataset.storyJump) === active && !scene.contains(button));
          chapter?.focus({ preventScroll: true });
        }
        scene.inert = hidden;
        scene.setAttribute("aria-hidden", String(hidden));
      });
      setChapterState(active);
    }

    function updateFrame() {
      frame = 0;
      if (document.hidden) return;
      if (readingProgress) {
        const distance = Math.max(1, root.scrollHeight - window.innerHeight);
        const progress = clamp(window.scrollY / distance);
        readingProgress.style.transform = `scaleX(${progress.toFixed(5)})`;
        if (readingProgress.getAttribute("role") === "progressbar") {
          readingProgress.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
        }
      }
      renderStory();
    }

    function requestUpdate() {
      if (!frame && !document.hidden) frame = window.requestAnimationFrame(updateFrame);
    }

    function cancelChapterScroll() {
      window.cancelAnimationFrame(chapterFrame);
      chapterFrame = 0;
    }

    function animateChapterScroll(top) {
      cancelChapterScroll();
      const start = window.scrollY;
      const destination = clamp(top, 0, Math.max(0, root.scrollHeight - window.innerHeight));
      const distance = destination - start;
      if (Math.abs(distance) < 2) return;
      const duration = clamp(1100 + Math.abs(distance) / window.innerHeight * 160, 1100, 1650);
      const startedAt = performance.now();

      function advance(now) {
        if (document.hidden || reducedMotion) {
          cancelChapterScroll();
          return;
        }
        const progress = clamp((now - startedAt) / duration);
        const eased = (1 - Math.cos(Math.PI * progress)) / 2;
        // Each frame sets the position directly; CSS smooth scrolling must not add a second animation.
        window.scrollTo({ top: start + distance * eased, behavior: "instant" });
        requestUpdate();
        chapterFrame = progress < 1 ? window.requestAnimationFrame(advance) : 0;
      }

      chapterFrame = window.requestAnimationFrame(advance);
    }

    function applyMotionPreference() {
      cancelChapterScroll();
      root.classList.toggle("is-reduced-motion", reducedMotion);
      root.dataset.motion = reducedMotion ? "reduced" : "full";
      updateMotionLabel();
      if (reducedMotion) {
        scenePhotos.forEach(photo => photo.setAttribute("aria-hidden", String(photo.dataset.photo !== "0")));
        scenes.forEach(scene => {
          scene.inert = false;
          scene.removeAttribute("aria-hidden");
          story.style.setProperty(`--scene-${scene.dataset.scene}`, "1");
        });
        document.querySelectorAll(".reveal").forEach(element => element.classList.add("is-visible"));
      } else if (story) {
        const rectangle = story.getBoundingClientRect();
        storyVisible = rectangle.bottom > 0 && rectangle.top < window.innerHeight;
        if (!storyVisible) {
          const active = rectangle.bottom <= 0 ? scenes.length - 1 : 0;
          scenes.forEach(scene => {
            const hidden = Number(scene.dataset.scene) !== active;
            scene.inert = hidden;
            scene.setAttribute("aria-hidden", String(hidden));
          });
        }
      }
      requestUpdate();
    }

    function anchorOffset(target) {
      const targetStyle = getComputedStyle(target);
      const scrollMargin = parseFloat(targetStyle.scrollMarginTop) || 0;
      const header = document.querySelector(".site-header");
      const headerHeight = header?.getBoundingClientRect().height || 0;
      return Math.max(scrollMargin, headerHeight + 16);
    }

    function scrollToElement(target, behavior) {
      const top = target.getBoundingClientRect().top + window.scrollY - anchorOffset(target);
      window.scrollTo({ top: Math.max(0, top), behavior });
    }

    function hashTarget(hash) {
      if (!hash || hash === "#") return null;
      try {
        return document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return null;
      }
    }

    function openArchive(target) {
      if (!target) return false;
      let panel = target.closest("details.archive-panel");
      if (!panel) return false;
      while (panel) {
        panel.open = true;
        panel = panel.parentElement?.closest("details") || null;
      }
      requestUpdate();
      return true;
    }

    function focusArchive(target) {
      const panel = target.closest("details.archive-panel");
      if (!panel) return;
      const summary = Array.from(panel.children).find(element => element.tagName === "SUMMARY");
      if (summary) summary.focus({ preventScroll: true });
    }

    function storyIndex(target) {
      const scene = target?.closest(".story-scene[data-scene]");
      if (!scene || !story?.contains(scene)) return null;
      const index = Number(scene.dataset.scene);
      return validSceneIndex(index) ? index : null;
    }

    function navigateStory(index, behavior = "smooth") {
      if (!story || !validSceneIndex(index)) return;
      cancelChapterScroll();
      if (reducedMotion) {
        const scene = scenes.find(panel => Number(panel.dataset.scene) === index);
        if (scene) scrollToElement(scene, "auto");
        setChapterState(index);
      } else {
        const geometry = storyGeometry();
        const top = geometry.top + geometry.distance * chapterPositions[index];
        if (behavior === "smooth") animateChapterScroll(top);
        else window.scrollTo({ top, behavior: "instant" });
      }
      requestUpdate();
    }

    function restoreHash() {
      cancelChapterScroll();
      const target = hashTarget(window.location.hash);
      const index = storyIndex(target);
      if (index !== null) requestAnimationFrame(() => navigateStory(index, "auto"));
      else if (openArchive(target)) requestAnimationFrame(() => scrollToElement(target, "auto"));
    }

    chapterButtons.forEach(button => {
      button.addEventListener("click", event => {
        if (!story) return;
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const index = Number(button.dataset.storyJump);
        if (!validSceneIndex(index)) return;
        event.preventDefault();
        if (button.tagName === "A") {
          const destination = new URL(button.href, window.location.href);
          if (destination.hash && window.location.hash !== destination.hash) window.history.pushState(null, "", destination.hash);
        }
        navigateStory(index);
      });
    });

    motionButton?.addEventListener("click", () => {
      reducedMotion = !reducedMotion;
      savedMotion = reducedMotion ? "reduced" : "full";
      try {
        window.localStorage.setItem("market-research-motion", savedMotion);
      } catch {
        // The current session still honors the user's choice.
      }
      applyMotionPreference();
    });
    motionPreference.addEventListener("change", event => {
      if (savedMotion !== "reduced" && savedMotion !== "full") {
        reducedMotion = event.matches;
        applyMotionPreference();
      }
    });
    mobilePreference.addEventListener("change", requestUpdate);

    document.addEventListener("click", event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      let destination;
      try {
        destination = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || destination.search !== window.location.search) return;
      const target = hashTarget(destination.hash);
      const index = storyIndex(target);
      if (index !== null) {
        event.preventDefault();
        if (window.location.hash !== destination.hash) window.history.pushState(null, "", destination.hash);
        navigateStory(index);
        return;
      }
      if (!openArchive(target)) return;
      event.preventDefault();
      if (window.location.hash !== destination.hash) window.history.pushState(null, "", destination.hash);
      requestAnimationFrame(() => {
        focusArchive(target);
        scrollToElement(target, reducedMotion ? "auto" : "smooth");
      });
    });

    if ("IntersectionObserver" in window) {
      if (story) {
        new IntersectionObserver(entries => {
          storyVisible = entries.some(entry => entry.isIntersecting);
          if (storyVisible) requestUpdate();
        }, { threshold: 0 }).observe(story);
      }
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
      document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
    } else {
      storyVisible = Boolean(story);
      document.querySelectorAll(".reveal").forEach(element => element.classList.add("is-visible"));
    }

    new MutationObserver(updateMotionLabel).observe(root, { attributes: true, attributeFilter: ["lang"] });
    if ("ResizeObserver" in window) new ResizeObserver(requestUpdate).observe(document.body);
    document.addEventListener("wheel", cancelChapterScroll, { passive: true });
    document.addEventListener("touchstart", cancelChapterScroll, { passive: true });
    document.addEventListener("pointerdown", cancelChapterScroll, { passive: true });
    document.addEventListener("click", cancelChapterScroll, true);
    document.addEventListener("keydown", event => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Escape", "Tab"].includes(event.key)) cancelChapterScroll();
    });
    document.addEventListener("scroll", requestUpdate, { passive: true });
    document.addEventListener("toggle", requestUpdate, true);
    window.addEventListener("resize", () => {
      cancelChapterScroll();
      requestUpdate();
    }, { passive: true });
    window.addEventListener("hashchange", restoreHash);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelChapterScroll();
        cancelAnimationFrame(frame);
        frame = 0;
      } else requestUpdate();
    });

    applyMotionPreference();
    restoreHash();
    requestUpdate();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeStory, { once: true });
  else initializeStory();
})();
