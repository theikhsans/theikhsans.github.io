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
            case 'bajuKurung':
                return this._bajuKurungPattern(measurements);
            case 'bajuMelayu':
                return this._bajuMelayuPattern(measurements);
            case 'bajuKebaya':
                return this._bajaKebayaPattern(measurements);
            default:
                return this._placeholderSvg();
        }
    }

    /**
     * Build cutting layout SVG
     */
    static buildCuttingLayout(garmentType, measurements) {
        switch (garmentType) {
            case 'bajuKurung':
                return this._bajuKurungCuttingLayout(measurements);
            case 'bajuMelayu':
                return this._bajuMelayuCuttingLayout(measurements);
            case 'bajuKebaya':
                return this._bajuKebayaCuttingLayout(measurements);
            default:
                return this._placeholderSvg();
        }
    }

    /**
     * Baju Kurung sewing pattern
     */
    static _bajuKurungPattern(m) {
        const x0 = 100, y0 = 100;
        const labuh = m.labuh || 100;
        const lebar = m.lebar || 100;
        
        let svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .piece { fill: none; stroke: #000; stroke-width: 2; }
                    .grain { stroke: #999; stroke-width: 1; stroke-dasharray: 5,5; }
                    .label { font-size: 12px; fill: #000; }
                    .fold { stroke: #f00; stroke-width: 1; stroke-dasharray: 3,3; }
                </style>
            </defs>
            
            <!-- Title -->
            <text x="400" y="30" font-size="24" font-weight="bold" text-anchor="middle">
                Baju Kurung - Pola Jahitan
            </text>
            
            <!-- Body Piece -->
            <rect class="piece" x="${x0}" y="${y0}" width="${lebar}" height="${labuh}" />
            <line class="grain" x1="${x0 + lebar/2}" y1="${y0}" x2="${x0 + lebar/2}" y2="${y0 + labuh}" />
            <text class="label" x="${x0 + lebar/2 + 5}" y="${y0 + 15}">Badan</text>
            
            <!-- Sleeve -->
            <rect class="piece" x="${x0 + lebar + 50}" y="${y0}" 
                  width="${45}" height="${80}" />
            <line class="grain" x1="${x0 + lebar + 50 + 22.5}" y1="${y0}" 
                  x2="${x0 + lebar + 50 + 22.5}" y2="${y0 + 80}" />
            <text class="label" x="${x0 + lebar + 50 + 5}" y="${y0 + 15}">Lengan</text>
            
            <!-- Fold Indicator -->
            <line class="fold" x1="${x0}" y1="${y0 + labuh + 20}" 
                  x2="${x0 + lebar}" y2="${y0 + labuh + 20}" />
            <text class="label" x="${x0 - 40}" y="${y0 + labuh + 25}">Lipatan</text>
            
            <!-- Info Box -->
            <rect x="10" y="500" width="250" height="80" fill="none" stroke="#ccc" stroke-width="1" />
            <text x="20" y="520" class="label" font-weight="bold">Ukuran:</text>
            <text x="20" y="540" class="label">Labuh: ${labuh.toFixed(1)} cm</text>
            <text x="20" y="560" class="label">Lebar: ${lebar.toFixed(1)} cm</text>
            <text x="20" y="580" class="label">Skala: 1:1 (full size)</text>
        </svg>`;
        
        return svg;
    }

    /**
     * Baju Melayu sewing pattern (placeholder)
     */
    static _bajuMelayuPattern(m) {
        return this._placeholderSvg('Baju Melayu');
    }

    /**
     * Baju Kebaya sewing pattern (placeholder)
     */
    static _bajaKebayaPattern(m) {
        return this._placeholderSvg('Baju Kebaya');
    }

    /**
     * Baju Kurung cutting layout
     */
    static _bajuKurungCuttingLayout(m) {
        const x0 = 50, y0 = 50;
        const labuh = m.labuh || 100;
        const lebar = m.lebar || 100;
        const fabricWidth = m.lebar_kain || 114;
        
        let svg = `<svg width="900" height="700" xmlns="http://www.w3.org/2000/svg">
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
                  width="${fabricWidth}" height="${labuh * 2.2}" />
            
            <!-- Body Piece 1 -->
            <rect class="piece" x="${x0 + 10}" y="${y0 + 10}" 
                  width="${lebar}" height="${labuh}" />
            <line class="grain" x1="${x0 + 10 + lebar/2}" y1="${y0 + 10}" 
                  x2="${x0 + 10 + lebar/2}" y2="${y0 + 10 + labuh}" />
            <text class="label" x="${x0 + 10 + lebar/2}" y="${y0 + 10 + labuh/2}">Badan 1</text>
            
            <!-- Body Piece 2 -->
            <rect class="piece" x="${x0 + 10}" y="${y0 + 10 + labuh + 20}" 
                  width="${lebar}" height="${labuh}" />
            <line class="grain" x1="${x0 + 10 + lebar/2}" y1="${y0 + 10 + labuh + 20}" 
                  x2="${x0 + 10 + lebar/2}" y2="${y0 + 10 + labuh*2 + 20}" />
            <text class="label" x="${x0 + 10 + lebar/2}" y="${y0 + 10 + labuh*1.5 + 20}">Badan 2</text>
            
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
            <text x="500" y="620" class="label" text-anchor="start">Total Kain Diperlukan: ~${(fabricWidth * labuh * 2.2 / 100).toFixed(2)} meter</text>
        </svg>`;
        
        return svg;
    }

    /**
     * Baju Melayu cutting layout (placeholder)
     */
    static _bajuMelayuCuttingLayout(m) {
        return this._placeholderSvg('Baju Melayu - Susun Potong');
    }

    /**
     * Baju Kebaya cutting layout (placeholder)
     */
    static _bajuKebayaCuttingLayout(m) {
        return this._placeholderSvg('Baju Kebaya - Susun Potong');
    }

    /**
     * Placeholder for unimplemented patterns
     */
    static _placeholderSvg(title = 'Pattern Coming Soon') {
        return `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
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
