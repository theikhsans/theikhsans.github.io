# Sewing Pattern Generator - HTML Version

Pure vanilla JavaScript web application for generating and displaying sewing pattern drafts and cutting layouts for traditional Malay clothing.

## Quick Start

1. **Open the app**: Simply open `index.html` in a web browser
   - No build process required
   - No dependencies to install
   - Works offline

2. **Select a garment**: Choose from six Malay clothing types:
   - Baju Kurung (traditional tunic)
   - Kain Susun Tepi (skirt with edge pleats)
   - Leher Baju Kurung (neckline trim)
   - Baju Melayu (formal shirt)
   - Seluar (trousers)
   - Leher Baju Melayu (neckline trim with 3 style variations)

3. **Choose a size**: Select from multiple size options:
   - Letter sizes: XS, S, M (default), L, XL, XXL
   - Numeric sizes: 1, 2, 4, 6, 8, 10

4. **Adjust measurements**:
   - All default measurements are in centimeters
   - Toggle between cm and inches using the unit button
   - Invalid entries are highlighted in red

5. **View patterns**: Switch between "Pola Jahitan" (Sewing Pattern) and "Susun Atur Pola" (Cutting Layout)

6. **Neck type variations** (for Leher Baju Melayu):
   - Teluk (notched/U-shaped neckline)
   - Cekak (collar neckline)
   - Tunku (collar neckline)

## Features

- **No Dependencies**: Pure vanilla JavaScript with zero npm packages
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Measurement Validation**: Real-time validation with min/max bounds
- **Unit Conversion**: Toggle between centimeters and inches
- **SVG Export**: Patterns displayed as scalable SVG graphics
- **Grain Lines**: Visual indicators for fabric grain direction
- **Cutting Layout**: Optimized fabric cutting arrangement

## Project Structure

```
PATTERN_GENERATOR/
├── index.html           # Main application entry point
├── styles.css          # Complete responsive styling
├── test.html           # Comprehensive test suite
└── js/
    ├── app.js          # Application initialization (10 lines)
    ├── state.js        # State management & DraftState class (180 lines)
    ├── measurements.js # Size presets & data (40 lines)
    ├── validation.js   # Measurement validation rules (20 lines)
    ├── svg-builder.js  # SVG pattern generation (250+ lines)
    └── ui.js           # DOM rendering & event handling (150+ lines)
```

## File Descriptions

### HTML & CSS

- **index.html**: Semantic HTML structure with layout sections:
  - **Header**: Title "Pola The Ikhsans" with subtitle
  - **Main section**: Organized with:
    - Pattern/Size selector card (garment dropdown, size dropdown, leher type radio buttons, fabric width toggle)
    - Canvas display card (Pola Jahitan/Susun Atur Pola view toggle, SVG container)
    - Measurements edit card (unit toggle: cm/inci, measurement input fields)
  - **Error display**: Inline validation messages on invalid entries

- **styles.css**: Optimized CSS including:
  - Responsive flexbox layout
  - Mobile-first breakpoints (768px, 1024px)
  - Form styling with validation states and custom radio button colors
  - Canvas area styling
  - Material Design color scheme

### JavaScript Modules

- **state.js** (180 lines): `DraftState` class
  - Single source of truth for app state
  - Observer pattern with `addListener()`/`_notifyListeners()`
  - Measurement storage in cm (internal)
  - Unit conversion (display only)
  - Validation integration
  - `_bumpCanvasVersion()` triggers UI updates

- **measurements.js** (40 lines): Data layer
  - `sizeMeasurements`: Size presets (indexed by numeric keys 1, 2, 4...) with cm values
  - UI displays sizes as: XS, S, M, L, XL, XXL (letter) or numeric 1-10
  - `garmentLabels`: Display labels for garment types
  - `viewLabels`: Display labels for view modes

- **validation.js** (20 lines): Validation rules
  - `MeasurementRule` class with min/max bounds
  - `measurementRules` object mapping keys to rules
  - All bounds in centimeters

- **svg-builder.js** (250+ lines): Pattern generation
  - `SvgBuilder` static class
  - `buildSewingPattern(garmentType, measurements, leherType, unit)`: Main pattern view with seam allowances
  - `buildCuttingLayout(garmentType, measurements, width, leherType)`: Fabric cutting arrangement
  - Grain line indicators
  - Fold line markers
  - Hardcoded pixel origins for positioning
  - Six garment types fully implemented with both sewing patterns and cutting layouts
  - Supports `leherType` parameter (teluk/cekak/tunku) for neck variations

- **ui.js** (150+ lines): User interface layer
  - `UI` class with DOM element caching
  - Event listener attachment
  - Reactive rendering on state changes
  - Measurement field generation
  - SVG canvas updates
  - Error message display
  - Button and select state management

- **app.js** (10 lines): Entry point
  - Waits for DOMContentLoaded
  - Creates UI instance with appState
  - Renders initial UI

## Architecture & Design Patterns

### State Management

Uses **Observer Pattern** (not Redux/MobX):

- `DraftState` maintains single source of truth
- Components call `state.addListener(callback)`
- When state changes: `_notifyListeners()` triggers all callbacks
- UI re-renders on state changes via listener

### Measurement System

**Internal storage ALWAYS in centimeters**:

1. All measurements stored in `DraftState._measurements` as cm values
2. User input converted to cm before storage
3. Validation rules defined in cm
4. Display conversion happens only in `getMeasurement()` getter
5. When unit changes: all values revalidated in cm

### Component Communication

```
User Input (UI)
    → state.updateMeasurement()
    → validate in cm
    → store in cm
    → _bumpCanvasVersion()
    → listeners fire
    → UI.render()
    → canvas updates with measurement display in current unit
```

### SVG Generation Flow

1. `UI._renderCanvas()` calls `SvgBuilder.buildSewingPattern()` or `buildCuttingLayout()`
2. SvgBuilder receives measurements map (in cm)
3. Generates SVG string with template literals
4. Hardcoded pixel space conversion (origin: 100, 100)
5. Returns SVG string
6. `UI` injects SVG into DOM via `svgContainer.innerHTML`

## Testing

Open `test.html` in a browser to run the test suite:

- Module loading tests
- DraftState functionality tests
- Measurement data validation
- Validation rules verification
- SVG generation tests
- Full integration tests

## Adding New Measurements

1. **Add validation rule** in `js/validation.js`:

   ```javascript
   'new_key': new MeasurementRule(min, max, 'Display Label'),
   ```

2. **Add default value** in `js/measurements.js`:

   ```javascript
   'S': { ..., 'new_key': 123.4 },
   'M': { ..., 'new_key': 125.6 },
   'L': { ..., 'new_key': 127.8 },
   ```

3. **UI automatically renders** the field (no code changes needed)

## Adding New Garment Type

1. **Add to state** (already in code): Just needs to match in next steps
2. **Implement SVG patterns** in `svg-builder.js`:

   ```javascript
   static _newGarmentPattern(m) {
       // Return SVG string
   }

   static _newGarmentCuttingLayout(m) {
       // Return SVG string
   }
   ```

3. **Update buildSewingPattern() and buildCuttingLayout()** switch cases

## Unit Conversion

- **Internal Storage**: All measurements in cm
- **Display**: `getMeasurement(key)` returns value in current unit
- **Validation**: All rules in cm, validation happens before storage
- **Conversion Formulas**:
  - `cm → inch`: value / 2.54
  - `inch → cm`: value × 2.54

## Performance

- **No build process**: Files load directly from disk
- **SVG generation**: ~1-2ms per pattern (template literals are fast)
- **DOM updates**: Only when `canvasVersion` changes
- **Memory**: Minimal footprint (~50KB JS + HTML + CSS)

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Language

All UI text is in **Bahasa Melayu**:

- Garment names: Baju Kurung, Baju Melayu, Baju Kebaya
- View modes: Pola Jahitan (Sewing Pattern), Susun Atur Pola (Cutting Layout)
- Measurement labels: In Malay with descriptions
- Error messages: In Malay

## Development

### Hot Reload

Since there's no build process, changes take effect immediately:

1. Edit any `.js` or `.css` file
2. Refresh the browser (F5)
3. Changes appear instantly

### Debugging

- Open browser DevTools (F12)
- Console logs available in state.js setters
- All objects are in global scope for inspection:
  - `appState`: Global DraftState instance
  - `DraftState`, `UI`, `SvgBuilder`, `measurementRules`: Class definitions

### Adding Logging

Open `js/state.js` and uncomment/add `console.log()` statements in setters:

```javascript
setGarment(newGarment) {
    console.log('Setting garment to:', newGarment);
    // ...
}
```

## License

This HTML/CSS/JS version is a faithful conversion of the original Flutter sewing_pattern_app project.
