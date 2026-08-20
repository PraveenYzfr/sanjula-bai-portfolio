(function () {
  "use strict";

  var root = document.documentElement;
  var toggleBtn = document.querySelector(".appearance-toggle");
  var panel = document.getElementById("appearance-panel");
  var closeBtn = panel ? panel.querySelector(".panel-close") : null;
  var resetBtn = document.getElementById("appearance-reset");
  var themeInputs = panel ? panel.querySelectorAll('input[name="sb-theme"]') : [];
  var fontInputs = panel ? panel.querySelectorAll('input[name="sb-font"]') : [];
  var scrollNav = document.getElementById("scroll-nav");

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }
  function storageRemove(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }

  function syncSelections() {
    var theme = root.getAttribute("data-theme");
    var font = root.getAttribute("data-font");
    themeInputs.forEach(function (input) {
      input.checked = input.value === theme;
    });
    fontInputs.forEach(function (input) {
      input.checked = input.value === font;
    });
  }

  function openPanel() {
    if (!panel) return;
    panel.classList.add("is-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    if (scrollNav) scrollNav.classList.add("is-panel-open");
    syncSelections();
  }
  function closePanel() {
    if (!panel) return;
    panel.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    if (scrollNav) scrollNav.classList.remove("is-panel-open");
  }

  if (toggleBtn && panel) {
    toggleBtn.addEventListener("click", function () {
      if (panel.classList.contains("is-open")) {
        closePanel();
      } else {
        openPanel();
      }
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closePanel);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel && panel.classList.contains("is-open")) {
      closePanel();
      toggleBtn.focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (!panel || !panel.classList.contains("is-open")) return;
    if (panel.contains(e.target) || (toggleBtn && toggleBtn.contains(e.target))) return;
    closePanel();
  });

  themeInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      if (input.checked) {
        root.setAttribute("data-theme", input.value);
        storageSet("sb-theme", input.value);
      }
    });
  });
  fontInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      if (input.checked) {
        root.setAttribute("data-font", input.value);
        storageSet("sb-font", input.value);
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      root.removeAttribute("data-theme");
      root.removeAttribute("data-font");
      storageRemove("sb-theme");
      storageRemove("sb-font");
      syncSelections();
    });
  }

  syncSelections();

  function disableResumeLinks() {
    document.querySelectorAll("[data-resume-link]").forEach(function (link) {
      link.classList.add("is-disabled");
      link.setAttribute("aria-disabled", "true");
      link.title = "Résumé download is currently unavailable";
      link.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
    var hint = document.querySelector("[data-resume-hint]");
    if (hint) hint.textContent = "Currently unavailable";
  }

  // Site-wide settings: admin-set default theme/font (a visitor's own
  // choice always wins over this) and whether résumé download is enabled
  // (applies to every visitor equally — not something to personally override).
  fetch("/api/appearance", { cache: "no-store" })
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) {
      if (!data) return;
      if (!storageGet("sb-theme") && data.theme) {
        root.setAttribute("data-theme", data.theme);
      }
      if (!storageGet("sb-font") && data.font) {
        root.setAttribute("data-font", data.font);
      }
      syncSelections();
      if (data.resumeDownloadEnabled === false) {
        disableResumeLinks();
      }
    })
    .catch(function () {});
})();
