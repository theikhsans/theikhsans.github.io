/**
 * SVG Builder - Pattern Generation
 * Converts measurements into SVG strings
 */

class SvgBuilder {
  /**
   * Build sewing pattern SVG
   */
  static buildSewingPattern(garmentType, measurements) {
    switch (garmentType) {
      case "bajuKurung":
        return this._bajuKurungPattern(measurements);
      case "bajuMelayu":
        return this._bajuMelayuPattern(measurements);
      default:
        return this._placeholderSvg();
    }
  }

  /**
   * Build cutting layout SVG
   */
  static buildCuttingLayout(garmentType, measurements) {
    switch (garmentType) {
      case "bajuKurung":
        return this._bajuKurungCuttingLayout(measurements);
      case "bajuMelayu":
        return this._bajuMelayuCuttingLayout(measurements);
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
            <line class="piece" x1="${x6}" y1="${y5}" x2="${x6}" y2="${y5 + 10}" />
            
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
    const poketExtra = poketAtas < 3 ? 0.635 : 1.27;
    const jarakPoket = poketBawah > 5 ? 6.35 : 5.08;
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
            <polygon class="piece" points="${x3},${y3} ${x5},${y3} ${x3},${y4}" transform ="rotate(-4 ${x3} ${y3})"/>
            <text class="label" x="${x3 + 5}" y="${y3 + 10}">Kekek</text>

            <!-- Leher -->
            <path class="piece" d="M${x7},${y0} C${x7},${y0 + (y5 - y0) / 2} ${x6 + (x7 - x6) / 2},${y5} ${x6},${y5} C${x6 - (x7 - x6) / 2},${y5} ${x8},${y0 + (y5 - y0) / 2} ${x8},${y0}" />
            <path class="piece" d="M${x8},${y0} C${x8},${y0 + 2} ${x7},${y0 + 2} ${x7},${y0} " />
            <line class="piece" x1="${x6}" y1="${y5}" x2="${x6}" y2="${y5 + 10}" />

            <!-- Poket -->
            <path class="piece" d="M${x9},${y3} ${x9 + poketAtas},${y3} ${x9 + poketAtas},${y3 + poketAtas} C${x9 + poketAtas},${y3 + poketAtas + poketExtra / 2} ${x9 + poketAtas - poketExtra / 2},${y3 + poketAtas + poketExtra} ${x9 + poketAtas - poketExtra},${y3 + poketAtas + poketExtra} L${x9 + poketExtra},${y3 + poketAtas + poketExtra} C${x9 + poketExtra / 2},${y3 + poketAtas + poketExtra} ${x9},${y3 + poketAtas + poketExtra / 2} ${x9},${y3 + poketAtas} L${x9},${y3}" />

            <path class="piece" d="M${x10},${y8 - poketBawah - 0.635} ${x10 + poketBawah},${y8 - poketBawah - 0.635} ${x10 + poketBawah},${y8 - 0.635} C${x10 + poketBawah},${y8 - 0.3} ${x10 + poketBawah - 0.3},${y8} ${x10 + poketBawah - 0.635},${y8} L${x10 + 0.635},${y8} C${x10 + 0.3},${y8} ${x10},${y8 - 0.3} ${x10},${y8 - 0.635} L${x10},${y8 - poketBawah - 0.635}" />

            <path class="piece" d="M${x11},${y8 - poketBawah - 0.635} ${x11 + poketBawah},${y8 - poketBawah - 0.635} ${x11 + poketBawah},${y8 - 0.635} C${x11 + poketBawah},${y8 - 0.3} ${x11 + poketBawah - 0.3},${y8} ${x11 + poketBawah - 0.635},${y8} L${x11 + 0.635},${y8} C${x11 + 0.3},${y8} ${x11},${y8 - 0.3} ${x11},${y8 - 0.635} L${x11},${y8 - poketBawah - 0.635}" />
            
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
   * Baju Kebaya sewing pattern (placeholder)
   */
  static _bajaKebayaPattern(m) {
    return this._placeholderSvg("Baju Kebaya");
  }

  /**
   * Baju Kurung cutting layout
   */
  static _bajuKurungCuttingLayout(m) {
    const x0 = 50,
      y0 = 50;
    const labuh = m.labuh || 100;
    const lebar = m.lebar || 100;
    //const fabricWidth = m.lebar_kain || 114;

    let svg = `<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .fabric-outline { fill: none; stroke: #000; stroke-width: 2; }
                    .piece { fill: #f0f0f0; stroke: #000; stroke-width: 1.5; }
                    .grain { stroke: #999; stroke-width: 0.5; stroke-dasharray: 5,5; }
                    .label { font-size: 11px; fill: #000; text-anchor: middle; }
                    .title { font-size: 18px; font-weight: bold; }
                </style>
            </defs>
            
            <!-- Title -->
            <text x="450" y="30" class="title" text-anchor="middle">
                Baju Kurung - Susun Potong
            </text>
            
            <!-- Fabric Outline -->
            <rect class="fabric-outline" x="${x0}" y="${y0}" 
                  width="114.3" height="${labuh * 2.2}" />
            
            <!-- Body Piece 1 -->
            <rect class="piece" x="${x0 + 10}" y="${y0 + 10}" 
                  width="${lebar}" height="${labuh}" />
            <line class="grain" x1="${x0 + 10 + lebar / 2}" y1="${y0 + 10}" 
                  x2="${x0 + 10 + lebar / 2}" y2="${y0 + 10 + labuh}" />
            <text class="label" x="${x0 + 10 + lebar / 2}" y="${y0 + 10 + labuh / 2}">Badan 1</text>
            
            <!-- Body Piece 2 -->
            <rect class="piece" x="${x0 + 10}" y="${y0 + 10 + labuh + 20}" 
                  width="${lebar}" height="${labuh}" />
            <line class="grain" x1="${x0 + 10 + lebar / 2}" y1="${y0 + 10 + labuh + 20}" 
                  x2="${x0 + 10 + lebar / 2}" y2="${y0 + 10 + labuh * 2 + 20}" />
            <text class="label" x="${x0 + 10 + lebar / 2}" y="${y0 + 10 + labuh * 1.5 + 20}">Badan 2</text>
            
            <!-- Sleeve -->
            <rect class="piece" x="${x0 + lebar + 40}" y="${y0 + 10}" 
                  width="50" height="100" />
            <line class="grain" x1="${x0 + lebar + 65}" y1="${y0 + 10}" 
                  x2="${x0 + lebar + 65}" y2="${y0 + 110}" />
            <text class="label" x="${x0 + lebar + 65}" y="${y0 + 60}">Lengan</text>
            
            <!-- Info -->
            <rect x="10" y="600" width="880" height="80" fill="none" stroke="#ccc" stroke-width="1" />
            <text x="20" y="620" class="label" font-weight="bold" text-anchor="start">Petunjuk:</text>
            <text x="20" y="640" class="label" text-anchor="start">1. Potong semua pieces mengikuti garis tepi</text>
            <text x="20" y="660" class="label" text-anchor="start">2. Garis putus-putus menunjukkan arah serat kain</text>
            <text x="500" y="620" class="label" text-anchor="start">Total Kain Diperlukan: x meter</text>
        </svg>`;

    return svg;
  }

  /**
   * Baju Melayu cutting layout (placeholder)
   */
  static _bajuMelayuCuttingLayout(m) {
    return this._placeholderSvg("Baju Melayu - Susun Potong");
  }

  /**
   * Baju Kebaya cutting layout (placeholder)
   */
  static _bajuKebayaCuttingLayout(m) {
    return this._placeholderSvg("Baju Kebaya - Susun Potong");
  }

  /**
   * Placeholder for unimplemented patterns
   */
  static _placeholderSvg(title = "Pattern Coming Soon") {
    return `<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
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
}
