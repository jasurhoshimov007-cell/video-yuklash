/** Times in seconds of public/voice-yer.mp3 (normal speed). */
export const TOTAL_FRAMES = 990; // 33 s @ 30fps

export const LINES = [
  { t0: 0.0, t1: 2.95, text: "Agar Yer atigi besh soniyaga to‘xtasa..." },
  { t0: 3.42, t1: 4.6, text: "insoniyat tugaydi." },
  { t0: 5.42, t1: 9.67, text: "Ekvatorda Yer soatiga qariyb ming yetti yuz kilometr tezlikda aylanadi." },
  { t0: 10.11, t1: 11.29, text: "Biz buni sezmaymiz," },
  { t0: 11.5, t1: 14.06, text: "chunki hammamiz u bilan birga harakatlanamiz." },
  { t0: 14.41, t1: 16.96, text: "Yer birdan to‘xtasa — siz to‘xtamaysiz!" },
  { t0: 17.22, t1: 20.75, text: "Odamlar, mashinalar, uylar ovozdan tez uchib ketadi." },
  { t0: 21.01, t1: 24.38, text: "Okeanlar ulkan to‘lqin bo‘lib quruqlikka bostirib kiradi." },
  { t0: 24.58, t1: 27.31, text: "Shamol esa har qanday bo‘rondan kuchli bo‘ladi." },
  { t0: 27.61, t1: 28.78, text: "Siz buni bilarmidingiz?" },
  { t0: 29.02, t1: 29.83, text: "Izohda yozing!" },
  { t0: 30.03, t1: 30.81, text: "Obuna bo‘ling!" },
];

export const SCENES = {
  earth: [0, 3.0],
  chaos: [3.0, 5.3],
  speed: [5.3, 10.0],
  calm: [10.0, 14.3],
  stop: [14.3, 17.1],
  fly: [17.1, 20.9],
  wave: [20.9, 24.5],
  wind: [24.5, 27.5],
  end: [27.5, 33.0],
} as const;

/** The planet stops ("to'xtasa") */
export const STOP_T = 15.45;
/** "siz to'xtamaysiz!" — the hero is launched */
export const LAUNCH_T = 16.05;
export const FLASHES = [0.05, 2.95, STOP_T];
export const END_CARD_T = 27.5;
