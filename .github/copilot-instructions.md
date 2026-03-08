# Copilot Instructions — Pattern Generator (HTML)

**Purpose**: Minimal, high-value context for AI agents to become immediately productive.

## Big Picture

Single-page vanilla JS app that generates sewing patterns as SVGs. Data flows: HTML ↔ UI class ↔ DraftState (observer pattern) ↔ SvgBuilder. No build system, no dependencies—just vanilla JS modules.

## Running & Testing

- **App**: Open `index.html` directly in browser (no build step).
- **Tests**: Open `test.html` to run in-browser test suite that validates state, validation, and SVG generation logic.
- **Debugging**: `appState`, `UI`, `SvgBuilder` are global objects; open DevTools (F12) to inspect.

## Key Files

- [index.html](index.html) — Semantic HTML structure with layout sections (nav, side panel, canvas)
- [js/app.js](js/app.js) — DOMContentLoaded handler; initializes UI instance and global `appState`
- [js/state.js](js/state.js) — `DraftState` class (observer pattern); single source of truth
- [js/ui.js](js/ui.js) — `UI` class; renders DOM, handles events, calls SvgBuilder, injects SVG strings
- [js/svg-builder.js](js/svg-builder.js) — `SvgBuilder` static class; generates SVG pattern & layout strings
- [js/validation.js](js/validation.js) — `MeasurementRule` objects with min/max bounds in cm
- [js/measurements.js](js/measurements.js) — Size presets (S/M/L) and UI label mappings

## Critical State & Dataflow

**Canonical measurement unit: centimeters** (stored in `DraftState.measurements`).

1. User enters value in UI (input field) at current unit (cm or inci).
2. `UI._renderMeasurementFields()` calls `state.updateMeasurement(key, value)`.
3. `updateMeasurement()` converts to cm if needed: `cmValue = this.unit === 'cm' ? numValue : this._inchToCm(numValue)`.
4. Value validated against `MeasurementRule` min/max; errors stored in `measurementErrors`.
5. `_bumpCanvasVersion()` increments counter and notifies all listeners.
6. `UI.render()` checks version change; if changed, calls `SvgBuilder.buildSewingPattern(garmentType, measurements, leherType, unit)` (or `buildCuttingLayout`) with cm measurements.
7. SVG string injected into `svgContainer.innerHTML`.

**Key detail**: `UI.getMeasurement(key)` returns display value (converted to current unit); `state.getMeasurementsInCm()` returns cm dict for SVG builder. For neck variations (leherMelayu), `state.leher` holds the selected type (teluk/cekak/tunku).

## Implementing New Patterns

1. Add method `_garmentNamePattern(m, u)` and `_garmentNameCuttingLayout(m, width)` in `SvgBuilder`.
2. Add cases to switch statements in `buildSewingPattern(garmentType, measurements, leherType, unit)` and `buildCuttingLayout(garmentType, measurements, width, leherType)`.
3. Use hardcoded pixel origins (e.g., `const x0 = 50, y0 = 25`) for positioning; parameter `m` contains cm measurements.
4. Return SVG string with embedded `<style>` for `.piece`, `.grain`, `.label`, `.fold` classes.
5. For patterns with neck variations, check the `leherType` parameter within the method to adjust geometry.

Example: `_bajuKurungPattern(m, u)` reads `m.lebar`, `m.labuh` (cm) and outputs SVG with piece coordinates calculated from these values.

## Adding Measurements

1. Define `MeasurementRule` in [js/validation.js](js/validation.js) with min/max in cm.
2. Add S/M/L default values to `sizeMeasurements` in [js/measurements.js](js/measurements.js) (cm values).
3. UI auto-renders the field; **key names must match across files**.
4. Validation runs automatically in `updateMeasurement()`; errors appear in UI via `_renderErrors()`.

Example: Adding `tangan_lebar` measurement:

- validation.js: `'tangan_lebar': new MeasurementRule(5, 20, 'Lebar Tangan')`
- measurements.js: add `'tangan_lebar': 18.5` to each size in `sizeMeasurements`

## HTML/DOM Conventions

- Uses `data-*` attributes for state (e.g., `<button data-garment="bajuKurung">`).
- Flexible element selectors: fallback to querySelector if id not found (e.g., `document.getElementById('sewingPatternBtn') || document.querySelector('.view-btn[data-view="sewingPattern"]')`).
- Button groups for garment/size; unit toggle in header; measurements grid in side panel.

## Language & Labels

UI strings are in **Bahasa Melayu**. Label objects in measurements.js map keys to display text:

- `garmentLabels`: garment type keys → display names
- `viewLabels`: view mode keys → display names
  Keep label keys consistent across files.

## Debugging Patterns

- **State changes not reflecting**: Check `canvasVersion` increment; ensure `render()` listener is attached.
- **Measurements not validating**: Verify rule exists in validation.js and internal storage unit is cm.
- **Canvas not updating**: Check `svgContainer.innerHTML` assignment; verify SVG string is being generated.
- **Unit conversion issues**: Confirm `_cmToInch()` and `_inchToCm()` are used correctly in getters/setters.

## Implemented Garments

Six garment types fully implemented with both sewing patterns and cutting layouts:

1. **Baju Kurung** — Traditional Malay tunic with kekek detail
2. **Kain Susun Tepi** — Skirt with edge pleats (varies by size)
3. **Leher Baju Kurung** — Neckline trim for Baju Kurung
4. **Baju Melayu** — Formal Malay shirt with placket
5. **Seluar** — Trousers
6. **Leher Baju Melayu** — Neckline trim for Baju Melayu with three style variations (notched/teluk, straight/cekak, V-shaped/tunku)

## Neck Type Parameter

For `leherMelayu` garment, the `leherType` parameter controls style:

- `"teluk"` (default): Notched neckline (U-shaped)
- `"cekak"`: Straight neckline
- `"tunku"`: V-shaped neckline

Set via `appState.setLeher(type)` in state.js; UI provides radio buttons for selection.

## Project Constraints

- **No build system**: Vanilla JS modules loaded via script tags; edits live after refresh.
- **No npm/bundler**: Do not add dependencies or build-only code without explaining how to run it.
- **Global scope**: `DraftState`, `UI`, `SvgBuilder` classes and `appState` instance are global.
- **Canonical unit**: Measurements always stored in cm; never change storage unit.

## When to Escalate

- Adding new dependency or build tooling → ask first.
- Clarification on garment geometry → ask (patterns are domain knowledge).
- Breaking DOM assumptions (e.g., moving elements, changing structure) → verify impact on selector fallbacks.
