/**
 * Measurement Validation Rules
 */

class MeasurementRule {
    constructor(min, max, label) {
        this.min = min;
        this.max = max;
        this.label = label;
    }
}

const measurementRules = {
    'labuh': new MeasurementRule(1, 999, 'Labuh Baju'),
    'lebar': new MeasurementRule(1, 9999, 'Lebar Bahu'),
    'pinggul': new MeasurementRule(1, 999, 'Keliling Pinggul'),
    'labuh_lengan': new MeasurementRule(1, 999, 'Labuh Lengan'),
    'lebar_lengan': new MeasurementRule(1, 999, 'Lebar Lengan'),
    'bukaan_lengan': new MeasurementRule(1, 9999, 'Bukaan Lengan'),
    'lebar_kekek': new MeasurementRule(1, 999, 'Kekek'),
    'leher': new MeasurementRule(1, 999, 'Keliling Leher'),
    'pinggang': new MeasurementRule(1, 999, 'Keliling Pinggang'),
    'pesak_atas': new MeasurementRule(1, 999, 'Pesak Atas'),
    'pesak_bawah': new MeasurementRule(1, 999, 'Pesak Bawah'),
    'labuh_kain': new MeasurementRule(50, 999, 'Labuh Kain'),
};
