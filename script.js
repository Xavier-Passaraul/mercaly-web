// Faro Software · site behavior
(function () {
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var notice = document.getElementById("form-notice");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("field-name").value.trim();
      notice.textContent =
        "Gracias" + (name ? ", " + name : "") +
        ". Este formulario es de demostración y no envía el mensaje a ningún servidor.";
      notice.classList.remove("form__notice--visible");
      void notice.offsetWidth; // restarts the animation if the form is sent again
      notice.classList.add("form__notice--visible");
      form.reset();
    });
  }

  /* ---------- Mobile navigation menu (Hamburger) ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  var siteHeader = document.getElementById("main-header");

  if (navToggle && mainNav && siteHeader) {
    function toggleNav() {
      var isOpen = siteHeader.classList.toggle("site-header--menu-open");
      siteHeader.classList.toggle("hero-topbar--menu-open", isOpen);
      siteHeader.classList.toggle("menu-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
      );
    }

    function closeNav() {
      siteHeader.classList.remove("site-header--menu-open", "hero-topbar--menu-open", "menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú de navegación");
    }

    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleNav();
    });

    Array.prototype.forEach.call(mainNav.querySelectorAll("a"), function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (e) {
      if (!siteHeader.contains(e.target)) {
        closeNav();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeNav();
      }
    });
  }

  if (reduceMotion) return;

  /* ---------- Header that shrinks on scroll ---------- */
  var header = document.getElementById("main-header");
  function onScroll() {
    if (header) header.classList.toggle("site-header--compact", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!("IntersectionObserver" in window)) return;

  /* ---------- Staggered reveal on scroll ---------- */
  document.documentElement.classList.add("js-motion");

  var selectors = [
    ".bento-grid > *",
    ".section__header",
    ".guarantee-strip .seal",
    ".final-cta",
    ".faq-item",
    ".site-footer"
  ];
  var targets = [];
  selectors.forEach(function (selector) {
    var siblings = {};
    Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
      if (el.matches(".section--first > .section__header")) return; // carries the top gradient band
      var parent = el.parentElement;
      var key = parent ? (parent.id || parent.className) : "root";
      siblings[key] = (siblings[key] || 0) + 1;
      el.style.setProperty("--delay", Math.min(siblings[key] - 1, 6) * 80 + "ms");
      el.classList.add("reveal");
      targets.push(el);
    });
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("reveal--visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  targets.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Numbers that count up from zero ---------- */
  function countUp(el) {
    var parts = /^(\d+)(.*)$/.exec(el.textContent.trim());
    if (!parts) return;
    var goal = parseInt(parts[1], 10);
    var suffix = parts[2];
    var duration = 1300;
    var start = null;
    function step(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(goal * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    el.textContent = "0" + suffix;
    requestAnimationFrame(step);
  }
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      statsObserver.unobserve(entry.target);
      countUp(entry.target);
    });
  }, { threshold: 0.6 });
  Array.prototype.forEach.call(
    document.querySelectorAll(".stat__number, .project-panel__figure"),
    function (el) { statsObserver.observe(el); }
  );
})();
