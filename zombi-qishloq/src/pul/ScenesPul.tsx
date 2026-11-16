import { ThreeCanvas } from "@remotion/three";
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, easeInOut, easeOut, keys } from "../anim";
import { Blocky } from "../three/Blocky";
import { Cam, Shot } from "../three/Cam";
import { Bag, BlackCar, Bills, HouseOutside, NARR, Room, SARDOR, STRANGER } from "./PropsPul";

const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return f / fps;
};

const Canvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas width={width} height={height} gl={{ antialias: true }}>
      {children}
    </ThreeCanvas>
  );
};

const SX = 2.5; // Sardor
const SZ = 1.8;
const NX = -1.5; // narrator
const NZ = 2.3;
const BAG: [number, number, number] = [0.5, 0, 0.9];

/* ===== hook: open bag full of money ===== */
const hookShots: Shot[] = [{ t: [0, 3.6], eye: [[0.5, 4.4, 6.2], [0.5, 3.4, 4.2]], at: [[0.5, 1.4, 0.9], [0.5, 1.3, 0.9]], fov: [42, 38] }];
export const PHook: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Cam t={t} shots={hookShots} />
      <Room t={t} />
      <Bag p={BAG} open={1} glow={1} />
      <Bills t={t} t0={0.9} c={[0.5, 1.6, 0.9]} n={36} spread={3} />
    </Canvas>
  );
};

/* ===== "eng katta xatomiz edi": silhouette in the doorway ===== */
const mistakeShots: Shot[] = [{ t: [0, 2.9], eye: [[3, 4.2, 3], [3, 4.4, -1.5]], at: [[3, 3.8, -9], [3, 4.2, -9]], fov: [42, 34] }];
export const PMistake: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Cam t={t} shots={mistakeShots} />
      <Room t={t} dusk={1} doorOpen={1} backlight={1} />
      <Blocky t={t} pose={{ x: 3, z: -9.3, yaw: 0, motion: "idle", face: "shades", scale: 1.12 }} look={STRANGER} />
    </Canvas>
  );
};

/* ===== entering the abandoned house ===== */
const enterOutShots: Shot[] = [{ t: [0, 2.1], eye: [[11, 8.5, 36], [8, 7.5, 31]], at: [[0, 4, -4], [0, 4, -4]], fov: [52, 50] }];
const enterInShots: Shot[] = [{ t: [2.1, 4.0], eye: [[1, 5, 7.3], [1, 4.8, 6]], at: [[2.5, 3, -6], [2.5, 3, -6]], fov: [46, 44] }];
export const PEnter: React.FC = () => {
  const t = useT();
  if (t < 2.1) {
    const z = 15 - 4.5 * t;
    return (
      <Canvas>
        <Cam t={t} shots={enterOutShots} />
        <HouseOutside t={t} />
        <Blocky t={t} pose={{ x: -1.3, z, yaw: Math.PI, motion: "walk", phase: 0 }} look={NARR} />
        <Blocky t={t} pose={{ x: 1.3, z: z + 0.6, yaw: Math.PI, motion: "walk", phase: 0.4 }} look={SARDOR} />
      </Canvas>
    );
  }
  const k = clamp((t - 2.1) / 1.9, 0, 1);
  return (
    <Canvas>
      <Cam t={t} shots={enterInShots} />
      <Room t={t} doorOpen={1} backlight={0.5} />
      <Blocky t={t} pose={{ x: 2.0, z: -9 + k * 5, yaw: 0, motion: "walk", face: "calm", headYaw: Math.sin(t * 1.4) * 0.5, phase: 0 }} look={NARR} />
      <Blocky t={t} pose={{ x: 4.0, z: -9.6 + k * 5, yaw: -0.1, motion: "walk", face: "happy", phase: 0.4 }} look={SARDOR} />
    </Canvas>
  );
};

/* ===== floorboard lifts: black bag ===== */
const floorShots: Shot[] = [{ t: [0, 2.5], eye: [[0.8, 6.6, 4.4], [0.6, 6.2, 3.4]], at: [[0.5, 0, 0], [0.5, 0, 0]], fov: [46, 42] }];
export const PFloor: React.FC = () => {
  const t = useT();
  const hole = easeOut(clamp((t - 0.15) / 0.7, 0, 1));
  return (
    <Canvas>
      <Cam t={t} shots={floorShots} />
      <Room t={t} hole={hole} />
      <Bag p={[0.5, -1.05, 0]} r={[0, Math.PI / 2, 0]} />
      <Blocky t={t} pose={{ x: 3.4, z: -0.8, yaw: -2.0, motion: "idle", lean: 0.45, aL: -1.4, aR: -1.6, face: "shock" }} look={SARDOR} />
      <Blocky t={t} pose={{ x: -2.4, z: -0.8, yaw: 2.0, motion: "idle", lean: 0.2, face: "shock" }} look={NARR} />
    </Canvas>
  );
};

/* ===== bag opens: dollars ===== */
const moneyShots: Shot[] = [{ t: [0, 2.8], eye: [[0.5, 5.2, 6.2], [0.5, 4, 4.4]], at: [[0.5, 1.4, 0.9], [0.5, 1.4, 0.9]], fov: [40, 36], shake: 0.01 }];
export const PMoney: React.FC = () => {
  const t = useT();
  const open = easeOut(clamp((t - 0.2) / 0.5, 0, 1));
  return (
    <Canvas>
      <Cam t={t} shots={moneyShots} />
      <Room t={t} />
      <Bag p={BAG} open={open} glow={open} />
      <Bills t={t} t0={1.75} c={[0.5, 1.6, 0.9]} n={24} spread={2.5} />
      <Blocky t={t} pose={{ x: SX, z: SZ - 0.4, yaw: -1.1, motion: "idle", lean: 0.25, face: "shock" }} look={SARDOR} />
      <Blocky t={t} pose={{ x: NX, z: NZ - 0.4, yaw: 1.0, motion: "idle", lean: 0.2, face: "shock" }} look={NARR} />
    </Canvas>
  );
};

/* ===== "Biz boy bo'ldik!" money rain ===== */
const joyShots: Shot[] = [
  { t: [0, 1.75], eye: [[0, 5.8, 7.4], [0.6, 5.6, 6.9]], at: [[0.8, 3.6, 0], [0.8, 3.6, 0]], fov: [64, 60] },
  { t: [1.75, 3.7], eye: [[SX + 0.2, 4.9, SZ + 5.2], [SX + 0.1, 4.8, SZ + 4.4]], at: [[SX, 4.8, SZ], [SX, 4.9, SZ]], fov: [40, 36] },
];
export const PJoy: React.FC = () => {
  const t = useT();
  const jump = Math.abs(Math.sin(t * 6)) * 1.2;
  return (
    <Canvas>
      <Cam t={t} shots={joyShots} />
      <Room t={t} />
      <Bag p={BAG} open={1} glow={1} />
      <Bills t={t} t0={0.1} c={[SX, 4.5, SZ]} n={40} spread={4} />
      <Bills t={t} t0={1.8} c={[SX, 5.5, SZ]} n={40} spread={5} />
      <Blocky t={t} pose={{ x: SX, z: SZ, y: jump, yaw: -0.2, motion: "idle", aL: -2.9, aR: -2.8, aLz: 0.3, aRz: -0.3, face: "happy" }} look={SARDOR} />
      <Blocky t={t} pose={{ x: NX, z: NZ, yaw: 0.3, motion: "idle", aL: -2.4, aR: -2.6, face: "happy", phase: 1 }} look={NARR} />
    </Canvas>
  );
};

/* ===== car outside, headlights inside ===== */
const carOutShots: Shot[] = [{ t: [0, 1.4], eye: [[12, 4, 20], [11, 3.8, 18]], at: [[-3, 2, 4], [-5, 2, 4]], fov: [48, 46] }];
const carInShots: Shot[] = [{ t: [1.4, 2.8], eye: [[6.5, 5.6, 0], [6, 5.4, -0.5]], at: [[-6, 3.6, -1], [-6, 3.6, -1]], fov: [52, 48] }];
export const PCar: React.FC = () => {
  const t = useT();
  if (t < 1.4) {
    const x = -34 + 28 * easeOut(clamp(t / 1.3, 0, 1));
    return (
      <Canvas>
        <Cam t={t} shots={carOutShots} />
        <HouseOutside t={t} />
        <BlackCar p={[x, 0, 7]} />
      </Canvas>
    );
  }
  return (
    <Canvas>
      <Cam t={t} shots={carInShots} />
      <Room t={t} dusk={1} headlights={1} />
      <Bag p={BAG} open={1} glow={0.5} />
      <Blocky t={t} pose={{ x: SX, z: SZ, yaw: -1.4, motion: "idle", face: "shock", headYaw: -0.2 }} look={SARDOR} />
      <Blocky t={t} pose={{ x: NX, z: NZ, yaw: -1.3, motion: "idle", face: "shock", phase: 1 }} look={NARR} />
    </Canvas>
  );
};

/* ===== door opens, stranger walks in (low angle) ===== */
const doorShots: Shot[] = [{ t: [0, 3.1], eye: [[2.2, 1.6, 1], [2.4, 1.8, -0.5]], at: [[3, 5, -8], [3, 5.2, -7]], fov: [50, 48] }];
export const PDoor: React.FC = () => {
  const t = useT();
  const open = easeOut(clamp((t - 0.14) / 0.45, 0, 1));
  const z = -9.5 + easeInOut(clamp((t - 1.4) / 1.6, 0, 1)) * 4;
  return (
    <Canvas>
      <Cam t={t} shots={doorShots} extraShake={t > 0.14 && t < 0.4 ? 0.05 : 0} />
      <Room t={t} dusk={1} doorOpen={open} backlight={open} headlights={0.4} />
      <Blocky t={t} pose={{ x: 3, z, yaw: 0, motion: t > 1.4 && t < 3 ? "walk" : "idle", face: "shades", scale: 1.12 }} look={STRANGER} />
    </Canvas>
  );
};

/* ===== "Mening pulimni ko'rmadingizmi?" ===== */
const asksShots: Shot[] = [
  { t: [0, 2.5], eye: [[3.3, 5.35, 0.5], [3.2, 5.25, -0.8]], at: [[3, 5.1, -5.5], [3, 5.1, -5.5]], fov: [34, 28] },
  { t: [2.5, 3.3], eye: [[5.2, 6.4, -6.5], [5, 6.2, -6]], at: [[0.5, 3.5, 2], [0.5, 3.5, 2]], fov: [46, 44] },
];
export const PAsks: React.FC = () => {
  const t = useT();
  const roll = keys(t, [[0, 0], [1.5, 0], [2.0, 0.25]])[0];
  return (
    <Canvas>
      <Cam t={t} shots={asksShots} />
      <Room t={t} dusk={1} doorOpen={1} backlight={0.6} headlights={0.3} />
      <Bag p={BAG} open={1} glow={0.5} />
      <Blocky t={t} pose={{ x: 3, z: -5.5, yaw: -0.1, motion: "idle", face: "shades", scale: 1.12, headRoll: roll }} look={STRANGER} />
      <Blocky t={t} pose={{ x: SX, z: SZ, yaw: Math.PI + 0.1, motion: "idle", face: "shock" }} look={SARDOR} />
      <Blocky t={t} pose={{ x: NX, z: NZ, yaw: Math.PI - 0.3, motion: "idle", face: "scared", phase: 1 }} look={NARR} />
    </Canvas>
  );
};

/* ===== Sardor looks at me... and hides the bag ===== */
const hideShots: Shot[] = [
  { t: [0, 1.7], eye: [[-4.2, 5.3, 3.6], [-3.8, 5.2, 3.4]], at: [[SX, 4.6, SZ], [SX, 4.6, SZ]], fov: [34, 30] },
  { t: [1.7, 3.7], eye: [[0.8, 6.2, 7.3], [0.8, 5.8, 6.6]], at: [[1.5, 2.6, -1], [1.5, 2.6, -1]], fov: [56, 54] },
];
export const PHide: React.FC = () => {
  const t = useT();
  const k = easeInOut(clamp((t - 1.9) / 0.8, 0, 1));
  const bag: [number, number, number] = [BAG[0] + (SX - BAG[0]) * k, k * 0.6, BAG[2] + (SZ - 1.3 - BAG[2]) * k];
  return (
    <Canvas>
      <Cam t={t} shots={hideShots} />
      <Room t={t} dusk={1} doorOpen={1} backlight={0.6} headlights={0.3} />
      <Bag p={bag} open={1 - k} glow={0.4 * (1 - k)} />
      <Blocky t={t} pose={{ x: 3, z: -5.5, yaw: -0.1, motion: "idle", face: "shades", scale: 1.12, headRoll: 0.25 }} look={STRANGER} />
      <Blocky
        t={t}
        pose={{ x: SX, z: SZ, yaw: t < 1.7 ? -1.45 : Math.PI, motion: "idle", face: "brave", aL: k > 0.5 ? 0.9 : 0, aR: k > 0.5 ? 0.9 : 0 }}
        look={SARDOR}
      />
      <Blocky t={t} pose={{ x: NX, z: NZ, yaw: Math.PI - 0.3, motion: "idle", face: "scared", phase: 1 }} look={NARR} />
    </Canvas>
  );
};

/* ===== end: standoff ===== */
const endShots: Shot[] = [{ t: [0, 6.3], eye: [[0, 6.6, 7.4], [0, 6.2, 6.6]], at: [[1.5, 3, -3], [1.5, 3, -3]], fov: [60, 56] }];
export const PEnd: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Cam t={t} shots={endShots} />
      <Room t={t} dusk={1} doorOpen={1} backlight={0.6} headlights={0.3} />
      <Bag p={[SX, 0.6, SZ - 1.3]} open={0} />
      <Blocky t={t} pose={{ x: 3, z: -5.5, yaw: -0.1, motion: "idle", face: "shades", scale: 1.12, headRoll: 0.25 }} look={STRANGER} />
      <Blocky t={t} pose={{ x: SX, z: SZ, yaw: Math.PI, motion: "idle", face: "brave", aL: 0.9, aR: 0.9 }} look={SARDOR} />
      <Blocky t={t} pose={{ x: NX, z: NZ, yaw: Math.PI - 0.3, motion: "idle", face: "scared", phase: 1 }} look={NARR} />
    </Canvas>
  );
};
