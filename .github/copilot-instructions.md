# Copilot Instructions — Pattern Generator (HTML)

Purpose: give AI coding agents the minimal, high-value context to be productive quickly.

- **Big picture**: Single-page, vanilla JS app that generates sewing patterns as SVGs. UI (DOM) ↔ app state (`DraftState`) ↔ `SvgBuilder` which returns SVG strings injected into the canvas.

- **How to run / test**: No build system. Open [index.html](index.html) to run the app and [test.html](test.html) to run the test suite in a browser. No `npm` or bundler used.

- **Key files**:
  - [index.html](index.html) — entry HTML and layout
  - [js/app.js](js/app.js) — DOMContentLoaded and wiring
  - [js/state.js](js/state.js) — `DraftState` single source of truth (observer pattern)
  - [js/ui.js](js/ui.js) — DOM rendering, event handlers, injects SVG
  - [js/svg-builder.js](js/svg-builder.js) — pattern and layout generation (returns SVG strings)
  - [js/validation.js](js/validation.js) — `MeasurementRule` objects (min/max in cm)
  - [js/measurements.js](js/measurements.js) — size presets (S/M/L) and labels

- **State & Dataflow essentials (copyable patterns)**:
  - All measurements are stored internally in **centimeters** in `DraftState._measurements`.
  - UI converts user input → cm before calling `state.updateMeasurement()`.
  - Validation rules in `js/validation.js` are defined in cm and must be applied before storage.
  - When state changes, `DraftState._bumpCanvasVersion()` increments and listeners re-render the UI and canvas.
  - `UI._renderCanvas()` calls `SvgBuilder.buildSewingPattern()` or `buildCuttingLayout()` and sets `svgContainer.innerHTML` with the returned SVG string.

- **Editing patterns**:
  - Implement new garment views inside `js/svg-builder.js`. Follow existing switch/case patterns and return an SVG string.
  - Note: SvgBuilder uses hardcoded pixel origins (e.g., 100,100). Check scaling and origin constants when adjusting layout.

- **Adding measurements** (concrete steps)
  1. Add a `MeasurementRule` in `js/validation.js` (min/max in cm).
  2. Add default values to `js/measurements.js` for S/M/L.
  3. UI auto-renders the field; ensure label keys match across files.

- **Debugging tips**:
  - Open DevTools (F12). `appState` and class constructors (`DraftState`, `UI`, `SvgBuilder`) are globally inspectable.
  - Use `console.log()` in `js/state.js` setters or `ui.js` render paths to trace updates.
  - For canvas issues, verify `canvasVersion` increments and that `svgContainer.innerHTML` is being updated.

- **Project conventions & gotchas**:
  - Vanilla JS modular files (no imports/exports). Edits are live after refresh.
  - Language: UI strings are in Bahasa Melayu — keep labels consistent.
  - No package.json or build; do not add build-only code without explaining how to run it in this repo.
  - Validation and storage are always in cm. Never change the canonical storage unit.

- **Tests**: Use [test.html](test.html) in-browser. Tests verify module-level logic (state, validation, svg outputs).

- **When to ask the human**:
  - If a change requires adding a new dependency or build step (ask before introducing npm/tooling).
  - If you need clarification on intended garment geometry (Baju Melayu/Kebaya patterns are placeholders).

If anything here is unclear or you want more detail about a specific file or flow, tell me which file or behavior and I'll expand the instructions.
