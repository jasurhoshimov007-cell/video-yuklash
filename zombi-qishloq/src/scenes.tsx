import { ThreeCanvas } from "@remotion/three";
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, easeInOut, easeOut, keys, rand } from "./anim";
import { Blocky, CHOPON, JASUR, Look, MADINA, Motion, zombieLook } from "./three/Blocky";
import { Cam, Shot } from "./three/Cam";
import {
  B,
  Bridge,
  Field,
  FruitTree,
  Ground,
  GroundGap,
  GreenFog,
  House,
  LampPost,
  Moon,
  MudWall,
  NightEnv,
  Poplar,
  River,
  Sheep,
  Village,
} from "./three/Props";

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

type Z = {
  i: number;
  x: number;
  z: number;
  vx?: number;
  vz?: number;
  yaw?: number;
  motion?: Motion;
  aL?: number;
  aR?: number;
};

const Horde: React.FC<{ t: number; list: Z[] }> = ({ t, list }) => (
  <>
    {list.map((z) => {
      const vx = z.vx ?? 0;
      const vz = z.vz ?? 0;
      const moving = Math.abs(vx) + Math.abs(vz) > 0.01;
      return (
        <Blocky
          key={z.i}
          t={t}
          pose={{
            x: z.x + vx * t,
            z: z.z + vz * t,
            yaw: z.yaw ?? (moving ? Math.atan2(vx, vz) : 0),
            motion: z.motion ?? "shamble",
            phase: z.i * 0.77,
            aL: z.aL,
            aR: z.aR,
          }}
          look={zombieLook(z.i)}
        />
      );
    })}
  </>
);

const MOON: [number, number, number] = [-30, 48, -150];

/* ---------------- 1. HOOK: horde marching at camera ---------------- */
const hookHorde: Z[] = Array.from({ length: 16 }).map((_, i) => ({
  i: i + 1,
  x: i === 0 ? 0 : (rand(i) - 0.5) * 8.5,
  z: i === 0 ? -1 : -4 - i * 2.1 - rand(i + 4) * 2,
  vz: i === 0 ? 1.4 : 1.2 + rand(i + 8) * 0.5,
}));
const hookShots: Shot[] = [
  { t: [0, 1.6], eye: [[0, 1.2, 15], [0, 1.0, 10.5]], at: [[0, 4.5, -10], [0, 4.2, -10]], fov: [62, 52], roll: 0.08, shake: 0.05 },
  { t: [1.6, 2.4], eye: [[0.3, 4.9, 12.2], [0.2, 4.8, 11.6]], at: [[0, 4.4, 2.2], [0, 4.4, 3.4]], fov: [34, 27], shake: 0.06, linear: true },
  { t: [2.4, 3.3], eye: [[16, 18, 24], [13, 15, 20]], at: [[0, 2, -8], [0, 2, -8]], fov: [50, 48] },
];
export const SceneHook: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <NightEnv />
      <Cam t={t} shots={hookShots} />
      <Moon p={MOON} size={13} />
      <Ground />
      <Village t={t} length={6} />
      <Horde t={t} list={hookHorde} />
    </Canvas>
  );
};

/* ---------------- 2. ROOF: Jasur + girl, zombies below ---------------- */
const roofHorde: Z[] = Array.from({ length: 10 }).map((_, i) => ({
  i: i + 30,
  x: (rand(i + 50) - 0.5) * 11,
  z: 3.5 + rand(i + 60) * 7,
  yaw: Math.PI + (rand(i + 70) - 0.5) * 0.6,
  motion: "shamble" as Motion,
  aL: -2.5 + rand(i) * 0.3,
  aR: -2.7 + rand(i + 1) * 0.3,
}));
const roofShots: Shot[] = [
  { t: [0, 1.8], eye: [[11, 3, 27], [6, 3.5, 23]], at: [[0, 8.5, -2], [0, 9, -2]], fov: [50, 48] },
  { t: [1.8, 3.7], eye: [[0, 11.2, 18], [0, 11, 15.5]], at: [[0, 9.8, -2], [0, 9.8, -2]], fov: [44, 40] },
];
export const SceneRoof: React.FC = () => {
  const t = useT();
  const look = keys(t, [[0, 0.9], [1.0, 0.9], [1.6, -0.5], [2.4, -0.5], [2.9, 0.2]])[0];
  return (
    <Canvas>
      <NightEnv />
      <Cam t={t} shots={roofShots} />
      <Moon p={[10, 40, -120]} size={14} />
      <Ground />
      <House p={[0, 0, -2]} wall="#b0926a" />
      <House p={[-16, 0, -6]} ry={0.3} />
      <House p={[17, 0, -8]} ry={-0.3} wall="#a88a64" />
      <Poplar p={[-8, 0, -12]} h={14} />
      <Poplar p={[9, 0, -14]} h={13} />
      <LampPost p={[7, 0, 4]} t={t} seed={4} />
      <Blocky t={t} pose={{ x: -1.5, y: 6.6, z: -2, yaw: 0.15, headYaw: look, face: "brave", motion: "idle", phase: 0 }} look={JASUR} />
      <Blocky t={t} pose={{ x: 1.5, y: 6.6, z: -2, yaw: -0.15, headYaw: -look * 0.8, face: "scared", motion: "idle", phase: 2, aL: -0.4, aLz: 0.5 }} look={MADINA} />
      <Horde t={t} list={roofHorde} />
    </Canvas>
  );
};

/* ---------------- 3. FIELD: green fog, shepherd walks in ---------------- */
const fieldShots: Shot[] = [
  { t: [0, 1.7], eye: [[3, 9, 21], [2, 7.5, 16]], at: [[0, 2, -12], [0, 2, -12]], fov: [52, 50] },
  { t: [1.7, 3.3], eye: [[3, 5, 17], [2.4, 4.6, 13]], at: [[0, 3, -20], [0, 3, -22]], fov: [50, 46] },
];
export const SceneField: React.FC = () => {
  const t = useT();
  const sz = 5 - 1.6 * t;
  return (
    <Canvas>
      <NightEnv fog="#16283a" near={16} far={90} ambient={1.1} />
      <Cam t={t} shots={fieldShots} />
      <Moon p={MOON} size={12} />
      <Ground c="#26301c" road={false} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -20]}>
        <planeGeometry args={[4, 120]} />
        <meshLambertMaterial color="#4a3c2c" />
      </mesh>
      <Field p={[10, 0, -14]} />
      <Field p={[-22, 0, -14]} rows={5} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Poplar key={i} p={[-6, 0, 10 - i * 9]} h={12 + rand(i) * 3} />
      ))}
      <GreenFog t={t} center={[0, 0, -42]} spread={36} strength={0.7 + t * 0.25} />
      <Blocky t={t} pose={{ x: 0, z: sz, yaw: Math.PI, motion: "walk", phase: 0.3 }} look={CHOPON} />
      {[0, 1, 2, 3].map((i) => (
        <Sheep key={i} t={t} seed={i} p={[(i - 1.5) * 2.2, 0, sz - 3 - rand(i) * 4]} ry={Math.PI} />
      ))}
    </Canvas>
  );
};

/* ---------------- 4. SHEPHERD returns as zombie ---------------- */
const shepShots: Shot[] = [
  { t: [0, 2.0], eye: [[0, 3.5, 10], [0, 3.6, 8]], at: [[0, 3.5, -6], [0, 3.8, -6]], fov: [44, 42] },
  { t: [2.0, 3.8], eye: [[0, 4.9, 8], [0, 4.75, 5.8]], at: [[0, 4.4, -3], [0, 4.4, -3]], fov: [32, 26], shake: 0.03 },
];
const ZCHOPON: Look = { ...CHOPON, skin: "#8fae78", zombie: true };
export const SceneShepherd: React.FC = () => {
  const t = useT();
  const z = keys(t, [[0, -8], [2.0, -3]])[0];
  const pitch = t < 2.5 ? 0.55 : 0.55 - clamp((t - 2.5) / 0.15, 0, 1) * 0.65;
  const extra = t > 2.5 && t < 3.0 ? 0.08 : 0;
  return (
    <Canvas>
      <NightEnv fog="#15301f" near={12} far={75} tint="#6f9a7a" ambient={1.0} />
      <Cam t={t} shots={shepShots} extraShake={extra} />
      <Moon p={MOON} size={12} />
      <Ground c="#26301c" road={false} />
      <Field p={[10, 0, -14]} />
      <GreenFog t={t + 3} center={[0, 0, -14]} spread={30} strength={1.3} />
      <Blocky
        t={t}
        pose={{
          x: 0,
          z,
          yaw: 0,
          motion: t < 2 ? "shamble" : "idle",
          aL: -1.4,
          aR: -1.5,
          headPitch: pitch,
          headRoll: 0.15,
          lean: 0.08,
          phase: 1,
        }}
        look={ZCHOPON}
      />
      {[0, 1, 2].map((i) => (
        <Sheep key={i} t={t * 3} seed={i} p={[i === 1 ? -3.5 : 3.5 + i, 0, -6 + t * 9 - i * 2]} ry={0} />
      ))}
    </Canvas>
  );
};

/* ---------------- 5. VILLAGE overrun (CCTV, tracking, close-up) ---------------- */
const villageHorde: Z[] = Array.from({ length: 20 }).map((_, i) => {
  const near = i % 3 === 0;
  return {
    i: i + 60,
    x: near ? 3 + rand(i) * 1.5 : (rand(i + 3) - 0.5) * 8,
    z: near ? -6 - rand(i + 9) * 20 : -9 - rand(i + 5) * 34,
    vx: (rand(i + 11) - 0.5) * 0.8,
    vz: (rand(i + 13) - 0.3) * 1.6,
  };
});
const ZWOMAN: Look = { ...zombieLook(5), hat: "scarf", hatCol: "#7a3a5a", hairStyle: "none", shirt: "#5a3a6a", robe: undefined };
const villageShots: Shot[] = [
  { t: [0, 1.6], eye: [[10, 13, 16], [10, 13, 16]], at: [[0, 0, -4], [0, 0, -4]], fov: [68, 68] },
  { t: [1.6, 3.2], eye: [[-4.2, 2.4, 9], [-4.2, 2.4, -2]], at: [[4, 3.8, 1], [4, 3.8, -10]], fov: [58, 58], linear: true },
  { t: [3.2, 5.0], eye: [[1.5, 4.9, 7.5], [1.5, 4.75, 5.6]], at: [[1.5, 4.4, -3], [1.5, 4.4, -3]], fov: [32, 26] },
];
export const SceneVillage: React.FC = () => {
  const t = useT();
  const hy = t < 3.6 ? 1.3 : 1.3 - clamp((t - 3.6) / 0.18, 0, 1) * 1.3;
  return (
    <Canvas>
      <NightEnv fog="#0b1426" />
      <Cam t={t} shots={villageShots} />
      <Moon p={MOON} size={13} />
      <Ground />
      <Village t={t} length={5} lit={false} />
      <Horde t={t} list={villageHorde} />
      <Blocky t={t} pose={{ x: 1.5, z: -3, yaw: 0, motion: "idle", aL: -1.4, aR: -1.5, headYaw: hy, lean: 0.08, phase: 4 }} look={ZWOMAN} />
    </Canvas>
  );
};

/* ---------------- 6/7a. ROOM: window + knocking door ---------------- */
const Room: React.FC<{ doorOpen: number; knock: number }> = ({ doorOpen, knock }) => (
  <group>
    {/* floor + ceiling */}
    <B p={[0, -0.05, 5]} s={[12, 0.1, 10]} c="#5a4632" />
    <B p={[0, 8.05, 5]} s={[12, 0.1, 10]} c="#3a2e24" />
    {/* front wall with window (opening x -1.5..1.5, y 3.2..6) */}
    <B p={[-3.75, 4, 0]} s={[4.5, 8, 0.4]} c="#8a7458" />
    <B p={[3.75, 4, 0]} s={[4.5, 8, 0.4]} c="#8a7458" />
    <B p={[0, 1.6, 0]} s={[3, 3.2, 0.4]} c="#8a7458" />
    <B p={[0, 7, 0]} s={[3, 2, 0.4]} c="#8a7458" />
    <B p={[0, 3.25, 0.1]} s={[3.2, 0.2, 0.6]} c="#3a2a1a" />
    {/* back + right wall */}
    <B p={[0, 4, 10]} s={[12, 8, 0.4]} c="#7e6a50" />
    <B p={[6, 4, 5]} s={[0.4, 8, 10]} c="#7e6a50" />
    {/* left wall with door gap z 3.3..5.7, y<6 */}
    <B p={[-6, 4, 1.65]} s={[0.4, 8, 3.3]} c="#7e6a50" />
    <B p={[-6, 4, 7.85]} s={[0.4, 8, 4.3]} c="#7e6a50" />
    <B p={[-6, 7, 4.5]} s={[0.4, 2, 2.4]} c="#7e6a50" />
    {/* door: hinge at z=3.3 */}
    <group position={[-5.9, 0, 3.3]} rotation={[0, doorOpen * 1.5 + knock * 0.03, 0]}>
      <B p={[0, 3, 1.2]} s={[0.18, 6, 2.4]} c="#5b3a1f" />
      <B p={[0.15, 2.6, 2.1]} s={[0.12, 0.2, 0.2]} c="#c9a24a" />
    </group>
    {/* furniture: sandal-like low table, carpet, chest */}
    <B p={[1, 0.02, 6]} s={[6, 0.04, 4]} c="#8a2a2a" />
    <B p={[1, 0.06, 6]} s={[5, 0.03, 3]} c="#c79a3a" />
    <B p={[4.5, 0.8, 8.8]} s={[2.4, 1.6, 1.4]} c="#6b4a2a" />
    <B p={[4.5, 1.8, 8.8]} s={[0.4, 0.5, 0.4]} c="#ffcf6a" glow />
    <pointLight position={[4.5, 2.6, 7.5]} color="#ffb350" intensity={45} distance={16} decay={1.3} />
    <pointLight position={[0, 5.5, 1.2]} color="#8aa6ff" intensity={45} distance={14} decay={1.3} />
    <pointLight position={[-3, 6, 6]} color="#6f7fb0" intensity={25} distance={14} decay={1.3} />
  </group>
);
const outsideHorde: Z[] = Array.from({ length: 9 }).map((_, i) => ({
  i: i + 90,
  x: (rand(i + 1) - 0.5) * 16,
  z: -9 - rand(i + 2) * 12,
  vx: (rand(i + 3) - 0.5) * 1.2,
  vz: 0.3,
}));
const windowShots: Shot[] = [
  { t: [0, 1.2], eye: [[0.9, 6.6, 7.2], [0.7, 6.4, 6]], at: [[0, 3.6, -14], [0, 3.6, -14]], fov: [50, 46] },
  { t: [1.2, 2.5], eye: [[0, 4.9, -7.5], [0, 4.85, -6]], at: [[0, 4.5, 2], [0, 4.5, 2]], fov: [36, 32] },
  { t: [2.5, 3.95], eye: [[3.6, 5.2, 8.2], [3, 5.1, 7]], at: [[-6, 3.4, 4.3], [-6, 3.4, 4.3]], fov: [50, 46] },
];
const KNOCKS = [2.9, 3.25, 3.6];
const knockAt = (t: number) =>
  KNOCKS.reduce((a, k) => a + (t >= k && t < k + 0.15 ? Math.sin((t - k) * 60) : 0), 0);
const OutsideStreet: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Ground />
    <House p={[-10, 0, -28]} />
    <House p={[6, 0, -30]} wall="#a88a64" />
    <Poplar p={[16, 0, -24]} h={13} />
    <LampPost p={[-3, 0, -14]} t={t} seed={7} />
    <Horde t={t} list={outsideHorde} />
  </>
);
export const SceneWindow: React.FC = () => {
  const t = useT();
  const yaw = keys(t, [[0, Math.PI], [2.9, Math.PI], [3.3, Math.PI * 1.5]])[0];
  const knock = knockAt(t);
  const kShake = KNOCKS.some((k) => t >= k && t < k + 0.18) ? 0.07 : 0;
  return (
    <Canvas>
      <NightEnv fog="#0b1426" ambient={0.8} moon={0.9} />
      <Cam t={t} shots={windowShots} extraShake={kShake} />
      <Moon p={MOON} size={12} />
      <OutsideStreet t={t} />
      <Room doorOpen={0} knock={knock} />
      <Blocky t={t} pose={{ x: 0, z: 2.2, yaw, motion: "idle", face: t < 2.9 ? "scared" : "shock", phase: 1.3 }} look={JASUR} />
    </Canvas>
  );
};

const doorShots: Shot[] = [
  { t: [0, 1.8], eye: [[4.5, 4.7, 4.6], [3, 4.7, 4.5]], at: [[-8, 4.0, 4.5], [-8, 4.0, 4.5]], fov: [36, 30] },
];
export const SceneDoor: React.FC = () => {
  const t = useT();
  const open = easeOut(clamp((t - 0.15) / 0.5, 0, 1));
  return (
    <Canvas>
      <NightEnv fog="#0b1426" ambient={0.8} moon={0.9} />
      <Cam t={t} shots={doorShots} />
      <Ground />
      <Room doorOpen={-open} knock={0} />
      <Blocky t={t} pose={{ x: -8.2, z: 4.5, yaw: Math.PI / 2, motion: "idle", face: "scared", phase: 2, aL: -0.6, aR: -0.6 }} look={MADINA} />
      <Horde t={t} list={[{ i: 120, x: -16, z: 10, vx: 0.8, vz: -0.2 }, { i: 121, x: -19, z: 0, vx: 0.9 }]} />
      <Poplar p={[-14, 0, -2]} h={13} />
      <pointLight position={[-9, 6, 7]} color="#9fb4ff" intensity={40} distance={14} decay={1.3} />
    </Canvas>
  );
};

/* ---------------- 7b. ESCAPE: running at camera, horde behind ---------------- */
const SPEED = 6;
const escapeHorde: Z[] = Array.from({ length: 12 }).map((_, i) => ({
  i: i + 140,
  x: (rand(i + 7) - 0.5) * 8,
  z: -19 - i * 1.6 - rand(i) * 2,
  vz: SPEED * 0.95,
  motion: "zrun" as Motion,
}));
const escapeShots: Shot[] = [
  { t: [0, 2.4], eye: [[0, 4.4, 1.5], [0, 4.4, 1.5 + SPEED * 2.4]], at: [[0, 3.4, -14], [0, 3.4, -14 + SPEED * 2.4]], fov: [52, 50], linear: true, shake: 0.06 },
];
export const SceneEscape: React.FC = () => {
  const t = useT();
  const z = -10 + SPEED * t;
  return (
    <Canvas>
      <NightEnv />
      <Cam t={t} shots={escapeShots} />
      <Moon p={MOON} size={12} />
      <Ground />
      <Village t={t} length={4} />
      <Blocky t={t} pose={{ x: -1.4, z, yaw: 0, motion: "run", face: "brave", phase: 0 }} look={JASUR} />
      <Blocky t={t} pose={{ x: 1.4, z: z - 0.6, yaw: 0, motion: "run", face: "scared", phase: 0.25 }} look={MADINA} />
      <Horde t={t} list={escapeHorde} />
    </Canvas>
  );
};

/* ---------------- 8. CHASE toward the bridge ---------------- */
const RIVER_Z = 60;
const BRIDGE_Z0 = 48;
const RoadSide: React.FC<{ t: number }> = ({ t }) => (
  <>
    {Array.from({ length: 9 }).map((_, i) => (
      <React.Fragment key={i}>
        <Poplar p={[-7, 0, 44 - i * 6]} h={12 + rand(i) * 4} />
        <Poplar p={[7, 0, 41 - i * 6]} h={12 + rand(i + 20) * 4} />
      </React.Fragment>
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <React.Fragment key={`r${i}`}>
        <Poplar p={[-7, 0, 80 + i * 6]} h={12 + rand(i + 40) * 4} />
        <Poplar p={[7, 0, 77 + i * 6]} h={12 + rand(i + 60) * 4} />
      </React.Fragment>
    ))}
    <MudWall p={[-10, 0, 20]} len={30} ry={Math.PI / 2} />
    <House p={[16, 0, 14]} ry={-Math.PI / 2} />
    <FruitTree p={[12, 0, 30]} />
    <LampPost p={[5, 0, 30]} t={t} seed={3} />
    <River p={[0, 0, RIVER_Z]} t={t} />
  </>
);
const chaseHorde: Z[] = Array.from({ length: 12 }).map((_, i) => ({
  i: i + 170,
  x: (rand(i + 17) - 0.5) * 7,
  z: 18 - 6 - i * 1.7 - rand(i + 2) * 1.5,
  vz: SPEED,
  motion: "zrun" as Motion,
}));
const chaseShots: Shot[] = [
  { t: [0, 2.4], eye: [[5, 3.4, 27], [5, 3.4, 27 + SPEED * 2.4]], at: [[-1, 3, 16], [-1, 3, 16 + SPEED * 2.4]], fov: [52, 52], linear: true, shake: 0.05 },
  { t: [2.4, 4.3], eye: [[0, 11, 18.4], [0, 11, 29.8]], at: [[0, 2, 60], [0, 2, 62]], fov: [52, 50], linear: true, shake: 0.04 },
];
export const SceneChase: React.FC = () => {
  const t = useT();
  const z = 18 + SPEED * t;
  return (
    <Canvas>
      <NightEnv />
      <Cam t={t} shots={chaseShots} />
      <Moon p={[0, 50, 220]} size={16} />
      <GroundGap z0={RIVER_Z - 10} z1={RIVER_Z + 10} />
      <RoadSide t={t} />
      <Bridge p={[0, 0, BRIDGE_Z0]} />
      <Blocky t={t} pose={{ x: -1.3, z, yaw: 0, motion: "run", face: "brave", phase: 0 }} look={JASUR} />
      <Blocky t={t} pose={{ x: 1.3, z: z - 0.8, yaw: 0, motion: "run", face: "scared", phase: 0.3 }} look={MADINA} />
      <Horde t={t} list={chaseHorde} />
    </Canvas>
  );
};

/* ---------------- 9. BRIDGE collapse ---------------- */
const CUT_T = 1.35;
const cutAt = (t: number) => easeInOut(clamp((t - CUT_T) / 1.2, 0, 1));
const DETACH = 0.6;
const detachT = (() => {
  for (let x = CUT_T; x < CUT_T + 1; x += 0.005) if (cutAt(x) * 1.45 >= DETACH) return x;
  return CUT_T + 0.3;
})();
const bridgeZombies = Array.from({ length: 8 }).map((_, i) => ({
  i: i + 200,
  d0: 4 + i * 2.4 + rand(i) * 1.2,
  x: (rand(i + 3) - 0.5) * 2.6,
}));
const zombieOnBridge = (t: number, z: { d0: number }) => {
  const d = Math.min(z.d0 + 4 * Math.min(t, CUT_T + 0.15), 23);
  const th = cutAt(t) * 1.45;
  if (th < DETACH) {
    return { y: 0.2 - d * Math.sin(th), zz: BRIDGE_Z0 + d * Math.cos(th), fall: th, falling: false, hit: -1 };
  }
  const y0 = 0.2 - d * Math.sin(DETACH);
  const z0 = BRIDGE_Z0 + d * Math.cos(DETACH);
  const dt = t - detachT;
  const y = y0 - 0.5 * 14 * dt * dt;
  const hit = detachT + Math.sqrt((2 * (y0 + 1.5)) / 14);
  return { y: Math.max(y, -9), zz: z0 - dt * 1.5, fall: DETACH + dt * 3, falling: true, hit };
};
const Splash: React.FC<{ t: number; at: number; x: number; z: number }> = ({ t, at, x, z }) => {
  const k = t - at;
  if (k < 0 || k > 0.9) return null;
  return (
    <group position={[x, -1.5, z]}>
      {Array.from({ length: 10 }).map((_, j) => {
        const a = (j / 10) * Math.PI * 2;
        const r = 0.5 + k * 4;
        const h = Math.max(0, 3.2 * k - 4 * k * k) * (1 + rand(j) * 0.8);
        return <B key={j} p={[Math.cos(a) * r, h, Math.sin(a) * r]} s={[0.5, 0.5, 0.5]} c="#d8ecff" glow opacity={1 - k} />;
      })}
    </group>
  );
};
const bridgeShots: Shot[] = [
  { t: [0, 1.25], eye: [[2.5, 7, 92], [1.8, 6.5, 88.5]], at: [[-1, 2.5, 64], [-1, 2.5, 64]], fov: [46, 42] },
  { t: [1.25, 3.15], eye: [[0.5, 13, 90], [0.5, 11.5, 86]], at: [[0, -1, 58], [0, -1.5, 58]], fov: [50, 48] },
];
export const SceneBridge: React.FC = () => {
  const t = useT();
  const cut = cutAt(t);
  const chop = t < CUT_T ? -2.3 + Math.max(0, Math.sin(t * 9)) * 1.6 : -0.6;
  const sh = t > CUT_T && t < CUT_T + 0.9 ? 0.18 : 0;
  return (
    <Canvas>
      <NightEnv />
      <Cam t={t} shots={bridgeShots} extraShake={sh} />
      <Moon p={MOON} size={14} />
      <GroundGap z0={RIVER_Z - 10} z1={RIVER_Z + 10} />
      <RoadSide t={t} />
      <Bridge p={[0, 0, BRIDGE_Z0]} cut={cut} />
      {bridgeZombies.map((z) => {
        const s = zombieOnBridge(t, z);
        return (
          <React.Fragment key={z.i}>
            <Blocky t={t} pose={{ x: z.x, y: s.y, z: s.zz, yaw: 0, motion: s.falling ? "idle" : "zrun", fall: s.fall, aL: s.falling ? -2.8 : undefined, aR: s.falling ? -2.9 : undefined, phase: z.i }} look={zombieLook(z.i)} />
            {s.hit > 0 ? <Splash t={t} at={s.hit} x={z.x} z={s.zz + (s.hit - detachT) * 0} /> : null}
          </React.Fragment>
        );
      })}
      <Blocky t={t} pose={{ x: -2.6, z: 73.6, yaw: Math.PI, motion: "idle", face: "brave", aR: chop, item: "sickle", phase: 0 }} look={JASUR} />
      <Blocky t={t} pose={{ x: 4.8, z: 75.5, yaw: Math.PI - 0.3, motion: "idle", face: t < CUT_T + 0.8 ? "scared" : "shock", aR: -1.4, phase: 1 }} look={MADINA} />
    </Canvas>
  );
};

/* ---------------- 10. ENDING: twist ---------------- */
const endShots: Shot[] = [
  { t: [0, 1.45], eye: [[0, 5.2, 93], [0, 5.1, 90]], at: [[0, 4.2, 79], [0, 4.2, 79]], fov: [40, 38] },
  { t: [1.45, 3.8], eye: [[1.5, 4.9, 89], [1.5, 4.75, 87]], at: [[1.5, 4.4, 80], [1.5, 4.4, 80]], fov: [30, 25], shake: 0.015 },
  { t: [3.8, 8.85], eye: [[0, 5.5, 90], [0, 7.5, 99]], at: [[0, 4.2, 80], [0, 4.4, 80]], fov: [38, 40] },
];
export const SceneEnding: React.FC = () => {
  const t = useT();
  const flicker = t > 2.6 && t < 2.8 ? (Math.sin(t * 90) > 0 ? 1 : 0) : 0;
  const glow = Math.max(flicker, clamp((t - 3.2) / 0.25, 0, 1));
  const jasurHead = keys(t, [[0, 0.3], [3.8, 0.3], [4.5, 2.6]])[0];
  return (
    <Canvas>
      <NightEnv />
      <Cam t={t} shots={endShots} />
      <Moon p={MOON} size={14} />
      <GroundGap z0={RIVER_Z - 10} z1={RIVER_Z + 10} />
      <RoadSide t={t} />
      <Bridge p={[0, 0, BRIDGE_Z0]} cut={1} />
      <Blocky t={t} pose={{ x: -1.6, z: 80, yaw: 0.1, motion: "idle", face: "calm", headYaw: jasurHead * 0.4, phase: 0 }} look={JASUR} />
      <Blocky t={t} pose={{ x: 1.5, z: 80, yaw: -0.05, motion: "idle", face: t > 3.2 ? "calm" : "scared", eyeGlow: glow, aL: 0.7, headPitch: t > 3.2 ? -0.05 : 0.1, phase: 2 }} look={MADINA} />
    </Canvas>
  );
};
