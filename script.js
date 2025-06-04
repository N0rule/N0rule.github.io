document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("theme-button");
  const body = document.body;

  const savedTheme = getCookie("theme");
  if (savedTheme) {
    body.className = savedTheme;
  }

  themeButton?.addEventListener("click", () => {
    const currentTheme = body.className;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    body.className = newTheme;
    setCookie("theme", newTheme, 365);
  });
});

// Set a cookie
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Get a cookie
function getCookie(name) {
  return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1];
}
