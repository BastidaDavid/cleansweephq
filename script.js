/*
  Quote form configuration:
  Formspree handles form delivery. Do not place API keys or private credentials in this file.
*/
const QUOTE_ENDPOINT = "https://formspree.io/f/FORM_ID_HERE";

(() => {
  const businessPhone = "(661) 618-8375";
  const businessEmail = "info@cleansweephq.com";
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("#primary-navigation");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    nav.classList.remove("is-open");
  };

  const openMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    nav.classList.add("is-open");
  };

  document.querySelectorAll("[data-logo]").forEach((logo) => {
    const fallback = logo.nextElementSibling;
    const showFallback = () => {
      logo.hidden = true;
      if (fallback) fallback.hidden = false;
    };
    logo.addEventListener("error", showFallback);
    if (logo.complete && logo.naturalWidth === 0) showFallback();
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu();
      else openMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || menuToggle.contains(event.target)) return;
      closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) closeMenu();
    });
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeMenu();

      const headerOffset = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;

      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });

      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      window.setTimeout(() => target.focus({ preventScroll: true }), reducedMotion ? 0 : 280);
    });
  });

  document.querySelectorAll(".copyright-year").forEach((target) => {
    target.textContent = new Date().getFullYear();
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
  }

  document.querySelectorAll("video[data-video-start], video[data-video-end]").forEach((video) => {
    const start = Number.parseFloat(video.dataset.videoStart || "0");
    const end = Number.parseFloat(video.dataset.videoEnd || "");
    const hasStart = Number.isFinite(start) && start > 0;
    const hasEnd = Number.isFinite(end) && end > (hasStart ? start : 0);

    const seekToStart = () => {
      if (!hasStart || video.currentTime >= start - 0.08) return;
      try {
        video.currentTime = start;
      } catch (error) {
        // Some browsers block seeking until more metadata is available.
      }
    };

    if (video.readyState >= 1) seekToStart();
    else video.addEventListener("loadedmetadata", seekToStart, { once: true });

    if (!hasEnd) return;

    video.addEventListener("timeupdate", () => {
      if (video.currentTime < end) return;

      try {
        video.currentTime = hasStart ? start : 0;
      } catch (error) {
        return;
      }

      const replayAttempt = video.play();
      if (replayAttempt && typeof replayAttempt.catch === "function") {
        replayAttempt.catch(() => {});
      }
    });
  });

  document.querySelectorAll("[data-hero-video]").forEach((video) => {
    const hero = video.closest(".video-hero");
    if (!hero) return;

    let playbackBlocked = false;

    const markReady = () => {
      if (playbackBlocked) return;
      hero.classList.add("is-video-ready");
      hero.classList.remove("is-video-fallback");
    };

    const markFallback = () => {
      playbackBlocked = true;
      hero.classList.add("is-video-fallback");
      hero.classList.remove("is-video-ready");
    };

    const markReadyIfPlaying = () => {
      if (!video.paused) markReady();
    };

    video.addEventListener("loadeddata", markReadyIfPlaying, { once: true });
    video.addEventListener("canplay", markReadyIfPlaying, { once: true });
    video.addEventListener("playing", markReady, { once: true });
    video.addEventListener("error", markFallback);

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.then(markReady).catch(markFallback);
    } else {
      markReadyIfPlaying();
    }
  });

  const setStatus = (statusElement, message, type) => {
    if (!statusElement) return;
    statusElement.textContent = message;
    statusElement.className = "form-status";
    if (type) statusElement.classList.add(`is-${type}`);
  };

  document.querySelectorAll(".quote-form").forEach((form) => {
    const formStatus = form.querySelector(".form-status");

    form.addEventListener("input", () => {
      if (form.classList.contains("was-submitted") && form.checkValidity()) {
        setStatus(formStatus, "", "");
      }
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      form.classList.add("was-submitted");

      if (!form.checkValidity()) {
        setStatus(formStatus, "Please complete the required fields before requesting a quote.", "error");
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.reportValidity();
        }
        return;
      }

      if (!QUOTE_ENDPOINT) {
        setStatus(
          formStatus,
          `This quote form is not connected yet. Please call ${businessPhone} to complete your request.`,
          "warning"
        );
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.textContent : "";
      const endpoint = form.getAttribute("action") || QUOTE_ENDPOINT;
      const honeypot = form.querySelector('input[name="_gotcha"]');

      if (honeypot && honeypot.value) {
        form.reset();
        form.classList.remove("was-submitted");
        setStatus(
          formStatus,
          "Thank you! Your quote request has been sent. The Clean Sweep team will contact you shortly.",
          "success"
        );
        return;
      }

      try {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending...";
        }

        const response = await fetch(endpoint, {
          method: form.method || "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error("Quote endpoint returned an error.");

        setStatus(
          formStatus,
          "Thank you! Your quote request has been sent. The Clean Sweep team will contact you shortly.",
          "success"
        );
        form.reset();
        form.classList.remove("was-submitted");
      } catch (error) {
        setStatus(
          formStatus,
          `Sorry, we could not send your request. Please call ${businessPhone} or email ${businessEmail}.`,
          "error"
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  });
})();
