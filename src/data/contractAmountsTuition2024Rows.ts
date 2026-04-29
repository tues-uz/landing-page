/**
 * 2024/2025 shartnoma to‘lovlari — Termiz Iqtisodiyot va Servis Universiteti.
 * Manba: rasmiy jadval (til: o‘zbek). Summalar so‘m.
 */

export type ContractAmountsLine =
  | { kind: "section"; title: string }
  | {
      kind: "row";
      index: string;
      code: string;
      name: string;
      duration: string;
      form: string;
      amount: string;
    };

export const CONTRACT_AMOUNTS_TUITION_2024_2025: ContractAmountsLine[] = [
  { kind: "row", index: "1", code: "60410100", name: "Iqtisodiyot", duration: "4 yil", form: "Kunduzgi", amount: "15 000 000" },
  { kind: "row", index: "1", code: "60410100", name: "Iqtisodiyot", duration: "5 yil", form: "Sirtqi", amount: "13 000 000" },
  { kind: "row", index: "2", code: "60410500", name: "Moliya va moliyaviy texnologiyalar", duration: "4 yil", form: "Kunduzgi", amount: "15 000 000" },
  { kind: "row", index: "2", code: "60410500", name: "Moliya va moliyaviy texnologiyalar", duration: "5 yil", form: "Sirtqi", amount: "13 000 000" },
  { kind: "row", index: "3", code: "60410200", name: "Buxgalteriya hisobi", duration: "4 yil", form: "Kunduzgi", amount: "15 000 000" },
  { kind: "row", index: "3", code: "60410200", name: "Buxgalteriya hisobi", duration: "5 yil", form: "Sirtqi", amount: "13 000 000" },
  { kind: "row", index: "4", code: "60410600", name: "Bank ishi", duration: "4 yil", form: "Kunduzgi", amount: "15 000 000" },
  { kind: "row", index: "4", code: "60410600", name: "Bank ishi", duration: "5 yil", form: "Sirtqi", amount: "13 000 000" },
  {
    kind: "row",
    index: "5",
    code: "60411100",
    name: "Jahon iqtisodiyoti va xalqaro iqtisodiy munosabatlar",
    duration: "4 yil",
    form: "Kunduzgi",
    amount: "17 000 000",
  },
  {
    kind: "row",
    index: "5",
    code: "60411100",
    name: "Jahon iqtisodiyoti va xalqaro iqtisodiy munosabatlar",
    duration: "5 yil",
    form: "Sirtqi",
    amount: "14 000 000",
  },
  { kind: "row", index: "6", code: "60410300", name: "Soliqlar va soliqqa tortish", duration: "4 yil", form: "Kunduzgi", amount: "15 000 000" },
  { kind: "row", index: "6", code: "60410300", name: "Soliqlar va soliqqa tortish", duration: "5 yil", form: "Sirtqi", amount: "13 000 000" },
  { kind: "row", index: "7", code: "60110900", name: "Xorijiy til va adabiyoti", duration: "4 yil", form: "Kunduzgi", amount: "15 000 000" },
  { kind: "row", index: "8", code: "60110400", name: "Boshlang‘ich ta’lim", duration: "4 yil", form: "Kunduzgi", amount: "13 000 000" },
  { kind: "row", index: "8", code: "60110400", name: "Boshlang‘ich ta’lim", duration: "5 yil", form: "Sirtqi", amount: "11 000 000" },
  {
    kind: "row",
    index: "9",
    code: "60610100",
    name: "Axborot tizimlari va texnologiyalari",
    duration: "4 yil",
    form: "Kunduzgi",
    amount: "14 000 000",
  },
  {
    kind: "row",
    index: "9",
    code: "60610100",
    name: "Axborot tizimlari va texnologiyalari",
    duration: "5 yil",
    form: "Sirtqi",
    amount: "13 000 000",
  },
  { kind: "row", index: "10", code: "61010100", name: "Turizm va mehmondoʻstlik", duration: "4 yil", form: "Kunduzgi", amount: "14 000 000" },
  { kind: "row", index: "10", code: "61010100", name: "Turizm va mehmondoʻstlik", duration: "5 yil", form: "Sirtqi", amount: "11 000 000" },
  { kind: "row", index: "11", code: "60111200", name: "Jismoniy madaniyat", duration: "3 yil", form: "Kunduzgi", amount: "14 000 000" },
  { kind: "row", index: "11", code: "60111200", name: "Jismoniy madaniyat", duration: "5 yil", form: "Sirtqi", amount: "12 000 000" },
  { kind: "row", index: "12", code: "60110200", name: "Maktabgacha ta’lim", duration: "3 yil", form: "Kunduzgi", amount: "14 000 000" },
  { kind: "row", index: "12", code: "60110200", name: "Maktabgacha ta’lim", duration: "5 yil", form: "Sirtqi", amount: "11 000 000" },
  {
    kind: "row",
    index: "13",
    code: "60230100",
    name: "Filolgiya va tillarni o‘qitish (tillar bo‘yicha) — O‘zbek tili",
    duration: "4 yil",
    form: "Kunduzgi",
    amount: "15 000 000",
  },
  { kind: "row", index: "14", code: "60230100", name: "Rus tili", duration: "4 yil", form: "Kunduzgi", amount: "15 000 000" },
  { kind: "row", index: "15", code: "60230100", name: "Ingliz tili", duration: "4 yil", form: "Kunduzgi", amount: "15 000 000" },
  { kind: "row", index: "16", code: "60540100", name: "Matematika", duration: "4 yil", form: "Kunduzgi", amount: "13 000 000" },
  { kind: "row", index: "17", code: "60111300", name: "Texnologik ta’lim", duration: "3 yil", form: "Kunduzgi", amount: "13 000 000" },
  { kind: "row", index: "17", code: "60111300", name: "Texnologik ta’lim", duration: "5 yil", form: "Sirtqi", amount: "11 000 000" },
  { kind: "row", index: "18", code: "60310300", name: "Psixologiya", duration: "4 yil", form: "Kunduzgi", amount: "14 000 000" },
  { kind: "row", index: "18", code: "60310300", name: "Psixologiya", duration: "5 yil", form: "Sirtqi", amount: "12 000 000" },
  { kind: "row", index: "19", code: "60220300", name: "Tarix", duration: "4 yil", form: "Kunduzgi", amount: "14 000 000" },
  { kind: "row", index: "19", code: "60220300", name: "Tarix", duration: "5 yil", form: "Sirtqi", amount: "12 000 000" },
  { kind: "row", index: "20", code: "60510100", name: "Biologiya", duration: "4 yil", form: "Kunduzgi", amount: "13 000 000" },
  { kind: "row", index: "20", code: "60510100", name: "Biologiya", duration: "5 yil", form: "Sirtqi", amount: "11 000 000" },
  { kind: "row", index: "21", code: "60910200", name: "Davolash ishi", duration: "6 yil", form: "Kunduzgi", amount: "24 000 000" },
  { kind: "row", index: "22", code: "60910100", name: "Stomatologiya", duration: "5 yil", form: "Kunduzgi", amount: "27 000 000" },
  { kind: "row", index: "23", code: "60910800", name: "Farmatsiya", duration: "5 yil", form: "Kunduzgi", amount: "35 000 000" },
  { kind: "row", index: "24", code: "60910300", name: "Pediatriya", duration: "6 yil", form: "Kunduzgi", amount: "24 000 000" },

  { kind: "section", title: "Magistratura" },
  { kind: "row", index: "1", code: "70410102", name: "Iqtisodiyot", duration: "2 yil", form: "Kunduzgi", amount: "18 000 000" },
  {
    kind: "row",
    index: "2",
    code: "70610101",
    name: "Kompyuter tizimlari va ularning dasturiy ta’minoti",
    duration: "2 yil",
    form: "Kunduzgi",
    amount: "18 000 000",
  },
  { kind: "row", index: "3", code: "70220301", name: "Tarix", duration: "2 yil", form: "Kunduzgi", amount: "18 000 000" },
  { kind: "row", index: "4", code: "70540101", name: "Matematika", duration: "2 yil", form: "Kunduzgi", amount: "18 000 000" },
  { kind: "row", index: "5", code: "70910218", name: "Morfologiya", duration: "2 yil", form: "Kunduzgi", amount: "20 000 000" },
  { kind: "row", index: "6", code: "70910217", name: "Urologiya", duration: "2 yil", form: "Kunduzgi", amount: "20 000 000" },
  { kind: "row", index: "7", code: "70910101", name: "Stomatologiya", duration: "2 yil", form: "Kunduzgi", amount: "20 000 000" },
  { kind: "row", index: "8", code: "70910203", name: "Terapiya", duration: "2 yil", form: "Kunduzgi", amount: "20 000 000" },
  { kind: "row", index: "9", code: "70910212", name: "Xirurgiya", duration: "2 yil", form: "Kunduzgi", amount: "20 000 000" },
  { kind: "row", index: "10", code: "70910201", name: "Akusherlik va ginekologiya", duration: "2 yil", form: "Kunduzgi", amount: "20 000 000" },
  {
    kind: "row",
    index: "11",
    code: "70110401",
    name: "Ta’lim va tarbiya nazariyasi va metodikasi (boshlang‘ich ta’lim)",
    duration: "2 yil",
    form: "Kunduzgi",
    amount: "18 000 000",
  },
  {
    kind: "row",
    index: "12",
    code: "70110901",
    name: "Xorijiy til va adabiyoti (tillar bo‘yicha)",
    duration: "2 yil",
    form: "Kunduzgi",
    amount: "18 000 000",
  },
  {
    kind: "row",
    index: "13",
    code: "70410506",
    name: "Davlat moliyaviy nazorati va auditi",
    duration: "2 yil",
    form: "Kunduzgi",
    amount: "19 000 000",
  },

  { kind: "section", title: "Ikkinchi mutaxassislik" },
  {
    kind: "row",
    index: "1",
    code: "60410100",
    name: "Iqtisodiyot (ikkinchi mutaxassislik)",
    duration: "4 yil",
    form: "Sirtqi",
    amount: "8 900 000",
  },
];
