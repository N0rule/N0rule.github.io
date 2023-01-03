document.addEventListener("DOMContentLoaded", function() {
     // wait for the DOM to be loaded before adding event listeners
    document.getElementById("theme-button").addEventListener("click", function() {
      let theme = document.body.className;
      if (theme === "dark") {
        document.body.className = "light";
      } else {
        document.body.className = "dark";
      }
    });
  });
  