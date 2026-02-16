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
  lebar: new MeasurementRule(1, 76.2, "Lebar Bahu (A-B dan C-D)"),
  labuh: new MeasurementRule(1, 139.7, "Labuh Baju (A-D dan B-C)"),
  labuh_lengan: new MeasurementRule(1, 76.2, "Labuh Lengan (B-E)"),
  lebar_lengan: new MeasurementRule(1, 76.2, "Lebar Lengan (B-G)"),
  bukaan_lengan: new MeasurementRule(1, 76.2, "Bukaan Lengan (E-F)"),
  lebar_kekek: new MeasurementRule(1, 17.78, "Kekek (H-J dan H-K)"),
  leher: new MeasurementRule(1, 76.2, "Keliling Leher"),
  belahan_leher: new MeasurementRule(1, 30.48, "Belahan Leher"),
  m_belahan_leher: new MeasurementRule(1, 30.48, "Belahan Leher"),
  leher_teluk: new MeasurementRule(1, 76.2, "Keliling Leher"),
  belahan_leher_teluk: new MeasurementRule(1, 30.48, "Belahan Leher"),
  pesak_atas: new MeasurementRule(1, 30.48, "Pesak Atas ( G-H )"),
  pesak_bawah: new MeasurementRule(1, 30.48, "Pesak Bawah ( C-I )"),
  labuh_kain: new MeasurementRule(1, 114.3, "Labuh Kain"),
  pinggul: new MeasurementRule(1, 139.7, "Keliling Pinggul"),
  pinggang: new MeasurementRule(1, 139.7, "Keliling Pinggang"),
  m_lebar: new MeasurementRule(1, 76.2, "Lebar Bahu (A-B dan C-D)"),
  m_labuh: new MeasurementRule(1, 139.7, "Labuh Baju (A-D dan B-C)"),
  m_labuh_lengan: new MeasurementRule(1, 76.2, "Labuh Lengan (B-E)"),
  m_lebar_lengan: new MeasurementRule(1, 76.2, "Lebar Lengan (B-G)"),
  m_bukaan_lengan: new MeasurementRule(1, 76.2, "Bukaan Lengan (E-F)"),
  m_lebar_kekek: new MeasurementRule(1, 17.78, "Kekek (H-J dan H-K)"),
  m_pesak_atas: new MeasurementRule(1, 30.48, "Pesak Atas ( G-H )"),
  m_pesak_bawah: new MeasurementRule(1, 30.48, "Pesak Bawah ( C-I )"),
  poket_atas: new MeasurementRule(1, 30.48, "Poket Atas"),
  poket_bawah: new MeasurementRule(1, 30.48, "Poket Bawah"),
  labuh_seluar: new MeasurementRule(1, 139.7, "Labuh Seluar"),
  m_pinggul: new MeasurementRule(1, 139.7, "Keliling Pinggul"),
  cawat: new MeasurementRule(1, 76.2, "Cawat"),
  bukaan_kaki: new MeasurementRule(1, 76.2, "Bukaan Kaki"),
  basi_sambungan: new MeasurementRule(1, 6.35, "Basi Sambungan"),
  basi_lipatan: new MeasurementRule(1, 6.35, "Basi Lipatan"),
  basi_leher: new MeasurementRule(0.5, 2.54, "Basi Leher"),
  kelonggaran: new MeasurementRule(1, 25.4, "Kelonggaran Pinggul"),
  susun_tepi: new MeasurementRule(1, 25.4, "Ukuran Susun Tepi"),
  bil_susun: new MeasurementRule(3, 5, "Bilangan Susun"),
};
