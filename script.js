(() => {
  // ---- Configuration ----
  const API_BASE = "https://mental-health-score-qvyd.onrender.com";
  const MAX_SCORE = 10;          // upper end of the model's score scale
  const TIMEOUT_MS = 15000;

  // Must match the Literal[...] values in StudentData.most_used_platform
  const PLATFORMS = ["Facebook", "LinkedIn", "Instagram", "Snapchat", "Twitter", "YouTube", "TikTok"];

  const $ = (id) => document.getElementById(id);
  const form = $("form"), result = $("result"), submitBtn = $("submit");
  const ring = $("ring"), CIRC = 2 * Math.PI * 85;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Populate platform select
  const select = $("most_used_platform");
  PLATFORMS.forEach(p => select.add(new Option(p, p)));

  // Sliders: live value + filled track
  form.querySelectorAll('input[type="range"]').forEach(r => {
    const out = form.querySelector(`output[for="${r.id}"]`);
    const sync = () => {
      const pct = ((r.value - r.min) / (r.max - r.min)) * 100;
      r.style.setProperty("--p", pct + "%");
      out.textContent = Number(r.value).toString() + " " + r.dataset.unit;
    };
    r.addEventListener("input", sync);
    sync();
  });

  const setState = (s) => { result.dataset.state = s; };

  function scrollToResultOnMobile() {
    if (window.matchMedia("(max-width: 900px)").matches) {
      result.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  function buildPayload() {
    const d = new FormData(form);
    return {
      age: parseInt(d.get("age"), 10),
      gender: d.get("gender"),
      country: String(d.get("country")).trim(),
      academic_level: d.get("academic_level"),
      most_used_platform: d.get("most_used_platform"),
      purpose_of_use: d.get("purpose_of_use"),
      avg_daily_usage_hours: parseFloat(d.get("avg_daily_usage_hours")),
      daily_unlocks: parseInt(d.get("daily_unlocks"), 10),
      study_hours: parseFloat(d.get("study_hours")),
      physical_activity_hours: parseFloat(d.get("physical_activity_hours")),
      sleep_hours_per_night: parseFloat(d.get("sleep_hours_per_night")),
      stress_level: d.get("stress_level")
    };
  }

  function band(score) {
    const r = score / MAX_SCORE;
    if (r >= 0.75) return { cls: "band-good", label: "Doing well", text: "The habits entered point to a healthy mental health score." };
    if (r >= 0.5)  return { cls: "band-mid",  label: "Moderate",   text: "A middle-range score. Sleep, activity and screen time are the habits most worth a look." };
    return { cls: "band-low", label: "Needs attention", text: "A lower score. Talking with a counselor or someone you trust can help." };
  }

  function showResult(score) {
    const b = band(score);
    const card = $("resultCard");
    card.classList.remove("band-good", "band-mid", "band-low");
    card.classList.add(b.cls);
    $("badge").textContent = b.label;
    $("summary").textContent = b.text;
    $("scoreMax").textContent = "out of " + MAX_SCORE;

    setState("result");
    result.classList.remove("pop"); void result.offsetWidth; result.classList.add("pop");

    const frac = Math.max(0, Math.min(1, score / MAX_SCORE));
    ring.style.strokeDasharray = CIRC;
    ring.style.strokeDashoffset = CIRC;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ring.style.strokeDashoffset = CIRC * (1 - frac);
    }));

    const el = $("scoreValue");
    if (reduceMotion) { el.textContent = score.toFixed(2); return; }
    const start = performance.now(), dur = 1100;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / dur), eased = 1 - Math.pow(1 - k, 3);
      el.textContent = (score * eased).toFixed(2);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function showError(title, msg, details = []) {
    $("errTitle").textContent = title;
    $("errMsg").textContent = msg;
    const list = $("errList");
    list.innerHTML = "";
    details.forEach(d => { const li = document.createElement("li"); li.textContent = d; list.appendChild(li); });
    setState("error");
  }

  async function predict(payload) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      return await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal
      });
    } finally { clearTimeout(timer); }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    submitBtn.disabled = true;
    submitBtn.classList.add("busy");
    submitBtn.querySelector(".btn-text").textContent = "Predicting…";
    setState("loading");
    scrollToResultOnMobile();

    const minDelay = new Promise(r => setTimeout(r, 700)); // keeps the loader from flashing

    try {
      const [res] = await Promise.all([predict(buildPayload()), minDelay]);

      if (res.ok) {
        const data = await res.json();
        const score = Number(data.predicted_mental_health_score);
        if (Number.isNaN(score)) throw new Error("bad-response");
        showResult(score);
      } else if (res.status === 422) {
        const err = await res.json().catch(() => ({}));
        const details = Array.isArray(err.detail)
          ? err.detail.map(d => `${(d.loc || []).slice(1).join(".") || "input"}: ${d.msg}`)
          : [];
        showError("Some values were rejected", "The API could not accept these inputs.", details);
      } else {
        showError("The server returned an error", `The API responded with status ${res.status}. Check the uvicorn terminal for details.`);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        showError("Request timed out", "The API did not respond in time. Check that the model is loaded and try again.");
      } else if (err.message === "bad-response") {
        showError("Unexpected response", "The API reply did not include a valid predicted_mental_health_score.");
      } else {
        showError("Can't reach the API", `Make sure uvicorn is running at ${API_BASE}.`);
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove("busy");
      submitBtn.querySelector(".btn-text").textContent = "Predict score";
    }
  });

  const backToForm = () => {
    setState("idle");
    form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };
  $("again").addEventListener("click", backToForm);
  $("retry").addEventListener("click", backToForm);
})();
