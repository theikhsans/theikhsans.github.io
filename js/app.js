/**
 * App Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Sewing Pattern App...');
    
    // Check if appState and UI are available
    if (typeof appState === 'undefined') {
        console.error('ERROR: appState is not defined. Check that state.js loaded correctly.');
        return;
    }
    if (typeof UI === 'undefined') {
        console.error('ERROR: UI class is not defined. Check that ui.js loaded correctly.');
        return;
    }
    
    try {
        const ui = new UI(appState);
        ui.render();
        console.log('App ready!', appState);
    } catch (e) {
        console.error('Error during app initialization:', e);
    }
});
