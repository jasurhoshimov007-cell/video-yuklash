export const FPS = 30;
export const DURATION_S = 43;

/** Voice-over phrases, timed from public/voice.mp3 (silence detection). */
export const LINES: { t0: number; t1: number; text: string }[] = [
  { t0: 0.0, t1: 2.89, text: "Bir kechada butun qishloq zombiga aylandi!" },
  { t0: 3.39, t1: 5.01, text: "Faqat ikki kishi qochib qutuldi:" },
  { t0: 5.2, t1: 6.61, text: "Jasur va bir qiz." },
  { t0: 7.03, t1: 9.65, text: "Hammasi daladagi yashil tumandan boshlandi." },
  { t0: 10.09, t1: 11.51, text: "Cho‘pon tumandan qaytdi..." },
  { t0: 11.91, t1: 13.76, text: "ko‘zlari yashil yonardi." },
  { t0: 14.12, t1: 18.79, text: "Bir soat ichida qo‘shnilar, bozor, maktab — hammasi!" },
  { t0: 19.16, t1: 21.11, text: "Jasur derazadan qaradi." },
  { t0: 21.33, t1: 22.82, text: "Shunda eshik taqilladi..." },
  { t0: 23.13, t1: 24.77, text: "Bu qo‘shni qiz Madina edi." },
  { t0: 25.04, t1: 26.54, text: "Ular orqa eshikdan qochishdi!" },
  { t0: 26.78, t1: 28.94, text: "Zombilar ortidan yugurdi." },
  { t0: 29.18, t1: 30.89, text: "Oldinda — eski ko‘prik!" },
  { t0: 31.12, t1: 34.02, text: "Jasur arqonni kesdi va zombilar suvga quladi!" },
  { t0: 34.28, t1: 35.22, text: "Ular qutulishdi..." },
  { t0: 35.59, t1: 37.85, text: "Lekin Madinaning ko‘zi nega yashil?" },
  { t0: 38.22, t1: 39.81, text: "Sizningcha, nima bo‘ladi?" },
  { t0: 40.23, t1: 41.01, text: "Izohda yozing!" },
];

/** Scene boundaries (seconds), cut on the voice pauses. */
export const SCENES = {
  hook: [0, 3.3],
  roof: [3.3, 6.95],
  field: [6.95, 10.0],
  shepherd: [10.0, 14.0],
  village: [14.0, 19.0],
  window: [19.0, 22.95],
  door: [22.95, 24.9],
  escape: [24.9, 26.7],
  chase: [26.7, 31.0],
  bridge: [31.0, 34.15],
  ending: [34.15, 43],
} as const;

/** White flash / stinger moments (seconds). */
export const FLASHES = [0.05, 1.6, 12.5, 32.35, 37.35];

/** End card appears when the closing question starts. */
export const END_CARD_T = 38.0;
