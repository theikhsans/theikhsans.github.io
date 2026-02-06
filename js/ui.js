/**
 * UI - User Interface Management
 * Handles DOM rendering and event handling
 */

class UI {
  constructor(state) {
    this.state = state;
    this.lastCanvasVersion = -1;

    this.bajuKurungMeasurements = [
      "lebar",
      "labuh",
      "labuh_lengan",
      "lebar_lengan",
      "bukaan_lengan",
      "leher",
      "lebar_kekek",
      "pesak_atas",
      "pesak_bawah",
    ];
    this.bajuMelayuMeasurements = [
      "m_lebar",
      "m_labuh",
      "m_labuh_lengan",
      "m_lebar_lengan",
      "m_bukaan_lengan",
      "leher",
      "m_lebar_kekek",
      "m_pesak_atas",
      "m_pesak_bawah",
      "poket_atas",
      "poket_bawah",
    ];

    // Cache DOM elements (use fallbacks to match existing HTML structure)
    this.elements = {
      // Top nav (buttons may be static elements with data-view)
      sewingPatternBtn:
        document.getElementById("sewingPatternBtn") ||
        document.querySelector('.view-btn[data-view="sewingPattern"]'),
      cuttingLayoutBtn:
        document.getElementById("cuttingLayoutBtn") ||
        document.querySelector('.view-btn[data-view="cuttingLayout"]'),
      unitToggle:
        document.getElementById("unitToggle") ||
        document.querySelector(".unit-toggle"),
      unitLabel: document.getElementById("unitLabel") || null,

      // Garment & Size (either selects or button groups)
      garmentSelect: document.getElementById("garmentSelect") || null,
      sizeSelect: document.getElementById("sizeSelect") || null,
      garmentButtons: document.querySelectorAll(".garment-btn"),
      sizeButtons: document.querySelectorAll(".size-btn"),

      // Measurements (support both singular/plural id)
      measurementContainer:
        document.getElementById("measurementContainer") ||
        document.getElementById("measurementsContainer"),

      // Canvas
      canvas: document.getElementById("canvas") || null,
      svgContainer: document.getElementById("svgContainer"),

      // Info
      errorMessage: document.getElementById("errorMessage") || null,
    };

    // Attach event listeners
    this._attachEventListeners();

    // Listen to state changes
    this.state.addListener(() => this.render());
  }

  /**
   * Attach all event listeners
   */
  _attachEventListeners() {
    // View buttons (support buttons with data-view)
    if (this.elements.sewingPatternBtn) {
      this.elements.sewingPatternBtn.addEventListener("click", () =>
        this.state.setView("sewingPattern")
      );
    }
    if (this.elements.cuttingLayoutBtn) {
      this.elements.cuttingLayoutBtn.addEventListener("click", () =>
        this.state.setView("cuttingLayout")
      );
    }

    // Unit toggle (support .unit-toggle container with .unit-btn children)
    if (this.elements.unitToggle) {
      this.elements.unitToggle.addEventListener("click", (e) => {
        const btn = e.target.closest && e.target.closest(".unit-btn");
        if (btn && btn.dataset && btn.dataset.unit) {
          this.state.setUnit(btn.dataset.unit === "cm" ? "cm" : "inci");
        } else {
          const newUnit = this.state.unit === "cm" ? "inci" : "cm";
          this.state.setUnit(newUnit);
        }
      });
    }

    // Garment buttons (button group)
    if (this.elements.garmentButtons && this.elements.garmentButtons.length) {
      this.elements.garmentButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const g = btn.dataset.garment;
          if (g) this.state.setGarment(g);
        });
      });
    }

    // Size buttons (button group)
    if (this.elements.sizeButtons && this.elements.sizeButtons.length) {
      this.elements.sizeButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const s = btn.dataset.size;
          if (s) this.state.setSize(s);
        });
      });
    }

    // Garment/size selects (if present)
    this.elements.garmentSelect?.addEventListener("change", (e) =>
      this.state.setGarment(e.target.value)
    );
    this.elements.sizeSelect?.addEventListener("change", (e) =>
      this.state.setSize(e.target.value)
    );
  }

  /**
   * Main render function
   */
  render() {
    this._updateButtonStates();
    this._updateSelectStates();
    this._renderMeasurementFields();
    this._renderCanvas();
    this._renderErrors();
  }

  /**
   * Update button active states
   */
  _updateButtonStates() {
    this.elements.sewingPatternBtn?.classList.toggle(
      "active",
      this.state.view === "sewingPattern"
    );
    this.elements.cuttingLayoutBtn?.classList.toggle(
      "active",
      this.state.view === "cuttingLayout"
    );
  }

  /**
   * Update select element values
   */
  _updateSelectStates() {
    if (this.elements.garmentSelect) {
      this.elements.garmentSelect.value = this.state.garment;
    }
    if (this.elements.sizeSelect) {
      this.elements.sizeSelect.value = this.state.size;
    }

    // Update unit label
    if (this.elements.unitLabel) {
      this.elements.unitLabel.textContent = this.state.unit.toUpperCase();
    }

    // Update garment button active states (if using button group)
    if (this.elements.garmentButtons && this.elements.garmentButtons.length) {
      this.elements.garmentButtons.forEach((btn) => {
        btn.classList.toggle(
          "active",
          btn.dataset.garment === this.state.garment
        );
      });
    }

    // Update size button active states
    if (this.elements.sizeButtons && this.elements.sizeButtons.length) {
      this.elements.sizeButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.size === this.state.size);
      });
    }

    // Update unit button active states inside unit-toggle
    if (this.elements.unitToggle) {
      const unitBtns = this.elements.unitToggle.querySelectorAll(".unit-btn");
      unitBtns.forEach((b) => {
        b.classList.toggle("active", b.dataset.unit === this.state.unit);
      });
    }
  }

  /**
   * Render measurement input fields
   */
  _renderMeasurementFields() {
    const container = this.elements.measurementContainer;
    if (!container) return;

    container.innerHTML = "";

    Object.entries(this.state.measurements).forEach(([key, value]) => {
      const rule = measurementRules[key];
      if (!rule) return;

      switch (this.state.garment) {
        case "bajuKurung":
          if (!this.bajuKurungMeasurements.includes(key)) return;
          break;
        case "bajuMelayu":
          if (!this.bajuMelayuMeasurements.includes(key)) return;
          break;
      }

      const displayValue = this.state.getMeasurement(key);
      const hasError = this.state.measurementErrors[key];

      const fieldDiv = document.createElement("div");
      fieldDiv.className = "measurement-field";

      const label = document.createElement("div");
      label.className = "measurement-label";
      label.htmlFor = `input-${key}`;
      label.textContent = `${rule.label}`;

      const inputGroup = document.createElement("div");
      inputGroup.className = "measurement-input-group";

      const input = document.createElement("input");
      input.id = `input-${key}`;
      input.type = "number";
      input.value = displayValue;
      input.step = "0.1";
      input.className = "measurement-input" + (hasError ? " error" : "");

      input.addEventListener("change", (e) => {
        this.state.updateMeasurement(key, e.target.value);
      });

      const unit = document.createElement("div");
      unit.className = "measurement-unit";
      unit.textContent = this.state.unit;

      inputGroup.appendChild(input);
      inputGroup.appendChild(unit);

      fieldDiv.appendChild(label);
      fieldDiv.appendChild(inputGroup);

      if (hasError) {
        const error = document.createElement("span");
        error.className = "error-text";
        error.textContent = this.state.measurementErrors[key];
        fieldDiv.appendChild(error);
      }

      container.appendChild(fieldDiv);
    });
  }

  /**
   * Render SVG canvas
   */
  _renderCanvas() {
    if (this.lastCanvasVersion === this.state.canvasVersion) {
      return; // No change
    }

    this.lastCanvasVersion = this.state.canvasVersion;

    // Don't generate SVG if there are measurement errors
    if (Object.keys(this.state.measurementErrors).length > 0) {
      if (this.elements.svgContainer) {
        this.elements.svgContainer.innerHTML =
          '<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="700" fill="#f5f5f5"/><text x="450" y="350" text-anchor="middle" font-size="16" fill="#999">Sila betulkan ukuran yang tidak sah</text></svg>';
      }
      return;
    }

    const measurements = this.state.getMeasurementsInCm();
    let svg;

    if (this.state.view === "sewingPattern") {
      svg = SvgBuilder.buildSewingPattern(this.state.garment, measurements);
    } else {
      svg = SvgBuilder.buildCuttingLayout(this.state.garment, measurements);
    }

    if (this.elements.svgContainer) {
      this.elements.svgContainer.innerHTML = svg;
    }
  }

  /**
   * Render error messages
   */
  _renderErrors() {
    const errorCount = Object.keys(this.state.measurementErrors).length;

    if (this.elements.errorMessage) {
      if (errorCount > 0) {
        this.elements.errorMessage.textContent = `${errorCount} pengukuran di luar batas yang diizinkan`;
        this.elements.errorMessage.style.display = "block";
      } else {
        this.elements.errorMessage.style.display = "none";
      }
    }
  }
}
