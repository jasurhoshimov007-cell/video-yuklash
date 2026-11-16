import { ThreeCanvas } from "@remotion/three";
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, easeInOut, easeOut, keys } from "../anim";
import { Blocky, Look, Pose } from "../three/Blocky";
import { Cam, Shot } from "../three/Cam";
import { K, NAME, TOMORROW } from "./data";

const [DM, YEAR] = [TOMORROW.slice(0, 5), TOMORROW.slice(6)];
const BOARD = [NAME, DM, YEAR];
import { Calendar, Classroom, Corridor, flick, IndoorEnv, Room13, School } from "./Props13";

/** Local scene time in voice-seconds. */
const useTV = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return f / fps / K;
};

const Canvas: React.FC<{ children: React.ReactNode; filter?: string }> = ({ children, filter }) => {
  const { width, height } = useVideoConfig();
  return (
    <div style={{ position: "absolute", inset: 0, filter }}>
      <ThreeCanvas width={width} height={height} gl={{ antialias: true }}>
        {children}
      </ThreeCanvas>
    </div>
  );
};

/* ---------- cast ---------- */
export const AZIZ: Look = {
  skin: "#f0c99a",
  shirt: "#22305a",
  sleeve: "#22305a",
  pants: "#2c2c34",
  shoes: "#111111",
  hair: "#3a2516",
  hairStyle: "short",
};
const GUARD: Look = {
  skin: "#d8a77a",
  shirt: "#3b4a3a",
  pants: "#252525",
  shoes: "#111111",
  hat: "cap",
  hatCol: "#1f2a3a",
  beard: "#8a8a8a",
};
const GHOST: Look = {
  skin: "#cfd8dc",
  shirt: "#3a3f4a",
  pants: "#22252c",
  shoes: "#111111",
  hair: "#141414",
  hairStyle: "short",
};

/** Sitting on a classroom chair (seat height 1.5). */
const sit = (p: Partial<Pose> & { x: number; z: number }): Pose => ({
  y: -0.45,
  motion: "idle",
  lL: -1.5,
  lR: -1.5,
  aL: -1.2,
  aR: -1.2,
  ...p,
});

/** Phone flashlight: a light a little in front of the holder. */
const PhoneLight: React.FC<{ x: number; z: number; yaw: number; on?: number }> = ({ x, z, yaw, on = 1 }) => (
  <>
    <pointLight position={[x + Math.sin(yaw) * 2.2, 3.6, z + Math.cos(yaw) * 2.2]} color="#dfe8ff" intensity={40 * on} distance={14} decay={1.4} />
    <pointLight position={[x + Math.sin(yaw) * 0.9, 4.6, z + Math.cos(yaw) * 0.9]} color="#cfe0ff" intensity={6 * on} distance={4} decay={1.5} />
  </>
);

/* ===== 1. HOOK: push down the dark corridor to the red 13 ===== */
const hookShots: Shot[] = [
  { t: [0, 2.3], eye: [[0, 4.2, 4], [0, 4.1, -20]], at: [[0, 4.4, -40], [0, 4.6, -40]], fov: [52, 44], shake: 0.02 },
  { t: [2.3, 2.9], eye: [[0, 5.6, -30], [0, 5.9, -33]], at: [[0, 6.1, -40], [0, 6.2, -40]], fov: [34, 20], shake: 0.04 },
];
export const S13Hook: React.FC = () => {
  const t = useTV();
  return (
    <Canvas>
      <IndoorEnv fog="#040406" near={8} far={55} ambient={0.3} />
      <Cam t={t} shots={hookShots} />
      <Corridor t={t} lights={0.8} flickerAmt={0.45} red={1.2} />
    </Canvas>
  );
};

/* ===== 2. SCHOOL exterior ===== */
const schoolShots: Shot[] = [
  { t: [0, 2.95], eye: [[-20, 5, 44], [-6, 6, 36]], at: [[2, 9, 0], [6, 10, 0]], fov: [52, 48] },
];
export const S13School: React.FC = () => {
  const t = useTV();
  return (
    <Canvas>
      <Cam t={t} shots={schoolShots} />
      <School t={t} />
    </Canvas>
  );
};

/* ===== 3. SLEEP: classroom at sunset, time-lapse ===== */
const sleepShots: Shot[] = [
  { t: [0, 1.7], eye: [[2.6, 7.4, -6.5], [2, 6.8, -5]], at: [[0, 3, 1], [0, 3, 1]], fov: [46, 42] },
  { t: [1.7, 3.15], eye: [[0, 6.2, -4.5], [0, 6.3, -6]], at: [[0, 6.3, -10], [0, 6.4, -10]], fov: [40, 30] },
];
export const S13Sleep: React.FC = () => {
  const t = useTV();
  const lapse = clamp((t - 1.7) / 1.45, 0, 1);
  const dusk = clamp(t / 3.15, 0, 1);
  const total = 15 * 60 + 30 + lapse * (7 * 60 + 25); // 15:30 -> 22:55
  return (
    <Canvas>
      <IndoorEnv fog="#1a1410" near={20} far={70} ambient={0.95 - dusk * 0.45} tint={dusk < 0.5 ? "#c09070" : "#5a6a9a"} />
      <pointLight position={[-6, 5, 1]} color={dusk < 0.5 ? "#ffa060" : "#7080c0"} intensity={40 - dusk * 20} distance={20} decay={1.2} />
      <Cam t={t} shots={sleepShots} />
      <Classroom dusk={dusk} hour={Math.floor(total / 60)} minute={total % 60} />
      <Blocky t={t} pose={sit({ x: 0, z: 1.0, yaw: Math.PI, face: "sleep", headPitch: 0.75, lean: 0.35, aLz: 0.3, aRz: -0.3 })} look={AZIZ} />
    </Canvas>
  );
};

/* ===== 4. WAKE: jolt, clock 11:00, dark class ===== */
const wakeShots: Shot[] = [
  { t: [0, 1.0], eye: [[0.3, 4.4, -3.4], [0.2, 4.3, -2.6]], at: [[0, 3.9, 1], [0, 4.0, 1]], fov: [36, 32], shake: 0.03 },
  { t: [1.0, 2.1], eye: [[0, 6.4, -6.5], [0, 6.4, -7.4]], at: [[0, 6.4, -10], [0, 6.4, -10]], fov: [36, 30] },
  { t: [2.1, 4.6], eye: [[-7, 6.8, 7.5], [-5.5, 6.2, 6.5]], at: [[0, 3, -1], [0, 3, -2]], fov: [50, 46] },
];
export const S13Wake: React.FC = () => {
  const t = useTV();
  const up = clamp((t - 0.1) / 0.18, 0, 1);
  const standing = t > 2.4;
  const yaw = Math.PI + Math.sin(Math.max(0, t - 2.6) * 1.6) * 0.9;
  return (
    <Canvas>
      <IndoorEnv fog="#05070e" near={10} far={50} ambient={0.32} tint="#4a5a8a" />
      <Cam t={t} shots={wakeShots} extraShake={t > 0.1 && t < 0.4 ? 0.06 : 0} />
      <Classroom dusk={1} hour={11} minute={0} />
      {standing ? (
        <>
          <Blocky t={t} pose={{ x: 0, z: 2.4, yaw, motion: "idle", face: "scared", aR: -1.3, item: "phone" }} look={AZIZ} />
          <PhoneLight x={0} z={2.4} yaw={yaw} />
        </>
      ) : (
        <Blocky
          t={t}
          pose={sit({ x: 0, z: 1.0, yaw: Math.PI, face: up > 0.5 ? "shock" : "sleep", headPitch: 0.75 * (1 - up), lean: 0.35 * (1 - up), aLz: 0.3, aRz: -0.3 })}
          look={AZIZ}
        />
      )}
      <pointLight position={[0, 6, -6]} color="#8090c0" intensity={10} distance={14} decay={1.4} />
    </Canvas>
  );
};

/* ===== 5. CORRIDOR walk with phone light ===== */
const corridorShots: Shot[] = [
  { t: [0, 1.6], eye: [[1.6, 5.3, 9], [1.6, 5.3, 1]], at: [[0, 4, -20], [0, 4, -28]], fov: [50, 50], linear: true },
  { t: [1.6, 2.9], eye: [[0, 4.8, -24], [0, 4.8, -23]], at: [[0, 4.4, -10], [0, 4.4, -12]], fov: [32, 30] },
];
export const S13Corridor: React.FC = () => {
  const t = useTV();
  const z = 2 - 5.2 * t;
  return (
    <Canvas>
      <IndoorEnv fog="#030305" near={8} far={50} ambient={0.25} />
      <Cam t={t} shots={corridorShots} />
      <Corridor t={t} lights={0} red={1} />
      <Blocky t={t} pose={{ x: 0, z, yaw: Math.PI, motion: "walk", face: "scared", aR: -1.3, item: "phone", headYaw: Math.sin(t * 1.5) * 0.4 }} look={AZIZ} />
      <PhoneLight x={0} z={z} yaw={Math.PI} />
    </Canvas>
  );
};

/* ===== 6. PLATE "13" ===== */
const plateShots: Shot[] = [
  { t: [0, 1.3], eye: [[2.2, 5.6, -26], [1.8, 5.4, -29]], at: [[0, 4.5, -40], [0, 4.8, -40]], fov: [44, 40] },
  { t: [1.3, 3.5], eye: [[0, 6.25, -35.5], [0, 6.25, -37]], at: [[0, 6.25, -40], [0, 6.25, -40]], fov: [34, 26], shake: 0.012 },
];
export const S13Plate: React.FC = () => {
  const t = useTV();
  const pulse = t > 1.34 ? 1.3 + Math.sin(t * 9) * 0.4 : 0.8;
  return (
    <Canvas>
      <IndoorEnv fog="#030305" near={8} far={50} ambient={0.25} />
      <Cam t={t} shots={plateShots} extraShake={t > 1.34 && t < 1.6 ? 0.05 : 0} />
      <Corridor t={t} lights={0} red={pulse} />
      <Blocky t={t} pose={{ x: -1.6, z: -34.5, yaw: Math.PI, motion: "idle", face: "scared", aR: -1.3, item: "phone" }} look={AZIZ} />
      <PhoneLight x={-1.6} z={-34.5} yaw={Math.PI} on={0.6} />
    </Canvas>
  );
};

/* ===== 7. OPEN by itself ===== */
const openShots: Shot[] = [
  { t: [0, 1.4], eye: [[2.2, 3.4, -29], [1.6, 3.6, -31]], at: [[0, 3.4, -44], [0, 3.6, -44]], fov: [46, 42] },
  { t: [1.4, 2.3], eye: [[-1.6, 4.65, -39.2], [-1.6, 4.65, -38.8]], at: [[-1.6, 4.5, -35.5], [-1.6, 4.5, -35.5]], fov: [40, 34] },
];
export const S13Open: React.FC = () => {
  const t = useTV();
  const open = easeInOut(clamp((t - 0.2) / 1.7, 0, 1)) * 0.9;
  return (
    <Canvas>
      <IndoorEnv fog="#030305" near={8} far={50} ambient={0.25} />
      <Cam t={t} shots={openShots} />
      <Corridor t={t} lights={0} red={1.2} open={open} />
      <Room13 t={t} lines={BOARD} />
      <Blocky t={t} pose={{ x: -1.6, z: -35.5, yaw: Math.PI, motion: "idle", face: t > 1.4 ? "shock" : "scared", aR: -1.3, item: "phone" }} look={AZIZ} />
      <PhoneLight x={-1.6} z={-35.5} yaw={Math.PI} on={0.5} />
      <pointLight position={[0, 4, -39]} color="#ff2a2a" intensity={25 * open} distance={12} decay={1.4} />
    </Canvas>
  );
};

/* ===== 8. INSIDE: only the blackboard ===== */
const insideShots: Shot[] = [{ t: [0, 1.8], eye: [[0.6, 4.5, -35.5], [0.4, 4.3, -39.4]], at: [[0, 3.7, -54], [0, 3.7, -54]], fov: [46, 42] }];
export const S13Inside: React.FC = () => {
  const t = useTV();
  const z = -40.5 - 2.6 * t;
  return (
    <Canvas>
      <IndoorEnv fog="#060203" near={14} far={75} ambient={0.3} tint="#6a3a3a" />
      <Cam t={t} shots={insideShots} />
      <Corridor t={t} lights={0} red={1} open={0.9} />
      <Room13 t={t} lines={BOARD} />
      <Blocky t={t} pose={{ x: -1.1, z, yaw: Math.PI, motion: "walk", face: "scared", aR: -1.3, item: "phone" }} look={AZIZ} />
      <PhoneLight x={-1.1} z={z} yaw={Math.PI} on={0.6} />
    </Canvas>
  );
};

/* ===== 9. BOARD writes itself ===== */
const boardShots: Shot[] = [{ t: [0, 3.4], eye: [[0, 3.6, -42.5], [0, 3.5, -44.5]], at: [[0, 2.4, -54], [0, 2.4, -54]], fov: [44, 40], shake: 0.006 }];
export const S13Board: React.FC = () => {
  const t = useTV();
  const nameN = clamp((t - 0.3) / 0.9, 0, 1) * NAME.length;
  const dmN = clamp((t - 1.9) / 0.5, 0, 1) * DM.length;
  const yN = clamp((t - 2.4) / 0.5, 0, 1) * YEAR.length;
  return (
    <Canvas>
      <IndoorEnv fog="#060203" near={14} far={75} ambient={0.3} tint="#6a3a3a" />
      <Cam t={t} shots={boardShots} />
      <Room13 t={t} lines={BOARD} reveal={[nameN, dmN, yN]} redLight={0.8 + Math.sin(t * 5) * 0.2} />
    </Canvas>
  );
};

/* ===== 10. SLAM: turn around, ghost, door slams ===== */
const SLAM = 1.5; // local (voice 29.0)
const slamShots: Shot[] = [
  { t: [0, 1.75], eye: [[0.5, 4.9, -36.8], [0.4, 4.8, -38.2]], at: [[0, 4.3, -46], [0, 4.3, -46]], fov: [44, 40] },
  { t: [1.75, 3.0], eye: [[0.3, 4.65, -40.6], [0.2, 4.6, -41.3]], at: [[0, 4.5, -46], [0, 4.5, -46]], fov: [36, 32], shake: 0.03 },
];
export const S13Slam: React.FC = () => {
  const t = useTV();
  const yaw = keys(t, [[0, Math.PI], [0.15, Math.PI], [0.55, 0]])[0];
  const door = t < SLAM ? 0.9 : 0.9 * (1 - easeOut(clamp((t - SLAM) / 0.12, 0, 1)));
  const lightsOn = t < SLAM ? flick(t, 3, 1, 0.55) : flick(t, 5, 0.6, 0.3);
  const ghost1 = t > 0.8 && t < 1.45 && lightsOn < 0.5;
  const ghost2 = t > 2.3 && t < 2.55;
  return (
    <Canvas>
      <IndoorEnv fog="#060203" near={8} far={45} ambient={0.12 + lightsOn * 0.15} tint="#6a3a3a" />
      <Cam t={t} shots={slamShots} extraShake={t > SLAM && t < SLAM + 0.35 ? 0.12 : 0} />
      <Corridor t={t} lights={0} red={1} open={door} />
      <Room13 t={t} lines={BOARD} reveal={[99, 99, 99]} redLight={0.3 + lightsOn * 0.9} />
      <Blocky t={t} pose={{ x: 0, z: -46, yaw, motion: "idle", face: t < 0.4 ? "scared" : "shock", aR: -1.3, item: "phone" }} look={AZIZ} />
      <PhoneLight x={0} z={-46} yaw={yaw} on={0.5} />
      {ghost1 ? <Blocky t={t} pose={{ x: -2.6, z: -50, yaw: 0.3, motion: "idle", face: "blank" }} look={GHOST} /> : null}
      <pointLight position={[0.5, 5, -43]} color="#ff5a4a" intensity={22} distance={10} decay={1.4} />
      {ghost2 ? <Blocky t={t} pose={{ x: -2.6, z: -49, yaw: 0.2, motion: "idle", face: "blank", headRoll: 0.3 }} look={GHOST} /> : null}
    </Canvas>
  );
};

/* ===== 11. MORNING: guard finds him; the door is gone ===== */
const morningShots: Shot[] = [{ t: [0, 2.9], eye: [[3, 5.8, -22], [2.4, 5.3, -26]], at: [[0, 2.6, -37], [0, 2.6, -37]], fov: [46, 42] }];
const GUARD_POSE: Pose = { x: 1.8, z: -34, yaw: Math.atan2(-2.3, -3.6), motion: "idle", face: "brave", headPitch: 0.25 };
const sittingFloor = (t: number): Pose => ({
  x: -0.5,
  z: -37.6,
  y: -1.45,
  yaw: 0,
  motion: "idle",
  lL: -1.5,
  lR: -1.5,
  aL: -0.9,
  aR: -0.9,
  aLz: 0.3,
  aRz: -0.3,
  face: "scared",
  headPitch: 0.25 + Math.sin(t) * 0.03,
});
export const S13Morning: React.FC = () => {
  const t = useTV();
  return (
    <Canvas>
      <IndoorEnv fog="#b8c4d4" near={25} far={90} ambient={1.1} tint="#d8e2f0" />
      <directionalLight position={[-10, 10, 5]} intensity={1.2} color="#eaf2ff" />
      <Cam t={t} shots={morningShots} />
      <Corridor t={t} lights={1} day endDoor="wall" />
      <Blocky t={t} pose={sittingFloor(t)} look={AZIZ} />
      <Blocky t={t} pose={GUARD_POSE} look={GUARD} />
    </Canvas>
  );
};

/* ===== 12. GUARD close-up ===== */
const guardShots: Shot[] = [{ t: [0, 2.4], eye: [[-1.0, 4.85, -38.9], [-0.75, 4.75, -38.3]], at: [[1.8, 4.5, -34], [1.8, 4.5, -34]], fov: [36, 30] }];
export const S13Guard: React.FC = () => {
  const t = useTV();
  return (
    <Canvas>
      <IndoorEnv fog="#b8c4d4" near={25} far={90} ambient={1.1} tint="#d8e2f0" />
      <directionalLight position={[-10, 10, 5]} intensity={1.2} color="#eaf2ff" />
      <Cam t={t} shots={guardShots} />
      <Corridor t={t} lights={1} day endDoor="wall" />
      <Blocky t={t} pose={{ ...GUARD_POSE, headPitch: 0.15, face: Math.floor(t * 7) % 3 === 0 ? "scared" : "brave" }} look={GUARD} />
    </Canvas>
  );
};

/* ===== 13. PHOTO: missing poster from 1996 (same face!) ===== */
const photoShots: Shot[] = [{ t: [0, 2.0], eye: [[0, 4.9, 2.5], [0, 4.8, 1.2]], at: [[0, 4.0, -8], [0, 4.0, -8]], fov: [24, 21] }];
export const S13Photo: React.FC = () => {
  const t = useTV();
  return (
    <Canvas filter="sepia(1) contrast(1.15) brightness(1.05)">
      <IndoorEnv fog="#d8cbb0" near={20} far={60} ambient={1.2} tint="#fff2d8" />
      <directionalLight position={[4, 10, 10]} intensity={1.1} />
      <Cam t={t} shots={photoShots} />
      <Classroom dusk={0} hour={9} minute={0} lights={1} />
      <Blocky t={t * 0.2} pose={{ x: 0, z: -8, yaw: 0, motion: "idle", face: "calm" }} look={AZIZ} />
    </Canvas>
  );
};

/* ===== 14. CALENDAR flips to tomorrow = today ===== */
const FLIP = 1.55; // local (voice 39.35)
const calShots: Shot[] = [
  { t: [0, 1.85], eye: [[2.5, 4.6, -33.5], [2.5, 4.6, -35.5]], at: [[2.5, 4.4, -40], [2.5, 4.4, -40]], fov: [34, 30] },
  { t: [1.85, 2.4], eye: [[-0.5, 3.4, -33.8], [-0.5, 3.4, -34.2]], at: [[-0.5, 3.2, -37.6], [-0.5, 3.2, -37.6]], fov: [36, 30], shake: 0.03 },
];
export const S13Calendar: React.FC = () => {
  const t = useTV();
  const flip = easeOut(clamp((t - FLIP) / 0.25, 0, 1));
  return (
    <Canvas>
      <IndoorEnv fog="#b8c4d4" near={25} far={90} ambient={1.0} tint="#d8e2f0" />
      <directionalLight position={[-10, 10, 5]} intensity={1.1} color="#eaf2ff" />
      <Cam t={t} shots={calShots} extraShake={t > FLIP && t < FLIP + 0.3 ? 0.04 : 0} />
      <Corridor t={t} lights={1} day endDoor="wall" />
      <Calendar p={[2.5, 4.4, -39.8]} flip={flip} from="16" to="17" />
      <Blocky t={t} pose={{ ...sittingFloor(t), face: "shock", headPitch: -0.1 }} look={AZIZ} />
    </Canvas>
  );
};

/* ===== 15. END: door 13 opens again, ghost in the doorway ===== */
const endShots: Shot[] = [{ t: [0, 5.2], eye: [[0, 4.2, -22], [0, 4.1, -28]], at: [[0, 4, -42], [0, 4, -42]], fov: [46, 40] }];
export const S13End: React.FC = () => {
  const t = useTV();
  const open = easeInOut(clamp((t - 0.3) / 2.5, 0, 1)) * 0.75;
  return (
    <Canvas>
      <IndoorEnv fog="#030305" near={8} far={50} ambient={0.25} />
      <Cam t={t} shots={endShots} />
      <Corridor t={t} lights={0.6} flickerAmt={0.3} red={1.2} open={open} />
      <Room13 t={t} lines={BOARD} reveal={[99, 99, 99]} />
      {t > 1.6 ? <Blocky t={t} pose={{ x: 0.2, z: -41.6, yaw: 0, motion: "idle", face: "blank" }} look={GHOST} /> : null}
    </Canvas>
  );
};
