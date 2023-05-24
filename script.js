document.addEventListener("DOMContentLoaded", function () {
  var themeButton = document.getElementById("theme-button");
  var body = document.getElementsByTagName("BODY")[0];
  if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
  }
  if (body) {
    var theme = getCookie('theme');
    if (theme) {
      body.className = theme;
    }
  }
});

// toggle between light and dark theme
function toggleTheme() {
  var body = document.getElementsByTagName("BODY")[0];
  var theme = body.className;
  if (theme === "light") {
    body.className = "dark";
    setCookie('theme', 'dark', 365);
  } else {
    body.className = "light";
    setCookie('theme', 'light', 365);
  }
}

// set a cookie with the given name, value, and expiry date
function setCookie(name, value, expiryDays) {
  var date = new Date();
  date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// get the value of a cookie with the given name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}
// --------------------------------------------------------------------------
// document.querySelector(".projcard img").addEventListener("click", function()
// {
//   this.style.transform = "scale(1.7)";
// });

