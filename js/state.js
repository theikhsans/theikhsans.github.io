/**
 * State Management - Single Source of Truth
 * Manages app state and notifies listeners of changes
 */

class DraftState {
  constructor() {
    this.view = "sewingPattern";
    this.garment = "bajuKurung";
    this.size = "M";
    this.unit = "inci";
    this.measurements = {};
    this.measurementErrors = {};
    this.canvasVersion = 0;
    this.width = "45"; // New state property for width
    this.leher = "cekak";

    // Listeners
    this.listeners = [];

    // Initialize with default measurements
    this._loadSizeDefaults();
  }

  /**
   * Add a listener that will be called when state changes
   */
  addListener(callback) {
    this.listeners.push(callback);
  }

  /**
   * Remove a listener
   */
  removeListener(callback) {
    this.listeners = this.listeners.filter((l) => l !== callback);
  }

  /**
   * Notify all listeners of state change
   */
  _notifyListeners() {
    this.listeners.forEach((callback) => callback(this));
  }

  /**
   * Bump canvas version to trigger re-render
   */
  _bumpCanvasVersion() {
    this.canvasVersion++;
    this._notifyListeners();
  }

  /**
   * Load default measurements for current size
   */
  _loadSizeDefaults() {
    const defaults = sizeMeasurements[this.size];
    if (defaults) {
      this.measurements = { ...defaults };
    }
    this.measurementErrors = {};
  }

  /**
   * Set view mode (sewingPattern or cuttingLayout)
   */
  setView(newView) {
    if (this.view !== newView) {
      this.view = newView;
      this._bumpCanvasVersion();
    }
  }

  /**
   * Set garment type
   */
  setGarment(newGarment) {
    if (this.garment !== newGarment) {
      this.garment = newGarment;
      this._bumpCanvasVersion();
    }
  }

  /**
   * Set size (S, M, L)
   */
  setSize(newSize) {
    if (this.size !== newSize) {
      this.size = newSize;
      this._loadSizeDefaults();
      //this._convertToCurrentUnit();
      this._bumpCanvasVersion();
    }
  }

  /**
   * Set measurement unit (cm or inch)
   */
  setUnit(newUnit) {
    if (this.unit !== newUnit) {
      this.unit = newUnit;
      // this._convertToCurrentUnit();
      this._revalidateMeasurements();
      this._bumpCanvasVersion();
    }
  }

  /**
   * Set fabric width (45 or 60)
   */
  setWidth(newWidth) {
    if (this.width !== newWidth) {
      this.width = newWidth;
      this._bumpCanvasVersion();
    }
  }

  /**
   * Set leher type (teluk, cekak or tunku)
   */
  setLeher(newLeher) {
    if (this.leher !== newLeher) {
      this.leher = newLeher;
      this._bumpCanvasVersion();
    }
  }

  /**
   * Update a single measurement value
   */
  updateMeasurement(key, value) {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      // Store in cm internally
      let cmValue = 0;

      switch (key) {
        case "bil_susun":
          cmValue = numValue;
          break;
        default:
          cmValue = this.unit === "cm" ? numValue : this._inchToCm(numValue);
          break;
      }

      this.measurements[key] = cmValue;

      // Validate
      this._validateMeasurement(key);

      this._bumpCanvasVersion();
    }
  }

  /**
   * Get measurement value in current unit
   */
  getMeasurement(key) {
    const cmValue = this.measurements[key];
    if (cmValue === undefined) return "";

    if (key === "bil_susun") {
      return cmValue.toFixed(0);
    } else if (this.unit === "cm") {
      return cmValue.toFixed(2);
    } else {
      return this._cmToInch(cmValue).toFixed(2);
    }
  }

  /**
   * Validate single measurement against rules
   */
  _validateMeasurement(key) {
    const rule = measurementRules[key];
    const cmValue = this.measurements[key];

    if (!rule) {
      delete this.measurementErrors[key];
      return;
    }

    if (cmValue < rule.min || cmValue > rule.max) {
      if (key === "bil_susun") {
        this.measurementErrors[key] = `${rule.label}: ${rule.min}-${rule.max}`;
      } else if (this.unit === "cm") {
        this.measurementErrors[key] =
          `${rule.label}: ${rule.min}-${rule.max} cm`;
      } else {
        const minInch = this._cmToInch(rule.min).toFixed(2);
        const maxInch = this._cmToInch(rule.max).toFixed(2);
        this.measurementErrors[key] =
          `${rule.label}: ${minInch}-${maxInch} inci`;
      }
    } else {
      delete this.measurementErrors[key];
    }
  }

  /**
   * Revalidate all measurements
   */
  _revalidateMeasurements() {
    Object.keys(this.measurements).forEach((key) => {
      this._validateMeasurement(key);
    });
  }

  /**
   * Convert cm to inches
   */
  _cmToInch(cm) {
    return cm / 2.54;
  }

  /**
   * Convert inches to cm
   */
  _inchToCm(inch) {
    return inch * 2.54;
  }

  /**
   * Get all measurements in cm (for drafting)
   */
  getMeasurementsInCm() {
    return { ...this.measurements };
  }
}

// Global state instance
const appState = new DraftState();
