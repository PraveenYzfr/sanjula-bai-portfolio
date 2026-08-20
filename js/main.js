(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var scrollNav = document.getElementById("scroll-nav");
  var scrollTopBtn = document.getElementById("scroll-top-btn");
  var scrollBottomBtn = document.getElementById("scroll-bottom-btn");
  var contactSection = document.getElementById("contact");

  if (scrollNav && scrollTopBtn && scrollBottomBtn) {
    function updateScrollNav() {
      var scrollY = window.scrollY || window.pageYOffset;
      var doc = document.documentElement;
      var atTop = scrollY < 200;
      var atBottom = scrollY + window.innerHeight >= doc.scrollHeight - 40;

      scrollTopBtn.classList.toggle("is-hidden", atTop);
      scrollBottomBtn.classList.toggle("is-hidden", atBottom);
    }

    window.addEventListener("scroll", updateScrollNav, { passive: true });
    window.addEventListener("resize", updateScrollNav);
    updateScrollNav();

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    scrollBottomBtn.addEventListener("click", function () {
      var target = contactSection || document.body;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
