// ==========================================================
// English / Spanish switch for the forms.
// Any element with data-es="..." swaps its text to Spanish.
// Inputs with data-es-placeholder swap their placeholder.
// Answer values never change, so the Sheet always gets English.
// ==========================================================
(function () {
  const KEY = "dll-lang";

  window.dllLang = function () {
    return document.documentElement.lang === "es" ? "es" : "en";
  };
  // L("English", "Español") returns the one for the current language
  window.L = function (en, es) {
    return window.dllLang() === "es" ? es : en;
  };

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-es]").forEach(function (el) {
      if (el.dataset.en == null) el.dataset.en = el.textContent;
      el.textContent = lang === "es" ? el.dataset.es : el.dataset.en;
    });

    document.querySelectorAll("[data-es-placeholder]").forEach(function (el) {
      if (el.dataset.enPlaceholder == null) el.dataset.enPlaceholder = el.placeholder;
      el.placeholder = lang === "es" ? el.dataset.esPlaceholder : el.dataset.enPlaceholder;
    });

    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });

    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }

  document.querySelectorAll(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.dataset.lang); });
  });

  // Remember the last choice on this device
  let saved = "en";
  try { saved = localStorage.getItem(KEY) || "en"; } catch (e) {}
  if (saved === "es") apply("es");
})();
