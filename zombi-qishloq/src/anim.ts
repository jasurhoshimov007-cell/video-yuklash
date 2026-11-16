export const clamp = (v: number, a: number, b: number) =>
  Math.min(b, Math.max(a, v));

export const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

export type Vec3 = [number, number, number];

/** Interpolates keyframes [[t, ...values], ...] with easeInOut between keys. */
export const keys = (t: number, ks: number[][]): number[] => {
  if (t <= ks[0][0]) return ks[0].slice(1);
  const last = ks[ks.length - 1];
  if (t >= last[0]) return last.slice(1);
  for (let i = 0; i < ks.length - 1; i++) {
    const a = ks[i];
    const b = ks[i + 1];
    if (t >= a[0] && t <= b[0]) {
      const p = easeInOut((t - a[0]) / (b[0] - a[0] || 1));
      return a.slice(1).map((v, j) => lerp(v, b[j + 1], p));
    }
  }
  return last.slice(1);
};

/** Linear version (for constant-speed walking paths). */
export const keysLin = (t: number, ks: number[][]): number[] => {
  if (t <= ks[0][0]) return ks[0].slice(1);
  const last = ks[ks.length - 1];
  if (t >= last[0]) return last.slice(1);
  for (let i = 0; i < ks.length - 1; i++) {
    const a = ks[i];
    const b = ks[i + 1];
    if (t >= a[0] && t <= b[0]) {
      const p = (t - a[0]) / (b[0] - a[0] || 1);
      return a.slice(1).map((v, j) => lerp(v, b[j + 1], p));
    }
  }
  return last.slice(1);
};

/** Deterministic pseudo random in [0,1). */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Deterministic smooth noise in [-1,1] for camera shake. */
export const shakeNoise = (t: number, seed: number) =>
  Math.sin(t * 37 + seed) * 0.5 +
  Math.sin(t * 23.3 + seed * 2.1) * 0.3 +
  Math.sin(t * 61.7 + seed * 3.7) * 0.2;
