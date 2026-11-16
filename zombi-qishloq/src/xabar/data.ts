/** Times in seconds of public/voice-xabar.mp3 (played at normal speed). */
export const TOTAL_FRAMES = 1110; // 37 s @ 30fps

export const LINES = [
  { t0: 0.0, t1: 2.65, text: "Tungi soat uchda telefonimga xabar keldi..." },
  { t0: 3.09, t1: 4.17, text: "o‘zimning raqamimdan!" },
  { t0: 4.76, t1: 5.64, text: "“Eshikni ochma.”" },
  { t0: 6.04, t1: 7.39, text: "Kulib qo‘ydim." },
  { t0: 7.86, t1: 9.77, text: "Kimdir hazillashyapti, deb o‘yladim." },
  { t0: 10.55, t1: 12.08, text: "Shu payt eshik taqilladi." },
  { t0: 12.56, t1: 13.43, text: "Onamning ovozi:" },
  { t0: 13.9, t1: 15.44, text: "“O‘g‘lim, och, menman!”" },
  { t0: 15.96, t1: 17.14, text: "Telefon yana titradi:" },
  { t0: 17.66, t1: 18.67, text: "“Onang uyda emas.”" },
  { t0: 19.27, t1: 20.6, text: "Men onamga qo‘ng‘iroq qildim..." },
  { t0: 21.19, t1: 22.22, text: "U kasalxonada," },
  { t0: 22.41, t1: 23.48, text: "navbatchilikda ekan!" },
  { t0: 23.99, t1: 26.55, text: "Eshik ortidagi ovoz esa hamon chaqirardi..." },
  { t0: 27.1, t1: 28.2, text: "Oxirgi xabar keldi:" },
  { t0: 28.62, t1: 29.63, text: "“Orqangga qarama.”" },
  { t0: 30.03, t1: 32.3, text: "Siz bo‘lsangiz, orqangizga qarardingizmi?" },
  { t0: 32.59, t1: 33.29, text: "Izohda yozing!" },
  { t0: 33.54, t1: 35.13, text: "Davomi uchun obuna bo‘ling!" },
];

export const SCENES = {
  hook: [0, 3.0],
  text1: [3.0, 6.0],
  laugh: [6.0, 10.4],
  knock: [10.4, 12.4],
  mom: [12.4, 15.8],
  text2: [15.8, 19.1],
  call: [19.1, 23.8],
  voice: [23.8, 26.9],
  last: [26.9, 30.0],
  end: [30.0, 37.0],
} as const;

/** Chat messages from "Men (o'zim)". */
export const MSGS = [
  { t: 4.76, text: "Eshikni ochma." },
  { t: 17.66, text: "Onang uyda emas." },
  { t: 28.62, text: "Orqangga qarama." },
];

/** When the phone chat card is on screen. */
export const CHAT_WINDOWS: [number, number][] = [
  [3.0, 6.0],
  [15.8, 19.1],
  [26.9, 29.3],
];
export const CALL_WINDOW: [number, number] = [19.25, 23.7];

export const KNOCKS = [10.9, 11.3, 11.7, 24.3, 24.65, 25.0, 26.1];
export const FLASHES = [0.05, 28.62, 31.0];
export const BLACKOUT: [number, number] = [31.0, 31.5];
export const END_CARD_T = 30.0;
