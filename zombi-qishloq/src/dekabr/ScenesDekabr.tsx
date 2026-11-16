import { ThreeCanvas } from "@remotion/three";
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, easeInOut, rand } from "../anim";
import { Blocky } from "../three/Blocky";
import { Cam, Shot } from "../three/Cam";
import { B } from "../three/Props";
import { DEC_OFF, HOOK_OFF, OUR_OFF, SCENES } from "./data";
import { BOY, Footprints, GRANNY, Lantern, Snow, SnowGround, Street, Suitcase, villager, WinterNight } from "./PropsDekabr";

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

/* ===== hook: aerial village, one light goes out ===== */
const hookShots: Shot[] = [{ t: [0, 4.3], eye: [[22, 24, 38], [15, 19, 31]], at: [[0, 2, -6], [0, 2, -6]], fov: [50, 48] }];
export const DHook: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <WinterNight />
      <Cam t={t} shots={hookShots} />
      <SnowGround />
      <Street t={t} offAt={HOOK_OFF} offIndex={3} />
      <Snow t={t} n={180} w={70} c={[0, 0, 0]} />
    </Canvas>
  );
};

/* ===== "hamma buni normal deydi" — smiling, waving neighbours (day) ===== */
const normalShots: Shot[] = [{ t: [0, 2.7], eye: [[0, 5, 10.5], [0, 4.8, 9.2]], at: [[0, 3.6, 0], [0, 3.6, 0]], fov: [46, 44] }];
export const DNormal: React.FC = () => {
  const t = useT();
  const wave = (k: number) => -2.7 + Math.sin(t * 9 + k) * 0.25;
  return (
    <Canvas>
      <WinterNight day />
      <Cam t={t} shots={normalShots} />
      <SnowGround />
      <Street t={t} offAt={-1} offIndex={-1} ourLit={0} />
      {[-3, 0.2, 3.4].map((x, k) => (
        <Blocky key={k} t={t} pose={{ x, z: 2 - (k % 2) * 1.2, yaw: (k - 1) * -0.2, motion: "idle", face: "happy", aR: wave(k), aRz: -0.3, phase: k }} look={villager(k + 1)} />
      ))}
      <Snow t={t} n={80} w={40} c={[0, 0, 4]} />
    </Canvas>
  );
};

/* ===== 1st December: a house goes dark ===== */
const decShots: Shot[] = [{ t: [0, 4.6], eye: [[-10, 5, 12], [-6, 4.8, 9]], at: [[8, 4, -10], [10, 4, -10]], fov: [48, 44] }];
export const DDec1: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <WinterNight />
      <Cam t={t} shots={decShots} />
      <SnowGround />
      <Street t={t} offAt={DEC_OFF - SCENES.dec1[0]} offIndex={4} />
      <Snow t={t} n={140} w={50} c={[0, 0, 0]} />
    </Canvas>
  );
};

/* ===== morning: empty house, footprints that just stop ===== */
const morningShots: Shot[] = [{ t: [0, 3.4], eye: [[3, 5, 10], [6, 4.2, 7]], at: [[10, 1.2, -6], [11, 1.5, -7]], fov: [46, 44] }];
export const DMorning: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <WinterNight day />
      <Cam t={t} shots={morningShots} />
      <SnowGround />
      <Street t={t} offAt={-1} offIndex={4} ourLit={0} northDoor={1} />
      <Footprints x={12} />
      <Snow t={t} n={60} w={30} c={[8, 0, 0]} />
    </Canvas>
  );
};

/* ===== I just moved in ===== */
const newShots: Shot[] = [{ t: [0, 2.5], eye: [[-5, 4.6, 10.2], [-2, 4.4, 9.6]], at: [[-7, 3, 2], [-4, 3, 2]], fov: [46, 44] }];
export const DNewcomer: React.FC = () => {
  const t = useT();
  const x = -14 + t * 4;
  return (
    <Canvas>
      <WinterNight day />
      <Cam t={t} shots={newShots} />
      <SnowGround />
      <Street t={t} offAt={-1} offIndex={-1} ourLit={0} />
      <Blocky t={t} pose={{ x, z: 3, yaw: Math.PI / 2, motion: "walk", face: "calm", aR: 0, headYaw: Math.sin(t * 1.2) * 0.4 }} look={BOY} />
      <Suitcase p={[x, 0.2 + Math.abs(Math.sin(t * 8)) * 0.1, 3 - 1.6]} />
      <Snow t={t} n={60} w={30} c={[-6, 0, 4]} />
    </Canvas>
  );
};

/* ===== the rule ===== */
const ruleShots: Shot[] = [
  { t: [0, 2.9], eye: [[0.3, 5.2, 13], [0.3, 4.9, 11]], at: [[0.3, 3.8, 4], [0.3, 3.8, 4]], fov: [46, 42] },
  { t: [2.9, 5.8], eye: [[-1.6, 4.9, 7.6], [-1.1, 4.8, 7.0]], at: [[2, 4.6, 4], [2, 4.6, 4]], fov: [36, 32] },
];
export const DRule: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <WinterNight ambient={0.95} />
      <Cam t={t} shots={ruleShots} />
      <SnowGround />
      <Street t={t} offAt={-1} offIndex={-1} />
      <Blocky t={t} pose={{ x: 2, z: 4, yaw: -1.2, motion: "idle", face: "brave", aR: t > 2.9 ? -3.0 : -0.3, aRz: -0.2, headPitch: -0.05 }} look={GRANNY} />
      <Lantern p={[2.6, 2.2, 4.8]} light />
      <Blocky t={t} pose={{ x: -1.6, z: 4.6, yaw: 1.3, motion: "idle", face: "calm", phase: 1 }} look={BOY} />
      <pointLight position={[0, 6, 8]} color="#9fb0e0" intensity={14} distance={14} decay={1.4} />
      <Snow t={t} n={80} w={30} c={[0, 0, 5]} />
    </Canvas>
  );
};

/* ===== "Men qaradim." — boy at the window, seen from outside ===== */
const windowShots: Shot[] = [{ t: [0, 1.6], eye: [[0, 4.7, -6.5], [0, 4.7, -4.8]], at: [[0, 4.5, 1], [0, 4.5, 1]], fov: [40, 34] }];
export const DWindow: React.FC = () => {
  const t = useT();
  const curtain = easeInOut(clamp((t - 0.1) / 0.5, 0, 1));
  return (
    <Canvas>
      <WinterNight />
      <Cam t={t} shots={windowShots} />
      <SnowGround />
      {/* wall with window x∈[-1.6,1.6], y∈[3.2,6] */}
      <B p={[-4.3, 3.5, 0]} s={[5.4, 7, 0.4]} c="#c9b08a" />
      <B p={[4.3, 3.5, 0]} s={[5.4, 7, 0.4]} c="#c9b08a" />
      <B p={[0, 1.6, 0]} s={[3.2, 3.2, 0.4]} c="#c9b08a" />
      <B p={[0, 6.5, 0]} s={[3.2, 1, 0.4]} c="#c9b08a" />
      <B p={[0, 7.2, -0.2]} s={[11.4, 0.5, 1.2]} c="#f4f7fc" />
      <B p={[0, 3.15, -0.3]} s={[3.6, 0.2, 0.5]} c="#3a2a1a" />
      {/* curtains slide aside */}
      <B p={[-0.8 - curtain * 0.7, 4.6, 0.4]} s={[1.6 - curtain * 0.8, 2.8, 0.1]} c="#8a2a3a" />
      <B p={[0.8 + curtain * 0.7, 4.6, 0.4]} s={[1.6 - curtain * 0.8, 2.8, 0.1]} c="#8a2a3a" />
      {/* room behind */}
      <B p={[0, 3.5, 5]} s={[8, 7, 0.3]} c="#a08060" />
      <pointLight position={[0, 5, 2.5]} color="#ffb860" intensity={30} distance={8} decay={1.4} />
      <Blocky t={t} pose={{ x: 0, z: 1.3, yaw: Math.PI, motion: "idle", face: t > 0.6 ? "shock" : "scared", aL: -1.6, aLz: 0.4 }} look={BOY} />
      <Snow t={t} n={70} w={14} c={[0, 0, -5]} />
    </Canvas>
  );
};

/* ===== the whole village, standing in the street, looking at our house ===== */
type V = { i: number; x: number; z: number; lantern: boolean; light: boolean };
const CROWD: V[] = (() => {
  const out: V[] = [];
  let i = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 7; col++) {
      out.push({
        i: i + 100,
        x: -12 + col * 3.6 + (row % 2) * 1.6 + (rand(i) - 0.5) * 0.6,
        z: 2.6 - row * 2.3 + (rand(i + 9) - 0.5) * 0.5,
        lantern: rand(i + 3) > 0.55,
        light: i === 3 || i === 9 || i === 16,
      });
      i++;
    }
  }
  return out;
})();
const Crowd: React.FC<{ t: number; tilt: number; facing?: number }> = ({ t, tilt, facing = 0 }) => (
  <>
    {CROWD.map((v) => {
      const yaw = facing + Math.atan2(-2.5 - v.x, 15 - v.z) * 0.6;
      return (
        <React.Fragment key={v.i}>
          <Blocky t={t * 0.25} pose={{ x: v.x, z: v.z, yaw, motion: "idle", face: "calm", headRoll: tilt, aR: v.lantern ? -0.6 : 0, phase: v.i }} look={villager(v.i)} />
          {v.lantern ? <Lantern p={[v.x + Math.cos(yaw) * 1.5 + Math.sin(yaw) * 0.9, 2.2, v.z - Math.sin(yaw) * 1.5 + Math.cos(yaw) * 0.9]} light={v.light} /> : null}
        </React.Fragment>
      );
    })}
  </>
);

const crowdShots: Shot[] = [
  { t: [0, 3.1], eye: [[-2.5, 8.0, 11.2], [-2.5, 7.7, 10.5]], at: [[-2.5, 1.2, -8], [-2.5, 1.2, -8]], fov: [64, 60] },
  { t: [3.1, 6.1], eye: [[-2.5, 7.2, 10.2], [-2.5, 6.6, 8.6]], at: [[-2.5, 3.0, -1], [-2.5, 3.2, -1]], fov: [48, 40] },
];
export const DCrowd: React.FC = () => {
  const t = useT();
  const tilt = clamp((t - 3.6) / 0.35, 0, 1) * 0.32;
  return (
    <Canvas>
      <WinterNight ambient={0.8} />
      <Cam t={t} shots={crowdShots} />
      <SnowGround />
      <Street t={t} offAt={-1} offIndex={-1} />
      <Crowd t={t} tilt={tilt} />
      <Snow t={t} n={160} w={30} c={[-2.5, 0, 3]} />
    </Canvas>
  );
};

/* ===== our lights go out (seen from behind the crowd) ===== */
const outShots: Shot[] = [{ t: [0, 2.8], eye: [[-2.5, 10, -13.5], [-2.5, 9.2, -11.5]], at: [[-2.5, 3.2, 13], [-2.5, 3.2, 13]], fov: [54, 50] }];
export const DLightsOut: React.FC = () => {
  const t = useT();
  const lit = t < OUR_OFF - SCENES.lightsout[0] ? 1 : 0;
  return (
    <Canvas>
      <WinterNight ambient={lit ? 0.7 : 0.45} />
      <Cam t={t} shots={outShots} />
      <SnowGround />
      <Street t={t} offAt={-1} offIndex={-1} ourLit={lit} />
      <Crowd t={t} tilt={0.32} />
      <Snow t={t} n={140} w={30} c={[-2.5, 0, 2]} />
    </Canvas>
  );
};

export const DEnd: React.FC = () => {
  const t = useT();
  return (
    <Canvas>
      <WinterNight ambient={0.6} />
      <Cam t={t} shots={[{ t: [0, 6], eye: [[-2.5, 9.2, -11.5], [-2.5, 10.5, -14]], at: [[-2.5, 3.2, 13], [-2.5, 3.2, 13]], fov: [50, 54] }]} />
      <SnowGround />
      <Street t={t} offAt={-1} offIndex={-1} ourLit={0} />
      <Crowd t={t} tilt={0.32} />
      <Snow t={t} n={140} w={30} c={[-2.5, 0, 2]} />
    </Canvas>
  );
};
