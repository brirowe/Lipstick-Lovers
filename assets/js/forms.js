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
    const btnText = btn.textContent;

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
          showError("Please pick at least one option for: " + g.querySelector("span").textContent.replace("*", "").trim());
          return;
        }
      }

      if (!endpoint) {
        showError("Not connected to the Google Sheet yet, so nothing was submitted.");
        return;
      }

      // Collect answers. Multiple checkboxes become "A, B, C".
      const data = { form: form.dataset.form };
      new FormData(form).forEach(function (v, k) {
        v = String(v).trim();
        data[k] = data[k] ? data[k] + ", " + v : v;
      });

      btn.disabled = true;
      btn.textContent = "Sending...";

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (out) {
          if (!out.ok) {
            showError(out.error || "Something went wrong. Please try again.");
            return;
          }
          form.hidden = true;
          done.hidden = false;
          done.scrollIntoView({ behavior: "smooth", block: "center" });
        })
        .catch(function () {
          showError("Couldn't reach the server. Check your connection and try again.");
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = btnText;
        });
    });
  });
})();
