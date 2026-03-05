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
  lebar: new MeasurementRule(1, 63.5, "Lebar Bahu"),
  labuh: new MeasurementRule(1, 139.7, "Labuh Baju"),
  labuh_lengan: new MeasurementRule(1, 76.2, "Labuh Lengan"),
  lebar_lengan: new MeasurementRule(1, 27.94, "Turun Lengan"),
  bukaan_lengan: new MeasurementRule(1, 76.2, "Bukaan Lengan"),
  lebar_kekek: new MeasurementRule(1, 17.78, "Kekek"),
  leher: new MeasurementRule(1, 76.2, "Keliling Leher"),
  belahan_leher: new MeasurementRule(1, 27.94, "Belahan Leher"),
  m_belahan_leher: new MeasurementRule(1, 27.94, "Belahan Leher"),
  leher_teluk: new MeasurementRule(1, 76.2, "Keliling Leher"),
  belahan_leher_teluk: new MeasurementRule(1, 27.94, "Belahan Leher"),
  pesak_atas: new MeasurementRule(1, 27.94, "Pesak Atas"),
  pesak_bawah: new MeasurementRule(1, 27.94, "Pesak Bawah"),
  labuh_kain: new MeasurementRule(1, 114.3, "Labuh Kain"),
  pinggul: new MeasurementRule(1, 139.7, "Keliling Pinggul"),
  pinggang: new MeasurementRule(1, 139.7, "Keliling Pinggang"),
  m_lebar: new MeasurementRule(1, 63.5, "Lebar Bahu"),
  m_labuh: new MeasurementRule(1, 139.7, "Labuh Baju"),
  m_labuh_lengan: new MeasurementRule(1, 76.2, "Labuh Lengan"),
  m_lebar_lengan: new MeasurementRule(1, 27.94, "Turun Lengan"),
  m_bukaan_lengan: new MeasurementRule(1, 76.2, "Bukaan Lengan"),
  m_lebar_kekek: new MeasurementRule(1, 17.78, "Kekek"),
  m_pesak_atas: new MeasurementRule(1, 27.94, "Pesak Atas"),
  m_pesak_bawah: new MeasurementRule(1, 27.94, "Pesak Bawah"),
  poket_atas: new MeasurementRule(1, 27.94, "Lebar Poket Atas"),
  poket_bawah: new MeasurementRule(1, 27.94, "Lebar Poket Bawah"),
  labuh_seluar: new MeasurementRule(1, 139.7, "Labuh Seluar"),
  m_pinggul: new MeasurementRule(1, 139.7, "Keliling Pinggul"),
  cawat: new MeasurementRule(1, 88.9, "Cawat"),
  bukaan_kaki: new MeasurementRule(1, 76.2, "Bukaan Kaki"),
  basi_sambungan: new MeasurementRule(1, 6.35, "Basi Sambungan"),
  basi_lipatan: new MeasurementRule(1, 6.35, "Basi Lipatan"),
  basi_leher: new MeasurementRule(0.5, 2.54, "Basi Leher"),
  kelonggaran: new MeasurementRule(1, 25.4, "Kelonggaran Pinggul"),
  susun_tepi: new MeasurementRule(1, 25.4, "Ukuran Susun Tepi"),
  bil_susun: new MeasurementRule(3, 5, "Bilangan Susun"),
};
