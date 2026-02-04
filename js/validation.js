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
    'labuh': new MeasurementRule(1, 120, 'Labuh Baju'),
    'lebar': new MeasurementRule(1, 200, 'Lebar Bahu'),
    'dada': new MeasurementRule(1, 120, 'Lingkar Dada'),
    'pinggul': new MeasurementRule(1, 120, 'Lingkar Pinggul'),
    'lebar_kain': new MeasurementRule(1, 160, 'Lebar Kain'),
    'labuh_lengan': new MeasurementRule(1, 100, 'Labuh Lengan'),
    'lebar_lengan': new MeasurementRule(1, 100, 'Lebar Lengan'),
    'lebar_kekek': new MeasurementRule(1, 10, 'Kekek'),
    'bahu': new MeasurementRule(1, 150, 'Lebar Bahu'),
    'pinggang': new MeasurementRule(1, 150, 'Lingkar Pinggang'),
    'pesak_atas': new MeasurementRule(1, 50, 'Pesak Atas'),
    'pesak_bawah': new MeasurementRule(1, 50, 'Pesak Bawah'),
    'labuh_kain': new MeasurementRule(50, 200, 'Labuh Kain'),
};
