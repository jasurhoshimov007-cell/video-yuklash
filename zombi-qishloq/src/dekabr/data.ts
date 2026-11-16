/** Times in seconds of public/voice-dekabr.mp3 (normal speed). */
export const TOTAL_FRAMES = 1190; // 39.7 s @ 30fps

export const LINES = [
  { t0: 0.0, t1: 1.64, text: "Qishlog‘imizda har yili" },
  { t0: 1.82, t1: 2.92, text: "bitta odam yo‘qoladi..." },
  { t0: 4.39, t1: 6.05, text: "va hamma buni normal deydi." },
  { t0: 7.14, t1: 8.56, text: "Birinchi dekabr kechasi" },
  { t0: 8.78, t1: 10.38, text: "bitta uyning chirog‘i o‘chadi." },
  { t0: 11.93, t1: 14.31, text: "Ertalab o‘sha uyda hech kim bo‘lmaydi." },
  { t0: 15.29, t1: 17.17, text: "Men bu qishloqqa yangi ko‘chib keldim." },
  { t0: 17.66, t1: 19.95, text: "Qo‘shnilar menga faqat bitta qoida aytishdi:" },
  { t0: 20.62, t1: 22.65, text: "“O‘sha kechasi derazadan qarama.”" },
  { t0: 23.59, t1: 24.27, text: "Men qaradim." },
  { t0: 25.0, t1: 26.8, text: "Ko‘chada butun qishloq turardi..." },
  { t0: 28.4, t1: 30.03, text: "hammasi bizning uyga qarab." },
  { t0: 31.05, t1: 31.58, text: "Shu payt" },
  { t0: 31.94, t1: 33.22, text: "bizning chirog‘imiz o‘chdi." },
  { t0: 33.84, t1: 34.89, text: "Siz qarardingizmi?" },
  { t0: 35.49, t1: 36.17, text: "Izohda yozing!" },
  { t0: 36.61, t1: 38.2, text: "Davomi uchun obuna bo‘ling!" },
];

export const SCENES = {
  hook: [0, 4.3],
  normal: [4.3, 7.0],
  dec1: [7.0, 11.6],
  morning: [11.6, 15.0],
  newcomer: [15.0, 17.5],
  rule: [17.5, 23.3],
  window: [23.3, 24.9],
  crowd: [24.9, 31.0],
  lightsout: [31.0, 33.8],
  end: [33.8, 39.7],
} as const;

/** a house goes dark ("yo'qoladi" / "o'chadi") */
export const HOOK_OFF = 2.1;
export const DEC_OFF = 9.75;
/** our lights go out */
export const OUR_OFF = 32.4;
export const FLASHES = [0.05, 23.59];
export const END_CARD_T = 33.8;
