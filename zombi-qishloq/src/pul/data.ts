/** Times in seconds of public/voice-pul.mp3 (normal speed). */
export const TOTAL_FRAMES = 1160; // 38.7 s @ 30fps

export const LINES = [
  { t0: 0.0, t1: 2.87, text: "Tashlandiq uydan bir million dollar topdik..." },
  { t0: 3.84, t1: 4.32, text: "va bu" },
  { t0: 4.59, t1: 5.91, text: "eng katta xatomiz edi." },
  { t0: 6.86, t1: 9.29, text: "Men va do‘stim Sardor eski uyga kirdik." },
  { t0: 10.75, t1: 11.9, text: "Pol taxtasi ostida —" },
  { t0: 12.15, t1: 12.82, text: "qora sumka." },
  { t0: 13.22, t1: 13.63, text: "Ichida..." },
  { t0: 13.88, t1: 14.41, text: "dollar!" },
  { t0: 14.75, t1: 15.52, text: "Sanog‘i yo‘q!" },
  { t0: 15.97, t1: 17.39, text: "Sardor quvonib qichqirdi:" },
  { t0: 17.6, t1: 18.69, text: "“Biz boy bo‘ldik!”" },
  { t0: 19.88, t1: 21.87, text: "Shu payt tashqarida mashina to‘xtadi." },
  { t0: 22.44, t1: 23.22, text: "Eshik ochildi..." },
  { t0: 23.73, t1: 25.16, text: "Qora kiyimli odam kirdi." },
  { t0: 25.65, t1: 26.51, text: "U sekin dedi:" },
  { t0: 26.97, t1: 28.37, text: "“Mening pulimni ko‘rmadingizmi?”" },
  { t0: 28.93, t1: 30.06, text: "Sardor menga qaradi..." },
  { t0: 30.42, t1: 32.12, text: "va sumkani orqasiga yashirdi." },
  { t0: 32.66, t1: 35.03, text: "Siz bo‘lsangiz, pulni qaytarardingizmi?" },
  { t0: 35.35, t1: 36.08, text: "Izohda yozing!" },
  { t0: 36.34, t1: 37.11, text: "Obuna bo‘ling!" },
];

export const SCENES = {
  hook: [0, 3.6],
  mistake: [3.6, 6.5],
  enter: [6.5, 10.5],
  floor: [10.5, 13.0],
  money: [13.0, 15.8],
  joy: [15.8, 19.5],
  car: [19.5, 22.3],
  door: [22.3, 25.4],
  asks: [25.4, 28.7],
  hide: [28.7, 32.4],
  end: [32.4, 38.7],
} as const;

export const FLASHES = [0.05, 13.88, 22.44, 26.97];
export const END_CARD_T = 32.5;
