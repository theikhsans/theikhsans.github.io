/**
 * App Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Sewing Pattern App...');
    const ui = new UI(appState);
    ui.render();
    console.log('App ready!');
});
