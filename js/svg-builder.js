/**
 * SVG Builder - Pattern Generation
 * Converts measurements into SVG strings
 */

class SvgBuilder {
  /**
   * Build sewing pattern SVG
   */
  static buildSewingPattern(garmentType, measurements, leherType) {
    switch (garmentType) {
      case "bajuKurung":
        return this._bajuKurungPattern(measurements);
      case "kain":
        return this._kainPattern(measurements);
      case "leherKurung":
        return this._leherKurungPattern(measurements);
      case "bajuMelayu":
        return this._bajuMelayuPattern(measurements);
      case "seluar":
        return this._seluarPattern(measurements);
      case "leherMelayu":
        return this._leherMelayuPattern(measurements, leherType);
      default:
        return this._placeholderSvg();
    }
  }

  /**
   * Build cutting layout SVG
   */
  static buildCuttingLayout(garmentType, measurements, width, leherType) {
    switch (garmentType) {
      case "bajuKurung":
        return this._bajuKurungCuttingLayout(measurements, width);
      case "kain":
        return this._bajuKurungCuttingLayout(measurements, width);
      case "leherKurung":
        return this._leherKurungCuttingLayout(measurements);
      case "bajuMelayu":
        return this._bajuMelayuCuttingLayout(measurements, width);
      case "seluar":
        return this._bajuMelayuSeluarCuttingLayout(measurements, width);
      case "leherMelayu":
        return this._leherMelayuCuttingLayout(measurements, leherType);
      default:
        return this._placeholderSvg();
    }
  }

  /**
   * Baju Kurung sewing pattern
   */
  static _bajuKurungPattern(m) {
    const x0 = 40,
      y0 = 25;

    const x1 = x0 + m.lebar;
    const y1 = y0 + m.labuh;
    const x2 = x1 + m.labuh_lengan;
    const y2 = y0 + m.bukaan_lengan;
    const y3 = y0 + m.lebar_lengan;
    const x3 = x1 + m.pesak_atas;
    const x4 = x1 + m.pesak_bawah;
    const x5 = x3 + m.lebar_kekek;
    const y4 = y3 + m.lebar_kekek;
    const x6 = x0 + m.lebar / 2;
    const x7 = x6 + m.leher / 6;
    const x8 = x6 - m.leher / 6;
    const y5 = y0 + m.leher / 6 + 2;

    let svg = `<svg viewBox="0 0 180 150" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .piece { fill: none; stroke: #000; stroke-width: 1; }
                    .grain { stroke: #999; stroke-width: 1; stroke-dasharray: 5,5; }
                    .label { font-size: 6px; fill: #000; }
                    .fold { stroke: #f00; stroke-width: 1; stroke-dasharray: 3,3; }
                </style>
            </defs>
                       
            <!-- Body Piece -->
            <rect class="piece" x="${x0}" y="${y0}" width="${m.lebar}" height="${m.labuh}" />
            <text class="label" x="${x0 - 20}" y="${y1 - m.labuh / 2}">Badan</text>
            
            <!-- Sleeve -->
            <polygon class="piece" points="${x1},${y0} ${x2},${y0} ${x2},${y2} ${x1},${y3}" />
            <text class="label" x="${x2 + 3}" y="${y2 - m.bukaan_lengan / 2}">Lengan</text>
            
            <!-- Pesak -->
            <polygon class="piece" points="${x1},${y3} ${x3},${y3} ${x4},${y1} ${x1},${y1}" />
            <text class="label" x="${x1 + m.pesak_bawah}" y="${y1 - 5}">Pesak</text>

            <!-- Kekek -->
            <polygon class="piece" points="${x3},${y3} ${x5},${y3} ${x3},${y4}" transform ="rotate(-4 ${x3} ${y3})"/>
            <text class="label" x="${x3 + 5}" y="${y3 + 10}">Kekek</text>

            <!-- Leher -->
            <path class="piece" d="M${x7},${y0} C${x7},${y0 + (y5 - y0) / 2} ${x6 + (x7 - x6) / 2},${y5} ${x6},${y5} C${x6 - (x7 - x6) / 2},${y5} ${x8},${y0 + (y5 - y0) / 2} ${x8},${y0}" />
            <path class="piece" d="M${x8},${y0} C${x8},${y0 + 2} ${x7},${y0 + 2} ${x7},${y0} " />
            <line class="piece" x1="${x6}" y1="${y5}" x2="${x6}" y2="${y5 + m.belahan_leher}" />

            <!-- Labels -->
            <text class="label" x="${x0}" y="${y0}" dx="-3" dy="-3">A</text>
            <text class="label" x="${x1}" y="${y0}" dx="-2" dy="-3">B</text>
            <text class="label" x="${x1}" y="${y1}" dx="-2" dy="7">C</text>
            <text class="label" x="${x0}" y="${y1}" dx="-2" dy="7">D</text>
            <text class="label" x="${x2}" y="${y0}" dx="-3" dy="-3">E</text>
            <text class="label" x="${x2}" y="${y2}" dx="-2" dy="7">F</text>
            <text class="label" x="${x1}" y="${y3}" dx="-5" dy="3">G</text>
            <text class="label" x="${x3}" y="${y3}" dx="-2" dy="-3">H</text>
            <text class="label" x="${x4}" y="${y1}" dx="0" dy="7">I</text>
            <text class="label" x="${x5}" y="${y3}" dx="-2" dy="-3">J</text>
            <text class="label" x="${x3}" y="${y4}" dx="-4" dy="3">K</text>

        </svg>`;

    return svg;
  }

  /**
   * Kain Susun Tepi sewing pattern
   */
  static _kainPattern(m) {
    const x0 = 20,
      y0 = 25;

    let lines = "";
    for (let i = 0; i < m.bil_susun; i++) {
      // Spacing lines 20 units apart vertically
      const xPos = x0 + m.pinggul + m.kelonggaran + i * m.susun_tepi;
      lines += `<line x1="${xPos}" y1="${y0 + 20}" x2="${xPos}" y2="${y0 + 20 + m.labuh_kain}" stroke="black" />`;
    }

    let svg = `<svg viewBox="0 0 250 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .piece { fill: none; stroke: #000; stroke-width: 1; }
                    .grain { stroke: #999; stroke-width: 1; stroke-dasharray: 5,5; }
                    .label { font-size: 6px; fill: #000; }
                    .fold { stroke: #f00; stroke-width: 1; stroke-dasharray: 3,3; }
                </style>
            </defs>

            <!-- Kain Susun Tepi -->
            <rect class="piece" x="${x0}" y="${y0 + 20}" width="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun}" height="${m.labuh_kain}" />
            ${lines}
            
            <!-- Ikatan Pinggang -->
            <rect class="piece" x="${x0}" y="${y0}" width="${m.pinggul + m.kelonggaran + 3}" height="5" />

        </svg>`;

    return svg;
  }

  /**
   * Leher Baju Kurung sewing pattern
   */
  static _leherKurungPattern(m) {
    const x0 = 15,
      y0 = 10;

    const turunLeher = m.leher < 38.1 ? 1.27 : 1.91;
    const leher = m.leher / 6;

    let svg = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .piece { fill: none; stroke: #000; stroke-width: 0.25; }
                    .grain { stroke: #999; stroke-width: 0.25; stroke-dasharray: 1,1; }
                    .label { font-size: 6px; fill: #000; }
                    .fold { stroke: #f00; stroke-width: 1; stroke-dasharray: 3,3; }
                </style>
            </defs>

            <!-- Leher -->
            <path class="piece" d="M${x0},${y0} C${x0 + leher / 2},${y0} ${x0 + leher},${y0 + turunLeher / 2} ${x0 + leher},${y0 + turunLeher} C${x0 + leher},${y0 + turunLeher + (leher + turunLeher) / 2} ${x0 + leher / 2},${y0 + turunLeher * 2 + leher} ${x0},${y0 + turunLeher * 2 + leher}" />
            <path class="piece" d="M${x0},${y0 - 5.08} C${x0 + (leher + 5.08) * 0.4},${y0 - 5.08} ${x0 + leher + 5.08},${y0 - 5.08 + (turunLeher + 5.08) * 0.2} ${x0 + leher + 5.08},${y0 + turunLeher} C${x0 + leher + 5.08},${y0 + turunLeher + (leher + turunLeher + 5.08) * 0.6} ${x0 + (5.08 + leher) * 0.7},${y0 + turunLeher + (leher + turunLeher + 5.08) * 0.8} ${x0 + 5.08},${y0 + turunLeher + leher + turunLeher + 5.08}   L${x0 + 5.08},${y0 + turunLeher + leher + turunLeher + m.belahan_leher} ${x0},${y0 + turunLeher + leher + turunLeher + 5.08 + m.belahan_leher} z" />
            <line class="grain" x1="${x0}" y1="${y0 + turunLeher}" x2="${x0 + leher + 5.08}" y2="${y0 + turunLeher}" />

            <!-- Labels -->


        </svg>`;

    return svg;
  }

  /**
   * Baju Melayu sewing pattern (placeholder)
   */
  static _bajuMelayuPattern(m) {
    const x0 = 40,
      y0 = 25;

    const x1 = x0 + m.m_lebar;
    const y1 = y0 + m.m_labuh;
    const x2 = x1 + m.m_labuh_lengan;
    const y2 = y0 + m.m_bukaan_lengan;
    const y3 = y0 + m.m_lebar_lengan;
    const x3 = x1 + m.m_pesak_atas;
    const x4 = x1 + m.m_pesak_bawah;
    const x5 = x3 + m.m_lebar_kekek;
    const y4 = y3 + m.m_lebar_kekek;
    const x6 = x0 + m.m_lebar / 2;
    const x7 = x6 + m.leher / 6;
    const x8 = x6 - m.leher / 6;
    const y5 = y0 + m.leher / 6 + 2;
    const poketAtas = m.poket_atas;
    const poketBawah = m.poket_bawah;
    const poketExtra = poketAtas < 7.62 ? 0.635 : 1.27;
    const jarakPoket = poketBawah > 12.7 ? 6.35 : 5.08;
    const y6 = y1 - 5;
    const y7 = y1 - 6.35;
    const x9 = x0 + (m.m_lebar / 4) * 3 - poketAtas / 2;
    const x10 = x0 + (m.m_lebar / 4) * 3 - poketBawah / 2;
    const x11 = x0 + m.m_lebar / 4 - poketBawah / 2;
    const y8 = y1 - jarakPoket;

    let svg = `<svg viewBox="0 0 180 150" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .piece { fill: none; stroke: #000; stroke-width: 1; }
                    .grain { stroke: #999; stroke-width: 1; stroke-dasharray: 5,5; }
                    .label { font-size: 6px; fill: #000; }
                    .fold { stroke: #f00; stroke-width: 1; stroke-dasharray: 3,3; }
                </style>
            </defs>
                       
            <!-- Body Piece -->
            <rect class="piece" x="${x0}" y="${y0}" width="${m.m_lebar}" height="${m.m_labuh}" />
            <text class="label" x="${x0 - 20}" y="${y1 - m.m_labuh / 2}">Badan</text>
            
            <!-- Sleeve -->
            <polygon class="piece" points="${x1},${y0} ${x2},${y0} ${x2},${y2} ${x1},${y3}" />
            <text class="label" x="${x2 + 3}" y="${y2 - m.m_bukaan_lengan / 2}">Lengan</text>
            
            <!-- Pesak -->
            <polygon class="piece" points="${x1},${y3} ${x3},${y3} ${x4},${y1} ${x1},${y1}" />
            <text class="label" x="${x1 + m.m_pesak_bawah}" y="${y1 - 5}">Pesak</text>

            <!-- Kekek -->
            <polygon class="piece" points="${x3},${y3} ${x5},${y3} ${x3},${y4}" transform ="rotate(-5 ${x3} ${y3})"/>
            <text class="label" x="${x3 + 5}" y="${y3 + 10}">Kekek</text>

            <!-- Leher -->
            <path class="piece" d="M${x7},${y0} C${x7},${y0 + (y5 - y0) / 2} ${x6 + (x7 - x6) / 2},${y5} ${x6},${y5} C${x6 - (x7 - x6) / 2},${y5} ${x8},${y0 + (y5 - y0) / 2} ${x8},${y0}" />
            <path class="piece" d="M${x8},${y0} C${x8},${y0 + 2} ${x7},${y0 + 2} ${x7},${y0} " />
            <line class="piece" x1="${x6}" y1="${y5}" x2="${x6}" y2="${y5 + m.belahan_leher_teluk}" />

            <!-- Poket -->
            <path class="piece" d="M${x9},${y3} ${x9 + poketAtas},${y3} ${x9 + poketAtas},${y3 + poketAtas - poketExtra} C${x9 + poketAtas},${y3 + poketAtas} ${x9 + poketAtas - poketExtra},${y3 + poketAtas + poketExtra} ${x9 + poketAtas - poketExtra * 2},${y3 + poketAtas + poketExtra} L${x9 + poketExtra * 2},${y3 + poketAtas + poketExtra} C${x9 + poketExtra},${y3 + poketAtas + poketExtra} ${x9},${y3 + poketAtas} ${x9},${y3 + poketAtas - poketExtra} z" />

            <path class="piece" d="M${x10},${y8 - poketBawah - 0.635} ${x10 + poketBawah},${y8 - poketBawah - 0.635} ${x10 + poketBawah},${y8 - poketExtra * 2} C${x10 + poketBawah},${y8 - poketExtra} ${x10 + poketBawah - poketExtra},${y8} ${x10 + poketBawah - poketExtra * 2},${y8} L${x10 + poketExtra * 2},${y8} C${x10 + poketExtra},${y8} ${x10},${y8 - poketExtra} ${x10},${y8 - poketExtra * 2} z" />

            <path class="piece" d="M${x11},${y8 - poketBawah - 0.635} ${x11 + poketBawah},${y8 - poketBawah - 0.635} ${x11 + poketBawah},${y8 - poketExtra * 2} C${x11 + poketBawah},${y8 - poketExtra} ${x11 + poketBawah - poketExtra},${y8} ${x11 + poketBawah - poketExtra * 2},${y8} L${x11 + poketExtra * 2},${y8} C${x11 + poketExtra},${y8} ${x11},${y8 - poketExtra} ${x11},${y8 - poketExtra * 2} z" />

            <!-- Labels -->
            <text class="label" x="${x0}" y="${y0}" dx="-3" dy="-3">A</text>
            <text class="label" x="${x1}" y="${y0}" dx="-2" dy="-3">B</text>
            <text class="label" x="${x1}" y="${y1}" dx="-2" dy="7">C</text>
            <text class="label" x="${x0}" y="${y1}" dx="-2" dy="7">D</text>
            <text class="label" x="${x2}" y="${y0}" dx="-3" dy="-3">E</text>
            <text class="label" x="${x2}" y="${y2}" dx="-2" dy="7">F</text>
            <text class="label" x="${x1}" y="${y3}" dx="-5" dy="${m.m_lebar < 35 ? -3 : 3}">G</text>
            <text class="label" x="${x3}" y="${y3}" dx="-2" dy="-3">H</text>
            <text class="label" x="${x4}" y="${y1}" dx="0" dy="7">I</text>
            <text class="label" x="${x5}" y="${y3}" dx="-2" dy="-3">J</text>
            <text class="label" x="${x3}" y="${y4}" dx="-4" dy="3">K</text>

        </svg>`;

    return svg;
  }

  /**
   * Seluar sewing pattern
   */
  static _seluarPattern(m) {
    const x0 = 25,
      y0 = 25;

    const cx1 = m.m_pinggul < 93.98 ? 5.08 : 8.89;
    const cx2 = m.m_pinggul < 93.98 ? 3.81 : 5.08;
    const cy1 = m.m_pinggul < 93.98 ? 7.62 : 8.89;
    const cy2 = m.m_pinggul < 93.98 ? 5.08 : 6.35;

    const x1 = x0 + (m.m_pinggul + 7.62) / 4;
    const y1 = y0 - 2.54;
    const y2 = y0 + m.cawat / 2;
    const y3 = y0 + m.labuh_seluar;
    const x2 = x1 + (m.m_pinggul + 7.62) / 4;
    const x3 = x2 - 2.54;
    const x4 = x2 + cx1;
    const x5 = x1 + m.bukaan_kaki + (m.m_pinggul < 93.98 ? 0.953 : 1.27);
    const x6 = x1 - m.bukaan_kaki + (m.m_pinggul < 93.98 ? 0.953 : 1.27);
    const x7 = x0 - cx2;
    const y4 = y2 - cy1;
    const y5 = y2 - cy2;

    let svg = `<svg viewBox="0 0 180 150" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .piece { fill: none; stroke: #000; stroke-width: 1; }
                    .grain { stroke: #999; stroke-width: 1; stroke-dasharray: 5,5; }
                    .label { font-size: 6px; fill: #000; }
                    .fold { stroke: #f00; stroke-width: 1; stroke-dasharray: 3,3; }
                </style>
            </defs>

            <!-- Seluar -->
            <path class="piece" d="M${x0},${y0} L${x1},${y0} ${x3},${y1} ${x2},${y4} C${x2},${y4 + cy1 / 2} ${x2 + cx1 / 2},${y2} ${x4},${y2} L${x5},${y3} ${x6},${y3} ${x7},${y2} C${x7 + cx2 / 2},${y2} ${x0},${y5 + cy2 / 2} ${x0},${y5} z" />
            <line class="piece" x1="${x1}" y1="${y0}" x2="${x1}" y2="${y3}" />

        </svg>`;

    return svg;
  }

  /**
   * Leher Cekak Musang sewing pattern
   */
  static _leherMelayuPattern(m, l) {
    const x0 = 5,
      y0 = 7;

    const turunLeher = m.leher < 38.1 ? 1.27 : 1.91;
    const leher = m.leher / 6;
    const leherTeluk = m.leher_teluk / 6;

    const selisihButang = l === "cekak" ? (m.leher > 37 ? 1.27 : 1) : 0;
    const tinggiKolar = m.leher > 37 ? 3.18 : 2.54;
    const lebarTulangAtas = m.leher > 37 ? 3.18 : 2.54;
    const tinggiTulangBawah = m.m_belahan_leher + 1.27;

    const x1 = x0 + leher + 5;
    const x2 = x1 + (m.leher / 2 + selisihButang) / 2;
    const x3 = x1 + m.leher / 2 + selisihButang;

    const y1 = y0 + tinggiKolar - 1.91;
    const y2 = y0 + tinggiKolar;

    const point1 = this._getPerpendicularPoint(
      x2,
      y2,
      x3,
      y1,
      -(tinggiKolar - 1.27)
    );

    const point2 = this._getPerpendicularPoint(x2, y2, x3, y1, -tinggiKolar);

    const point3 = this._getPerpendicularPoint(
      point1.x,
      point1.y,
      point2.x,
      point2.y,
      -1.27
    );

    const y3 = y0 + leher + 3.81 - m.basi_leher;
    const y4 = y3 + m.basi_leher;
    const x4 = x1 + 0.953;
    const x5 = x4 + 0.953;
    const y5 = y4 + tinggiTulangBawah;

    const x6 = x5 + 10;
    const x7 = x6 + lebarTulangAtas / 2;
    const x8 = x7 + lebarTulangAtas / 2;
    const y6 = y4 + m.m_belahan_leher + 3.81;
    const y7 = y6 + 1.27;
    const x9 = x0 + 10;
    const y8 = y0 + 5;

    let tebukLeher = "";
    let kolar = "";
    let tetulangAtas = "";
    let tetulangBawah = "";

    if (l === "teluk") {
      tebukLeher += `<path class="piece" d="M${x9},${y8} C${x9 + leherTeluk / 2},${y8} ${x9 + leherTeluk},${y8 + turunLeher / 2} ${x9 + leherTeluk},${y8 + turunLeher} C${x9 + leherTeluk},${y8 + turunLeher + (leherTeluk + turunLeher) / 2} ${x9 + leherTeluk / 2},${y8 + turunLeher * 2 + leherTeluk} ${x9},${y8 + turunLeher * 2 + leherTeluk}" />
      <path class="piece" d="M${x9},${y8 - 5.08} C${x9 + (leherTeluk + 5.08) * 0.4},${y8 - 5.08} ${x9 + leherTeluk + 5.08},${y8 - 5.08 + (turunLeher + 5.08) * 0.2} ${x9 + leherTeluk + 5.08},${y8 + turunLeher} C${x9 + leherTeluk + 5.08},${y8 + turunLeher + (leherTeluk + turunLeher + 5.08) * 0.6} ${x9 + (5.08 + leherTeluk) * 0.7},${y8 + turunLeher + (leherTeluk + turunLeher + 5.08) * 0.8} ${x9 + 5.08},${y8 + turunLeher + leherTeluk + turunLeher + 5.08}   L${x9 + 5.08},${y8 + turunLeher + leherTeluk + turunLeher + m.belahan_leher_teluk} ${x9},${y8 + turunLeher + leherTeluk + turunLeher + 5.08 + m.belahan_leher_teluk} z" />
      <line class="grain" x1="${x9}" y1="${y8 + turunLeher}" x2="${x9 + leherTeluk + 5.08}" y2="${y8 + turunLeher}" />`;
    } else {
      tebukLeher += `<path class="piece" d="M${x0},${y0} L${x0 + leher / 2},${y0} C${x0 + leher * 0.75},${y0} ${x0 + leher},${y0 + (leher + 3.81) / 6} ${x0 + leher},${y0 + (leher + 3.81) / 3} C${x0 + leher},${y0 + ((leher + 3.81) / 3) * 2} ${x0 + leher / 2},${y0 + leher + 3.81} ${x0},${y0 + leher + 3.81}" />
      <rect class="piece" x="${x0}" y="${y0}" width="${leher}" height="${leher + 3.81}" />
      <line class="grain" x1="${x0}" y1="${y0 + (leher + 3.81) / 3}" x2="${x0 + leher}" y2="${y0 + (leher + 3.81) / 3}" />
      <line class="piece" x1="${x0}" y1="${y0 + ((leher + 3.81) / 3) * 2}" x2="${x0 + leher}" y2="${y0 + ((leher + 3.81) / 3) * 2}" />
      <line class="piece" x1="${x0 + leher / 2}" y1="${y0}" x2="${x0 + leher / 2}" y2="${y0 + leher + 3.81}" />
      <line class="piece" x1="${x0}" y1="${y0 + leher + 3.81}" x2="${x0}" y2="${y0 + leher + 3.81 + m.m_belahan_leher}" />`;

      kolar += `<path class="piece" d="M${x1},${y0} L${x2},${y0} Q${x2 + (point3.x - x2) / 2},${y0 - (point3.y - y0) / 7} ${point3.x},${point3.y} Q${point2.x},${point2.y} ${point1.x},${point1.y} L${x3},${y1} Q${x2 + (x3 - x2) / 2},${y2 - (y1 - y2) / 7} ${x2},${y2} L${x1},${y2} z" />
      <line class="grain" x1="${x2}" y1="${point2.y}" x2="${x2}" y2="${y2}" />`;

      if (l === "cekak") {
        tetulangBawah += `<line class="grain" x1="${x1}" y1="${y4}" x2="${x5}" y2="${y4}" />`;
        tetulangBawah += `<path class="piece" d="M${x1},${y3} L${x5},${y3} ${x5},${y5} ${x1},${y5} z" />`;

        tetulangAtas += `<line class="grain" x1="${x6}" y1="${y4}" x2="${x8}" y2="${y4}" />`;
        tetulangAtas += `<path class="piece" d="M${x6},${y3} L${x8},${y3} ${x8},${y6} ${x7},${y7} ${x6},${y6} z" />`;
      } else {
        tetulangBawah += `<line class="grain" x1="${x1}" y1="${y4}" x2="${x5}" y2="${y4}" />`;
        tetulangBawah += `<path class="piece" d="M${x1},${y3} L${x4},${y3} ${x4},${y4} ${x5},${y4} ${x5},${y5} ${x1},${y5} z" />`;

        tetulangAtas += `<line class="grain" x1="${x6}" y1="${y4}" x2="${x8}" y2="${y4}" />`;
        tetulangAtas += `<path class="piece" d="M${x6},${y4} L${x7},${y4} ${x7},${y3} ${x8},${y3} ${x8},${y6} ${x7},${y7} ${x6},${y6} z" />`;
      }
    }

    let svg = `<svg viewBox="0 0 50 45" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .piece { fill: none; stroke: #000; stroke-width: 0.25; }
                    .grain { stroke: #999; stroke-width: 0.25; stroke-dasharray: 1,1; }
                    .label { font-size: 6px; fill: #000; }
                    .fold { stroke: #f00; stroke-width: 1; stroke-dasharray: 3,3; }
                </style>
            </defs>

            <!-- Leher -->
            ${tebukLeher}
            
            <!-- Kolar -->
            ${kolar}

            <!-- Tetulang -->
            ${tetulangBawah}
            
            ${tetulangAtas}

        </svg>`;

    return svg;
  }

  static _getPerpendicularPoint(x1, y1, x2, y2, distance) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);

    // Perpendicular vector is (-dy, dx)
    return {
      x: x2 + (distance * -dy) / len,
      y: y2 + (distance * dx) / len,
    };
  }

  /**
   * Baju Kurung cutting layout
   */
  static _bajuKurungCuttingLayout(m, w) {
    const x0 = 10,
      y0 = 10;

    const x2 = 2 + x0 + m.lebar + m.basi_sambungan * 2;
    const x1 = x2 + m.pesak_atas + m.pesak_bawah + m.basi_sambungan * 4;
    const tinggiPesak = m.labuh - m.lebar_lengan;
    const turunLeher = m.leher < 38.1 ? 1.27 : 1.91;
    const leher6 = m.leher / 6;

    const x3 = x1 + m.lebar_lengan * 2 + m.basi_sambungan * 2;
    const x4 =
      x0 +
      w * 2.54 -
      2 -
      m.pinggul -
      m.kelonggaran -
      m.susun_tepi * m.bil_susun -
      m.basi_sambungan * 2;
    const y2 = y0 + tinggiPesak + m.basi_lipatan + m.basi_sambungan;
    const y3 = y0 + m.labuh_kain + m.basi_sambungan * 2;
    const y4 = y0 + m.labuh * 2 + m.basi_lipatan * 2;
    const x5 = x0 + w * 2.54 - 2 - m.labuh_kain - m.basi_sambungan * 2;
    const x6 = x1 + m.pesak_atas + m.pesak_bawah + m.basi_sambungan * 4;
    const x7 = x6 + m.lebar_lengan * 2 + m.basi_sambungan * 2;
    const x8 =
      5 +
      x3 +
      m.lebar_lengan * 2 +
      m.basi_sambungan * 2 +
      m.lebar_kekek +
      m.basi_sambungan * 2;
    const y5 = 5 + y3;
    const x9 = x8 + 5.08 + leher6;
    const y6 = y5 + 5.08;

    let lengan = "";
    let kain = "";
    let pesak = "";
    let kekek = "";
    let pinggang = "";
    let leher = "";
    let canvasWidth = w * 2.54 + 20;
    let heightWithKain = 0;
    let height = 0;
    let highestBadanPoint = 0;
    let highestPesakPoint = 0;
    let highestLenganPoint = 0;
    let highestPinggangPoint = 0;
    let highestKekekPoint = 0;

    if (
      w * 2.54 >
      4 +
        m.lebar +
        m.pesak_atas +
        m.pesak_bawah +
        m.pinggul +
        m.kelonggaran +
        m.susun_tepi * m.bil_susun +
        m.basi_sambungan * 8
    ) {
      //layout 1
      kain += `<rect class="piece" x="${x4}" y="${y0}" width="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun + m.basi_sambungan * 2}" height="${m.labuh_kain + m.basi_sambungan * 2}" /> 
              <rect class="sew-line" x="${x4 + m.basi_sambungan}" y="${y0 + m.basi_sambungan}" width="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun}" height="${m.labuh_kain}" />`;
      pesak += this._getPesak(m, x2, y0);
      pesak += this._getPesak(m, x2, y2);
      lengan += this._getLengan(m, x1, y3);
      lengan += this._getLengan(m, x3, y3);

      kekek += this._getKekek(
        m,
        x3 + m.lebar_lengan * 2 + m.basi_sambungan * 2,
        y3
      );

      kekek += this._getKekek(
        m,
        x3 + m.lebar_lengan * 2 + m.basi_sambungan * 2,
        y3 + m.lebar_kekek + m.basi_sambungan * 2
      );

      leher += this._getLeher(m, x9, y5);

      highestBadanPoint = m.labuh * 2 + m.basi_lipatan * 2;
      highestPesakPoint =
        tinggiPesak * 2 + m.basi_lipatan * 2 + m.basi_sambungan * 2;
      highestLenganPoint =
        m.labuh_kain + m.basi_sambungan * 3 + m.labuh_lengan + m.basi_lipatan;
      height = Math.max(highestPesakPoint, highestLenganPoint);

      pinggang += this._getHorizantalPinggang(m, x2, height + 10);

      highestPinggangPoint = height + 5 + m.basi_sambungan * 2;
      height = Math.max(highestBadanPoint, highestPinggangPoint);
    } else if (
      w * 2.54 >
      4 +
        m.lebar +
        m.pinggul +
        m.kelonggaran +
        m.susun_tepi * m.bil_susun +
        m.basi_sambungan * 4
    ) {
      //layout 2
      kain += `<rect class="piece" x="${x4}" y="${y0}" width="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun + m.basi_sambungan * 2}" height="${m.labuh_kain + m.basi_sambungan * 2}" /> 
              <rect class="sew-line" x="${x4 + m.basi_sambungan}" y="${y0 + m.basi_sambungan}" width="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun}" height="${m.labuh_kain}" />`;
      pesak += this._getPesak(m, x2, y3);
      pesak += this._getPesak(m, x1, y3);
      lengan += this._getLengan(m, x6, y3);
      lengan += this._getLengan(m, x7, y3);

      leher += this._getLeher(
        m,
        5 +
          x2 +
          (m.pesak_atas + m.pesak_bawah + m.basi_sambungan * 4) * 2 +
          (m.lebar_lengan * 2 + m.basi_sambungan * 2) * 2 +
          5.08 +
          leher6,
        y5
      );

      kekek += this._getKekek(
        m,
        x6,
        y3 + m.labuh_lengan + m.basi_sambungan + m.basi_lipatan
      );

      kekek += this._getKekek(
        m,
        x6 + m.lebar_kekek + m.basi_sambungan * 2,
        y3 + m.labuh_lengan + m.basi_sambungan + m.basi_lipatan
      );

      highestBadanPoint = m.labuh * 2 + m.basi_lipatan * 2;
      highestPesakPoint =
        m.labuh_kain +
        m.basi_sambungan * 2 +
        tinggiPesak +
        m.basi_lipatan +
        m.basi_sambungan;
      highestKekekPoint =
        m.labuh_kain +
        m.basi_sambungan * 5 +
        m.labuh_lengan +
        m.lebar_kekek +
        m.basi_lipatan;
      height = Math.max(highestPesakPoint, highestKekekPoint);

      pinggang += this._getHorizantalPinggang(m, x2, height + 10);

      highestPinggangPoint = height + 5 + m.basi_sambungan * 2;
      height = Math.max(highestBadanPoint, highestPinggangPoint);
    } else if (
      w * 2.54 >
      4 +
        m.pinggul +
        m.kelonggaran +
        m.susun_tepi * m.bil_susun +
        m.basi_sambungan * 2
    ) {
      //layout 3
      kain += `<rect class="piece" x="${x0 + 2}" y="${y4}" width="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun + m.basi_sambungan * 2}" height="${m.labuh_kain + m.basi_sambungan * 2}" /> 
              <rect class="sew-line" x="${x0 + 2 + m.basi_sambungan}" y="${y4 + m.basi_sambungan}" width="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun}" height="${m.labuh_kain}" />`;

      pesak += this._getPesak(m, x2, y0);
      pesak += this._getPesak(m, x2, y2);
      lengan += this._getLengan(m, x1, y0);
      lengan += this._getLengan(m, x3, y0);

      kekek += this._getKekek(
        m,
        x1,
        y0 + m.labuh_lengan + m.basi_sambungan + m.basi_lipatan
      );

      kekek += this._getKekek(
        m,
        x1 + m.lebar_kekek + m.basi_sambungan * 2,
        y0 + m.labuh_lengan + m.basi_sambungan + m.basi_lipatan
      );

      leher += this._getLeher(
        m,
        5 + x1 + 5.08 + leher6,
        y0 +
          m.labuh_lengan +
          m.basi_sambungan +
          m.basi_lipatan +
          m.lebar_kekek +
          m.basi_sambungan * 2 +
          5
      );

      pinggang += this._getHorizantalPinggang(
        m,
        x2,
        y0 + tinggiPesak * 2 + m.basi_lipatan * 2 + m.basi_sambungan * 2
      );

      height =
        m.labuh * 2 + m.basi_lipatan * 2 + m.labuh_kain + m.basi_sambungan * 2;
    } else if (w * 2.54 > 4 + m.lebar + m.labuh_kain + m.basi_sambungan * 4) {
      //layout 4
      kain += `<rect class="piece" x="${x5}" y="${y0}" width="${m.labuh_kain + m.basi_sambungan * 2}" height="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun + m.basi_sambungan * 2}" /> 
              <rect class="sew-line" x="${x5 + m.basi_sambungan}" y="${y0 + m.basi_sambungan}" width="${m.labuh_kain}" height="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun}" />`;

      //check if pesak can fit between badan and kain
      if (
        w * 2.54 >
        4 +
          m.lebar +
          m.labuh_kain +
          m.basi_sambungan * 8 +
          m.pesak_atas +
          m.pesak_bawah
      ) {
        pesak += this._getPesak(m, x2, y0);
        pesak += this._getPesak(m, x2, y2);
        pinggang += this._getVerticalPinggang(
          m,
          x2,
          y2 + tinggiPesak + m.basi_lipatan + m.basi_sambungan
        );
        lengan += this._getLengan(
          m,
          x2 + 5 + m.basi_sambungan * 2,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2
        );
        lengan += this._getLengan(
          m,
          x2 +
            5 +
            m.basi_sambungan * 2 +
            m.lebar_lengan * 2 +
            m.basi_sambungan * 2,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2
        );

        highestPinggangPoint =
          (tinggiPesak + m.basi_lipatan + m.basi_sambungan) * 2 +
          m.pinggul +
          m.kelonggaran +
          3 +
          m.basi_sambungan * 2;

        highestLenganPoint =
          m.pinggul +
          m.kelonggaran +
          m.susun_tepi * m.bil_susun +
          m.basi_sambungan * 2 +
          m.basi_sambungan +
          m.labuh_lengan +
          m.basi_lipatan;
      }
      //else check if pinggang can fit
      else if (
        w * 2.54 >
        4 + m.lebar + m.labuh_kain + m.basi_sambungan * 6 + 5
      ) {
        pinggang += this._getVerticalPinggang(m, x2, y0);
        pesak += this._getPesak(
          m,
          x2,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2
        );
        pesak += this._getPesak(
          m,
          x1,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2
        );
        lengan += this._getLengan(
          m,
          x6,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2
        );
        lengan += this._getLengan(
          m,
          x6,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2 +
            m.labuh_lengan +
            m.basi_sambungan +
            m.basi_lipatan
        );

        highestLenganPoint =
          m.pinggul +
          m.kelonggaran +
          m.susun_tepi * m.bil_susun +
          m.basi_sambungan * 2 +
          (m.basi_sambungan + m.labuh_lengan + m.basi_lipatan) * 2;
      }
      //else draw everything below kain
      else {
        pesak += this._getPesak(
          m,
          x2,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2
        );
        pesak += this._getPesak(
          m,
          x1,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2
        );
        lengan += this._getLengan(
          m,
          x6,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2
        );
        lengan += this._getLengan(
          m,
          x6,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2 +
            m.labuh_lengan +
            m.basi_sambungan +
            m.basi_lipatan
        );
        pinggang += this._getVerticalPinggang(
          m,
          x6 + m.lebar_lengan * 2 + m.basi_sambungan * 2,
          y0 +
            m.pinggul +
            m.kelonggaran +
            m.susun_tepi * m.bil_susun +
            m.basi_sambungan * 2
        );

        highestLenganPoint =
          m.pinggul +
          m.kelonggaran +
          m.susun_tepi * m.bil_susun +
          m.basi_sambungan * 2 +
          (m.basi_sambungan + m.labuh_lengan + m.basi_lipatan) * 2;
      }

      kekek += this._getKekek(m, x0 + 2, y4);
      kekek += this._getKekek(
        m,
        x0 + 2 + m.lebar_kekek + m.basi_sambungan * 2,
        y4
      );

      leher += this._getLeher(
        m,
        2 + x0 + 5.08 + leher6,
        y4 + 5 + m.lebar_kekek + m.basi_sambungan * 2
      );

      height = Math.max(highestPinggangPoint, highestLenganPoint);
    } else {
      //layout 5
      canvasWidth = w * 2.54 * 2 + 25;
      height = m.labuh * 2 + m.basi_lipatan * 2;

      //check if can fit pesak and lengan beside badan
      if (
        w * 2.54 >
        4 +
          m.lebar +
          m.basi_sambungan * 8 +
          m.pesak_atas +
          m.pesak_bawah +
          m.lebar_lengan * 2
      ) {
        pesak += this._getPesak(m, x2, y0);
        pesak += this._getPesak(m, x2, y2);
        lengan += this._getLengan(m, x1, y0);
        lengan += this._getLengan(
          m,
          x1,
          y0 + m.labuh_lengan + m.basi_sambungan + m.basi_lipatan
        );

        kekek += this._getKekek(
          m,
          x2,
          y2 + tinggiPesak + m.basi_lipatan + m.basi_sambungan
        );

        kekek += this._getKekek(
          m,
          x2 + m.lebar_kekek + m.basi_sambungan * 2,
          y2 + tinggiPesak + m.basi_lipatan + m.basi_sambungan
        );

        leher += this._getLeher(
          m,
          5 + x1 + 5.08 + leher6,
          5 + y0 + (m.labuh_lengan + m.basi_sambungan + m.basi_lipatan) * 2
        );

        //check if can fit pinggang
        if (
          w * 2.54 >
          4 +
            m.lebar +
            m.basi_sambungan * 10 +
            m.pesak_atas +
            m.pesak_bawah +
            m.lebar_lengan * 2 +
            5
        ) {
          pinggang += this._getVerticalPinggang(
            m,
            x2 +
              m.pesak_atas +
              m.pesak_bawah +
              m.basi_sambungan * 6 +
              m.lebar_lengan * 2,
            y0
          );
        } else {
          pinggang += this._getVerticalPinggang(
            m,
            x0 + 2 + w * 2.54 + 5 + m.labuh_kain + m.basi_sambungan * 2,
            y0
          );
        }
      }
      //else check if can fit all pesak in a row beside badan
      else if (
        w * 2.54 >
        4 +
          m.lebar +
          m.basi_sambungan * 10 +
          m.pesak_atas * 2 +
          m.pesak_bawah * 2
      ) {
        pesak += this._getPesak(m, x2, y0);
        pesak += this._getPesak(
          m,
          x2 + m.pesak_atas + m.pesak_bawah + m.basi_sambungan * 2,
          y0
        );

        lengan += this._getLengan(
          m,
          x2,
          y0 + tinggiPesak + m.basi_lipatan + m.basi_sambungan
        );
        lengan += this._getLengan(
          m,
          x2,
          y0 +
            tinggiPesak +
            m.basi_lipatan +
            m.basi_sambungan +
            m.labuh_lengan +
            m.basi_sambungan +
            m.basi_lipatan
        );

        kekek += this._getKekek(m, x0 + 2, y4);
        kekek += this._getKekek(
          m,
          x0 + 2 + m.lebar_kekek + m.basi_sambungan * 2,
          y4
        );

        leher += this._getLeher(
          m,
          5 + x2 + 5.08 + leher6,
          5 +
            y0 +
            tinggiPesak +
            m.basi_lipatan +
            m.basi_sambungan +
            (m.labuh_lengan + m.basi_sambungan + m.basi_lipatan) * 2
        );

        pinggang += this._getVerticalPinggang(
          m,
          x2 + (m.pesak_atas + m.pesak_bawah + m.basi_sambungan * 2) * 2,
          y0
        );

        height =
          tinggiPesak +
          m.basi_lipatan +
          m.basi_sambungan +
          (m.labuh_lengan + m.basi_sambungan + m.basi_lipatan) * 2 +
          5 +
          5.08 * 2 +
          turunLeher * 2 +
          leher6 +
          m.belahan_leher;
      }

      heightWithKain =
        height +
        m.pinggul +
        m.kelonggaran +
        m.susun_tepi * m.bil_susun +
        m.basi_sambungan * 2;

      //draw another rectangle for kain fabric
      kain += `<!-- Fabric Outline -->
            <rect class="fabric-outline" x="${x0 + w * 2.54 + 5}" y="${y0}" 
            width="${w * 2.54}" height="${
              m.pinggul +
              m.kelonggaran +
              m.susun_tepi * m.bil_susun +
              m.basi_sambungan * 2
            }" />

            <rect class="piece" x="${x0 + 2 + w * 2.54 + 5}" y="${y0}" width="${m.labuh_kain + m.basi_sambungan * 2}" height="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun + m.basi_sambungan * 2}" /> 
            <rect class="sew-line" x="${x0 + 2 + w * 2.54 + 5 + m.basi_sambungan}" y="${y0 + m.basi_sambungan}" width="${m.labuh_kain}" height="${m.pinggul + m.kelonggaran + m.susun_tepi * m.bil_susun}" />`;
    }

    let svg = `<svg viewBox="0 0 ${canvasWidth} ${height + 20}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse" >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
                </marker>

                <style>
                  .fabric-outline { fill: none; stroke: #000; stroke-width: 1.5; }
                  .piece { fill: #f0f0f0; stroke: #000; stroke-width: 1; }
                  .piece1 { fill: #fff; stroke: #000; stroke-width: 1; }
                  .grain { stroke: #000; stroke-width: 0.5; marker-start:url(#arrowhead); marker-end:url(#arrowhead);}
                  .mid_line { stroke: #333; stroke-width: 0.5; stroke-dasharray: 2,2; }
                  .sew-line { fill: none; stroke: #333; stroke-width: 0.5; stroke-dasharray: 2,2;}
                  .label { font-size: 6px; fill: #000; text-anchor: middle; }
                  .title { font-size: 18px; font-weight: bold; }
                  .fold { fill: none; stroke: #000; stroke-width: 0.5; }
                </style>

                
            </defs>
                        
            <!-- Fabric Outline -->
            <rect class="fabric-outline" x="${x0}" y="${y0}" 
                  width="${w * 2.54}" height="${height}" />
            
            <!-- Body Piece -->
            <rect class="piece" x="${x0 + 2}" y="${y0}" 
                  width="${m.lebar + m.basi_sambungan * 2}" height="${m.labuh * 2 + m.basi_lipatan * 2}" />
            <path class="sew-line" d="M${2 + x0 + m.lebar + m.basi_sambungan},${y0 + m.basi_lipatan} ${2 + x0 + m.lebar + m.basi_sambungan},${y0 + m.labuh * 2 + m.basi_lipatan} ${2 + x0 + m.basi_sambungan},${y0 + m.labuh * 2 + m.basi_lipatan} ${2 + x0 + m.basi_sambungan},${y0 + m.basi_lipatan} ${2 + x0 + m.lebar + m.basi_sambungan},${y0 + m.basi_lipatan}" />
            <line class="mid_line" x1="${2 + x0}" y1="${y0 + m.labuh + m.basi_lipatan}" 
                  x2="${x0 + 2 + m.lebar + m.basi_sambungan}" y2="${y0 + m.labuh + m.basi_lipatan}"/>
            <line class="grain" x1="${x0 + 2 + m.lebar / 4}" y1="${y0 + m.labuh / 2}" 
                  x2="${x0 + 2 + m.lebar / 4}" y2="${y0 + m.labuh * 1.5}" />
            
            <text class="label" x="${x0 + 2 + m.lebar / 2}" y="${y0 + m.labuh / 2}">Badan</text>
                        
            <!-- Sleeve -->
            ${lengan}

            <!-- Pesak -->
            ${pesak}

            <!-- Kain Susun Tepi -->
            ${kain}

            <!-- Pinggang -->
            ${pinggang}

            <!-- Kekek -->
            ${kekek}

            <!-- Leher -->
            ${leher}
            
            <text class="label" text-anchor="start" x="${x0 + 45}" y="${height + 16}" >Panjang Kain Diperlukan: ${(heightWithKain == 0 ? height / 100 : heightWithKain / 100).toFixed(1)} meter</text>
        </svg>`;

    return svg;
  }

  /**
   * Leher Baju Kurung cutting layout
   */
  static _leherKurungCuttingLayout(m) {
    const x0 = 2,
      y0 = 2;

    let leher = this._getLeher(m, 5 + x0 + 5.08 + m.leher / 6, 3 + y0);

    let svg = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse" >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
                </marker>

                <style>
                  .fabric-outline { fill: none; stroke: #000; stroke-width: 0.75; }
                  .piece { fill: #f0f0f0; stroke: #000; stroke-width: 0.5; }
                  .piece1 { fill: #fff; stroke: #000; stroke-width: 0.5; }
                  .grain { stroke: #000; stroke-width: 0.5; marker-start:url(#arrowhead); marker-end:url(#arrowhead);}
                  .mid_line { stroke: #333; stroke-width: 0.25; stroke-dasharray: 1,1; }
                  .sew-line { fill: none; stroke: #333; stroke-width: 0.25; stroke-dasharray: 1,1; }
                  .label { font-size: 6px; fill: #000; text-anchor: middle; }
                  .title { font-size: 18px; font-weight: bold; }
                  .fold { fill: none; stroke: #000; stroke-width: 0.5; }
                </style>

                
            </defs>

            <!-- Leher -->
            ${leher}

            <!-- Labels -->


        </svg>`;

    return svg;
  }

  /**
   * Baju Melayu with seluar cutting layout (placeholder)
   */
  static _bajuMelayuSeluarCuttingLayout(m, w) {
    const x0 = 10,
      y0 = 10;

    const turunLeher = m.leher < 38.1 ? 1.27 : 1.91;
    const leherTeluk = m.leher_teluk / 6;
    const tinggiPesak = m.m_labuh - m.m_lebar_lengan;
    const poketExtra = m.poket_atas < 7.62 ? 0.635 : 1.27;

    const cx1 = m.m_pinggul < 93.98 ? 5.08 : 8.89;
    const cx2 = m.m_pinggul < 93.98 ? 3.81 : 5.08;
    const cy1 = m.m_pinggul < 93.98 ? 7.62 : 8.89;
    const cy2 = m.m_pinggul < 93.98 ? 5.08 : 6.35;

    let lengan = "";
    let seluar = "";
    let pesak = "";
    let kekek = "";
    let poket = "";
    let leher = "";
    let canvasWidth = w * 2.54 + 20;
    let canvasHeight = 0;
    let heightWithSeluar = 0;
    let height = 0;
    let highestBadanPoint = 0;
    let highestPesakPoint = 0;
    let highestLenganPoint = 0;
    let highestSeluarPoint = 0;
    let highestKekekPoint = 0;
    let highestPoketBawahPoint = 0;
    let highestPoketAtasPoint = 0;
    let highestLeherPoint = 0;

    const x1 =
      x0 +
      2 +
      m.m_lebar +
      m.basi_sambungan * 6 +
      m.m_pesak_atas +
      m.m_pesak_bawah;
    const y1 = y0 + 2.54;
    const x2 =
      x0 +
      w * 2.54 -
      2 -
      ((m.m_pinggul + 7.62) / 2 + cx1 + m.basi_sambungan * 2);
    const x3 =
      x0 +
      w * 2.54 -
      2 -
      ((m.m_pinggul + 7.62) / 2 + cx1 + m.basi_sambungan * 2) * 2 -
      cx2;
    const y2 = y1 + 3.81 + m.labuh_seluar + m.basi_lipatan;
    const x4 = x0 + w * 2.54 + 7 + cx2;
    const x5 = x0 + 2 + m.m_lebar + m.basi_sambungan * 2;
    const y3 = y0 + tinggiPesak + m.basi_lipatan + m.basi_sambungan;
    const y4 = y3 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan;
    const y5 = y0 + m.m_labuh * 2 + m.basi_lipatan * 2;
    const y6 = y5 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan;
    const x7 = x0 + w * 2.54 - 2 - m.m_lebar_lengan * 2 - m.basi_sambungan * 2;
    const x8 = x7 - m.m_lebar_lengan * 2 - m.basi_sambungan * 2;
    const x6 =
      x0 +
      w * 2.54 -
      2 -
      m.m_pesak_atas -
      m.m_pesak_bawah -
      m.basi_sambungan * 4;
    const x9 = x6 - m.m_pesak_atas - m.m_pesak_bawah - m.basi_sambungan * 4;
    const x10 =
      x0 +
      2 +
      m.m_lebar +
      m.basi_sambungan * 6 +
      m.m_pesak_atas +
      m.m_pesak_bawah;
    const y7 = y2 + m.labuh_seluar + m.basi_lipatan + 6.35;
    const y8 = y0 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan;
    const x11 =
      x0 +
      w * 2.54 +
      7 +
      m.basi_sambungan * 2 +
      (m.m_pinggul + 7.62) / 2 +
      cx1 +
      cx2;
    const x12 =
      x0 + 2 + m.m_pesak_atas + m.m_pesak_bawah + m.basi_sambungan * 4;
    const x13 = x0 + 2 + m.poket_bawah + m.basi_sambungan * 2;
    const x14 = x5 + m.m_lebar_lengan * 2 + m.basi_sambungan * 2;
    const y9 =
      y3 + m.basi_sambungan + m.basi_lipatan + m.poket_atas + poketExtra;
    const y10 = y9 + m.m_lebar_kekek + m.basi_sambungan * 2;
    const y11 = y3 + tinggiPesak + m.basi_lipatan + m.basi_sambungan;
    const x15 = x5 + m.poket_bawah + m.basi_sambungan * 2;
    const y12 = y11 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635;
    const x16 = x5 + m.poket_atas + m.basi_sambungan * 2;
    const x17 = x16 + m.m_lebar_kekek + m.basi_sambungan * 2;
    const y13 = y5 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635;
    const x18 = x0 + 2 + m.poket_atas + m.basi_sambungan * 2;
    const x19 = x18 + m.m_lebar_kekek + m.basi_sambungan * 2;
    const y14 = y12 + m.m_lebar_kekek + m.basi_sambungan * 2;
    const x20 = x0 + 2 + m.m_lebar_lengan * 2 + m.basi_sambungan * 2;
    const x21 = x5 + m.m_lebar_kekek + m.basi_sambungan * 2;
    const x22 = x20 + m.poket_atas + m.basi_sambungan * 2;
    const y15 = y7 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635;
    const y16 = y15 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635;
    const y17 = y16 + m.m_lebar_kekek + m.basi_sambungan * 2;
    const y18 = y8 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan;
    const y19 = y18 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635;
    const x23 = x15 + m.poket_bawah + m.basi_sambungan * 2;

    if (
      w * 2.54 >
      4 +
        m.m_lebar +
        m.basi_sambungan * 6 +
        m.m_pinggul +
        7.62 +
        (cx1 + cx2) * 2
    ) {
      //layout 1
      seluar += this._getSeluar1(m, x3, y1);
      seluar += this._getSeluar2(
        m,
        x2,
        y1,
        y1 + m.labuh_seluar + m.basi_lipatan + 3.81 + y0
      );

      highestBadanPoint = y5 - y0;

      if (
        w * 2.54 >
        4 +
          m.m_lebar +
          m.basi_sambungan * 14 +
          m.m_pinggul +
          7.62 +
          (cx1 + cx2) * 2 +
          m.m_pesak_atas * 2 +
          m.m_pesak_bawah * 2
      ) {
        pesak += this._getPesakMelayu(m, x5, y0);
        pesak += this._getPesakMelayu(m, x1, y0);
        lengan += this._getLenganMelayu(m, x5, y3);
        lengan += this._getLenganMelayu(m, x5, y4);
        poket += this._getPoketBawah(m, x0 + 2, y5);
        poket += this._getPoketBawah(m, x13, y5);
        poket += this._getPoketAtas(m, x14, y3);
        kekek += this._getKekekMelayu(m, x14, y9);
        kekek += this._getKekekMelayu(m, x14, y10);
        leher = this._getLeherTeluk(
          m,
          x14,
          y10 + m.basi_sambungan * 2 + m.m_lebar_kekek
        );

        highestLenganPoint =
          y4 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;

        highestPoketBawahPoint =
          y5 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635 - y0;
      } else if (
        w * 2.54 >
        4 +
          m.m_lebar +
          m.basi_sambungan * 10 +
          m.m_pinggul +
          7.62 +
          (cx1 + cx2) * 2 +
          m.m_pesak_atas +
          m.m_pesak_bawah
      ) {
        pesak += this._getPesakMelayu(m, x5, y0);
        pesak += this._getPesakMelayu(m, x5, y3);
        lengan += this._getLenganMelayu(m, x8, y2);
        lengan += this._getLenganMelayu(m, x7, y2);
        poket += this._getPoketBawah(m, x5, y11);
        poket += this._getPoketBawah(m, x15, y11);
        poket += this._getPoketAtas(m, x5, y12);
        kekek += this._getKekekMelayu(m, x16, y12);
        kekek += this._getKekekMelayu(m, x17, y12);
        leher = this._getLeherTeluk(m, x8 - 5.08 * 2 - m.leher_teluk / 3, y2);

        highestLenganPoint =
          y2 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;

        highestPoketAtasPoint =
          y12 +
          m.basi_sambungan +
          m.basi_lipatan +
          m.poket_atas +
          poketExtra -
          y0;

        highestKekekPoint = y12 + m.m_lebar_kekek + m.basi_sambungan * 2 - y0;
      } else {
        pesak += this._getPesakMelayu(m, x5, y2);
        pesak += this._getPesakMelayu(m, x10, y2);
        lengan += this._getLenganMelayu(m, x8, y2);
        lengan += this._getLenganMelayu(m, x7, y2);
        poket += this._getPoketBawah(m, x0 + 2, y5);
        poket += this._getPoketBawah(m, x13, y5);
        poket += this._getPoketAtas(m, x0 + 2, y13);
        kekek += this._getKekekMelayu(m, x18, y13);
        kekek += this._getKekekMelayu(m, x19, y13);
        leher = this._getLeherTeluk(
          m,
          x19 + m.m_lebar_kekek + m.basi_sambungan * 2,
          y2 + tinggiPesak + m.basi_lipatan + m.basi_sambungan
        );

        highestLeherPoint =
          y2 +
          tinggiPesak +
          m.basi_lipatan +
          m.basi_sambungan +
          leherTeluk +
          turunLeher * 2 +
          m.belahan_leher_teluk +
          5.08 * 2 -
          y0;

        highestLenganPoint =
          y2 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;

        highestPesakPoint =
          y2 + tinggiPesak + m.basi_lipatan + m.basi_sambungan - y0;

        highestPoketAtasPoint =
          y13 +
          m.basi_sambungan +
          m.basi_lipatan +
          m.poket_atas +
          poketExtra -
          y0;

        highestKekekPoint = y13 + m.m_lebar_kekek + m.basi_sambungan * 2 - y0;
      }

      height = Math.max(
        highestBadanPoint,
        highestPesakPoint,
        highestLenganPoint,
        highestKekekPoint,
        highestPoketBawahPoint,
        highestPoketAtasPoint,
        highestLeherPoint
      );
      canvasHeight = height;
    } else if (
      w * 2.54 >
      4 +
        m.m_lebar +
        (m.m_pinggul + 7.62) / 2 +
        m.basi_sambungan * 4 +
        cx1 +
        cx2
    ) {
      //layout 2
      seluar += this._getSeluar1(m, x2, y1);
      seluar += this._getSeluar2(
        m,
        x2,
        y2,
        y2 * 2 + m.labuh_seluar + m.basi_lipatan + 3.81
      );

      highestBadanPoint = y5 - y0;
      highestSeluarPoint = y2 + m.labuh_seluar + m.basi_lipatan + 6.35 - y0;

      if (
        w * 2.54 >
        4 +
          m.m_lebar +
          m.basi_sambungan * 12 +
          (m.m_pinggul + 7.62) / 2 +
          cx1 +
          cx2 +
          m.m_pesak_atas * 2 +
          m.m_pesak_bawah * 2
      ) {
        pesak += this._getPesakMelayu(m, x5, y0);
        pesak += this._getPesakMelayu(m, x1, y0);
        lengan += this._getLenganMelayu(m, x5, y3);
        lengan += this._getLenganMelayu(m, x5, y4);
        poket += this._getPoketBawah(m, x0 + 2, y5);
        poket += this._getPoketBawah(m, x13, y5);
        poket += this._getPoketAtas(m, x0 + 2, y13);
        kekek += this._getKekekMelayu(m, x18, y13);
        kekek += this._getKekekMelayu(m, x19, y13);
        leher = this._getLeherTeluk(
          m,
          x5,
          y4 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan
        );

        highestLeherPoint =
          y4 +
          m.m_labuh_lengan +
          m.basi_lipatan +
          m.basi_sambungan +
          leherTeluk +
          turunLeher * 2 +
          m.belahan_leher_teluk +
          5.08 * 2 -
          y0;

        highestLenganPoint =
          y4 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;

        highestPoketAtasPoint =
          y13 +
          m.basi_sambungan +
          m.basi_lipatan +
          m.poket_atas +
          poketExtra -
          y0;

        highestKekekPoint = y13 + m.m_lebar_kekek + m.basi_sambungan * 2 - y0;
      } else if (
        w * 2.54 >
        4 +
          m.m_lebar +
          m.basi_sambungan * 8 +
          (m.m_pinggul + 7.62) / 2 +
          cx1 +
          cx2 +
          m.m_pesak_atas +
          m.m_pesak_bawah
      ) {
        pesak += this._getPesakMelayu(m, x5, y0);
        pesak += this._getPesakMelayu(m, x5, y3);
        lengan += this._getLenganMelayu(m, x0 + 2, y5);
        lengan += this._getLenganMelayu(m, x0 + 2, y6);
        poket += this._getPoketBawah(m, x5, y11);
        poket += this._getPoketBawah(m, x15, y11);
        poket += this._getPoketAtas(m, x5, y12);
        kekek += this._getKekekMelayu(m, x16, y12);
        kekek += this._getKekekMelayu(m, x16, y14);
        leher = this._getLeherTeluk(
          m,
          x20,
          y14 + m.m_lebar_kekek + m.basi_sambungan * 2
        );

        highestLenganPoint =
          y6 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;
      } else {
        pesak += this._getPesakMelayu(m, x9, y7);
        pesak += this._getPesakMelayu(m, x6, y7);
        lengan += this._getLenganMelayu(m, x0 + 2, y5);
        lengan += this._getLenganMelayu(m, x0 + 2, y6);
        poket += this._getPoketBawah(m, x20, y7);
        poket += this._getPoketBawah(m, x20, y15);
        poket += this._getPoketAtas(m, x20, y16);
        kekek += this._getKekekMelayu(m, x22, y16);
        kekek += this._getKekekMelayu(m, x22, y17);

        if (
          x5 + 5.08 * 2 + m.leher_teluk / 3 <
          x2 +
            m.basi_sambungan +
            (m.m_pinggul + 7.62) / 4 -
            m.bukaan_kaki +
            (m.m_pinggul < 93.98 ? 0.953 : 1.27)
        ) {
          leher = this._getLeherTeluk(m, x5, y2 - m.belahan_leher_teluk);
        } else {
          leher = this._getLeherTeluk(
            m,
            x0 + 2,
            y6 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan
          );

          highestLeherPoint =
            y6 +
            m.m_labuh_lengan +
            m.basi_lipatan +
            m.basi_sambungan +
            leherTeluk +
            turunLeher * 2 +
            m.belahan_leher_teluk +
            5.08 * 2 -
            y0;
        }

        highestLenganPoint =
          y6 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;

        highestPesakPoint =
          y7 + tinggiPesak + m.basi_lipatan + m.basi_sambungan - y0;

        highestPoketAtasPoint =
          y16 +
          m.basi_sambungan +
          m.basi_lipatan +
          m.poket_atas +
          poketExtra -
          y0;

        highestKekekPoint = y17 + m.m_lebar_kekek + m.basi_sambungan * 2 - y0;
      }

      height = Math.max(
        highestBadanPoint,
        highestPesakPoint,
        highestLenganPoint,
        highestSeluarPoint,
        highestKekekPoint,
        highestPoketBawahPoint,
        highestPoketAtasPoint,
        highestLeherPoint
      );
      canvasHeight = height;
    } else {
      //layout 3
      seluar += `<!-- Fabric Outline -->
            <rect class="fabric-outline" x="${x0 + w * 2.54 + 5}" y="${y0}" 
            width="${w * 2.54}" height="${
              (m.labuh_seluar + m.basi_lipatan + 6.35) * 2
            }" />`;
      seluar += this._getSeluar1(m, x4, y1);
      seluar += this._getSeluar2(
        m,
        x4,
        y2,
        y2 * 2 + m.labuh_seluar + m.basi_lipatan + 3.81
      );

      highestBadanPoint = y5 - y0;
      highestSeluarPoint = y2 + m.labuh_seluar + m.basi_lipatan + 6.35 - y0;

      if (
        w * 2.54 >
        4 +
          m.m_lebar +
          m.basi_sambungan * 10 +
          m.m_pesak_atas * 2 +
          m.m_pesak_bawah * 2
      ) {
        pesak += this._getPesakMelayu(m, x5, y0);
        pesak += this._getPesakMelayu(m, x1, y0);
        lengan += this._getLenganMelayu(m, x5, y3);
        lengan += this._getLenganMelayu(m, x5, y4);
        poket += this._getPoketBawah(m, x0 + 2, y5);
        poket += this._getPoketBawah(m, x13, y5);
        poket += this._getPoketAtas(m, x0 + 2, y13);
        kekek += this._getKekekMelayu(m, x18, y13);
        kekek += this._getKekekMelayu(m, x19, y13);
        leher = this._getLeherTeluk(m, x11, y0);

        highestLenganPoint =
          y4 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;

        highestPoketAtasPoint =
          y13 +
          m.basi_sambungan +
          m.basi_lipatan +
          m.poket_atas +
          poketExtra -
          y0;

        highestKekekPoint = y13 + m.m_lebar_kekek + m.basi_sambungan * 2 - y0;
      } else if (
        w * 2.54 >
        4 +
          m.basi_sambungan * 6 +
          (m.m_pinggul + 7.62) / 2 +
          cx1 +
          cx2 +
          m.m_pesak_atas +
          m.m_pesak_bawah
      ) {
        pesak += this._getPesakMelayu(m, x11, y0);
        pesak += this._getPesakMelayu(m, x11, y3);
        lengan += this._getLenganMelayu(m, x5, y0);
        lengan += this._getLenganMelayu(m, x5, y8);
        poket += this._getPoketBawah(m, x5, y18);
        poket += this._getPoketBawah(m, x15, y18);
        poket += this._getPoketAtas(m, x23, y18);
        kekek += this._getKekekMelayu(m, x5, y19);
        kekek += this._getKekekMelayu(m, x21, y19);
        leher = this._getLeherTeluk(
          m,
          x11,
          y3 + tinggiPesak + m.basi_lipatan + m.basi_sambungan
        );

        highestKekekPoint = y19 + m.m_lebar_kekek + m.basi_sambungan * 2 - y0;
      } else {
        pesak += this._getPesakMelayu(m, x0 + 2, y5);
        pesak += this._getPesakMelayu(m, x12, y5);
        lengan += this._getLenganMelayu(m, x5, y0);
        lengan += this._getLenganMelayu(m, x5, y8);
        poket += this._getPoketBawah(m, x5, y18);
        poket += this._getPoketBawah(m, x15, y18);
        poket += this._getPoketAtas(m, x23, y18);
        kekek += this._getKekekMelayu(m, x5, y19);
        kekek += this._getKekekMelayu(m, x21, y19);
        leher = this._getLeherTeluk(
          m,
          x12 + m.m_pesak_atas + m.m_pesak_bawah + m.basi_sambungan * 4,
          y19 + m.m_lebar_kekek + m.basi_sambungan * 2
        );

        highestLeherPoint =
          y19 +
          m.m_lebar_kekek +
          m.basi_sambungan * 2 +
          leherTeluk +
          turunLeher * 2 +
          m.belahan_leher_teluk +
          5.08 * 2 -
          y0;

        highestKekekPoint = y19 + m.m_lebar_kekek + m.basi_sambungan * 2 - y0;

        highestPesakPoint =
          y5 + tinggiPesak + m.basi_lipatan + m.basi_sambungan - y0;
      }

      height = Math.max(
        highestBadanPoint,
        highestPesakPoint,
        highestLenganPoint,
        highestKekekPoint,
        highestPoketBawahPoint,
        highestPoketAtasPoint,
        highestLeherPoint
      );
      canvasHeight = Math.max(height, highestSeluarPoint);
      canvasWidth = w * 2.54 * 2 + 25;
      heightWithSeluar = height + highestSeluarPoint;
    }

    let svg = `<svg viewBox="0 0 ${canvasWidth + 5} ${canvasHeight + 20}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse" >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
                </marker>

                <style>
                  .fabric-outline { fill: none; stroke: #000; stroke-width: 1.5; }
                  .piece { fill: #f0f0f0; stroke: #000; stroke-width: 1; }
                  .piece1 { fill: #fff; stroke: #000; stroke-width: 1; }
                  .grain { stroke: #000; stroke-width: 0.5; marker-start:url(#arrowhead); marker-end:url(#arrowhead);}
                  .mid_line { stroke: #333; stroke-width: 0.5; stroke-dasharray: 2,2; }
                  .sew-line { fill: none; stroke: #333; stroke-width: 0.5; stroke-dasharray: 2,2;}
                  .label { font-size: 6px; fill: #000; text-anchor: middle; }
                  .title { font-size: 18px; font-weight: bold; }
                  .fold { fill: none; stroke: #000; stroke-width: 0.5; }
                </style>
                
            </defs>
                        
            <!-- Fabric Outline -->
            <rect class="fabric-outline" x="${x0}" y="${y0}" 
                  width="${w * 2.54}" height="${height}" />
            
            <!-- Body Piece -->
            <rect class="piece" x="${x0 + 2}" y="${y0}" 
                  width="${m.m_lebar + m.basi_sambungan * 2}" height="${m.m_labuh * 2 + m.basi_lipatan * 2}" />
            <path class="sew-line" d="M${2 + x0 + m.m_lebar + m.basi_sambungan},${y0 + m.basi_lipatan} ${2 + x0 + m.m_lebar + m.basi_sambungan},${y0 + m.m_labuh * 2 + m.basi_lipatan} ${2 + x0 + m.basi_sambungan},${y0 + m.m_labuh * 2 + m.basi_lipatan} ${2 + x0 + m.basi_sambungan},${y0 + m.basi_lipatan} z" />
            <line class="mid_line" x1="${2 + x0}" y1="${y0 + m.m_labuh + m.basi_lipatan}" 
                  x2="${x0 + 2 + m.m_lebar + m.basi_sambungan}" y2="${y0 + m.m_labuh + m.basi_lipatan}"/>
            
            <text class="label" transform="rotate(270, ${x0 + 2 + m.m_lebar / 2}, ${y0 + m.m_labuh / 2})" x="${x0 + 2 + m.m_lebar / 2}" y="${y0 + m.m_labuh / 2}">Badan</text>
                        
            <!-- Sleeve -->
            ${lengan}

            <!-- Pesak -->
            ${pesak}

            <!-- Seluar -->
            ${seluar}

            <!-- Poket -->
            ${poket}

            <!-- Kekek -->
            ${kekek}

            <!-- Leher -->
            ${leher}

            <text class="label" text-anchor="start" x="${x0 + 45}" y="${canvasHeight + 16}" >Panjang Kain Diperlukan: ${(heightWithSeluar == 0 ? height / 100 : heightWithSeluar / 100).toFixed(1)} meter</text>
            
            <line class="grain" x1="${canvasWidth - 6}" y1="${y0 + 10}" x2="${canvasWidth - 6}" y2="${canvasHeight}" />
            <text class="label" transform="rotate(270, ${canvasWidth}, ${canvasHeight / 2})" x="${canvasWidth}" y="${canvasHeight / 2}">Arah Ira Kain</text>
        </svg>`;

    return svg;
  } /**
   * Baju Melayu cutting layout (placeholder)
   */
  static _bajuMelayuCuttingLayout(m, w) {
    const x0 = 10,
      y0 = 10;

    const tinggiPesak = m.m_labuh - m.m_lebar_lengan;
    const poketExtra = m.poket_atas < 7.62 ? 0.635 : 1.27;
    const turunLeher = m.leher < 38.1 ? 1.27 : 1.91;

    let lengan = "";
    let pesak = "";
    let kekek = "";
    let poket = "";
    let leher = "";
    let height = 0;
    let highestBadanPoint = 0;
    let highestPesakPoint = 0;
    let highestLenganPoint = 0;
    let highestKekekPoint = 0;
    let highestPoketBawahPoint = 0;
    let highestPoketAtasPoint = 0;
    let highestLeherPoint = 0;

    const x1 = x0 + 2 + m.m_lebar + m.basi_sambungan * 2;
    const x2 = x1 + m.basi_sambungan * 2 + m.m_lebar_lengan * 2;
    const y1 = y0 + tinggiPesak + m.basi_lipatan + m.basi_sambungan;
    const y2 = y0 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan;
    const y3 = y0 + m.m_labuh * 2 + m.basi_lipatan * 2;
    const y4 = y1 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan;
    const x3 = x1 + m.m_pesak_atas + m.m_pesak_bawah + m.basi_sambungan * 4;
    const x4 = x0 + 2 + m.m_pesak_atas + m.m_pesak_bawah + m.basi_sambungan * 4;
    const y5 = y2 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan;
    const x5 = x1 + m.poket_bawah + m.basi_sambungan * 2;
    const y6 = y1 + tinggiPesak + m.basi_lipatan + m.basi_sambungan;
    const x6 = x2 + m.poket_atas + m.basi_sambungan * 2;
    const y7 = y6 + m.m_lebar_kekek + m.basi_sambungan * 2;
    const x7 = x0 + 2 + m.poket_bawah + m.basi_sambungan * 2;
    const y8 = y3 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635;
    const x8 = x0 + 2 + m.poket_atas + m.basi_sambungan * 2;
    const x9 = x8 + m.m_lebar_kekek + m.basi_sambungan * 2;
    const y9 = y5 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635;
    const x10 = x4 + m.m_pesak_atas + m.m_pesak_bawah + m.basi_sambungan * 4;
    const x11 = x10 + m.poket_atas + m.basi_sambungan * 2;
    const x12 = x11 + m.m_lebar_kekek + m.basi_sambungan * 2;
    const x13 =
      x1 + m.poket_bawah + m.basi_sambungan * 2 + 5.08 * 2 + m.leher_teluk / 3 <
      x1 + m.basi_sambungan * 2 + m.m_lebar_lengan * 2
        ? x2
        : x5 + 5.08 * 2 + m.leher_teluk / 3;
    const x14 =
      x1 + m.poket_bawah + m.basi_sambungan * 2 + 5.08 * 2 + m.leher_teluk / 3 <
      x1 + m.basi_sambungan * 2 + m.m_lebar_lengan * 2
        ? x6
        : x5 +
          5.08 * 2 +
          m.leher_teluk / 3 +
          m.poket_atas +
          m.basi_sambungan * 2;
    const y10 = y4 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan;
    const x15 = x1 + m.poket_atas + m.basi_sambungan * 2;
    const x16 = x15 + m.m_lebar_kekek + m.basi_sambungan * 2;

    highestBadanPoint = y3 - y0;

    if (
      w * 2.54 >
      4 +
        m.m_lebar +
        m.basi_sambungan * 8 +
        m.m_lebar_lengan * 2 +
        m.m_pesak_atas +
        m.m_pesak_bawah
    ) {
      lengan += this._getLenganMelayu(m, x1, y0);
      lengan += this._getLenganMelayu(m, x1, y2);
      pesak += this._getPesakMelayu(m, x2, y0);
      pesak += this._getPesakMelayu(m, x2, y1);
      poket += this._getPoketBawah(m, x1, y5);

      highestLenganPoint =
        y2 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;

      highestPesakPoint =
        y1 + tinggiPesak + m.basi_lipatan + m.basi_sambungan - y0;

      if (
        w * 2.54 >
        4 +
          m.m_lebar +
          m.basi_sambungan * 8 +
          m.m_lebar_lengan * 2 +
          m.m_pesak_atas +
          m.m_pesak_bawah +
          5.08 * 2 +
          m.leher_teluk / 3
      ) {
        poket += this._getPoketBawah(m, x5, y5);
        poket += this._getPoketAtas(m, x2, y6);
        kekek += this._getKekekMelayu(m, x6, y6);
        kekek += this._getKekekMelayu(m, x6, y7);
        leher = this._getLeherTeluk(
          m,
          x2 + m.m_pesak_atas + m.m_pesak_bawah + m.basi_sambungan * 4,
          y0
        );

        highestPoketBawahPoint =
          y5 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635 - y0;

        highestKekekPoint = y7 + m.m_lebar_kekek + m.basi_sambungan * 2 - y0;
      } else {
        poket += this._getPoketBawah(m, x1, y9);
        poket += this._getPoketAtas(m, x13, y6);
        kekek += this._getKekekMelayu(m, x14, y6);
        kekek += this._getKekekMelayu(m, x14, y7);
        leher = this._getLeherTeluk(m, x5, y5);

        highestLeherPoint =
          y5 +
          m.leher_teluk / 6 +
          turunLeher * 2 +
          m.belahan_leher_teluk +
          5.08 * 2 -
          y0;

        highestPoketBawahPoint =
          y9 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635 - y0;
      }
    } else if (
      w * 2.54 >
      4 +
        m.m_lebar +
        m.basi_sambungan * 10 +
        m.m_pesak_atas * 2 +
        m.m_pesak_bawah * 2
    ) {
      pesak += this._getPesakMelayu(m, x1, y0);
      pesak += this._getPesakMelayu(m, x3, y0);
      lengan += this._getLenganMelayu(m, x1, y1);
      lengan += this._getLenganMelayu(m, x1, y4);
      poket += this._getPoketBawah(m, x0 + 2, y3);
      poket += this._getPoketBawah(m, x0 + 2, y8);
      poket += this._getPoketAtas(m, x1, y10);
      kekek += this._getKekekMelayu(m, x15, y10);
      kekek += this._getKekekMelayu(m, x16, y10);
      leher = this._getLeherTeluk(m, x7, y3);

      highestLeherPoint =
        y3 +
        m.leher_teluk / 6 +
        turunLeher * 2 +
        m.belahan_leher_teluk +
        5.08 * 2 -
        y0;

      highestPesakPoint =
        y0 + tinggiPesak + m.basi_lipatan + m.basi_sambungan - y0;
      highestLenganPoint =
        y4 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;
      highestPoketBawahPoint =
        y8 + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635 - y0;
      highestPoketAtasPoint =
        y10 +
        m.basi_sambungan +
        m.basi_lipatan +
        m.poket_atas +
        poketExtra -
        y0;
      highestKekekPoint = y10 + m.m_lebar_kekek + m.basi_sambungan * 2 - y0;
    } else {
      lengan += this._getLenganMelayu(m, x1, y0);
      lengan += this._getLenganMelayu(m, x1, y2);
      pesak += this._getPesakMelayu(m, x0 + 2, y3);
      pesak += this._getPesakMelayu(m, x4, y3);
      poket += this._getPoketBawah(m, x1, y5);
      poket += this._getPoketBawah(m, x5, y5);
      poket += this._getPoketAtas(m, x10, y9);
      kekek += this._getKekekMelayu(m, x11, y9);
      kekek += this._getKekekMelayu(m, x12, y9);
      leher = this._getLeherTeluk(
        m,
        x10,
        y9 + m.basi_sambungan + m.basi_lipatan + m.poket_atas + poketExtra
      );

      highestLenganPoint =
        y2 + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan - y0;

      highestPesakPoint =
        y3 + tinggiPesak + m.basi_lipatan + m.basi_sambungan - y0;
    }

    height = Math.max(
      highestBadanPoint,
      highestPesakPoint,
      highestLenganPoint,
      highestKekekPoint,
      highestPoketBawahPoint,
      highestPoketAtasPoint,
      highestLeherPoint
    );

    let svg = `<svg viewBox="0 0 ${w * 2.54 + 20 + 5} ${height + 20}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse" >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
                </marker>

                <style>
                  .fabric-outline { fill: none; stroke: #000; stroke-width: 1.5; }
                  .piece { fill: #f0f0f0; stroke: #000; stroke-width: 1; }
                  .piece1 { fill: #fff; stroke: #000; stroke-width: 1; }
                  .grain { stroke: #000; stroke-width: 0.5; marker-start:url(#arrowhead); marker-end:url(#arrowhead);}
                  .mid_line { stroke: #333; stroke-width: 0.5; stroke-dasharray: 2,2; }
                  .sew-line { fill: none; stroke: #333; stroke-width: 0.5; stroke-dasharray: 2,2;}
                  .label { font-size: 6px; fill: #000; text-anchor: middle; }
                  .title { font-size: 18px; font-weight: bold; }
                  .fold { fill: none; stroke: #000; stroke-width: 0.5; }
                </style>
                
            </defs>
                        
            <!-- Fabric Outline -->
            <rect class="fabric-outline" x="${x0}" y="${y0}" 
                  width="${w * 2.54}" height="${height}" />
            
            <!-- Body Piece -->
            <rect class="piece" x="${x0 + 2}" y="${y0}" 
                  width="${m.m_lebar + m.basi_sambungan * 2}" height="${m.m_labuh * 2 + m.basi_lipatan * 2}" />
            <path class="sew-line" d="M${2 + x0 + m.m_lebar + m.basi_sambungan},${y0 + m.basi_lipatan} ${2 + x0 + m.m_lebar + m.basi_sambungan},${y0 + m.m_labuh * 2 + m.basi_lipatan} ${2 + x0 + m.basi_sambungan},${y0 + m.m_labuh * 2 + m.basi_lipatan} ${2 + x0 + m.basi_sambungan},${y0 + m.basi_lipatan} z" />
            <line class="mid_line" x1="${2 + x0}" y1="${y0 + m.m_labuh + m.basi_lipatan}" 
                  x2="${x0 + 2 + m.m_lebar + m.basi_sambungan}" y2="${y0 + m.m_labuh + m.basi_lipatan}"/>
            
            <text class="label" transform="rotate(270, ${x0 + 2 + m.m_lebar / 2}, ${y0 + m.m_labuh / 2})" x="${x0 + 2 + m.m_lebar / 2}" y="${y0 + m.m_labuh / 2}">Badan</text>
                        
            <!-- Sleeve -->
            ${lengan}

            <!-- Pesak -->
            ${pesak}

            <!-- Poket -->
            ${poket}

            <!-- Kekek -->
            ${kekek}

            <!-- Leher -->
            ${leher}

            <text class="label" text-anchor="start" x="${x0 + 45}" y="${height + 16}" >Panjang Kain Diperlukan: ${(height / 100).toFixed(1)} meter</text>

            <line class="grain" x1="${w * 2.54 + 14}" y1="${y0 + 10}" x2="${w * 2.54 + 14}" y2="${height}" />
            <text class="label" transform="rotate(270, ${w * 2.54 + 20}, ${height / 2})" x="${w * 2.54 + 20}" y="${height / 2}">Arah Ira Kain</text>
            
        </svg>`;

    return svg;
  }

  /**
   * Leher Baju Melayu cutting layout
   */
  static _leherMelayuCuttingLayout(m, l) {
    const x0 = 5,
      y0 = 5;

    let leher = ``;

    switch (l) {
      case "teluk":
        leher = this._getLeherTeluk(m, x0, y0);
        break;
      case "cekak":
        leher = this._getLeherCekak(m, x0, y0 + 3);
        break;
      case "tunku":
        leher = this._getLeherTunku(m, x0, y0 + 3);
        break;
    }

    let svg = `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse" >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
                </marker>

                <style>
                  .fabric-outline { fill: none; stroke: #000; stroke-width: 0.75; }
                  .piece { fill: #f0f0f0; stroke: #000; stroke-width: 0.5; }
                  .piece1 { fill: #fff; stroke: #000; stroke-width: 0.5; }
                  .grain { stroke: #000; stroke-width: 0.5; marker-start:url(#arrowhead); marker-end:url(#arrowhead);}
                  .mid_line { stroke: #333; stroke-width: 0.25; stroke-dasharray: 1,1; }
                  .sew-line { fill: none; stroke: #333; stroke-width: 0.25; stroke-dasharray: 1,1; }
                  .label { font-size: 6px; fill: #000; text-anchor: middle; }
                  .title { font-size: 18px; font-weight: bold; }
                  .fold { fill: none; stroke: #000; stroke-width: 0.5; }
                </style>

                
            </defs>

            <!-- Leher -->
            ${leher}


        </svg>`;

    return svg;
  }

  /**
   * Placeholder for unimplemented patterns
   */
  static _placeholderSvg(title = "Pattern Coming Soon") {
    return `<svg viewBox="0 0 180 150" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .placeholder-text { font-size: 24px; fill: #999; text-anchor: middle; }
                </style>
            </defs>
            <rect width="800" height="600" fill="#f5f5f5" />
            <text x="400" y="300" class="placeholder-text">${title}</text>
            <text x="400" y="350" class="placeholder-text" font-size="16">(Pola sedang dikembangkan)</text>
        </svg>`;
  }

  static _getLengan(m, x, y) {
    let lengan = "";
    lengan += `<polygon class="piece" points="${x},${y} ${x + m.lebar_lengan * 2 + m.basi_sambungan * 2},${y} ${x + m.lebar_lengan + m.bukaan_lengan + m.basi_sambungan * 2},  ${y + m.labuh_lengan + m.basi_lipatan + m.basi_sambungan} ${x + m.lebar_lengan - m.bukaan_lengan},${y + m.labuh_lengan + m.basi_lipatan + m.basi_sambungan} ${x},${y}" />
      <polygon class="sew-line" points="${x + m.basi_sambungan},${y + m.basi_sambungan} ${x + m.basi_sambungan + m.lebar_lengan * 2},${y + m.basi_sambungan} ${x + m.basi_sambungan + m.lebar_lengan + m.bukaan_lengan},${y + m.labuh_lengan + m.basi_sambungan} ${x + m.lebar_lengan - m.bukaan_lengan + m.basi_sambungan},${y + m.labuh_lengan + m.basi_sambungan} ${x + m.basi_sambungan},${y + m.basi_sambungan}" />
            <line class="mid_line" x1="${x + m.lebar_lengan + m.basi_sambungan}" y1="${y}" x2="${x + m.lebar_lengan + m.basi_sambungan}" y2="${y + m.labuh_lengan + m.basi_lipatan}"/>
            <text class="label" x="${x + m.lebar_lengan + m.basi_sambungan}" y="${y + m.labuh_lengan / 2}">Lengan</text>`;
    return lengan;
  }

  static _getPesak(m, x, y) {
    const tinggiPesak = m.labuh - m.lebar_lengan;
    let pesak = "";
    pesak += `<rect class="piece" x="${x}" y="${y}"
                    width="${m.pesak_atas + m.pesak_bawah + m.basi_sambungan * 4}" height="${tinggiPesak + m.basi_lipatan + m.basi_sambungan}" />
              <line class="piece" x1="${x + m.basi_sambungan * 2 + m.pesak_atas}" y1="${y}" x2="${x + m.basi_sambungan * 2 + m.pesak_bawah}" y2="${y + m.basi_sambungan + tinggiPesak + m.basi_lipatan}" />
              <path class="sew-line" d="M${x + m.basi_sambungan},${y + m.basi_sambungan} ${x + m.basi_sambungan + m.pesak_atas},${y + m.basi_sambungan} ${x + m.basi_sambungan + m.pesak_bawah},${y + m.basi_sambungan + tinggiPesak} ${x + m.basi_sambungan},${y + m.basi_sambungan + tinggiPesak} ${x + m.basi_sambungan},${y + m.basi_sambungan}" />
              <path class="sew-line" d="M${x + m.basi_sambungan * 3 + m.pesak_atas},${y + m.basi_lipatan} ${x + m.basi_sambungan * 3 + m.pesak_atas + m.pesak_bawah},${y + m.basi_lipatan} ${x + m.basi_sambungan * 3 + m.pesak_atas + m.pesak_bawah},${y + m.basi_lipatan + tinggiPesak} ${x + m.basi_sambungan * 3 + m.pesak_bawah},${y + m.basi_lipatan + tinggiPesak} ${x + m.basi_sambungan * 3 + m.pesak_atas},${y + m.basi_lipatan}" />`;
    return pesak;
  }

  static _getKekek(m, x, y) {
    let kekek = "";
    kekek += `<rect class="piece" x="${x}" y="${y}" width="${m.lebar_kekek + m.basi_sambungan * 2}" height="${m.lebar_kekek + m.basi_sambungan * 2}" />
      <rect class="sew-line" x="${x + m.basi_sambungan}" y="${y + m.basi_sambungan}" width="${m.lebar_kekek}" height="${m.lebar_kekek}" />`;
    return kekek;
  }

  static _getLeher(m, x, y) {
    const turunLeher = m.leher < 38.1 ? 1.27 : 1.91;
    const leher6 = m.leher / 6;
    const y1 = y + 5.08;

    let leher = "";
    leher += `<path class="piece" d="M${x},${y} C${x + (leher6 + 5.08) * 0.4},${y} ${x + leher6 + 5.08},${y + (turunLeher + 5.08) * 0.2} ${x + leher6 + 5.08},${y1 + turunLeher} C${x + leher6 + 5.08},${y1 + turunLeher + (leher6 + turunLeher + 5.08) * 0.6} ${x + (5.08 + leher6) * 0.7},${y1 + turunLeher + (leher6 + turunLeher + 5.08) * 0.8} ${x + 5.08},${y1 + turunLeher + leher6 + turunLeher + 5.08}   L${x + 5.08},${y1 + turunLeher + leher6 + turunLeher + m.belahan_leher} ${x},${y1 + turunLeher + leher6 + turunLeher + 5.08 + m.belahan_leher} ${x - 5.08},${y1 + turunLeher + leher6 + turunLeher + m.belahan_leher} ${x - 5.08},${y1 + turunLeher + leher6 + turunLeher + 5.08} C${x - (5.08 + leher6) * 0.7},${y1 + turunLeher + (leher6 + turunLeher + 5.08) * 0.8} ${x - leher6 - 5.08},${y1 + turunLeher + (leher6 + turunLeher + 5.08) * 0.6} ${x - leher6 - 5.08},${y1 + turunLeher} C${x - leher6 - 5.08},${y + (turunLeher + 5.08) * 0.2} ${x - (leher6 + 5.08) * 0.4},${y} ${x},${y}" />`;

    leher += `<path class="sew-line" d="M${x},${y1} C${x + leher6 / 2},${y1} ${x + leher6},${y1 + turunLeher / 2} ${x + leher6},${y1 + turunLeher} C${x + leher6},${y1 + turunLeher + (leher6 + turunLeher) / 2} ${x + leher6 / 2},${y1 + turunLeher * 2 + leher6} ${x},${y1 + turunLeher * 2 + leher6} C${x - leher6 / 2},${y1 + turunLeher * 2 + leher6} ${x - leher6},${y1 + turunLeher + (leher6 + turunLeher) / 2} ${x - leher6},${y1 + turunLeher} C${x - leher6},${y1 + turunLeher / 2} ${x - leher6 / 2},${y1} ${x},${y1}" />`;

    leher += `<line class="piece" x1="${x}" y1="${y1 + turunLeher * 2 + leher6 - m.basi_leher}" x2="${x}" y2="${y1 + turunLeher * 2 + leher6 + m.belahan_leher}" />`;

    leher += `<line class="mid_line" x1="${x}" y1="${y}" x2="${x}" y2="${y1 + turunLeher * 2 + leher6 + m.belahan_leher + 5.08}" />`;

    leher += `<path class="piece1" d="M${x},${y1 + m.basi_leher} C${x + (leher6 - m.basi_leher) / 2},${y1 + m.basi_leher} ${x + leher6 - m.basi_leher},${y1 + turunLeher - (turunLeher - m.basi_leher) / 2} ${x + leher6 - m.basi_leher},${y1 + turunLeher} C${x + leher6 - m.basi_leher},${y1 + turunLeher + (leher6 + turunLeher - m.basi_leher) / 2} ${x + (leher6 - m.basi_leher) / 2},${y1 + turunLeher * 2 + leher6 - m.basi_leher} ${x},${y1 + turunLeher * 2 + leher6 - m.basi_leher} C${x - (leher6 - m.basi_leher) / 2},${y1 + turunLeher * 2 + leher6 - m.basi_leher} ${x - leher6 + m.basi_leher},${y1 + turunLeher + (leher6 + turunLeher - m.basi_leher) / 2} ${x - leher6 + m.basi_leher},${y1 + turunLeher} C${x - leher6 + m.basi_leher},${y1 + turunLeher - (turunLeher - m.basi_leher) / 2} ${x - (leher6 - m.basi_leher) / 2},${y1 + m.basi_leher} ${x},${y1 + m.basi_leher}" />`;
    return leher;
  }

  static _getHorizantalPinggang(m, x, y) {
    let pinggang = "";
    pinggang += `<rect class="piece" x="${x}" y="${y}"
                    width="${m.pinggul + m.kelonggaran + 3 + m.basi_sambungan * 2}" height="${5 + m.basi_sambungan * 2}" />
                    <rect class="sew-line" x="${x + m.basi_sambungan}" y="${y + m.basi_sambungan}"
                    width="${m.pinggul + m.kelonggaran + 3}" height="${5}" />`;
    return pinggang;
  }

  static _getVerticalPinggang(m, x, y) {
    let pinggang = "";
    pinggang += `<rect class="piece" x="${x}" y="${y}"
                    width="${5 + m.basi_sambungan * 2}" height="${m.pinggul + m.kelonggaran + 3 + m.basi_sambungan * 2}" />
                    <rect class="sew-line" x="${x + m.basi_sambungan}" y="${y + m.basi_sambungan}"
                    width="${5}" height="${m.pinggul + m.kelonggaran + 3}" />`;
    return pinggang;
  }

  static _getSeluar1(m, x, y) {
    let seluar = "";

    const cx1 = m.m_pinggul < 93.98 ? 5.08 : 8.89;
    const cx2 = m.m_pinggul < 93.98 ? 3.81 : 5.08;
    const cy1 = m.m_pinggul < 93.98 ? 7.62 : 8.89;
    const cy2 = m.m_pinggul < 93.98 ? 5.08 : 6.35;

    const x1 = x + m.basi_sambungan + (m.m_pinggul + 7.62) / 4;
    const y1 = y + 3.81 - 2.54;
    const y2 = y + 3.81 + m.cawat / 2;
    const y3 = y + 3.81 + m.labuh_seluar;
    const x2 = x1 + (m.m_pinggul + 7.62) / 4;
    const x3 = x2 - 2.54;
    const x4 = x2 + cx1;
    const x5 = x1 + m.bukaan_kaki + (m.m_pinggul < 93.98 ? 0.953 : 1.27);
    const x6 = x1 - m.bukaan_kaki + (m.m_pinggul < 93.98 ? 0.953 : 1.27);
    const x7 = x + m.basi_sambungan - cx2;
    const y4 = y2 - cy1;
    const y5 = y2 - cy2;

    seluar += `<path class="piece" d="M${x},${y} L${x1},${y} ${x3 + m.basi_sambungan},${y - 2.54} ${x2 + m.basi_sambungan},${y4} C${x2 + m.basi_sambungan + (cx1 + m.basi_sambungan) * 0.2},${y4 + cy1 / 2} ${x2 + m.basi_sambungan + (cx1 + m.basi_sambungan) * 0.2},${y2 - cy1 * 0.5} ${x4 + m.basi_sambungan},${y2} L${x5 + m.basi_sambungan},${y3} ${x5 + m.basi_sambungan},${y3 + m.basi_lipatan} ${x6 - m.basi_sambungan},${y3 + m.basi_lipatan} ${x6 - m.basi_sambungan},${y3} ${x7 - m.basi_sambungan},${y2} C${x7 - m.basi_sambungan + (cx2 + m.basi_sambungan) / 2},${y2 - cy2 / 2} ${x},${y5 + cy2 / 2} ${x},${y5} z" />`;

    seluar += `<path class="sew-line" d="M${x + m.basi_sambungan},${y + 3.81} L${x1},${y + 3.81} ${x3},${y1} ${x2},${y4} C${x2},${y4 + cy1 / 2} ${x2 + cx1 / 2},${y2} ${x4},${y2} L${x5},${y3} ${x6},${y3} ${x7},${y2} C${x7 + cx2 / 2},${y2} ${x + m.basi_sambungan},${y5 + cy2 / 2} ${x + m.basi_sambungan},${y5} z" />`;

    seluar += `<line class="mid_line" x1="${x1}" y1="${y}" x2="${x1}" y2="${y3 + m.basi_lipatan}"/>
    
    <text class="label" transform="rotate(270, ${x1 - cx2}, ${y2})" x="${x1 - cx2}" y="${y2}">Seluar</text>`;

    return seluar;
  }

  static _getSeluar2(m, x, y, ty) {
    let seluar = "";

    const cx1 = m.m_pinggul < 93.98 ? 5.08 : 8.89;
    const cx2 = m.m_pinggul < 93.98 ? 3.81 : 5.08;
    const cy1 = m.m_pinggul < 93.98 ? 7.62 : 8.89;
    const cy2 = m.m_pinggul < 93.98 ? 5.08 : 6.35;

    const x1 = x + m.basi_sambungan + (m.m_pinggul + 7.62) / 4;
    const y1 = y + 3.81 - 2.54;
    const y2 = y + 3.81 + m.cawat / 2;
    const y3 = y + 3.81 + m.labuh_seluar;
    const x2 = x1 + (m.m_pinggul + 7.62) / 4;
    const x3 = x2 - 2.54;
    const x4 = x2 + cx1;
    const x5 = x1 + m.bukaan_kaki + (m.m_pinggul < 93.98 ? 0.953 : 1.27);
    const x6 = x1 - m.bukaan_kaki + (m.m_pinggul < 93.98 ? 0.953 : 1.27);
    const x7 = x + m.basi_sambungan - cx2;
    const y4 = y2 - cy1;
    const y5 = y2 - cy2;

    seluar += `<path transform="translate(0, ${ty}) scale(1, -1)" class="piece" d="M${x},${y} L${x1},${y} ${x3 + m.basi_sambungan},${y - 2.54} ${x2 + m.basi_sambungan},${y4} C${x2 + m.basi_sambungan + (cx1 + m.basi_sambungan) * 0.2},${y4 + cy1 / 2} ${x2 + m.basi_sambungan + (cx1 + m.basi_sambungan) * 0.2},${y2 - cy1 * 0.5} ${x4 + m.basi_sambungan},${y2} L${x5 + m.basi_sambungan},${y3} ${x5 + m.basi_sambungan},${y3 + m.basi_lipatan} ${x6 - m.basi_sambungan},${y3 + m.basi_lipatan} ${x6 - m.basi_sambungan},${y3} ${x7 - m.basi_sambungan},${y2} C${x7 - m.basi_sambungan + (cx2 + m.basi_sambungan) / 2},${y2 - cy2 / 2} ${x},${y5 + cy2 / 2} ${x},${y5} z" />`;

    seluar += `<path transform="translate(0, ${ty}) scale(1, -1)" class="sew-line" d="M${x + m.basi_sambungan},${y + 3.81} L${x1},${y + 3.81} ${x3},${y1} ${x2},${y4} C${x2},${y4 + cy1 / 2} ${x2 + cx1 / 2},${y2} ${x4},${y2} L${x5},${y3} ${x6},${y3} ${x7},${y2} C${x7 + cx2 / 2},${y2} ${x + m.basi_sambungan},${y5 + cy2 / 2} ${x + m.basi_sambungan},${y5} z" />`;

    seluar += `<line transform="translate(0, ${ty}) scale(1, -1)" class="mid_line" x1="${x1}" y1="${y}" x2="${x1}" y2="${y3 + m.basi_lipatan}"/>
    
    <text class="label" transform="rotate(270, ${x1 - cx2}, ${y2})" x="${x1 - cx2}" y="${y2}">Seluar</text>`;

    return seluar;
  }

  static _getLenganMelayu(m, x, y) {
    let lengan = "";
    lengan += `<polygon class="piece" points="${x},${y} ${x + m.m_lebar_lengan * 2 + m.basi_sambungan * 2},${y} ${x + m.m_lebar_lengan + m.m_bukaan_lengan + m.basi_sambungan * 2},  ${y + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan} ${x + m.m_lebar_lengan - m.m_bukaan_lengan},${y + m.m_labuh_lengan + m.basi_lipatan + m.basi_sambungan} ${x},${y}" />
      <polygon class="sew-line" points="${x + m.basi_sambungan},${y + m.basi_sambungan} ${x + m.basi_sambungan + m.m_lebar_lengan * 2},${y + m.basi_sambungan} ${x + m.basi_sambungan + m.m_lebar_lengan + m.m_bukaan_lengan},${y + m.m_labuh_lengan + m.basi_sambungan} ${x + m.m_lebar_lengan - m.m_bukaan_lengan + m.basi_sambungan},${y + m.m_labuh_lengan + m.basi_sambungan} ${x + m.basi_sambungan},${y + m.basi_sambungan}" />
      <line class="mid_line" x1="${x + m.m_lebar_lengan + m.basi_sambungan}" y1="${y}" x2="${x + m.m_lebar_lengan + m.basi_sambungan}" y2="${y + m.m_labuh_lengan + m.basi_lipatan}"/>
      <text class="label" transform="rotate(270, ${x + m.m_lebar_lengan / 2 + m.basi_sambungan}, ${y + m.m_labuh_lengan / 2})" x="${x + m.m_lebar_lengan / 2 + m.basi_sambungan}" y="${y + m.m_labuh_lengan / 2}">Lengan</text>`;
    return lengan;
  }

  static _getPesakMelayu(m, x, y) {
    const tinggiPesak = m.m_labuh - m.m_lebar_lengan;
    let pesak = "";
    pesak += `<rect class="piece" x="${x}" y="${y}"
                    width="${m.m_pesak_atas + m.m_pesak_bawah + m.basi_sambungan * 4}" height="${tinggiPesak + m.basi_lipatan + m.basi_sambungan}" />
              <line class="piece" x1="${x + m.basi_sambungan * 2 + m.m_pesak_atas}" y1="${y}" x2="${x + m.basi_sambungan * 2 + m.m_pesak_bawah}" y2="${y + m.basi_sambungan + tinggiPesak + m.basi_lipatan}" />
              <path class="sew-line" d="M${x + m.basi_sambungan},${y + m.basi_sambungan} ${x + m.basi_sambungan + m.m_pesak_atas},${y + m.basi_sambungan} ${x + m.basi_sambungan + m.m_pesak_bawah},${y + m.basi_sambungan + tinggiPesak} ${x + m.basi_sambungan},${y + m.basi_sambungan + tinggiPesak} ${x + m.basi_sambungan},${y + m.basi_sambungan}" />
              <path class="sew-line" d="M${x + m.basi_sambungan * 3 + m.m_pesak_atas},${y + m.basi_lipatan} ${x + m.basi_sambungan * 3 + m.m_pesak_atas + m.m_pesak_bawah},${y + m.basi_lipatan} ${x + m.basi_sambungan * 3 + m.m_pesak_atas + m.m_pesak_bawah},${y + m.basi_lipatan + tinggiPesak} ${x + m.basi_sambungan * 3 + m.m_pesak_bawah},${y + m.basi_lipatan + tinggiPesak} ${x + m.basi_sambungan * 3 + m.m_pesak_atas},${y + m.basi_lipatan}" />
              <text class="label" transform="rotate(270, ${x + m.m_pesak_bawah * 0.6 + m.basi_sambungan}, ${y + tinggiPesak / 2})" x="${x + m.m_pesak_bawah * 0.6 + m.basi_sambungan}" y="${y + tinggiPesak / 2}">Pesak</text>
              <text class="label" transform="rotate(270, ${x + m.m_pesak_bawah * 0.6 + m.basi_sambungan * 2 + m.m_pesak_bawah}, ${y + tinggiPesak / 2})" x="${x + m.m_pesak_bawah * 0.6 + m.basi_sambungan * 2 + m.m_pesak_bawah}" y="${y + tinggiPesak / 2}">Pesak</text>`;
    return pesak;
  }

  static _getKekekMelayu(m, x, y) {
    let kekek = "";
    kekek += `<rect class="piece" x="${x}" y="${y}" width="${m.m_lebar_kekek + m.basi_sambungan * 2}" height="${m.m_lebar_kekek + m.basi_sambungan * 2}" />
      <rect class="sew-line" x="${x + m.basi_sambungan}" y="${y + m.basi_sambungan}" width="${m.m_lebar_kekek}" height="${m.m_lebar_kekek}" />`;
    return kekek;
  }

  static _getPoketAtas(m, x, y) {
    const poketExtra = m.poket_atas < 7.62 ? 0.635 : 1.27;
    const x1 = x + m.basi_sambungan;
    const y1 = y + m.basi_lipatan;

    let poket = "";
    poket += `<path class="piece" d="M${x},${y} ${x + m.poket_atas + m.basi_sambungan * 2},${y} ${x + m.poket_atas + m.basi_sambungan * 2},${y + m.basi_lipatan + m.poket_atas - poketExtra} C${x + m.poket_atas + m.basi_sambungan * 2},${y + m.basi_lipatan + m.poket_atas - poketExtra + (m.basi_sambungan + poketExtra * 2) / 2} ${x + m.poket_atas + m.basi_sambungan * 2 - (m.basi_sambungan + poketExtra * 2) / 2},${y + m.basi_sambungan + m.basi_lipatan + m.poket_atas + poketExtra} ${x + m.poket_atas + m.basi_sambungan * 2 - (m.basi_sambungan + poketExtra * 2)},${y + m.basi_sambungan + m.basi_lipatan + m.poket_atas + poketExtra} L${x + poketExtra * 2 + m.basi_sambungan},${y + m.basi_sambungan + m.basi_lipatan + m.poket_atas + poketExtra} C${x + (m.basi_sambungan + poketExtra * 2) / 2},${y + m.basi_sambungan + m.basi_lipatan + m.poket_atas + poketExtra} ${x},${y + m.basi_lipatan + m.poket_atas - poketExtra + (m.basi_sambungan + poketExtra * 2) / 2} ${x},${y + m.basi_lipatan + m.poket_atas - poketExtra} z" />`;

    poket += `<path class="sew-line" d="M${x1},${y1} ${x1 + m.poket_atas},${y1} ${x1 + m.poket_atas},${y1 + m.poket_atas - poketExtra} C${x1 + m.poket_atas},${y1 + m.poket_atas} ${x1 + m.poket_atas - poketExtra},${y1 + m.poket_atas + poketExtra} ${x1 + m.poket_atas - poketExtra * 2},${y1 + m.poket_atas + poketExtra} L${x1 + poketExtra * 2},${y1 + m.poket_atas + poketExtra} C${x1 + poketExtra},${y1 + m.poket_atas + poketExtra} ${x1},${y1 + m.poket_atas} ${x1},${y1 + m.poket_atas - poketExtra} z" />`;

    return poket;
  }

  static _getPoketBawah(m, x, y) {
    const poketExtra = m.poket_atas < 7.62 ? 0.635 : 1.27;
    const x1 = x + m.basi_sambungan;
    const y1 = y + m.basi_lipatan;
    let poket = "";

    poket += `<path class="piece" d="M${x},${y} ${x + m.poket_bawah + m.basi_sambungan * 2},${y} ${x + m.poket_bawah + m.basi_sambungan * 2},${y + m.basi_lipatan + m.poket_bawah + 0.635 - poketExtra * 2} C${x + m.poket_bawah + m.basi_sambungan * 2},${y + m.basi_lipatan + m.basi_sambungan + m.poket_bawah + 0.635 - (m.basi_sambungan + poketExtra * 2) / 2} ${x + m.poket_bawah + m.basi_sambungan * 2 - (m.basi_sambungan + poketExtra * 2) / 2},${y + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635} ${x + m.poket_bawah + m.basi_sambungan * 2 - (m.basi_sambungan + poketExtra * 2)},${y + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635} L${x + poketExtra * 2 + m.basi_sambungan},${y + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635} C${x + (m.basi_sambungan + poketExtra * 2) / 2},${y + m.basi_sambungan + m.basi_lipatan + m.poket_bawah + 0.635} ${x},${y + m.basi_lipatan + m.basi_sambungan + m.poket_bawah + 0.635 - (m.basi_sambungan + poketExtra * 2) / 2} ${x},${y + m.basi_lipatan + m.poket_bawah + 0.635 - poketExtra * 2} z" />`;

    poket += `<path class="sew-line" d="M${x1},${y1} ${x1 + m.poket_bawah},${y1} ${x1 + m.poket_bawah},${y1 + m.poket_bawah + 0.635 - poketExtra * 2} C${x1 + m.poket_bawah},${y1 + m.poket_bawah + 0.635 - poketExtra} ${x1 + m.poket_bawah - poketExtra},${y1 + m.poket_bawah + 0.635} ${x1 + m.poket_bawah - poketExtra * 2},${y1 + m.poket_bawah + 0.635} L${x1 + poketExtra * 2},${y1 + m.poket_bawah + 0.635} C${x1 + poketExtra},${y1 + m.poket_bawah + 0.635} ${x1},${y1 + m.poket_bawah + 0.635 - poketExtra} ${x1},${y1 + m.poket_bawah + 0.635 - poketExtra * 2} z" />`;

    return poket;
  }

  static _getKekekMelayu(m, x, y) {
    let kekek = "";
    kekek += `<rect class="piece" x="${x}" y="${y}" width="${m.m_lebar_kekek + m.basi_sambungan * 2}" height="${m.m_lebar_kekek + m.basi_sambungan * 2}" />
      <rect class="sew-line" x="${x + m.basi_sambungan}" y="${y + m.basi_sambungan}" width="${m.m_lebar_kekek}" height="${m.m_lebar_kekek}" />`;
    return kekek;
  }

  static _getLeherTeluk(m, x, y) {
    const turunLeher = m.leher < 38.1 ? 1.27 : 1.91;
    const leherTeluk = m.leher_teluk / 6;

    const x1 = x + 5.08 + leherTeluk;
    const x2 = x + 5.08 * 2 + leherTeluk * 2;
    const x3 = x + 5.08;
    const x4 = x + 5.08 + leherTeluk * 2;
    const x5 = x1 - 5.08;
    const x6 = x1 + 5.08;
    const y1 = y + 5.08;
    const y2 = y1 + turunLeher;
    const y3 = y2 + leherTeluk + turunLeher;
    const y4 = y3 + 5.08;
    const y5 = y3 + m.belahan_leher_teluk;
    const y6 = y5 + 5.08;

    let leher = "";

    leher += `<path class="piece" d="M${x1},${y} C${x1 + (leherTeluk + 5.08) * 0.4},${y} ${x2},${y + (turunLeher + 5.08) * 0.2} ${x2},${y2} C${x2},${y2 + (leherTeluk + turunLeher + 5.08) * 0.6} ${x1 + (5.08 + leherTeluk) * 0.7},${y2 + (leherTeluk + turunLeher + 5.08) * 0.8} ${x6},${y4} L${x6},${y5} ${x1},${y6} ${x5},${y5} ${x5},${y4} C${x1 - (5.08 + leherTeluk) * 0.7},${y2 + (leherTeluk + turunLeher + 5.08) * 0.8} ${x},${y2 + (leherTeluk + turunLeher + 5.08) * 0.6} ${x},${y2} C${x},${y + (turunLeher + 5.08) * 0.2} ${x1 - (leherTeluk + 5.08) * 0.4},${y} ${x1},${y}" />`;

    leher += `<path class="sew-line" d="M${x1},${y1} C${x1 + leherTeluk / 2},${y1} ${x4},${y1 + turunLeher / 2} ${x4},${y2} C${x4},${y2 + (leherTeluk + turunLeher) / 2} ${x1 + leherTeluk / 2},${y3} ${x1},${y3} C${x1 - leherTeluk / 2},${y3} ${x3},${y2 + (leherTeluk + turunLeher) / 2} ${x3},${y2} C${x3},${y1 + turunLeher / 2} ${x1 - leherTeluk / 2},${y1} ${x1},${y1}" />`;

    leher += `<path class="piece1" d="M${x1},${y1 + m.basi_leher} C${x1 + (leherTeluk - m.basi_leher) / 2},${y1 + m.basi_leher} ${x4 - m.basi_leher},${y1 + m.basi_leher + (turunLeher - m.basi_leher) / 2} ${x4 - m.basi_leher},${y2} C${x4 - m.basi_leher},${y2 + (leherTeluk + turunLeher - m.basi_leher) / 2} ${x1 + (leherTeluk - m.basi_leher) / 2},${y3 - m.basi_leher} ${x1},${y3 - m.basi_leher} C${x1 - (leherTeluk - m.basi_leher) / 2},${y3 - m.basi_leher} ${x3 + m.basi_leher},${y2 + (leherTeluk + turunLeher - m.basi_leher) / 2} ${x3 + m.basi_leher},${y2} C${x3 + m.basi_leher},${y1 + m.basi_leher + (turunLeher - m.basi_leher) / 2} ${x1 - (leherTeluk - m.basi_leher) / 2},${y1 + m.basi_leher} ${x1},${y1 + m.basi_leher}" />`;

    leher += `<line class="piece" x1="${x1}" y1="${y3 - m.basi_leher}" x2="${x1}" y2="${y5}" />`;

    leher += `<line class="mid_line" x1="${x1}" y1="${y}" x2="${x1}" y2="${y6}" />`;

    return leher;
  }

  static _getLeherCekak(m, x, y) {
    const selisihButang = m.leher > 37 ? 1.27 : 1;
    const tinggiKolar = m.leher > 37 ? 3.18 : 2.54;
    const lebarTulangAtas = m.leher > 37 ? 3.18 : 2.54;
    const tinggiTulangBawah = m.m_belahan_leher + 1.27;

    const x1 = x + m.leher / 2 + selisihButang;
    const x2 = x1 + (m.leher / 2 + selisihButang) / 2;
    const x3 = x1 + m.leher / 2 + selisihButang;
    const x10 = x1 - (m.leher / 2 + selisihButang) / 2;
    const x11 = x1 - m.leher / 2 - selisihButang;

    const y1 = y + tinggiKolar - 1.91;
    const y2 = y + tinggiKolar;

    const point1 = this._getPerpendicularPoint(
      x2,
      y2,
      x3,
      y1,
      -(tinggiKolar - 1.27)
    );

    const point2 = this._getPerpendicularPoint(x2, y2, x3, y1, -tinggiKolar);

    const point3 = this._getPerpendicularPoint(
      point1.x,
      point1.y,
      point2.x,
      point2.y,
      -1.27
    );

    const point4 = this._getPerpendicularPoint(
      x10,
      y2,
      x11,
      y1,
      tinggiKolar - 1.27
    );

    const point5 = this._getPerpendicularPoint(x10, y2, x11, y1, tinggiKolar);

    const point6 = this._getPerpendicularPoint(
      point4.x,
      point4.y,
      point5.x,
      point5.y,
      1.27
    );

    const y3 = y2 + 5;
    const y4 = y3 + m.basi_leher;
    const x5 = x11 + 1.91 * 2 + m.basi_sambungan * 2;
    const y5 = y4 + tinggiTulangBawah;

    const x6 = x5 + 10;
    const x7 = x6 + lebarTulangAtas / 2;
    const x8 = x7 + lebarTulangAtas / 2;
    const y6 = y4 + m.m_belahan_leher + 3.81;
    const y7 = y6 + m.basi_sambungan;

    let leher = "";

    leher += `<path class="piece" d="M${x1},${y - m.basi_sambungan} L${x2},${y - m.basi_sambungan} Q${x2 + (point3.x - x2) / 2},${y - m.basi_sambungan - (y - m.basi_sambungan - point3.y) / 7} ${point3.x},${point3.y - m.basi_sambungan} Q${point2.x + m.basi_sambungan},${point2.y - m.basi_sambungan} ${point1.x + m.basi_sambungan},${point1.y} L${x3 + m.basi_sambungan},${y1 + m.basi_sambungan} Q${x2 + (x3 - x2) / 2},${y2 + m.basi_sambungan - (y1 - y2) / 7} ${x2},${y2 + m.basi_sambungan} L${x1},${y2 + m.basi_sambungan} ${x10},${y2 + m.basi_sambungan} Q${x10 - (x10 - x11) / 2},${y2 + m.basi_sambungan - (y1 - y2) / 7} ${x11 - m.basi_sambungan},${y1 + m.basi_sambungan} L${point4.x - m.basi_sambungan},${point4.y} Q${point5.x - m.basi_sambungan},${point5.y - m.basi_sambungan} ${point6.x},${point6.y - m.basi_sambungan} Q${x10 - (x10 - point6.x) / 2},${y - m.basi_sambungan - (y - m.basi_sambungan - point6.y) / 7} ${x10},${y - m.basi_sambungan} z" />

    <path class="sew-line" d="M${x1},${y} L${x2},${y} Q${x2 + (point3.x - x2) / 2},${y - (y - point3.y) / 7} ${point3.x},${point3.y} Q${point2.x},${point2.y} ${point1.x},${point1.y} L${x3},${y1} Q${x2 + (x3 - x2) / 2},${y2 - (y1 - y2) / 7} ${x2},${y2} L${x1},${y2} ${x10},${y2} Q${x10 - (x10 - x11) / 2},${y2 - (y1 - y2) / 7} ${x11},${y1} L${point4.x},${point4.y} Q${point5.x},${point5.y} ${point6.x},${point6.y} Q${x10 - (x10 - point6.x) / 2},${y - (y - point6.y) / 7} ${x10},${y} z" />

    <path class="piece" d="M${x11},${y3} L${x5},${y3} ${x5},${y5} ${x11},${y5} z" />

    <path class="piece1" d="M${x11 + m.basi_sambungan},${y3} L${x5 - m.basi_sambungan - 1.91},${y3} ${x5 - m.basi_sambungan - 1.91},${y5} ${x11 + m.basi_sambungan},${y5} z" />
    
    <path class="piece" d="M${x6 - m.basi_sambungan},${y3} L${x8 + lebarTulangAtas + m.basi_sambungan},${y3} ${x8 + lebarTulangAtas + m.basi_sambungan},${y5} ${x8 + m.basi_sambungan},${y5} ${x8 + m.basi_sambungan},${y6} ${x7},${y7 + m.basi_sambungan} ${x6 - m.basi_sambungan},${y6} z" />

    <path class="piece1" d="M${x6},${y3} L${x8},${y3} ${x8},${y6} ${x7},${y7} ${x6},${y6} z" />

    <line class="mid_line" x1="${x1}" y1="${point2.y}" x2="${x1}" y2="${y2 + m.basi_sambungan}" />

    <line class="mid_line" x1="${x11}" y1="${y4}" x2="${x5}" y2="${y4}" />
    <line class="mid_line" x1="${x5 - m.basi_sambungan}" y1="${y3}" x2="${x5 - m.basi_sambungan}" y2="${y5}" />
    <line class="mid_line" x1="${x6 - m.basi_sambungan}" y1="${y4}" x2="${x8 + lebarTulangAtas + m.basi_sambungan}" y2="${y4}" />
    <line class="mid_line" x1="${x8 + lebarTulangAtas}" y1="${y3}" x2="${x8 + lebarTulangAtas}" y2="${y5}" />`;

    return leher;
  }

  static _getLeherTunku(m, x, y) {
    const tinggiKolar = m.leher > 37 ? 3.18 : 2.54;
    const lebarTulangAtas = m.leher > 37 ? 3.18 : 2.54;
    const tinggiTulangBawah = m.m_belahan_leher + 1.27;

    const x1 = x + m.leher / 2;
    const x2 = x1 + m.leher / 2 / 2;
    const x3 = x1 + m.leher / 2;
    const x10 = x1 - m.leher / 2 / 2;
    const x11 = x1 - m.leher / 2;

    const y1 = y + tinggiKolar - 1.91;
    const y2 = y + tinggiKolar;

    const point1 = this._getPerpendicularPoint(
      x2,
      y2,
      x3,
      y1,
      -(tinggiKolar - 1.27)
    );

    const point2 = this._getPerpendicularPoint(x2, y2, x3, y1, -tinggiKolar);

    const point3 = this._getPerpendicularPoint(
      point1.x,
      point1.y,
      point2.x,
      point2.y,
      -1.27
    );

    const point4 = this._getPerpendicularPoint(
      x10,
      y2,
      x11,
      y1,
      tinggiKolar - 1.27
    );

    const point5 = this._getPerpendicularPoint(x10, y2, x11, y1, tinggiKolar);

    const point6 = this._getPerpendicularPoint(
      point4.x,
      point4.y,
      point5.x,
      point5.y,
      1.27
    );

    const y3 = y2 + 5;
    const y4 = y3 + m.basi_leher;
    const x4 = x11 + 1.91 / 2 + m.basi_sambungan;
    const x5 = x11 + 1.91 * 2 + m.basi_sambungan * 2;
    const y5 = y4 + tinggiTulangBawah;

    const x6 = x5 + 10;
    const x7 = x6 + lebarTulangAtas / 2;
    const x8 = x7 + lebarTulangAtas / 2;
    const y6 = y4 + m.m_belahan_leher + 3.81;
    const y7 = y6 + m.basi_sambungan;

    let leher = "";

    leher += `<path class="piece" d="M${x1},${y - m.basi_sambungan} L${x2},${y - m.basi_sambungan} Q${x2 + (point3.x - x2) / 2},${y - m.basi_sambungan - (y - m.basi_sambungan - point3.y) / 7} ${point3.x},${point3.y - m.basi_sambungan} Q${point2.x + m.basi_sambungan},${point2.y - m.basi_sambungan} ${point1.x + m.basi_sambungan},${point1.y} L${x3 + m.basi_sambungan},${y1 + m.basi_sambungan} Q${x2 + (x3 - x2) / 2},${y2 + m.basi_sambungan - (y1 - y2) / 7} ${x2},${y2 + m.basi_sambungan} L${x1},${y2 + m.basi_sambungan} ${x10},${y2 + m.basi_sambungan} Q${x10 - (x10 - x11) / 2},${y2 + m.basi_sambungan - (y1 - y2) / 7} ${x11 - m.basi_sambungan},${y1 + m.basi_sambungan} L${point4.x - m.basi_sambungan},${point4.y} Q${point5.x - m.basi_sambungan},${point5.y - m.basi_sambungan} ${point6.x},${point6.y - m.basi_sambungan} Q${x10 - (x10 - point6.x) / 2},${y - m.basi_sambungan - (y - m.basi_sambungan - point6.y) / 7} ${x10},${y - m.basi_sambungan} z" />

    <path class="sew-line" d="M${x1},${y} L${x2},${y} Q${x2 + (point3.x - x2) / 2},${y - (y - point3.y) / 7} ${point3.x},${point3.y} Q${point2.x},${point2.y} ${point1.x},${point1.y} L${x3},${y1} Q${x2 + (x3 - x2) / 2},${y2 - (y1 - y2) / 7} ${x2},${y2} L${x1},${y2} ${x10},${y2} Q${x10 - (x10 - x11) / 2},${y2 - (y1 - y2) / 7} ${x11},${y1} L${point4.x},${point4.y} Q${point5.x},${point5.y} ${point6.x},${point6.y} Q${x10 - (x10 - point6.x) / 2},${y - (y - point6.y) / 7} ${x10},${y} z" />

    <path class="piece" d="M${x11},${y3} L${x5},${y3} ${x5},${y5} ${x11},${y5} z" />

    <path class="piece1" d="M${x11 + m.basi_sambungan},${y3} L${x4},${y3} ${x4},${y4} ${x5 - m.basi_sambungan - 1.91},${y4} ${x5 - m.basi_sambungan - 1.91},${y5} ${x11 + m.basi_sambungan},${y5} z" />
    
    <path class="piece" d="M${x6 - m.basi_sambungan},${y3} L${x8 + lebarTulangAtas + m.basi_sambungan},${y3} ${x8 + lebarTulangAtas + m.basi_sambungan},${y5} ${x8 + m.basi_sambungan},${y5} ${x8 + m.basi_sambungan},${y6} ${x7},${y7 + m.basi_sambungan} ${x6 - m.basi_sambungan},${y6} z" />

    <path class="piece1" d="M${x6},${y4} L${x7},${y4} ${x7},${y3} ${x8},${y3} ${x8},${y6} ${x7},${y7} ${x6},${y6} z" />

    <line class="mid_line" x1="${x1}" y1="${point2.y}" x2="${x1}" y2="${y2 + m.basi_sambungan}" />

    <line class="mid_line" x1="${x11}" y1="${y4}" x2="${x5}" y2="${y4}" />
    <line class="mid_line" x1="${x5 - m.basi_sambungan}" y1="${y3}" x2="${x5 - m.basi_sambungan}" y2="${y5}" />
    <line class="mid_line" x1="${x6 - m.basi_sambungan}" y1="${y4}" x2="${x8 + lebarTulangAtas + m.basi_sambungan}" y2="${y4}" />
    <line class="mid_line" x1="${x8 + lebarTulangAtas}" y1="${y3}" x2="${x8 + lebarTulangAtas}" y2="${y5}" />`;

    return leher;
  }
}
