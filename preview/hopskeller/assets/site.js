const toggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector("#site-navigation");
const compact = window.matchMedia("(max-width: 850px)");

function setMenu(expanded) {
  toggle.setAttribute("aria-expanded", String(expanded));
  navigation.hidden = compact.matches && !expanded;
}

function matchViewport() {
  toggle.hidden = !compact.matches;
  setMenu(false);
}

toggle.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") === "false");
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    toggle.focus();
  }
});
compact.addEventListener("change", matchViewport);
matchViewport();
