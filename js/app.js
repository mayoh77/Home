/* app.js — UI utilities for WebFolio */

// ── Modal ──────────────────────────────────────────────
function openAddModal() {
  document.getElementById("modal-title-heading").textContent = "Website hinzufügen";
  document.getElementById("modal-id").value     = "";
  document.getElementById("field-title").value  = "";
  document.getElementById("field-url").value    = "";
  document.getElementById("field-desc").value   = "";
  document.getElementById("field-cat").value    = "";
  document.getElementById("field-thumb").value  = "";
  document.getElementById("field-order").value  = "0";
  openModal();
}

function openModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    const first = overlay.querySelector(".form-input");
    if (first) first.focus();
  }, 100);
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById("modal-overlay")) closeModal();
}

// Close on Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// ── Toast ──────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, type = "success") {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
}

// ── Helpers ────────────────────────────────────────────
function prettifyUrl(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
