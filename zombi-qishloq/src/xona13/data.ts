/**
 * All times are in "voice time": seconds of the ORIGINAL ElevenLabs take.
 * The take is played 1.12x faster (public/voice-xona13.mp3), so real time = voice time * K.
 */
export const SPEED = 1.12;
export const K = 1 / SPEED;
export const TOTAL_FRAMES = 1215; // 40.5 s @ 30fps

export const LINES = [
  { t0: 0.0, t1: 2.6, text: "Bizning maktabda o‘n uchinchi xona bor..." },
  { t0: 2.98, t1: 5.31, text: "lekin binoda faqat o‘n ikkita xona!" },
  { t0: 5.92, t1: 8.24, text: "Bir kuni darsdan keyin sinfda uxlab qoldim." },
  { t0: 9.1, t1: 10.82, text: "Uyg‘onsam — soat o‘n bir," },
  { t0: 11.13, t1: 12.33, text: "maktab qop-qorong‘i." },
  { t0: 13.8, t1: 16.23, text: "Yo‘lakda hech qachon ko‘rmagan eshik turardi." },
  { t0: 16.62, t1: 17.4, text: "Ustida yozuv:" },
  { t0: 17.84, t1: 18.55, text: "o‘n uch." },
  { t0: 20.2, t1: 21.92, text: "Eshik o‘zi g‘ichirlab ochildi..." },
  { t0: 22.4, t1: 23.82, text: "Ichkarida faqat doska." },
  { t0: 24.21, t1: 25.62, text: "Doskada — mening ismim." },
  { t0: 25.99, t1: 27.21, text: "Va ertangi sana." },
  { t0: 27.62, t1: 30.24, text: "Orqamda eshik qarsillab yopildi!" },
  { t0: 30.65, t1: 33.16, text: "Ertalab qorovul meni yo‘lakdan topdi va dedi:" },
  { t0: 33.49, t1: 35.67, text: "“Bu xonaga kirgan oxirgi o‘quvchi..." },
  { t0: 35.89, t1: 37.39, text: "o‘ttiz yil oldin yo‘qolgan.”" },
  { t0: 37.89, t1: 39.1, text: "Ertangi sana esa..." },
  { t0: 39.32, t1: 39.89, text: "bugun." },
  { t0: 40.3, t1: 42.12, text: "Men nima qilay? Izohda yozing!" },
  { t0: 42.39, t1: 43.94, text: "Davomi uchun obuna bo‘ling!" },
];

export const SCENES = {
  hook: [0, 2.9],
  school: [2.9, 5.85],
  sleep: [5.85, 9.0],
  wake: [9.0, 13.6],
  corridor: [13.6, 16.5],
  plate: [16.5, 20.0],
  open: [20.0, 22.3],
  inside: [22.3, 24.1],
  board: [24.1, 27.5],
  slam: [27.5, 30.5],
  morning: [30.5, 33.4],
  guard: [33.4, 35.8],
  photo: [35.8, 37.8],
  calendar: [37.8, 40.2],
  end: [40.2, 45.4],
} as const;

export const FLASHES = [0.05, 17.84, 29.0, 39.35];
export const END_CARD_T = 40.2;

export const NAME = "AZIZ";
export const TOMORROW = "17.11.2026";
