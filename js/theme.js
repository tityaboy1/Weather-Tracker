let darkmode = localStorage.getItem("darkmode");
const themetoggle = document.getElementById("theme-toggle");

themetoggle.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  if (darkmode !== "active") {
    enableDarkmode();
  } else {
    dissableDarkmode();
  }
});

function enableDarkmode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
}

function dissableDarkmode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
}

if (darkmode === "active") enableDarkmode();
