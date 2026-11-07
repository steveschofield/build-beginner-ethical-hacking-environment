/* No remote libraries, analytics, cookies, accounts, or personal data. */
"use strict";
const choices = ["short", "medium", "long"];
const labels = { short: "Short", medium: "Medium", long: "Long" };
const letters = { short: "A", medium: "B", long: "C" };
const colors = { short: "var(--short)", medium: "var(--medium)", long: "var(--long)" };
const $ = (id) => document.getElementById(id);
const number = new Intl.NumberFormat();
const displayMode = new URLSearchParams(location.search).get("display") === "1";
let state = null;
let online = false;
let busy = false;
let cooling = false;
let pending = null;
let finishTimer;
let nextTimer;
let adminSession = null;
const pendingKey = "ethernet-poll-pending-v1";
try {
  const saved = JSON.parse(sessionStorage.getItem(pendingKey));
  if (saved && choices.includes(saved.choice) && typeof saved.request_id === "string" && typeof saved.session_id === "string") pending = saved;
} catch (_) { /* Storage can be disabled; the database remains authoritative. */ }

function feedback(title, detail, kind = "") {
  $("feedback-title").textContent = title;
  $("feedback-detail").textContent = detail;
  $("feedback").className = "feedback " + kind;
  document.querySelector(".feedback-icon").textContent = kind === "success" ? "✓" : kind === "error" ? "!" : "?";
}
function setOnline(value) {
  online = value;
  $("connection").textContent = value ? "Local server · votes saved" : "Disconnected · reconnecting";
  $("connection").className = "connection" + (value ? " connected" : "");
  updateButtons();
}
function updateButtons() {
  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.disabled = !state || !online || busy || cooling || Boolean(pending);
  });
  $("retry").disabled = busy;
}
async function api(path, body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(path, {
      method: body ? "POST" : "GET", cache: "no-store", signal: controller.signal,
      headers: body ? { "Content-Type": "application/json", "X-Ethernet-Poll": "1" } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data.error || "The local server could not complete the request.");
      error.status = response.status;
      throw error;
    }
    return data;
  } finally { clearTimeout(timeout); }
}
function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function render(newState) {
  if (state && newState.database_id === state.database_id && newState.revision < state.revision) return;
  const changed = !state || newState.database_id !== state.database_id || newState.revision !== state.revision;
  state = newState;
  $("facilitator").hidden = displayMode || state.can_admin === false;
  updateButtons();
  if (!changed) return;
  $("total").textContent = number.format(state.total);
  $("results").replaceChildren();
  for (const choice of choices) {
    const count = state.counts[choice];
    const percentage = state.total ? Math.round(count / state.total * 100) : 0;
    const row = element("div", "result-row");
    row.style.setProperty("--c", colors[choice]);
    const top = element("div", "result-top");
    top.append(element("span", "dot", letters[choice]), element("span", "result-name", labels[choice]),
      element("span", "result-votes", `${number.format(count)} ${count === 1 ? "vote" : "votes"}`), element("span", "result-percent", `${percentage}%`));
    const track = element("div", "bar-track");
    track.setAttribute("aria-hidden", "true");
    const fill = element("div", "bar-fill");
    fill.style.width = percentage + "%";
    track.append(fill); row.append(top, track); $("results").append(row);
  }
  const recent = state.recent.slice(-20);
  const counts = Object.fromEntries(choices.map((choice) => [choice, recent.filter((vote) => vote.choice === choice).length]));
  $("recent-label").textContent = `LAST ${recent.length} VOTES`;
  $("trend-bars").replaceChildren(); $("trend-legend").replaceChildren(); $("recent-picks").replaceChildren();
  for (const choice of choices) {
    const percentage = recent.length ? Math.round(counts[choice] / recent.length * 100) : 0;
    if (counts[choice]) {
      const segment = element("div", "trend-segment");
      segment.style.setProperty("--c", colors[choice]); segment.style.flexGrow = counts[choice];
      segment.setAttribute("aria-hidden", "true"); $("trend-bars").append(segment);
    }
    const legend = element("span", "", `${labels[choice]} ${percentage}%`);
    legend.style.setProperty("--c", colors[choice]); legend.prepend(element("i", "legend-dot")); $("trend-legend").append(legend);
  }
  for (const vote of recent) {
    const pick = element("span", "pick", letters[vote.choice]);
    pick.dataset.choice = vote.choice;
    pick.style.setProperty("--c", colors[vote.choice]);
    pick.title = labels[vote.choice]; pick.setAttribute("aria-label", labels[vote.choice]); $("recent-picks").append(pick);
  }
  if (!recent.length) {
    for (let i = 0; i < 20; i++) { const empty = element("span", "empty-pick"); empty.setAttribute("aria-hidden", "true"); $("recent-picks").append(empty); }
  }
  let trendText = "Be the first to get the trend moving.";
  if (recent.length && recent.length < 20) trendText = "Every vote moves this window. It always shows the newest 20 picks.";
  if (recent.length === 20) {
    const old = recent.slice(0, 10); const newest = recent.slice(10);
    const changes = choices.map((choice) => ({ choice, delta: newest.filter(v => v.choice === choice).length - old.filter(v => v.choice === choice).length }));
    const rising = changes.sort((a, b) => b.delta - a.delta)[0];
    trendText = rising.delta > 0 ? `${labels[rising.choice]} is up ${rising.delta * 10} percentage points in the latest 10 vs. the previous 10.` : "Steady trend: the last two groups of 10 have the same split.";
  }
  $("trend-note").textContent = trendText;
}
function celebrate() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || displayMode) return;
  const box = $("confetti"); box.replaceChildren();
  for (let i = 0; i < 65; i++) {
    const bit = element("i");
    const properties = { "--x": Math.random() * 100 + "%", "--size": 6 + Math.random() * 7 + "px", "--c": ["var(--brand-gold)", "var(--medium)", "var(--brand-lime)"][i % 3], "--duration": 1.5 + Math.random() * 1.7 + "s", "--delay": Math.random() * .25 + "s", "--drift": -100 + Math.random() * 200 + "px", "--rotation": -540 + Math.random() * 1080 + "deg" };
    for (const [key, value] of Object.entries(properties)) bit.style.setProperty(key, value);
    box.append(bit);
  }
  setTimeout(() => box.replaceChildren(), 4000);
}
function clearPending() { pending = null; try { sessionStorage.removeItem(pendingKey); } catch (_) {} }
function ready() {
  clearTimeout(finishTimer); clearTimeout(nextTimer); cooling = false;
  document.querySelectorAll("[data-choice]").forEach(button => button.classList.remove("selected"));
  $("next").hidden = true;
  feedback("Your turn. Which cable would you choose?", "Tap one cable to vote. Compare your prediction with the room.");
  updateButtons();
  if (!displayMode && document.activeElement === $("next")) document.querySelector("[data-choice]").focus();
}
async function submitVote() {
  if (!pending || busy) return;
  busy = true; $("retry").hidden = true; updateButtons();
  feedback("Saving your vote…", "Hang tight. Your pick counts once, even if a retry is needed.");
  const attempt = { ...pending };
  try {
    const receipt = await api("/api/vote", attempt);
    clearPending(); setOnline(true); render(receipt.state);
    cooling = true;
    document.querySelector(`[data-choice="${attempt.choice}"]`).classList.add("selected");
    if (attempt.choice === "short") {
      feedback("Vote saved! The missing plug is the catch.", "This cable cannot connect two ports as shown. Medium and long can tie when both meet the Ethernet spec.");
    } else {
      feedback(attempt.choice === "medium" ? "Connection made! Nice pick. 🎉" : "Connection made! Long can be fast, too. 🎉",
        "Vote saved. Medium and long can deliver the same data rate when both meet spec. Shorter is not automatically faster.", "success");
      celebrate();
    }
    $("next").hidden = false; $("next").disabled = true; $("next").textContent = "Next student →";
    nextTimer = setTimeout(() => { $("next").disabled = false; }, 1500);
    finishTimer = setTimeout(ready, 8000);
  } catch (error) {
    if (error.status && error.status >= 400 && error.status < 500) {
      clearPending();
      feedback("That vote was not accepted.", error.message + " Try again after the screen reconnects.", "error");
      try { render(await api("/api/state")); setOnline(true); } catch (_) { setOnline(false); }
    } else {
      setOnline(false); $("retry").hidden = false;
      feedback("Your vote needs confirmation.", "The connection paused. Retry this same vote when the server is back; it will never count twice.", "error");
    }
  } finally { busy = false; updateButtons(); }
}
function voteId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
document.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
  if (!online || busy || cooling || pending || !state) return;
  pending = { choice: button.dataset.choice, request_id: voteId(), session_id: state.session_id };
  try { sessionStorage.setItem(pendingKey, JSON.stringify(pending)); } catch (_) {}
  submitVote();
}));
$("retry").addEventListener("click", submitVote);
$("next").addEventListener("click", ready);
$("science-button").addEventListener("click", () => $("science-dialog").showModal());
$("facilitator").addEventListener("click", () => {
  adminSession = state?.session_id; $("confirmation").value = ""; $("admin-status").textContent = ""; $("admin-dialog").showModal();
});
$("round-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (pending || busy) { $("admin-status").textContent = "Finish or retry the pending vote first."; return; }
  if ($("confirmation").value !== "NEW") { $("admin-status").textContent = "Type NEW exactly to confirm."; return; }
  const button = event.currentTarget.querySelector("button"); button.disabled = true;
  try {
    const result = await api("/api/new-round", { session_id: adminSession, confirmation: "NEW" });
    render(result); setOnline(true); ready(); $("admin-dialog").close();
    feedback("New round, fresh predictions.", "The previous round is archived and included in the all-rounds CSV export.");
  } catch (error) { $("admin-status").textContent = error.message || "Could not confirm the new round. Close and reopen these controls to check."; }
  finally { button.disabled = false; }
});
$("fullscreen").addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else throw new Error("unsupported");
  } catch (_) { feedback("Use your browser’s full-screen control.", "On Kali, press F11. You can still vote normally."); }
});
document.addEventListener("fullscreenchange", () => { $("fullscreen").textContent = document.fullscreenElement ? "Exit full screen" : "Full screen"; });
if (displayMode) {
  document.body.classList.add("display-mode");
  $("question-title").textContent = "The room has spoken. Keep it coming.";
  $("instruction").textContent = "A · Short     B · Medium     C · Long     —     Live predictions from the voting screen";
  $("facilitator").hidden = true;
}
if (pending && !displayMode) {
  $("retry").hidden = false;
  feedback("There is an unfinished vote to confirm.", "Retry the previous pick before the next student votes. The same vote will count only once.", "error");
}
async function poll() {
  try { render(await api("/api/state")); setOnline(true); }
  catch (_) { setOnline(false); }
  setTimeout(poll, 1000);
}
poll();
