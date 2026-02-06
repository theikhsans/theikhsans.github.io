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
  lebar: new MeasurementRule(1, 9999, "Lebar Bahu (A-B dan C-D)"),
  labuh: new MeasurementRule(1, 999, "Labuh Baju (A-D dan B-C)"),
  labuh_lengan: new MeasurementRule(1, 999, "Labuh Lengan (B-E)"),
  lebar_lengan: new MeasurementRule(1, 999, "Lebar Lengan (B-G)"),
  bukaan_lengan: new MeasurementRule(1, 9999, "Bukaan Lengan (E-F)"),
  lebar_kekek: new MeasurementRule(1, 999, "Kekek (H-J dan H-K)"),
  leher: new MeasurementRule(1, 999, "Keliling Leher"),
  pesak_atas: new MeasurementRule(1, 999, "Pesak Atas ( G-H )"),
  pesak_bawah: new MeasurementRule(1, 999, "Pesak Bawah ( C-I )"),
  labuh_kain: new MeasurementRule(1, 999, "Labuh Kain"),
  pinggul: new MeasurementRule(1, 999, "Keliling Pinggul"),
  pinggang: new MeasurementRule(1, 999, "Keliling Pinggang"),
  m_lebar: new MeasurementRule(1, 9999, "Lebar Bahu (A-B dan C-D)"),
  m_labuh: new MeasurementRule(1, 999, "Labuh Baju (A-D dan B-C)"),
  m_labuh_lengan: new MeasurementRule(1, 999, "Labuh Lengan (B-E)"),
  m_lebar_lengan: new MeasurementRule(1, 999, "Lebar Lengan (B-G)"),
  m_bukaan_lengan: new MeasurementRule(1, 9999, "Bukaan Lengan (E-F)"),
  m_lebar_kekek: new MeasurementRule(1, 999, "Kekek (H-J dan H-K)"),
  m_pesak_atas: new MeasurementRule(1, 999, "Pesak Atas ( G-H )"),
  m_pesak_bawah: new MeasurementRule(1, 999, "Pesak Bawah ( C-I )"),
  poket_atas: new MeasurementRule(1, 999, "Poket Atas"),
  poket_bawah: new MeasurementRule(1, 999, "Poket Bawah"),
  labuh_seluar: new MeasurementRule(1, 999, "Labuh Seluar"),
  m_pinggul: new MeasurementRule(1, 999, "Keliling Pinggul"),
  cawat: new MeasurementRule(1, 999, "Cawat"),
  bukaan_kaki: new MeasurementRule(1, 999, "Bukaan Kaki"),
};
