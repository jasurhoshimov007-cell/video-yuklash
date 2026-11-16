export const FPS = 30;
export const DURATION_S = 40;

/** Voice-over lines with estimated timings (seconds). Re-time after recording. */
export const LINES: { t0: number; t1: number; text: string }[] = [
  { t0: 0.3, t1: 3.2, text: "Bir kechada butun qishloq zombiga aylandi!" },
  { t0: 3.4, t1: 6.8, text: "Faqat ikki kishi qochib qutuldi: Jasur va bir qiz." },
  { t0: 7.0, t1: 10.2, text: "Hammasi daladagi yashil tumandan boshlandi." },
  { t0: 10.4, t1: 14.0, text: "Cho‘pon tumandan qaytdi... ko‘zlari yashil yonardi." },
  { t0: 14.2, t1: 17.8, text: "Bir soat ichida qo‘shnilar, bozor, maktab — hammasi!" },
  { t0: 18.0, t1: 21.4, text: "Jasur derazadan qaradi. Shunda eshik taqilladi..." },
  { t0: 21.6, t1: 25.6, text: "Bu qo‘shni qiz Madina edi. Ular orqa eshikdan qochishdi!" },
  { t0: 25.8, t1: 29.0, text: "Zombilar ortidan yugurdi. Oldinda — eski ko‘prik!" },
  { t0: 29.2, t1: 32.8, text: "Jasur arqonni kesdi va zombilar suvga quladi!" },
  { t0: 33.0, t1: 36.6, text: "Ular qutulishdi... Lekin Madinaning ko‘zi nega yashil?" },
  { t0: 36.8, t1: 39.8, text: "Sizningcha, nima bo‘ladi? Izohda yozing!" },
];

/** Scene boundaries (seconds). */
export const SCENES = {
  hook: [0, 3.3],
  roof: [3.3, 7.0],
  field: [7.0, 10.3],
  shepherd: [10.3, 14.1],
  village: [14.1, 17.9],
  window: [17.9, 21.5],
  door: [21.5, 23.3],
  escape: [23.3, 25.7],
  chase: [25.7, 29.1],
  bridge: [29.1, 32.9],
  ending: [32.9, 40],
} as const;

/** White flash / stinger moments (seconds). */
export const FLASHES = [0.05, 1.6, 12.8, 30.7, 36.0];
