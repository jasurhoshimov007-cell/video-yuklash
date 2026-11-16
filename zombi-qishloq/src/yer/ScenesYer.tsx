import { ThreeCanvas } from "@remotion/three";
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, easeOut, rand } from "../anim";
import { Blocky } from "../three/Blocky";
import { Cam, Shot } from "../three/Cam";
import { B } from "../three/Props";
import { LAUNCH_T, SCENES, STOP_T } from "./data";
import { Bench, Car, DayEnv, Grass, HERO, Home, person, Planet, Space, Tree } from "./PropsYer";

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

const HOMES = [
  { x: -34, wall: "#f2d9a8", roof: "#c0503a" },
  { x: -20, wall: "#cfe3f0", roof: "#3a6ab0" },
  { x: -6, wall: "#f4e4c8", roof: "#7a4a2a" },
  { x: 8, wall: "#e8c0c0", roof: "#a03a4a" },
  { x: 22, wall: "#d8e8c8", roof: "#4a7a3a" },
  { x: 36, wall: "#f0e0a0", roof: "#c08030" },
];

/* ===== 1. EARTH spinning (hook) ===== */
const earthShots: Shot[] = [{ t: [0, 3], eye: [[0, 5, 44], [0, 2, 31]], at: [[0, 0, 0], [0, 0, 0]], fov: [40, 38] }];
export const YEarth: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Space />
      <Cam t={t} shots={earthShots} />
      <Planet rot={t * 1.1} />
    </Canvas>
  );
};

/* ===== street where everything flies east ===== */
type Flyer = { kind: "p" | "c" | "h"; i: number; x: number; z: number; tl: number };
const flyX = (kind: Flyer["kind"], dt: number) =>
  kind === "h" ? 20 * dt + 6 * dt * dt : kind === "c" ? 34 * dt + 10 * dt * dt : 40 * dt + 12 * dt * dt;
const flyY = (kind: Flyer["kind"], dt: number) => (kind === "h" ? 3 * dt : kind === "c" ? 5 * dt - 1.2 * dt * dt : 7 * dt - 2 * dt * dt);

const Street: React.FC<{ t: number; launch: [number, number, number]; shake?: boolean }> = ({ t, launch }) => {
  const flyers: Flyer[] = [
    ...[-14, -9, -3, 3, 9, 14].map((x, k) => ({ kind: "p" as const, i: k + 1, x, z: 2 + rand(k) * 4, tl: launch[0] + k * 0.08 })),
    ...[-11, 1, 12].map((x, k) => ({ kind: "c" as const, i: k + 20, x, z: k % 2 ? 2.6 : 5.6, tl: launch[1] + k * 0.12 })),
    ...HOMES.map((h, k) => ({ kind: "h" as const, i: k, x: h.x, z: -9, tl: launch[2] + k * 0.1 })),
  ];
  const debris = t > launch[0];
  return (
    <>
      <Grass />
      {flyers.map((f) => {
        const dt = Math.max(0, t - f.tl);
        const x = f.x + flyX(f.kind, dt);
        const y = flyY(f.kind, dt);
        const spin = -dt * (f.kind === "h" ? 1.2 : 4 + rand(f.i) * 4);
        if (f.kind === "p")
          return (
            <group key={`p${f.i}`} position={[x - f.x, y, 0]} rotation={[0, 0, 0]}>
              <group position={[f.x, 0, f.z]} rotation={[0, 0, spin]}>
                <Blocky t={t} pose={{ x: 0, z: 0, yaw: dt > 0 ? 0 : (f.i % 2 ? 0.6 : -0.6), motion: dt > 0 ? "idle" : "walk", face: dt > 0 ? "shock" : "calm", aL: dt > 0 ? -2.8 : undefined, aR: dt > 0 ? -2.6 : undefined, phase: f.i }} look={person(f.i)} />
              </group>
            </group>
          );
        if (f.kind === "c")
          return (
            <group key={`c${f.i}`} position={[x, y, f.z]} rotation={[0, 0, spin * 0.6]}>
              <Car p={[0, 0, 0]} color={["#e23f3f", "#2f6fe0", "#f0b020"][f.i % 3]} />
            </group>
          );
        const hh = HOMES[f.i];
        return (
          <group key={`h${f.i}`} position={[x, y, f.z]} rotation={[0, 0, spin]}>
            <Home p={[0, 0, 0]} wall={hh.wall} roof={hh.roof} />
          </group>
        );
      })}
      {HOMES.map((h, k) => (
        <Tree key={k} p={[h.x + 7, 0, -2]} bend={debris ? clamp((t - launch[0]) * 2, 0, 0.7) : 0} />
      ))}
      {debris
        ? Array.from({ length: 40 }).map((_, i) => {
            const sp = 50 + rand(i) * 40;
            const x = (((t - launch[0]) * sp + rand(i + 3) * 200) % 160) - 70;
            return <B key={i} p={[x, 0.5 + rand(i + 5) * 10, -14 + rand(i + 9) * 24]} s={[0.5 + rand(i) * 0.8, 0.4, 0.5]} c={rand(i + 2) > 0.5 ? "#8a7a6a" : "#5a4a3a"} r={[t * 7 + i, t * 5, i]} />;
          })
        : null}
    </>
  );
};

/* ===== 2. CHAOS preview (hook) ===== */
const chaosShots: Shot[] = [{ t: [0, 2.3], eye: [[-4, 7, 27], [-1, 6.4, 24]], at: [[2, 3, 0], [4, 3, 0]], fov: [56, 54], shake: 0.12 }];
export const YChaos: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <DayEnv sky="#e8a080" fog={[30, 120]} />
      <Cam t={t} shots={chaosShots} />
      <Street t={t} launch={[0.05, 0.25, 0.5]} />
    </Canvas>
  );
};

/* ===== 3. SPEED: equator, 1670 km/h ===== */
const speedShots: Shot[] = [{ t: [0, 4.7], eye: [[0, 3, 30], [-7, 1, 24]], at: [[0, 0, 0], [0, 0, 0]], fov: [42, 46] }];
export const YSpeed: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Space />
      <Cam t={t} shots={speedShots} />
      <Planet rot={1.2 + t * 0.8} equator={clamp(t / 0.6, 0, 1)} />
    </Canvas>
  );
};

/* ===== park bench with tea ===== */
const Park: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Grass c="#6cbf52" />
    {HOMES.map((h) => (
      <Home key={h.x} p={[h.x, 0, -14]} wall={h.wall} roof={h.roof} />
    ))}
    {[-16, -7, 9, 18].map((x) => (
      <Tree key={x} p={[x, 0, -4]} />
    ))}
    <Car p={[-12, 0, 5]} color="#2f6fe0" />
    <Bench p={[0, 0, -0.4]} />
    {[0, 1].map((k) => (
      <Blocky key={k} t={t} pose={{ x: -14 + k * 22 + t * 1.6 * (k ? -1 : 1), z: 3 + k * 1.5, yaw: k ? -Math.PI / 2 : Math.PI / 2, motion: "walk", phase: k }} look={person(k + 40)} />
    ))}
  </>
);
const sipArm = (t: number) => -1.6 - Math.max(0, Math.sin(t * 1.4)) * 0.55;

const calmShots: Shot[] = [
  { t: [0, 2.2], eye: [[6, 5, 14], [4, 4.6, 12]], at: [[0, 3, 0], [0, 3, 0]], fov: [46, 44] },
  { t: [2.2, 4.3], eye: [[-6, 9, 26], [2, 9, 26]], at: [[-6, 2.5, 0], [2, 2.5, 0]], fov: [50, 50], linear: true },
];
export const YCalm: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <DayEnv />
      <Cam t={t} shots={calmShots} />
      <Park t={t} />
      <Blocky t={t} pose={{ x: 0, z: 0.1, y: -0.45, yaw: 0, motion: "idle", lL: -1.5, lR: -1.5, aL: -0.2, aR: sipArm(t), item: "cup", face: "calm" }} look={HERO} />
    </Canvas>
  );
};

/* ===== 4. STOP: the planet halts, he doesn't ===== */
const stopL = STOP_T - SCENES.stop[0];
const launchL = LAUNCH_T - SCENES.stop[0];
const stopShots: Shot[] = [
  { t: [0, launchL], eye: [[0, 4.6, 8.5], [0, 4.5, 7.2]], at: [[0, 3.6, 0], [0, 3.6, 0]], fov: [40, 38] },
  { t: [launchL, 2.8], eye: [[-5, 5, 17], [-4, 5, 16]], at: [[5, 3.5, 0], [8, 4, 0]], fov: [52, 50] },
];
export const YStop: React.FC = () => {
  const t = useT();
  const dt = Math.max(0, t - launchL);
  const flyx = 34 * dt + 30 * dt * dt;
  const flyy = 6 * dt;
  return (
    <Canvas>
      <DayEnv />
      <Cam t={t} shots={stopShots} extraShake={t > stopL && t < stopL + 0.6 ? 0.1 : 0} />
      <Park t={t > stopL ? stopL : t} />
      <group position={[flyx, flyy, 0]}>
        <group rotation={[0, 0, -dt * 6]} position={[0, dt > 0 ? 2.5 : 0, 0]}>
          <Blocky
            t={t}
            pose={{
              x: 0,
              z: 0.1,
              y: dt > 0 ? -2.5 : -0.45,
              yaw: 0,
              motion: "idle",
              lL: dt > 0 ? -0.6 : -1.5,
              lR: dt > 0 ? 0.4 : -1.5,
              aL: dt > 0 ? -2.9 : -0.2,
              aR: dt > 0 ? -2.6 : t > stopL ? -1.6 : sipArm(t),
              item: dt > 0 ? undefined : "cup",
              face: t > stopL ? "shock" : "calm",
            }}
            look={HERO}
          />
        </group>
      </group>
      {dt > 0 ? (
        <group position={[2 + 50 * dt, 3.5 + 4 * dt, 1]} rotation={[t * 9, t * 7, 0]}>
          <B p={[0, 0, 0]} s={[0.55, 0.6, 0.55]} c="#f4f1ea" />
        </group>
      ) : null}
    </Canvas>
  );
};

/* ===== 5. FLY: people, cars, houses ===== */
const flyShots: Shot[] = [{ t: [0, 3.8], eye: [[-6, 7.5, 30], [-2, 7, 27]], at: [[0, 4, 0], [6, 5, 0]], fov: [56, 56], shake: 0.1 }];
export const YFly: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <DayEnv />
      <Cam t={t} shots={flyShots} />
      <Street t={t} launch={[0.3, 1.05, 1.75]} />
    </Canvas>
  );
};

/* ===== 6. WAVE ===== */
const waveShots: Shot[] = [{ t: [0, 3.6], eye: [[0, 9, 34], [0, 10, 30]], at: [[0, 9, -30], [0, 12, -20]], fov: [58, 60], shake: 0.06 }];
export const YWave: React.FC = () => {
  const t = useT();
  const p = clamp(t / 3.4, 0, 1);
  const wz = -95 + easeOut(p) * 90;
  const wh = 12 + p * 24;
  return (
    <Canvas>
      <DayEnv sky="#9fb8d0" fog={[40, 200]} sun={1.4} />
      <Cam t={t} shots={waveShots} extraShake={p * 0.15} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 40]}>
        <planeGeometry args={[600, 100]} />
        <meshLambertMaterial color="#d8c08a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, -150]}>
        <planeGeometry args={[600, 300]} />
        <meshLambertMaterial color="#1f6fb8" />
      </mesh>
      {HOMES.map((h) => (
        <Home key={h.x} p={[h.x, 0, -2]} wall={h.wall} roof={h.roof} r={[0, Math.PI, 0]} />
      ))}
      {/* the wave wall */}
      <group position={[0, 0, wz]}>
        <B p={[0, wh / 2, 0]} s={[400, wh, 8]} c="#1a5fa8" />
        <B p={[0, wh * 0.7, 4.2]} s={[400, wh * 0.6, 0.6]} c="#2f86d0" />
        {Array.from({ length: 50 }).map((_, i) => (
          <B key={i} p={[-200 + i * 8, wh + 0.6 + Math.sin(t * 6 + i) * 0.6, 3 + rand(i) * 2]} s={[7, 1.6 + rand(i + 4) * 1.4, 3]} c="#f2f8ff" />
        ))}
      </group>
      {Array.from({ length: 7 }).map((_, k) => (
        <Blocky key={k} t={t} pose={{ x: -15 + k * 5, z: 4 + rand(k) * 4 + t * 3, yaw: 0, motion: "run", face: "shock", aL: -2.8, aR: -2.6, phase: k }} look={person(k + 60)} />
      ))}
    </Canvas>
  );
};

/* ===== 7. WIND storm ===== */
const windShots: Shot[] = [{ t: [0, 3.0], eye: [[-7, 6, 25], [-4, 6, 23]], at: [[2, 4, 0], [4, 4.5, 0]], fov: [54, 54], shake: 0.12 }];
export const YWind: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <DayEnv sky="#5d6672" fog={[20, 100]} sun={0.6} ambient={0.75} />
      <Cam t={t} shots={windShots} />
      <Grass c="#4a7a3a" />
      {HOMES.map((h, k) => {
        const off = k === 3 && t > 0.8;
        const dt = Math.max(0, t - 0.8);
        return (
          <group key={h.x}>
            <B p={[h.x, 3, -12]} s={[8, 6, 7]} c={h.wall} />
            <group position={off ? [h.x + 30 * dt, 7 + 6 * dt, -12] : [h.x, 7, -12]} rotation={[0, 0, off ? -dt * 3 : 0]}>
              <B p={[0, 0, 0]} s={[8.8, 1.2, 7.8]} c={h.roof} />
            </group>
          </group>
        );
      })}
      {[-24, -12, 0, 12, 24].map((x, i) => (
        <Tree key={x} p={[x, 0, -3]} bend={0.75 + Math.sin(t * 9 + i) * 0.12} />
      ))}
      {Array.from({ length: 50 }).map((_, i) => {
        const x = ((t * (60 + rand(i) * 40) + rand(i + 1) * 200) % 140) - 60;
        return <B key={i} p={[x, 0.5 + rand(i + 2) * 12, -16 + rand(i + 3) * 30]} s={[0.4 + rand(i) * 1.2, 0.3, 0.6]} c={rand(i + 4) > 0.5 ? "#6a5a4a" : "#3a6a2a"} r={[t * 8 + i, t * 6, i]} />;
      })}
      {Array.from({ length: 90 }).map((_, i) => {
        const x = ((t * 70 + rand(i + 7) * 200) % 120) - 55;
        const y = ((rand(i + 8) * 20 - t * 30) % 20 + 20) % 20;
        return <B key={`r${i}`} p={[x, y, -10 + rand(i + 9) * 28]} s={[3, 0.05, 0.05]} c="#cfd8e0" r={[0, 0, -0.35]} />;
      })}
    </Canvas>
  );
};

/* ===== 8. END: the stopped Earth ===== */
const endShots: Shot[] = [{ t: [0, 5.5], eye: [[8, 3, 30], [0, 6, 34]], at: [[0, 0, 0], [0, 0, 0]], fov: [42, 40] }];
export const YEnd: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <Space />
      <Cam t={t} shots={endShots} />
      <Planet rot={2.4} />
    </Canvas>
  );
};
