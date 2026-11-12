// Content entries for the projects, skills, and contact sections.
// Descriptions and tags double as translation keys (see i18n.js).
export const projects = [
  {
    title: "Tortodrone",
    category: "vr",
    featured: true,
    image: "tortodrone.webp",
    alt: "Tortodrone project banner",
    description:
      "An independent Java 25 server for Spiral Knights. Host a persistent world with the official client and manage it from a built-in web interface. Still in active development.",
    tags: ["Java 25", "Spiral Knights", "WebUI"],
    links: [
      ["GitHub", "https://github.com/N0rule/Tortodrone"],
      ["Releases", "https://github.com/N0rule/Tortodrone/releases"],
    ],
  },
  {
    title: "VRChat Heart Rate Monitor",
    category: "vr",
    image: "tizen_os_osc.webp",
    alt: "Heart rate monitor running on a Tizen smartwatch",
    description:
      "A Node.js bridge from Tizen watches to VRChat. Receives heart rate from HeartRateToWeb and sends configurable OSC messages; tested with Galaxy Watch and Active2.",
    tags: ["Node.js", "TizenOS", "OSC", "VRChat"],
    links: [["GitHub", "https://github.com/N0rule/vrc-osc-tizenos-hrm"]],
  },
  {
    title: "Logitech G15 Applet",
    category: "hardware",
    image: "nanachi_applet.webp",
    alt: "Nanachi animation on the Logitech G15 keyboard LCD",
    description:
      "A Nanachi applet for the Logitech G15's built-in LCD. Uses Logitech LCDSDK to display images and text, with support tested on both G15 v1 and v2.",
    tags: ["C++", "LCDSDK", "G15 v1 / v2"],
    links: [["GitHub", "https://github.com/N0rule/NanachiApplet"]],
  },
  {
    title: "N0rule Deck",
    category: "hardware",
    image: "n0rule_deck.webp",
    alt: "Custom wireless macro deck with illuminated buttons",
    description:
      "A wireless ESP32 macro deck for custom keybinds and shortcuts over Bluetooth.",
    tags: ["ESP32", "C++", "PlatformIO", "Bluetooth"],
    links: [],
  },
  {
    title: "LoveSpouse ESP32 Gateway",
    category: "hardware",
    image: "loveSpouse_gateway.webp",
    alt: "ESP32 gateway touchscreen interface",
    description:
      "A fork of LVS-Gateway that bridges Lovense BLE to MuSE, LoveSpouse, and Leten devices. Adds CYD touch controls, live intensity feedback, and an improved browser installer.",
    tags: ["ESP32 / CYD", "C++", "BLE", "PlatformIO"],
    links: [
      ["GitHub", "https://github.com/N0rule/LoveSpouse-ESP32-Gateway"],
      ["Web installer", "https://n0rule.github.io/LoveSpouse-ESP32-Gateway/"],
    ],
  },
  {
    title: "LanyardBadge",
    category: "hardware",
    image: "lanyard_badge.webp",
    alt: "LanyardBadge displaying artwork on its touchscreen",
    description:
      "An ESP32 touchscreen badge worn on a lanyard that shows artwork cards. Firmware installs from the browser, and cards upload over USB or Bluetooth.",
    tags: ["ESP32 / CYD", "C++", "PlatformIO", "Web Serial"],
    links: [
      ["GitHub", "https://github.com/N0rule/LanyardBadge"],
      ["Editor", "https://n0rule.is-a.dev/LanyardBadge/"],
    ],
  },
  {
    title: "Emi Discord Bot",
    status: "Beta",
    category: "bots",
    image: "emi_bot.webp",
    alt: "Emi Discord bot character illustration",
    description:
      "A translated fork of Strange bot with added features. Brings AutoMod, music, economy, tickets, and AI chat to Discord, with a web dashboard and MongoDB storage.",
    tags: ["Node.js", "Discord.js", "MongoDB"],
    links: [
      ["GitHub", "https://github.com/N0rule/emi-discord-bot"],
      ["Test server", "https://dsc.gg/n0rule"],
    ],
  },
  {
    title: "Telegram Wishlist Bot",
    category: "bots",
    image: "wishlist_bot.webp",
    alt: "Wishlist bot interface inside Telegram",
    description:
      "Private wishlists for an allowed group of Telegram users. Add wishes with photos through a guided button UI, browse paginated lists, and sync posts to a shared channel. Supports English, Ukrainian, and Russian.",
    tags: ["Node.js", "Telegraf", "JSON", "Docker Compose"],
    links: [["GitHub", "https://github.com/N0rule/telegram-wishlist-bot"]],
  },
];

export const skills = [
  {
    name: "Blender",
    icon: "blender",
    level: "Advanced",
    description:
      "Modeling, texturing, rigging, and animation for avatars and game assets.",
  },
  {
    name: "Unity",
    icon: "unity",
    level: "Intermediate",
    description:
      "Interactive experiences, C# scripting, game mechanics, and physics.",
  },
  {
    name: "Node.js",
    icon: "nodejs",
    level: "Intermediate",
    description:
      "Bots, REST APIs, backend services, and database integrations.",
  },
  {
    name: "C++",
    icon: "cplusplus",
    level: "Beginner",
    description:
      "Hardware projects, the Logitech SDK, and learning systems programming.",
  },
  {
    name: "HTML & CSS",
    icon: "html5",
    level: "Intermediate",
    description:
      "Responsive layouts, modern CSS, and thoughtful web interfaces.",
  },
  {
    name: "Oracle Cloud",
    icon: "oracle",
    level: "Intermediate",
    description:
      "Virtual machines, cloud infrastructure, and bot and game server hosting.",
  },
  {
    name: "Docker & Compose",
    icon: "docker",
    level: "Intermediate",
    description:
      "Containerized apps, multi-service environments, and repeatable deployments.",
  },
];

export const socialLinks = [
  { name: "GitHub", handle: "@N0rule", url: "https://github.com/N0rule" },
  {
    name: "Discord",
    handle: "Join the server",
    url: "https://dsc.gg/n0rule",
  },
  { name: "Telegram", handle: "@N0rule", url: "https://telegram.me/N0rule" },
  {
    name: "Twitter / X",
    handle: "@_N0rule_",
    url: "https://twitter.com/_N0rule_",
  },
  {
    name: "Instagram",
    handle: "@n0rule_",
    url: "https://www.instagram.com/n0rule_",
  },
  {
    name: "Steam",
    handle: "@N0rule",
    url: "https://steamcommunity.com/id/N0rule",
  },
];

export const categoryLabels = {
  hardware: "Hardware",
  bots: "Bots & tools",
  vr: "VR & games",
};

export const categoryIcons = {
  hardware: "cpu",
  bots: "bot",
  vr: "gamepad",
};
