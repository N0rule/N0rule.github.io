// Interface icon names, mapped to published icon sets. CSS masks let icons
// inherit the active theme's text color.
const iconNames = {
  code: "code",
  cube: "category",
  folder: "folder",
  user: "person",
  mail: "mail",
  tools: "handyman",
  cpu: "memory",
  bot: "smart_toy",
  gamepad: "sports_esports",
  grid: "grid_view",
  external: "north_east",
  web: "language",
  language: "translate",
  sun: "light_mode",
  moon: "dark_mode",
  maximize: "fullscreen",
  minimize: "fullscreen_exit",
  reset: "restart_alt",
  up: "arrow_upward",
  brightness: "brightness_6",
  gpu: "bolt",
  ram: "view_module",
  board: "developer_board",
  storage: "storage",
  monitor: "desktop_windows",
  computer: "computer",
};

const brandIcons = {
  GitHub: "github",
  Discord: "discord",
  Telegram: "telegram",
  "Twitter / X": "x",
  Instagram: "instagram",
  Steam: "steam",
};

export function renderIcon(name) {
  const url = brandIcons[name]
    ? `https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/${brandIcons[name]}.svg`
    : `https://cdn.jsdelivr.net/npm/@material-design-icons/svg@0.14.15/round/${iconNames[name] || iconNames.external}.svg`;
  return `<span class="icon" aria-hidden="true" style="--icon-url: url('${url}')"></span>`;
}

// Fill the static [data-icon] placeholders in the page.
export function renderIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = renderIcon(node.dataset.icon);
  });
}
