// ==========================================================
// Registration form: loads live team spots from the Google
// Apps Script, then sends the form to it on submit.
// ==========================================================
(function () {
  const form = document.getElementById("reg-form");
  if (!form) return;

  const endpoint = form.dataset.endpoint;
  const teamList = document.getElementById("team-list");
  const errorBox = document.getElementById("reg-error");
  const submitBtn = form.querySelector('button[type="submit"]');
  const done = document.getElementById("reg-done");
  const NO_PREF = "No preference";
  const BTN_TEXT = submitBtn.textContent;

  // ----- Helpers -----
  function showError(msg) {
    errorBox.textContent = msg || "";
    errorBox.hidden = !msg;
    if (msg) errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // ----- Team cards -----
  function teamCard(t, selected) {
    const full = t.left <= 0;
    const card = el("label", "team-card" + (full ? " is-full" : ""));
    if (t.color) card.style.setProperty("--c", t.color);

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "team";
    input.value = t.name;
    input.required = true;
    input.disabled = full;
    input.checked = !full && selected === t.name;
    card.appendChild(input);

    card.appendChild(el("span", "team-name", t.name));
    if (t.description) card.appendChild(el("span", "team-desc", t.description));

    const bar = el("span", "team-bar");
    const fill = el("span");
    fill.style.width = (t.max ? Math.min(100, Math.round((t.taken / t.max) * 100)) : 0) + "%";
    bar.appendChild(fill);
    card.appendChild(bar);

    const leftText = t.left + " of " + t.max + " spot" + (t.max === 1 ? "" : "s") + " left";
    card.appendChild(el("span", "team-left", leftText));
    return card;
  }

  function noPrefCard(selected) {
    const card = el("label", "team-card no-pref");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "team";
    input.value = NO_PREF;
    input.checked = selected === NO_PREF;
    card.appendChild(input);
    card.appendChild(el("span", "team-name", NO_PREF));
    card.appendChild(el("span", "team-desc", "Put me wherever there's room"));
    return card;
  }

  function renderTeams(teams) {
    const checked = form.querySelector('input[name="team"]:checked');
    const selected = checked ? checked.value : null;
    teamList.innerHTML = "";
    teams.forEach(function (t) { teamList.appendChild(teamCard(t, selected)); });
    teamList.appendChild(noPrefCard(selected));
  }

  // ----- Load spots -----
  function loadTeams() {
    return fetch(endpoint)
      .then(function (r) { return r.json(); })
      .then(function (out) {
        if (!out.ok) throw new Error(out.error);
        renderTeams(out.teams);
      })
      .catch(function () {
        teamList.innerHTML = "";
        teamList.appendChild(el("p", "reg-error", "Couldn't load teams. Refresh the page to try again."));
      });
  }

  // ----- Birthday: auto-add slashes as MM/DD/YYYY -----
  const bday = document.getElementById("birthday");
  if (bday) {
    bday.addEventListener("input", function () {
      const d = bday.value.replace(/\D/g, "").slice(0, 8);
      let out = d.slice(0, 2);
      if (d.length > 2) out += "/" + d.slice(2, 4);
      if (d.length > 4) out += "/" + d.slice(4);
      bday.value = out;
    });
  }

  // ----- Payment: show method/Venmo fields only when needed -----
  const payMethod = document.getElementById("pay-method");
  const payCash = document.getElementById("pay-cash");
  const payVenmo = document.getElementById("pay-venmo");
  const venmoInput = form.querySelector('input[name="venmo_username"]');
  const methodInputs = form.querySelectorAll('input[name="payment_method"]');
  const amountInput = document.getElementById("payment_amount");
  const venmoAmount = document.getElementById("pay-venmo-amount");

  function updatePayment() {
    const tier = form.querySelector('input[name="payment_tier"]:checked');
    const amount = tier ? Number(tier.dataset.amount) : null;
    const needsMethod = amount !== null && amount > 0;
    const method = (form.querySelector('input[name="payment_method"]:checked') || {}).value;

    amountInput.value = amount === null ? "" : "$" + amount;
    payMethod.hidden = !needsMethod;
    methodInputs.forEach(function (i) { i.required = needsMethod; });

    const venmo = needsMethod && method === "Venmo";
    payVenmo.hidden = !venmo;
    venmoInput.required = venmo;
    payCash.hidden = !(needsMethod && method === "Cash");
    if (venmo) venmoAmount.textContent = "$" + amount;
  }
  form.addEventListener("change", function (e) {
    if (e.target.name === "payment_tier" || e.target.name === "payment_method") updatePayment();
  });
  updatePayment();

  // Preview mode (registration closed) or not connected yet: sample teams, no submitting
  if (form.dataset.preview || !endpoint) {
    renderTeams((window.REG.previewTeams || []).map(function (t) {
      return { name: t.name, color: t.color, max: 12, taken: 0, left: 12, description: "" };
    }));
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showError("Preview only. Registration isn't open yet, so nothing was submitted.");
    }, true);
    return;
  }

  loadTeams();
  // Refresh spots when someone comes back to the tab
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && !form.hidden) loadTeams();
  });

  // ----- Submit -----
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    showError("");

    const fd = new FormData(form);
    const positions = fd.getAll("position");
    if (!positions.length) {
      showError("Pick at least one preferred position.");
      return;
    }
    const games = fd.getAll("games");
    if (!games.length) {
      showError("Pick at least one game you can attend.");
      return;
    }

    const data = {};
    fd.forEach(function (v, k) {
      if (k !== "games" && k !== "position") data[k] = String(v).trim();
    });
    data.games = games.join(", ");
    data.position = positions.join(", ");

    // Drop payment fields that don't apply (e.g. Venmo name typed, then switched to Cash)
    if (payMethod.hidden) data.payment_method = "";
    if (payVenmo.hidden) data.venmo_username = "";

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    // text/plain avoids a CORS preflight, which Apps Script can't answer
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json(); })
      .then(function (out) {
        if (out.teams) renderTeams(out.teams);
        if (!out.ok) {
          showError(out.error || "Something went wrong. Please try again.");
          return;
        }
        document.getElementById("reg-done-team").textContent = data.team;
        let payMsg = "";
        if (data.payment_method === "Venmo") {
          payMsg = "Please send " + data.payment_amount + " on Venmo to " + window.REG.venmoHandle + ".";
        } else if (data.payment_method === "Cash") {
          payMsg = "Payment: " + data.payment_amount + " cash. " + window.REG.cashNote;
        }
        document.getElementById("reg-done-pay").textContent = payMsg;
        form.hidden = true;
        done.hidden = false;
        done.scrollIntoView({ behavior: "smooth", block: "center" });
      })
      .catch(function () {
        showError("Couldn't reach the registration server. Check your connection and try again.");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = BTN_TEXT;
      });
  });
})();