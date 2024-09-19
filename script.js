document.addEventListener("DOMContentLoaded", function () {
  const themeButton = document.getElementById("theme-button");
  const body = document.body;

  // Retrieve theme from cookies
  const theme = getCookie("theme");
  if (theme) {
    body.className = theme;
  }

  // Toggle theme event
  themeButton?.addEventListener("click", toggleTheme);
});

// Toggle between light and dark theme
function toggleTheme() {
  const body = document.body;
  const theme = body.className;

  if (theme === "light") {
    body.className = "dark";
    setCookie("theme", "dark", 365);
  } else {
    body.className = "light";
    setCookie("theme", "light", 365);
  }
}

// Set a cookie with the given name, value, and expiry date
function setCookie(name, value, expiryDays) {
  const date = new Date();
  date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Get the value of a cookie with the given name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
