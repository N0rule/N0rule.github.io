// Site strings in English, Russian, and Ukrainian. Each entry is
// [English, Russian, Ukrainian]; the English text is the lookup key.
const entries = [
  [
    "I build bots, custom hardware, and worlds you can step into.",
    "Создаю ботов, устройства и миры, в которые можно погрузиться.",
    "Створюю ботів, пристрої та світи, у які можна поринути.",
  ],
  [
    "For a project, an avatar, or just a hello.",
    "Обсудить проект, заказать аватар или просто поздороваться.",
    "Обговорити проєкт, замовити аватар або просто привітатися.",
  ],
  ["In development", "В разработке", "У розробці"],
  ["Releases", "Релизы", "Релізи"],
  [
    "An independent Java 25 server for Spiral Knights. Host a persistent world with the official client and manage it from a built-in web interface. Still in active development.",
    "Независимый сервер Spiral Knights на Java 25. Создайте постоянный мир для официального клиента и управляйте им через встроенный веб-интерфейс. Проект активно разрабатывается.",
    "Незалежний сервер Spiral Knights на Java 25. Створіть постійний світ для офіційного клієнта й керуйте ним через вбудований вебінтерфейс. Проєкт активно розробляється.",
  ],
  [
    "Tortodrone project banner",
    "Баннер проекта Tortodrone",
    "Банер проєкту Tortodrone",
  ],
  ["Language", "Язык", "Мова"],
  ["Skip to content", "Перейти к содержимому", "Перейти до вмісту"],
  ["Main navigation", "Основная навигация", "Основна навігація"],
  ["About", "Обо мне", "Про мене"],
  ["Projects", "Проекты", "Проєкти"],
  ["Gallery", "Галерея", "Галерея"],
  ["Skills", "Навыки", "Навички"],
  ["Contact", "Контакты", "Контакти"],
  ["Switch to light theme", "Включить светлую тему", "Увімкнути світлу тему"],
  ["Switch to dark theme", "Включить тёмную тему", "Увімкнути темну тему"],
  ["Introduction", "Знакомство", "Знайомство"],
  [
    "Developer & 3D Artist",
    "Разработчик и 3D-художник",
    "Розробник і 3D-художник",
  ],
  ["View projects", "Смотреть проекты", "Переглянути проєкти"],
  ["Get in touch", "Связаться", "Зв’язатися"],
  [
    "N0rule's illustrated character with dark hair and purple eyes",
    "Персонаж N0rule с тёмными волосами и фиолетовыми глазами",
    "Персонаж N0rule з темним волоссям і фіолетовими очима",
  ],
  ["About me", "Обо мне", "Про мене"],
  [
    "I'm an IT enthusiast who enjoys figuring out how things work and making something of my own.",
    "Я увлекаюсь IT, люблю разбираться в том, как всё устроено, и создавать что-то своё.",
    "Я захоплююся IT, люблю розбиратися, як усе працює, і створювати щось своє.",
  ],
  [
    "I work with Blender and Unity, write bots and tools, and occasionally turn an idea into a piece of hardware. I enjoy challenging problems and learning new things along the way.",
    "Работаю с Blender и Unity, пишу ботов и инструменты, а иногда воплощаю идеи в устройствах. Люблю сложные задачи и узнавать что-то новое в процессе.",
    "Працюю з Blender та Unity, пишу ботів й інструменти, а іноді втілюю ідеї в пристроях. Люблю складні завдання й дізнаватися щось нове в процесі.",
  ],
  [
    "Outside of projects, I build and customize PCs, play games, and watch anime.",
    "В свободное время собираю и настраиваю компьютеры, играю и смотрю аниме.",
    "У вільний час збираю й налаштовую комп’ютери, граю та дивлюся аніме.",
  ],
  ["Filter projects", "Фильтр проектов", "Фільтр проєктів"],
  ["Showing {n} projects", "Показано проектов: {n}", "Показано проєктів: {n}"],
  ["All", "Все", "Усі"],
  ["Hardware", "Устройства", "Пристрої"],
  ["Bots & tools", "Боты и инструменты", "Боти й інструменти"],
  ["VR & games", "VR и игры", "VR та ігри"],
  [
    "Personal hardware build",
    "Собственный проект устройства",
    "Власний проєкт пристрою",
  ],
  ["Test server", "Тестовый сервер", "Тестовий сервер"],
  [
    "VRChat Heart Rate Monitor",
    "Монитор пульса для VRChat",
    "Монітор пульсу для VRChat",
  ],
  [
    "Logitech G15 Applet",
    "Апплет для Logitech G15",
    "Аплет для Logitech G15",
  ],
  ["Emi Discord Bot", "Discord-бот Emi", "Discord-бот Emi"],
  [
    "Telegram Wishlist Bot",
    "Telegram-бот для списков желаний",
    "Telegram-бот для списків бажань",
  ],
  [
    "Heart rate monitor running on a Tizen smartwatch",
    "Монитор пульса на смарт-часах Tizen",
    "Монітор пульсу на смартгодиннику Tizen",
  ],
  [
    "Nanachi animation on the Logitech G15 keyboard LCD",
    "Анимация Наначи на экране клавиатуры Logitech G15",
    "Анімація Наначі на екрані клавіатури Logitech G15",
  ],
  [
    "Custom wireless macro deck with illuminated buttons",
    "Беспроводная макропанель с подсветкой кнопок",
    "Бездротова макропанель із підсвічуванням кнопок",
  ],
  [
    "ESP32 gateway touchscreen interface",
    "Сенсорный интерфейс шлюза ESP32",
    "Сенсорний інтерфейс шлюзу ESP32",
  ],
  [
    "LanyardBadge displaying artwork on its touchscreen",
    "LanyardBadge с изображением на сенсорном экране",
    "LanyardBadge із зображенням на сенсорному екрані",
  ],
  [
    "An ESP32 touchscreen badge worn on a lanyard that shows artwork cards. Firmware installs from the browser, and cards upload over USB or Bluetooth.",
    "Бейдж с сенсорным экраном ESP32 на шнурке, показывающий карточки с изображениями. Прошивка устанавливается из браузера, а карточки загружаются по USB или Bluetooth.",
    "Бейдж із сенсорним екраном ESP32 на шнурку, що показує картки із зображеннями. Прошивка встановлюється з браузера, а картки завантажуються через USB або Bluetooth.",
  ],
  [
    "Emi Discord bot character illustration",
    "Иллюстрация персонажа Discord-бота Emi",
    "Ілюстрація персонажа Discord-бота Emi",
  ],
  [
    "Wishlist bot interface inside Telegram",
    "Интерфейс бота со списками желаний в Telegram",
    "Інтерфейс бота зі списками бажань у Telegram",
  ],
  [
    "A Node.js bridge from Tizen watches to VRChat. Receives heart rate from HeartRateToWeb and sends configurable OSC messages; tested with Galaxy Watch and Active2.",
    "Мост на Node.js между часами Tizen и VRChat. Получает пульс из HeartRateToWeb и отправляет настраиваемые OSC-сообщения. Проверен на Galaxy Watch и Active2.",
    "Міст на Node.js між годинниками Tizen і VRChat. Отримує пульс із HeartRateToWeb і надсилає налаштовувані OSC-повідомлення. Перевірено на Galaxy Watch та Active2.",
  ],
  [
    "A Nanachi applet for the Logitech G15's built-in LCD. Uses Logitech LCDSDK to display images and text, with support tested on both G15 v1 and v2.",
    "Апплет с Наначи для встроенного LCD-экрана Logitech G15. Выводит изображения и текст через Logitech LCDSDK; проверен на G15 v1 и v2.",
    "Аплет із Наначі для вбудованого LCD-екрана Logitech G15. Виводить зображення й текст через Logitech LCDSDK; перевірено на G15 v1 і v2.",
  ],
  [
    "A wireless ESP32 macro deck for custom keybinds and shortcuts over Bluetooth.",
    "Беспроводная макропанель на ESP32 для сочетаний клавиш и быстрых команд по Bluetooth.",
    "Бездротова макропанель на ESP32 для сполучень клавіш і швидких команд через Bluetooth.",
  ],
  [
    "A fork of LVS-Gateway that bridges Lovense BLE to MuSE, LoveSpouse, and Leten devices. Adds CYD touch controls, live intensity feedback, and an improved browser installer.",
    "Форк LVS-Gateway, передающий BLE-команды Lovense на устройства MuSE, LoveSpouse и Leten. Добавлены сенсорное управление CYD, отображение интенсивности и улучшенная установка из браузера.",
    "Форк LVS-Gateway, що передає BLE-команди Lovense на пристрої MuSE, LoveSpouse та Leten. Додано сенсорне керування CYD, відображення інтенсивності й поліпшене встановлення з браузера.",
  ],
  [
    "A translated fork of Strange bot with added features. Brings AutoMod, music, economy, tickets, and AI chat to Discord, with a web dashboard and MongoDB storage.",
    "Переведённый форк Strange bot с дополнительными функциями: AutoMod, музыка, экономика, тикеты и ИИ-чат в Discord. Включает веб-панель и хранение данных в MongoDB.",
    "Перекладений форк Strange bot із додатковими функціями: AutoMod, музика, економіка, тікети та ШІ-чат у Discord. Має вебпанель і зберігання даних у MongoDB.",
  ],
  [
    "Private wishlists for an allowed group of Telegram users. Add wishes with photos through a guided button UI, browse paginated lists, and sync posts to a shared channel. Supports English, Ukrainian, and Russian.",
    "Приватные списки желаний для разрешённых пользователей Telegram. Пошаговое добавление с фото через кнопки, постраничный просмотр и синхронизация с общим каналом. Поддерживает английский, украинский и русский.",
    "Приватні списки бажань для дозволених користувачів Telegram. Покрокове додавання з фото через кнопки, посторінковий перегляд і синхронізація зі спільним каналом. Підтримує англійську, українську й російську.",
  ],
  ["Beta", "Бета", "Бета"],
  ["Web installer", "Установить из браузера", "Встановити з браузера"],
  ["Editor", "Редактор", "Редактор"],
  ["3D gallery", "3D-галерея", "3D-галерея"],
  ["Open 3D viewer", "Открыть 3D-модель", "Відкрити 3D-модель"],
  [
    "Rotate, pan, and zoom to explore the details.",
    "Вращайте, перемещайте и приближайте модель.",
    "Обертайте, переміщуйте та наближайте модель.",
  ],
  [
    "Enter gallery fullscreen",
    "Открыть галерею на весь экран",
    "Відкрити галерею на весь екран",
  ],
  [
    "Exit gallery fullscreen",
    "Выйти из полноэкранного режима",
    "Вийти з повноекранного режиму",
  ],
  ["Character collection", "Коллекция персонажей", "Колекція персонажів"],
  ["Characters", "Персонажи", "Персонажі"],
  ["Choose a 3D model", "Выбрать 3D-модель", "Вибрати 3D-модель"],
  ["N0rule Original", "N0rule - оригинал", "N0rule - оригінал"],
  ["View settings", "Настройки вида", "Налаштування вигляду"],
  ["Wireframe", "Каркас", "Каркас"],
  ["Auto-rotate", "Автовращение", "Автообертання"],
  ["Brightness", "Яркость", "Яскравість"],
  ["Reset camera", "Сбросить камеру", "Скинути камеру"],
  ["Custom avatars", "Аватары на заказ", "Аватари на замовлення"],
  [
    "Have a character in mind? Get in touch to discuss a commission.",
    "Есть идея персонажа? Напишите мне, чтобы обсудить заказ.",
    "Маєте ідею персонажа? Напишіть мені, щоб обговорити замовлення.",
  ],
  ["Discuss your idea", "Обсудить идею", "Обговорити ідею"],
  ["Skills & tools", "Навыки и инструменты", "Навички й інструменти"],
  ["Advanced", "Продвинутый", "Просунутий"],
  ["Intermediate", "Средний", "Середній"],
  ["Beginner", "Начальный", "Початковий"],
  [
    "Modeling, texturing, rigging, and animation for avatars and game assets.",
    "Моделирование, текстурирование, риггинг и анимация аватаров и игровых объектов.",
    "Моделювання, текстурування, ригінг та анімація аватарів й ігрових об’єктів.",
  ],
  [
    "Interactive experiences, C# scripting, game mechanics, and physics.",
    "Интерактивные проекты, скрипты на C#, игровые механики и физика.",
    "Інтерактивні проєкти, скрипти на C#, ігрові механіки та фізика.",
  ],
  [
    "Bots, REST APIs, backend services, and database integrations.",
    "Боты, REST API, серверные сервисы и интеграция баз данных.",
    "Боти, REST API, серверні сервіси та інтеграція баз даних.",
  ],
  [
    "Hardware projects, the Logitech SDK, and learning systems programming.",
    "Проекты устройств, Logitech SDK и изучение системного программирования.",
    "Проєкти пристроїв, Logitech SDK та вивчення системного програмування.",
  ],
  [
    "Responsive layouts, modern CSS, and thoughtful web interfaces.",
    "Адаптивная вёрстка, современный CSS и продуманные веб-интерфейсы.",
    "Адаптивна верстка, сучасний CSS і продумані вебінтерфейси.",
  ],
  [
    "Virtual machines, cloud infrastructure, and bot and game server hosting.",
    "Виртуальные машины, облачная инфраструктура, хостинг ботов и игровых серверов.",
    "Віртуальні машини, хмарна інфраструктура, хостинг ботів та ігрових серверів.",
  ],
  [
    "Containerized apps, multi-service environments, and repeatable deployments.",
    "Приложения в контейнерах, многосервисные окружения и воспроизводимое развёртывание.",
    "Застосунки в контейнерах, багатосервісні середовища та відтворюване розгортання.",
  ],
  ["Join the server", "Присоединиться к серверу", "Приєднатися до сервера"],
  ["Message on Telegram", "Написать в Telegram", "Написати в Telegram"],
  ["Back to top", "Наверх", "Нагору"],
  [
    "The model could not load. Check your connection and try again.",
    "Не удалось загрузить модель. Проверьте соединение и попробуйте ещё раз.",
    "Не вдалося завантажити модель. Перевірте з’єднання та спробуйте ще раз.",
  ],
  ["Retry 3D model", "Загрузить снова", "Завантажити знову"],
  ["Opening viewer…", "Открываю просмотр…", "Відкриваю перегляд…"],
  [
    "Preparing the interactive gallery…",
    "Подготовка интерактивной галереи…",
    "Підготовка інтерактивної галереї…",
  ],
  ["Loading {name}…", "Загрузка {name}…", "Завантаження {name}…"],
  [
    "Drag or use the arrow keys to rotate. Scroll or pinch to zoom.",
    "Вращайте перетаскиванием или стрелками. Приближайте прокруткой или жестом.",
    "Обертайте перетягуванням або стрілками. Наближайте прокручуванням або жестом.",
  ],
  [
    "Fullscreen is unavailable in this browser. You can still explore here.",
    "Полноэкранный режим недоступен в этом браузере. Модель можно посмотреть здесь.",
    "Повноекранний режим недоступний у цьому браузері. Модель можна переглянути тут.",
  ],
  [
    "{name} 3D model preview",
    "Предпросмотр 3D-модели {name}",
    "Попередній перегляд 3D-моделі {name}",
  ],
  [
    "{name} - interactive 3D avatar",
    "{name} - интерактивный 3D-аватар",
    "{name} - інтерактивний 3D-аватар",
  ],
  [
    "N0rule - Developer & 3D Artist",
    "N0rule - Разработчик и 3D-художник",
    "N0rule - Розробник і 3D-художник",
  ],
  [
    "N0rule - developer and 3D artist. Explore custom hardware, bots, and VRChat characters.",
    "N0rule - разработчик и 3D-художник. Устройства, боты и персонажи для VRChat.",
    "N0rule - розробник і 3D-художник. Пристрої, боти та персонажі для VRChat.",
  ],
  [
    "Code, custom hardware, and 3D characters.",
    "Код, собственные устройства и 3D-персонажи.",
    "Код, власні пристрої та 3D-персонажі.",
  ],
];

const translations = Object.fromEntries(
  ["en", "ru", "uk"].map((code, index) => [
    code,
    Object.fromEntries(entries.map((entry) => [entry[0], entry[index]])),
  ]),
);
const languages = Object.keys(translations);

let savedLanguage;
try {
  savedLanguage = localStorage.getItem("n0rule-language");
} catch {}
if (!languages.includes(savedLanguage)) savedLanguage = null;

// The browser's preferred language, if the site can serve it.
function preferredLanguage() {
  return (
    (navigator.languages?.length ? navigator.languages : [navigator.language])
      .map((code) => code.toLowerCase().split("-")[0])
      .find((code) => languages.includes(code)) || "en"
  );
}

let language = savedLanguage || preferredLanguage();

export function currentLanguage() {
  return language;
}

// Translate a key with optional {placeholder} substitution; unknown keys
// pass through untouched, so untranslated content still renders.
export function t(key, params = {}) {
  return (translations[language][key] || key).replace(
    /\{(\w+)\}/g,
    (name) => params[name.slice(1, -1)] ?? name,
  );
}

export function applyTranslations() {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  for (const attribute of ["aria-label", "alt", "content"])
    document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((node) => {
      node.setAttribute(
        attribute,
        t(node.getAttribute(`data-i18n-${attribute}`)),
      );
    });
  document.title = t("N0rule - Developer & 3D Artist");
}

export function setLanguage(value, persist = true) {
  if (!languages.includes(value)) return;
  const { scrollX, scrollY } = window;
  language = value;
  if (persist) {
    savedLanguage = value;
    try {
      localStorage.setItem("n0rule-language", value);
    } catch {}
  }
  applyTranslations();
  window.dispatchEvent(new CustomEvent("portfolio:languagechange"));
  // Keep the viewport anchored through the re-render.
  window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
}

// Follow the browser's language while the visitor has no explicit choice.
window.addEventListener("languagechange", () => {
  if (!savedLanguage) setLanguage(preferredLanguage(), false);
});
