/**
 * App Initialization
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof appState === "undefined" || typeof UI === "undefined") {
    return;
  }

  const ui = new UI(appState);
  ui.render();
});
