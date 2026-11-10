// ==========================================================
// Simple forms (season feedback, volunteer): sends answers to
// the same Google Apps Script as registration, into their own tab.
// ==========================================================
(function () {
  document.querySelectorAll(".js-simple-form").forEach(function (form) {
    const endpoint = form.dataset.endpoint;
    const errorBox = form.querySelector(".js-error");
    const done = form.nextElementSibling;
    const btn = form.querySelector('button[type="submit"]');
    const btnEn = btn.dataset.en || btn.textContent;
    // T("English", "Español") picks the current language (see lang.js)
    function T(en, es) { return window.L ? window.L(en, es) : en; }

    function showError(msg) {
      errorBox.textContent = msg || "";
      errorBox.hidden = !msg;
      if (msg) errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showError("");

      // Checkbox groups that need at least one pick
      const groups = form.querySelectorAll("[data-required-group]");
      for (const g of groups) {
        if (!g.querySelector("input:checked")) {
          showError(T("Please pick at least one option for: ", "Elige al menos una opción para: ") + g.querySelector("span").textContent.replace("*", "").trim());
          return;
        }
      }

      if (!endpoint) {
        showError(T("Not connected to the Google Sheet yet, so nothing was submitted.", "Aún no está conectado a la hoja de Google, así que no se envió nada."));
        return;
      }

      // Collect answers. Multiple checkboxes become "A, B, C".
      const data = { form: form.dataset.form };
      new FormData(form).forEach(function (v, k) {
        v = String(v).trim();
        data[k] = data[k] ? data[k] + ", " + v : v;
      });

      btn.disabled = true;
      btn.textContent = T("Sending...", "Enviando...");

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (out) {
          if (!out.ok) {
            showError(out.error || T("Something went wrong. Please try again.", "Algo salió mal. Inténtalo de nuevo."));
            return;
          }
          form.hidden = true;
          done.hidden = false;
          done.scrollIntoView({ behavior: "smooth", block: "center" });
        })
        .catch(function () {
          showError(T("Couldn't reach the server. Check your connection and try again.", "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo."));
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = T(btn.dataset.en || btnEn, btn.dataset.es || btnEn);
        });
    });
  });
})();
