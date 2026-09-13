const state = {
  queue: JSON.parse(localStorage.getItem("ruralchain.queue") || "[]"),
  online: navigator.onLine
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const toast = (message) => {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => element.classList.remove("show"), 2800);
};

function updateConnection() {
  state.online = navigator.onLine;
  $("#connectionLabel").textContent = state.online ? "Online" : "Offline mode";
  $("#syncLabel").textContent = state.online ? "Synced just now" : "Changes saved locally";
  $("#networkToggle").innerHTML = `${state.online ? "◉" : "○"} <span>${state.online ? "Connected" : "Offline"}</span>`;
}

function updateQueue() {
  const count = state.queue.length + 3;
  $("#queueTotal").textContent = count;
  $("#navQueueCount").textContent = count;
}

function openSection(section) {
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.section === section));
  $$(".view-panel").forEach((panel) => { panel.hidden = panel.id !== `${section}View`; });
  if (section !== "overview" && section !== "analytics" && section !== "tracking") {
    toast(`${section[0].toUpperCase()}${section.slice(1)} view is ready in this MVP.`);
  }
  if (window.innerWidth < 701) $(".sidebar").classList.remove("open");
}

$("#openHarvest").addEventListener("click", () => { $("#harvestModal").hidden = false; });
$("#closeHarvest").addEventListener("click", () => { $("#harvestModal").hidden = true; });
$("#harvestModal").addEventListener("click", (event) => { if (event.target.id === "harvestModal") event.target.hidden = true; });
$("#harvestForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  state.queue.push({ crop: form.get("crop"), quantity: form.get("quantity"), created: Date.now() });
  localStorage.setItem("ruralchain.queue", JSON.stringify(state.queue));
  updateQueue();
  $("#harvestModal").hidden = true;
  event.target.reset();
  toast(state.online ? "Harvest saved and queued for sync." : "Harvest saved locally for offline sync.");
});

$$("[data-section]").forEach((button) => button.addEventListener("click", () => openSection(button.dataset.section)));
$$(".bounty-accept").forEach((button) => button.addEventListener("click", () => {
  button.textContent = "Bounty accepted ✓";
  button.disabled = true;
  button.style.opacity = ".7";
  toast("Route bounty accepted. Pickup added to your route.");
}));
$("#menuToggle").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
$("#networkToggle").addEventListener("click", () => {
  state.online = !state.online;
  $("#connectionLabel").textContent = state.online ? "Online" : "Offline mode";
  $("#syncLabel").textContent = state.online ? "Synced just now" : "Changes saved locally";
  $("#networkToggle").innerHTML = `${state.online ? "◉" : "○"} <span>${state.online ? "Connected" : "Offline"}</span>`;
  toast(state.online ? "Connection restored. Local queue will sync." : "Offline mode enabled. Your changes remain safe.");
});
$("#trackParcel").addEventListener("click", () => {
  const id = $("#trackingId").value.trim().toUpperCase();
  const validIds = ["RC-1048", "RC-1047", "RC-1046"];
  if (!validIds.includes(id)) {
    toast("Parcel not found. Try RC-1048, RC-1047, or RC-1046.");
    return;
  }
  toast(`Live tracking loaded for ${id}.`);
});
$("#scanParcel").addEventListener("click", () => toast("Camera scanner ready. QR scan simulation active."));
$("#shareTracking").addEventListener("click", () => {
  const shareText = "RuralChain parcel RC-1048 is in transit to Mandi Central.";
  if (navigator.clipboard) navigator.clipboard.writeText(shareText);
  toast("Tracking update copied to clipboard.");
});
$("#exportAnalytics").addEventListener("click", () => toast("Analytics report prepared for download."));
window.addEventListener("online", updateConnection);
window.addEventListener("offline", updateConnection);
updateConnection();
updateQueue();
