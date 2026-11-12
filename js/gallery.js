import { t, currentLanguage } from "./i18n.js";
import { renderIcon } from "./icons.js";
import { escapeHtml } from "./utils.js";
import { reducedMotion } from "./environment.js";

// The gallery lineup. Add a model by dropping its .glb into models/, a
// poster into images/model-previews/, and an entry in models/models.json —
// no code changes needed. This list is only the fallback for when the
// manifest cannot be fetched (for example, opening the page from the
// filesystem, where fetch of local files is blocked).
const fallbackModels = [
  {
    name: "N0rule V2",
    file: "N0ruleV2Optimized.glb",
    poster: "n0rule-v2.webp",
  },
  { name: "Kapi", file: "KapiOptimized.glb", poster: "kapi.webp" },
  {
    name: "N0rule Original",
    file: "N0ruleOptimized.glb",
    poster: "n0rule-original.webp",
  },
];
let models = fallbackModels;

const loadButton = document.querySelector("#load-model");
const statusLine = document.querySelector("#model-status");
const modelPoster = document.querySelector("#model-poster");
const viewerSettings = document.querySelector("#viewer-settings");
const wireframeInput = document.querySelector("#wireframe");
const autoRotateInput = document.querySelector("#auto-rotate");
const exposureInput = document.querySelector("#exposure");
const fullscreenButton = document.querySelector("#fullscreen");
const modelPicker = document.querySelector(".model-picker");

let viewer = null;
let currentIndex = 0;
let openingViewer = false;
let loadTimeout;
// The last status message, so a language change can re-render it.
let statusKey = "Rotate, pan, and zoom to explore the details.";
let statusParams = {};
let statusProgress;
let loadButtonLabel = "Open 3D viewer";

function setLoadButtonLabel(label) {
  loadButtonLabel = label;
  loadButton.innerHTML = `${renderIcon("cube")}<span>${escapeHtml(t(label))}</span>`;
}

function showStatus(key, params = {}, progress) {
  statusKey = key;
  statusParams = params;
  statusProgress = progress;
  statusLine.textContent =
    t(key, params) +
    (progress === void 0
      ? ""
      : ` ${new Intl.NumberFormat(currentLanguage()).format(progress)}%`);
  // Progress ticks skip the live region: only state changes are announced.
  if (progress === void 0)
    document.querySelector("#model-announce").textContent = t(key, params);
}

function showPoster() {
  const model = models[currentIndex];
  modelPoster.src = `./images/model-previews/${model.poster}`;
  modelPoster.alt = t("{name} 3D model preview", { name: t(model.name) });
  modelPoster.hidden = false;
  document.querySelector("#stage-name").textContent = t(model.name);
}

function applyViewerSettings() {
  if (!viewer?.loaded) return;
  viewer.setWireframe(wireframeInput.checked);
  viewer.toggleAttribute("auto-rotate", autoRotateInput.checked);
  viewer.setAttribute("shadow-intensity", "1");
  viewer.setAttribute("exposure", exposureInput.value);
}

function updateBrightness() {
  const progress =
    ((Number(exposureInput.value) - Number(exposureInput.min)) /
      (Number(exposureInput.max) - Number(exposureInput.min))) *
    100;
  exposureInput.style.setProperty("--range-progress", `${progress}%`);
  exposureInput.setAttribute(
    "aria-valuetext",
    new Intl.NumberFormat(currentLanguage(), { style: "percent" }).format(
      Number(exposureInput.value),
    ),
  );
  document.querySelector("#exposure-value").textContent =
    new Intl.NumberFormat(currentLanguage(), { style: "percent" }).format(
      Number(exposureInput.value),
    );
}

function showLoadError() {
  clearTimeout(loadTimeout);
  showStatus("The model could not load. Check your connection and try again.");
  loadButton.hidden = false;
  loadButton.disabled = false;
  setLoadButtonLabel("Retry 3D model");
  viewerSettings.disabled = true;
  if (viewer) viewer.style.opacity = "0";
  showPoster();
}

function loadModelIntoViewer() {
  clearTimeout(loadTimeout);
  loadButton.hidden = true;
  viewerSettings.disabled = true;
  showPoster();
  viewer.style.opacity = "0";
  viewer.removeAttribute("src");
  viewer.setAttribute(
    "alt",
    t("{name} — interactive 3D avatar", { name: t(models[currentIndex].name) }),
  );
  viewer.setAttribute("src", `./models/${models[currentIndex].file}`);
  showStatus("Loading {name}…", { name: t(models[currentIndex].name) });
  document.querySelector("#stage-name").textContent = t(
    models[currentIndex].name,
  );
  loadTimeout = setTimeout(showLoadError, 6e4);
}

// The character buttons are generated from the lineup so that adding a
// model in the manifest is all it takes.
function renderModelChoices() {
  modelPicker.innerHTML = models
    .map(
      (model, index) => `
      <button class="model-choice${index === currentIndex ? " selected" : ""}" data-model="${index}" aria-pressed="${index === currentIndex}">
        <span>${escapeHtml(t(model.name))}</span><span class="selection-dot" aria-hidden="true"></span>
      </button>`,
    )
    .join("");
}

async function openViewer() {
  if (openingViewer) return;
  if (viewer) {
    loadModelIntoViewer();
    return;
  }
  openingViewer = true;
  loadButton.disabled = true;
  setLoadButtonLabel("Opening viewer…");
  showStatus("Preparing the interactive gallery…");
  try {
    await import("./model-viewer.js");
    await customElements.whenDefined("portfolio-model-viewer");
    viewer = document.createElement("portfolio-model-viewer");
    viewer.setAttribute("camera-controls", "");
    viewer.setAttribute("auto-rotate-delay", "0");
    viewer.setAttribute("shadow-intensity", "1");
    viewer.setAttribute("touch-action", "pan-y");
    if (autoRotateInput.checked) viewer.setAttribute("auto-rotate", "");
    viewer.addEventListener("load", () => {
      clearTimeout(loadTimeout);
      modelPoster.hidden = true;
      viewer.style.opacity = "1";
      loadButton.hidden = true;
      viewerSettings.disabled = false;
      applyViewerSettings();
      showStatus("Drag or use the arrow keys to rotate. Scroll or pinch to zoom.");
    });
    viewer.addEventListener("error", showLoadError);
    viewer.addEventListener("progress", (event) => {
      if (!loadButton.hidden) return;
      const percent = Math.round(event.detail.totalProgress * 100);
      if (percent < 100)
        showStatus(
          "Loading {name}…",
          { name: t(models[currentIndex].name) },
          percent,
        );
    });
    document.querySelector("#viewer-mount").append(viewer);
    loadModelIntoViewer();
  } catch {
    showLoadError();
  } finally {
    openingViewer = false;
    loadButton.disabled = false;
  }
}

function initModelPicker() {
  modelPicker.addEventListener("click", (event) => {
    const button = event.target.closest(".model-choice");
    if (!button) return;
    currentIndex = Number(button.dataset.model);
    renderModelChoices();
    if (viewer) loadModelIntoViewer();
    else {
      showPoster();
      showStatus("Rotate, pan, and zoom to explore the details.");
    }
  });
}

function initFullscreen() {
  if (!document.fullscreenEnabled) fullscreenButton.hidden = true;
  fullscreenButton.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else
        await document
          .querySelector("#gallery-workspace")
          .requestFullscreen();
    } catch {
      showStatus(
        "Fullscreen is unavailable in this browser. You can still explore here.",
      );
    }
  });
  document.addEventListener("fullscreenchange", () => {
    fullscreenButton.innerHTML = renderIcon(
      document.fullscreenElement ? "minimize" : "maximize",
    );
    fullscreenButton.setAttribute(
      "aria-label",
      t(
        document.fullscreenElement
          ? "Exit gallery fullscreen"
          : "Enter gallery fullscreen",
      ),
    );
  });
}

// Mirror the active language into the gallery after every change.
function syncGalleryLanguage() {
  fullscreenButton.setAttribute(
    "aria-label",
    t(
      document.fullscreenElement
        ? "Exit gallery fullscreen"
        : "Enter gallery fullscreen",
    ),
  );
  setLoadButtonLabel(loadButtonLabel);
  const modelName = t(models[currentIndex].name);
  modelPoster.alt = t("{name} 3D model preview", { name: modelName });
  document.querySelector("#stage-name").textContent = modelName;
  if (viewer)
    viewer.alt = t("{name} — interactive 3D avatar", { name: modelName });
  showStatus(
    statusKey,
    statusKey.includes("{name}") ? { name: modelName } : statusParams,
    statusProgress,
  );
  renderModelChoices();
  updateBrightness();
}

async function loadModelManifest() {
  try {
    const response = await fetch("./models/models.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const list = await response.json();
    if (Array.isArray(list) && list.length > 0) {
      models = list;
      if (currentIndex >= models.length) currentIndex = 0;
      if (!viewer) showPoster();
      syncGalleryLanguage();
    }
  } catch {
    // Manifest unavailable: the fallback lineup keeps the gallery alive.
  }
}

export function initGallery() {
  autoRotateInput.checked = !reducedMotion.matches;
  renderModelChoices();

  modelPoster.addEventListener("error", () => {
    modelPoster.hidden = true;
  });
  viewerSettings.addEventListener("change", applyViewerSettings);
  exposureInput.addEventListener("input", () => {
    updateBrightness();
    applyViewerSettings();
  });
  document
    .querySelector("#reset-camera")
    .addEventListener("click", () => viewer?.resetCamera());

  loadButton.addEventListener("click", openViewer);
  initModelPicker();
  initFullscreen();

  // Turning motion back on should re-enable the idle spin.
  reducedMotion.addEventListener("change", (event) => {
    autoRotateInput.checked = !event.matches;
    applyViewerSettings();
  });

  window.addEventListener("portfolio:languagechange", syncGalleryLanguage);
  loadModelManifest();
}
