import { ThreeCanvas } from "@remotion/three";
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, keys } from "../anim";
import { Blocky, Look, Pose } from "../three/Blocky";
import { Cam, Shot } from "../three/Cam";
import { B } from "../three/Props";
import { Bedroom } from "./Bedroom";
import { KNOCKS, SCENES } from "./data";

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

const BOY: Look = {
  skin: "#eec395",
  shirt: "#5a6270",
  sleeve: "#5a6270",
  pants: "#1e1f26",
  shoes: "#e6e6e6",
  hair: "#15100c",
  hairStyle: "short",
};
const SHADE: Look = {
  skin: "#0c0c10",
  shirt: "#0a0a0d",
  pants: "#09090b",
  shoes: "#050505",
};

/** knock jolt for an absolute (global) time */
const knockAt = (g: number) =>
  KNOCKS.reduce((a, k) => a + (g >= k && g < k + 0.15 ? Math.sin((g - k) * 60) : 0), 0);

/** Sitting up in bed (mattress top 2.1), facing -z toward the door wall. */
const inBed = (p: Partial<Pose>): Pose => ({
  x: -4.5,
  z: 5.0,
  y: 0.1,
  yaw: Math.PI,
  motion: "idle",
  lL: -1.5,
  lR: -1.5,
  ...p,
});

/** Phone screen light near the face. */
const FaceLight: React.FC<{ x: number; z: number; y?: number; yaw: number; on?: number }> = ({ x, z, y = 4.4, yaw, on = 1 }) => (
  <pointLight position={[x + Math.sin(yaw) * 1.4, y, z + Math.cos(yaw) * 1.4]} color="#bcd6ff" intensity={14 * on} distance={6} decay={1.5} />
);

/* ===== hook: phone lights up at 03:00, boy wakes ===== */
const hookShots: Shot[] = [
  { t: [0, 1.4], eye: [[-1.0, 3.6, 4.4], [-1.0, 3.0, 5.0]], at: [[-1.0, 2.25, 6.1], [-1.0, 2.25, 6.1]], fov: [42, 34], shake: 0.01 },
  { t: [1.4, 3.0], eye: [[-4.5, 4.9, -1.2], [-4.5, 4.85, -0.3]], at: [[-4.5, 4.6, 5], [-4.5, 4.6, 5]], fov: [36, 32] },
];
export const XHook: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Cam t={t} shots={hookShots} />
      <Bedroom t={t} phoneOnStand={t < 1.4} phoneLit={1} />
      <Blocky t={t} pose={inBed({ face: t < 1.4 ? "sleep" : "shock", aR: t < 1.4 ? 0 : -1.3, item: t < 1.4 ? undefined : "phone" })} look={BOY} />
      {t >= 1.4 ? <FaceLight x={-4.5} z={5} yaw={Math.PI} /> : null}
    </Canvas>
  );
};

/* ===== text 1: background = boy reading ===== */
const readShots: Shot[] = [{ t: [0, 3.0], eye: [[-4.5, 4.85, -0.3], [-4.5, 4.8, 0.6]], at: [[-4.5, 4.6, 5], [-4.5, 4.6, 5]], fov: [32, 30] }];
export const XText1: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Cam t={t} shots={readShots} />
      <Bedroom t={t} />
      <Blocky t={t} pose={inBed({ face: "scared", aR: -1.3, item: "phone" })} look={BOY} />
      <FaceLight x={-4.5} z={5} yaw={Math.PI} />
    </Canvas>
  );
};

/* ===== laugh it off ===== */
const laughShots: Shot[] = [
  { t: [0, 2.0], eye: [[5.5, 6.6, -6], [4.5, 6.1, -5]], at: [[-3.5, 2.6, 3.5], [-3.5, 2.6, 3.5]], fov: [50, 46] },
  { t: [2.0, 4.4], eye: [[-2.2, 4.8, 0.2], [-2.8, 4.7, 1.2]], at: [[-4.5, 4.5, 5], [-4.5, 4.5, 5]], fov: [40, 36] },
];
export const XLaugh: React.FC = () => {
  const t = useT();
  const laugh = t < 1.5 ? Math.sin(t * 18) * 0.06 - 0.15 : 0;
  return (
    <Canvas>
      <Cam t={t} shots={laughShots} />
      <Bedroom t={t} phoneOnStand={t > 2.0} phoneLit={0} />
      <Blocky
        t={t}
        pose={inBed({ face: "calm", headPitch: laugh, aR: t < 1.6 ? -1.3 : keys(t, [[1.6, -1.3], [2.0, 0]])[0], item: t < 2.0 ? "phone" : undefined, headYaw: t > 2 ? 0.25 : 0 })}
        look={BOY}
      />
      {t < 2.0 ? <FaceLight x={-4.5} z={5} yaw={Math.PI} on={0.6} /> : null}
    </Canvas>
  );
};

/* ===== knock ===== */
const knockShots: Shot[] = [{ t: [0, 2.0], eye: [[0.8, 3.4, -1.5], [1.4, 3.1, -2.8]], at: [[3, 2.4, -8], [3, 2.4, -8]], fov: [48, 44] }];
export const XKnock: React.FC = () => {
  const t = useT();
  const g = t + SCENES.knock[0];
  const k = knockAt(g);
  return (
    <Canvas>
      <Cam t={t} shots={knockShots} extraShake={Math.abs(k) > 0.1 ? 0.05 : 0} />
      <Bedroom t={t} knock={k} feet={t > 0.15 ? 1 : 0} />
    </Canvas>
  );
};

/* ===== "O'g'lim, och, menman!" — boy goes to the door ===== */
const momShots: Shot[] = [
  { t: [0, 1.5], eye: [[-4.0, 4.9, -0.6], [-4.0, 4.85, 0.2]], at: [[-4.5, 4.6, 5], [-4.5, 4.6, 5]], fov: [36, 32] },
  { t: [1.5, 3.4], eye: [[-4.2, 7, 7.2], [-2.6, 6.6, 4.4]], at: [[3, 2.8, -8], [3, 2.8, -8]], fov: [50, 46] },
];
export const XMom: React.FC = () => {
  const t = useT();
  const walkP = clamp((t - 1.5) / 1.6, 0, 1);
  const bx = -1.2 + walkP * 3.4;
  const bz = 0.5 - walkP * 4.2;
  return (
    <Canvas>
      <Cam t={t} shots={momShots} />
      <Bedroom t={t} feet={1} feetShift={Math.sin(t * 1.3) * 0.1} />
      <pointLight position={[-1.5, 6, 3]} color="#7f93d0" intensity={22} distance={12} decay={1.3} />
      {t < 1.5 ? (
        <Blocky t={t} pose={inBed({ face: "calm", headYaw: 0.35 })} look={BOY} />
      ) : (
        <Blocky
          t={t}
          pose={{ x: bx, z: bz, yaw: Math.PI - 0.55, motion: walkP < 1 ? "walk" : "idle", face: "calm", aR: walkP >= 1 ? -1.4 : undefined, item: "phone" }}
          look={BOY}
        />
      )}
    </Canvas>
  );
};

/* ===== text 2: frozen in front of the door (background for chat) ===== */
const BX = 2.2;
const BZ = -3.7;
const frozenShots: Shot[] = [{ t: [0, 3.3], eye: [[BX + 0.2, 4.85, -7.4], [BX + 0.1, 4.8, -7.1]], at: [[BX, 4.6, BZ], [BX, 4.6, BZ]], fov: [42, 36] }];
export const XText2: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Cam t={t} shots={frozenShots} />
      <Bedroom t={t} feet={1} />
      <Blocky t={t} pose={{ x: BX, z: BZ, yaw: Math.PI, motion: "idle", face: "shock", aR: -1.3, item: "phone" }} look={BOY} />
      <FaceLight x={BX} z={BZ} yaw={Math.PI} />
    </Canvas>
  );
};

/* ===== call mom: backs away with phone to ear ===== */
const callShots: Shot[] = [{ t: [0, 4.7], eye: [[-6.2, 5.2, -4.5], [-5.2, 5, -3]], at: [[2, 3.6, -3], [1.5, 3.6, -2]], fov: [48, 44] }];
export const XCall: React.FC = () => {
  const t = useT();
  const z = BZ + clamp(t / 4.5, 0, 1) * 3.6;
  return (
    <Canvas>
      <Cam t={t} shots={callShots} />
      <Bedroom t={t} feet={1} feetShift={Math.sin(t * 2) * 0.15} />
      <Blocky t={t} pose={{ x: BX - 0.6, z, yaw: Math.PI, motion: "walk", phase: 0.3, face: t > 2.1 ? "shock" : "scared", aR: -2.7, aRz: -0.35, item: "phone" }} look={BOY} />
      <FaceLight x={BX - 0.6} z={z} yaw={-Math.PI / 2} on={0.6} />
    </Canvas>
  );
};

/* ===== the voice keeps calling: handle turns by itself ===== */
const voiceShots: Shot[] = [
  { t: [0, 1.6], eye: [[4.0, 3.0, -5.4], [4.0, 2.9, -6.3]], at: [[4.1, 2.6, -7.8], [4.1, 2.6, -7.8]], fov: [40, 34] },
  { t: [1.6, 3.1], eye: [[0.6, 4.75, -4.6], [0.6, 4.7, -4.0]], at: [[0.6, 4.6, 0], [0.6, 4.6, 0]], fov: [36, 32], shake: 0.012 },
];
export const XVoice: React.FC = () => {
  const t = useT();
  const g = t + SCENES.voice[0];
  const handle = -Math.max(0, Math.sin(t * 2.4)) * 0.6 + Math.sin(t * 31) * 0.03;
  return (
    <Canvas>
      <Cam t={t} shots={voiceShots} extraShake={Math.abs(knockAt(g)) > 0.1 ? 0.05 : 0} />
      <Bedroom t={t} knock={knockAt(g)} handle={handle} feet={1} feetShift={Math.sin(t * 3) * 0.2} />
      <Blocky t={t} pose={{ x: 0.6, z: 0, yaw: Math.PI, motion: "idle", face: "scared", aR: -1.3, item: "phone" }} look={BOY} />
      <FaceLight x={0.6} z={0} yaw={Math.PI} on={0.7} />
    </Canvas>
  );
};

/* ===== last message, then the shape behind him ===== */
const lastShots: Shot[] = [
  { t: [0, 2.4], eye: [[0.6, 4.75, -4.0], [0.6, 4.72, -3.6]], at: [[0.6, 4.6, 0], [0.6, 4.6, 0]], fov: [32, 30] },
  { t: [2.4, 3.1], eye: [[0.4, 5.4, -7.3], [0.4, 5.3, -6.5]], at: [[-0.5, 5.2, 2], [-0.5, 5.2, 2]], fov: [56, 52], shake: 0.015 },
];
const Shade: React.FC<{ t: number; x?: number; z?: number }> = ({ t, x = -1.9, z = 3.2 }) => (
  <>
    <Blocky t={t * 0.3} pose={{ x, z, yaw: Math.PI - 0.15, motion: "idle", face: "void", headPitch: 0.25, headRoll: 0.18, scale: 1.38, aL: 0.05, aR: 0.05 }} look={SHADE} />
    <pointLight position={[x, 7, z - 1]} color="#6070a0" intensity={6} distance={6} decay={1.5} />
  </>
);
export const XLast: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Cam t={t} shots={lastShots} />
      <Bedroom t={t} feet={0} />
      <Blocky t={t} pose={{ x: 0.6, z: 0, yaw: Math.PI, motion: "idle", face: "shock", aR: -1.3, item: "phone" }} look={BOY} />
      <FaceLight x={0.6} z={0} yaw={Math.PI} />
      {t > 2.4 ? <Shade t={t} /> : null}
    </Canvas>
  );
};

/* ===== end: he starts to turn... blackout... phone on the floor, eyes in the dark ===== */
const endShots: Shot[] = [
  { t: [0, 1.0], eye: [[0.4, 5.3, -7.2], [0.4, 5.1, -6.3]], at: [[-0.5, 5.2, 2], [-0.3, 5.0, 2]], fov: [52, 46], shake: 0.01 },
  { t: [1.0, 7.0], eye: [[0.4, 3.6, -5.0], [0.3, 3.3, -3.6]], at: [[-0.4, 4.6, 3], [-0.4, 4.7, 3]], fov: [48, 44] },
];
export const XEnd: React.FC = () => {
  const t = useT();
  const turn = clamp(t / 0.9, 0, 1) * 1.3;
  return (
    <Canvas>
      <Cam t={t} shots={endShots} />
      <Bedroom t={t} feet={0} moon={t > 1 ? 0.6 : 1} />
      {t < 1.0 ? (
        <>
          <Blocky t={t} pose={{ x: 0.6, z: 0, yaw: Math.PI, motion: "idle", face: "shock", headYaw: turn, aR: -1.3, item: "phone" }} look={BOY} />
          <FaceLight x={0.6} z={0} yaw={Math.PI} />
          <Shade t={t} />
        </>
      ) : (
        <>
          {/* dropped phone glowing on the rug */}
          <group position={[0.4, 0.08, 0.6]} rotation={[0, 0.5, 0]}>
            <B p={[0, 0, 0]} s={[0.55, 0.07, 1]} c="#121318" />
            <B p={[0, 0.045, 0]} s={[0.46, 0.02, 0.86]} c="#cfe4ff" glow />
          </group>
          <pointLight position={[0.4, 1.2, 0.6]} color="#bcd6ff" intensity={14} distance={7} decay={1.5} />
          <Shade t={t} x={-0.6} z={4.6} />
        </>
      )}
    </Canvas>
  );
};
