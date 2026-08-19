(function () {
  "use strict";

  var root = document.documentElement;
  var toggleBtn = document.querySelector(".appearance-toggle");
  var panel = document.getElementById("appearance-panel");
  var closeBtn = panel ? panel.querySelector(".panel-close") : null;
  var resetBtn = document.getElementById("appearance-reset");
  var themeInputs = panel ? panel.querySelectorAll('input[name="sb-theme"]') : [];
  var fontInputs = panel ? panel.querySelectorAll('input[name="sb-font"]') : [];

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
    syncSelections();
  }
  function closePanel() {
    if (!panel) return;
    panel.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
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
})();
