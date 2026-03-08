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
      "belahan_leher",
      "lebar_kekek",
      "pesak_atas",
      "pesak_bawah",
      "basi_sambungan",
      "basi_lipatan",
      "basi_leher",
      "labuh_kain",
      "pinggul",
      "kelonggaran",
      "susun_tepi",
      "bil_susun",
    ];
    this.bajuMelayuMeasurements = [
      "m_lebar",
      "m_labuh",
      "m_labuh_lengan",
      "m_lebar_lengan",
      "m_bukaan_lengan",
      "leher",
      "m_belahan_leher",
      "m_lebar_kekek",
      "m_pesak_atas",
      "m_pesak_bawah",
      "poket_atas",
      "poket_bawah",
      "basi_sambungan",
      "basi_lipatan",
      "basi_leher",
      "labuh_seluar",
      "m_pinggul",
      "cawat",
      "bukaan_kaki",
    ];
    this.bajuMelayuTelukMeasurements = [
      "m_lebar",
      "m_labuh",
      "m_labuh_lengan",
      "m_lebar_lengan",
      "m_bukaan_lengan",
      "leher_teluk",
      "belahan_leher_teluk",
      "m_lebar_kekek",
      "m_pesak_atas",
      "m_pesak_bawah",
      "poket_atas",
      "poket_bawah",
      "basi_sambungan",
      "basi_lipatan",
      "basi_leher",
      "labuh_seluar",
      "m_pinggul",
      "cawat",
      "bukaan_kaki",
    ];

    this.elements = {
      viewToggle:
        document.getElementById("viewToggle") ||
        document.querySelector(".view-toggle"),
      unitToggle:
        document.getElementById("unitToggle") ||
        document.querySelector(".unit-toggle"),
      widthToggle:
        document.getElementById("widthToggle") ||
        document.querySelector(".width-toggle"),
      leherRadio:
        document.getElementById("leherRadio") ||
        document.querySelector(".leher-radio"),
      garmentSelect: document.getElementById("garmentSelect") || null,
      sizeSelect: document.getElementById("sizeSelect") || null,
      garmentButtons: document.querySelectorAll(".garment-btn"),
      sizeButtons: document.querySelectorAll(".size-btn"),
      leherButtons: document.getElementsByName("jenis_leher") || null,
      measurementContainer:
        document.getElementById("measurementContainer") ||
        document.getElementById("measurementsContainer"),
      canvas: document.getElementById("canvas") || null,
      svgContainer: document.getElementById("svgContainer"),
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
    if (this.elements.viewToggle) {
      this.elements.viewToggle.addEventListener("click", (e) => {
        const btn = e.target.closest && e.target.closest(".toggle-btn");
        if (btn && btn.dataset && btn.dataset.view) {
          this.state.setView(btn.dataset.view);
        } else {
          const newUnit =
            this.state.view === "sewingPattern"
              ? "cuttingLayout"
              : "sewingPattern";
          this.state.setUnit(newUnit);
        }
      });
    }

    // Unit toggle (support .unit-toggle container with .unit-btn children)
    if (this.elements.unitToggle) {
      this.elements.unitToggle.addEventListener("click", (e) => {
        const btn = e.target.closest && e.target.closest(".toggle-btn");
        if (btn && btn.dataset && btn.dataset.unit) {
          this.state.setUnit(btn.dataset.unit === "cm" ? "cm" : "inci");
        } else {
          const newUnit = this.state.unit === "cm" ? "inci" : "cm";
          this.state.setUnit(newUnit);
        }
      });
    }

    // Width toggle (support .width-toggle container with .width-btn children)
    if (this.elements.widthToggle) {
      this.elements.widthToggle.addEventListener("click", (e) => {
        const btn = e.target.closest && e.target.closest(".width-btn");
        if (btn && btn.dataset && btn.dataset.width) {
          this.state.setWidth(btn.dataset.width);
        } else {
          const newWidth = this.state.width === "45" ? "60" : "45";
          this.state.setWidth(newWidth);
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

    // Leher Radio (radio group)
    if (this.elements.leherButtons && this.elements.leherButtons.length) {
      this.elements.leherButtons.forEach((rad) => {
        rad.addEventListener("click", (e) => {
          this.state.setLeher(rad.value);
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
    // this.elements.sewingPatternBtn?.classList.toggle(
    //   "active",
    //   this.state.view === "sewingPattern"
    // );
    // this.elements.cuttingLayoutBtn?.classList.toggle(
    //   "active",
    //   this.state.view === "cuttingLayout"
    // );
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
    // if (this.elements.unitLabel) {
    //   this.elements.unitLabel.textContent = this.state.unit.toUpperCase();
    // }

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

    // Update view button active states inside view-toggle
    if (this.elements.viewToggle) {
      const viewBtns = this.elements.viewToggle.querySelectorAll(".toggle-btn");
      viewBtns.forEach((b) => {
        b.ariaPressed = b.dataset.view === this.state.view;
      });
    }

    // Update unit button active states inside unit-toggle
    if (this.elements.unitToggle) {
      const unitBtns = this.elements.unitToggle.querySelectorAll(".toggle-btn");
      unitBtns.forEach((b) => {
        b.ariaPressed = b.dataset.unit === this.state.unit;
      });
    }

    // Update width button active states inside width-toggle
    if (this.elements.widthToggle) {
      const widthBtns =
        this.elements.widthToggle.querySelectorAll(".toggle-btn");
      widthBtns.forEach((b) => {
        b.ariaPressed = b.dataset.width === this.state.width;
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
        case "kain":
          if (!this.bajuKurungMeasurements.includes(key)) return;
          break;
        case "leherKurung":
          if (!this.bajuKurungMeasurements.includes(key)) return;
          break;
        case "bajuMelayu":
          if (this.state.leher === "teluk") {
            if (!this.bajuMelayuTelukMeasurements.includes(key)) return;
            break;
          } else {
            if (!this.bajuMelayuMeasurements.includes(key)) return;
            break;
          }
        case "seluar":
          if (this.state.leher === "teluk") {
            if (!this.bajuMelayuTelukMeasurements.includes(key)) return;
            break;
          } else {
            if (!this.bajuMelayuMeasurements.includes(key)) return;
            break;
          }
        case "leherMelayu":
          if (this.state.leher === "teluk") {
            if (!this.bajuMelayuTelukMeasurements.includes(key)) return;
            break;
          } else {
            if (!this.bajuMelayuMeasurements.includes(key)) return;
            break;
          }
      }

      const displayValue = this.state.getMeasurement(key);
      const hasError = this.state.measurementErrors[key];

      const fieldDiv = document.createElement("div");
      fieldDiv.className = "field-measure";

      const label = document.createElement("label");
      label.className = "label-measure";
      label.htmlFor = `${key}`;
      label.textContent = `${rule.label}`;

      const inputGroup = document.createElement("div");
      inputGroup.className = "input-group-measure";

      const input = document.createElement("input");
      input.classList.add("gjs-t-border");
      input.classList.add("input-measure");
      input.id = `${key}`;
      input.type = "number";
      input.value = displayValue;

      switch (key) {
        case "bil_susun":
          input.step = "1";
          break;
        default:
          input.step = "0.01";
          break;
      }

      //input.className = "measurement-input" + (hasError ? " error" : "");

      input.addEventListener("change", (e) => {
        this.state.updateMeasurement(key, e.target.value);
      });

      const unit = document.createElement("span");
      unit.className = "suffix";
      unit.textContent = this.state.unit;

      inputGroup.appendChild(input);
      switch (key) {
        case "bil_susun":
          break;
        default:
          inputGroup.appendChild(unit);
          break;
      }

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
      svg = SvgBuilder.buildSewingPattern(
        this.state.garment,
        measurements,
        this.state.leher,
        this.state.unit
      );
      this.elements.widthToggle.style.display = "none";

      if (this.state.garment === "leherMelayu") {
        this.elements.leherRadio.style.display = "block";
      } else {
        this.elements.leherRadio.style.display = "none";
      }
    } else {
      svg = SvgBuilder.buildCuttingLayout(
        this.state.garment,
        measurements,
        this.state.width,
        this.state.leher
      );

      if (this.state.garment === "leherKurung") {
        this.elements.widthToggle.style.display = "none";
        this.elements.leherRadio.style.display = "none";
      } else if (this.state.garment === "leherMelayu") {
        this.elements.widthToggle.style.display = "none";
        this.elements.leherRadio.style.display = "block";
      } else {
        this.elements.widthToggle.style.display = "block";
        this.elements.leherRadio.style.display = "none";
      }
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
