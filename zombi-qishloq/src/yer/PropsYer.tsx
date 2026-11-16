import React, { useEffect, useMemo } from "react";
import { CanvasTexture, NearestFilter, SRGBColorSpace } from "three";
import { rand } from "../anim";
import { Look } from "../three/Blocky";
import { B } from "../three/Props";

type V3 = [number, number, number];

/* ---------- pixel-art planet ---------- */
const noise2 = (x: number, y: number) => {
  // value noise, deterministic
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const f = (a: number, b: number) => rand(a * 57.1 + b * 13.7);
  const sx = x - xi;
  const sy = y - yi;
  const u = sx * sx * (3 - 2 * sx);
  const v = sy * sy * (3 - 2 * sy);
  const a = f(xi, yi);
  const b = f(xi + 1, yi);
  const c = f(xi, yi + 1);
  const d = f(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};

const makeEarthTexture = (clouds: boolean) => {
  const W = 96;
  const H = 48;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // wrap-around noise in x
      const ang = (x / W) * Math.PI * 2;
      const nx = Math.cos(ang) * 3 + 10;
      const nz = Math.sin(ang) * 3 + 10;
      const ny = y / 8;
      const n = noise2(nx + ny * 0.7, nz + ny) * 0.65 + noise2(nx * 2.3, nz * 2.1 + ny * 2) * 0.35;
      const lat = Math.abs(y / H - 0.5) * 2;
      if (clouds) {
        const cn = noise2(nx * 2.8 + 40, ny * 2.5 + nz);
        g.fillStyle = cn > 0.62 ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0)";
      } else if (lat > 0.86) {
        g.fillStyle = "#eef6ff";
      } else if (n > 0.55) {
        g.fillStyle = n > 0.7 ? "#7a6a3a" : lat > 0.6 ? "#4f7f3a" : n > 0.62 ? "#c9b26a" : "#3f8f3a";
      } else {
        g.fillStyle = n > 0.5 ? "#2f7fc8" : "#1d5aa8";
      }
      g.fillRect(x, y, 1, 1);
    }
  }
  const t = new CanvasTexture(c);
  t.magFilter = NearestFilter;
  t.minFilter = NearestFilter;
  t.colorSpace = SRGBColorSpace;
  t.needsUpdate = true;
  return t;
};

export const Planet: React.FC<{ rot: number; equator?: number; tilt?: number; crack?: number }> = ({ rot, equator = 0, tilt = 0.4, crack = 0 }) => {
  const ground = useMemo(() => makeEarthTexture(false), []);
  const cloud = useMemo(() => makeEarthTexture(true), []);
  useEffect(
    () => () => {
      ground.dispose();
      cloud.dispose();
    },
    [ground, cloud],
  );
  return (
    <group rotation={[0, 0, tilt]}>
      <group rotation={[0, rot, 0]}>
        <mesh>
          <sphereGeometry args={[10, 48, 32]} />
          <meshLambertMaterial map={ground} emissive={crack > 0 ? "#ff3010" : "#000000"} emissiveIntensity={crack * 0.25} />
        </mesh>
        <mesh rotation={[0, rot * 0.3, 0]}>
          <sphereGeometry args={[10.25, 48, 32]} />
          <meshLambertMaterial map={cloud} transparent depthWrite={false} />
        </mesh>
      </group>
      {equator > 0 ? (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[10.4, 0.12, 8, 96]} />
          <meshBasicMaterial color="#ffe600" toneMapped={false} transparent opacity={equator} />
        </mesh>
      ) : null}
      <mesh>
        <sphereGeometry args={[11, 32, 24]} />
        <meshBasicMaterial color="#6fb6ff" transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </group>
  );
};

export const Space: React.FC = () => (
  <>
    <color attach="background" args={["#02030a"]} />
    <ambientLight intensity={0.25} />
    <directionalLight position={[-30, 10, 25]} intensity={2.2} color="#fff6e0" />
    {Array.from({ length: 160 }).map((_, i) => {
      const a = rand(i) * Math.PI * 2;
      const b = (rand(i + 300) - 0.5) * Math.PI;
      const r = 120;
      return (
        <mesh key={i} position={[Math.cos(a) * Math.cos(b) * r, Math.sin(b) * r, -Math.abs(Math.sin(a) * Math.cos(b) * r) - 20]}>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshBasicMaterial color={rand(i + 7) > 0.8 ? "#ffd9a0" : "#ffffff"} toneMapped={false} />
        </mesh>
      );
    })}
  </>
);

/* ---------- daytime world ---------- */
export const DayEnv: React.FC<{ sky?: string; fog?: [number, number]; sun?: number; ambient?: number }> = ({
  sky = "#8ec8ff",
  fog = [40, 160],
  sun = 2.0,
  ambient = 0.9,
}) => (
  <>
    <color attach="background" args={[sky]} />
    <fog attach="fog" args={[sky, fog[0], fog[1]]} />
    <ambientLight intensity={ambient} color="#cfe0ff" />
    <hemisphereLight args={["#bfe0ff", "#5a6a3a", 0.8]} />
    <directionalLight position={[20, 40, 30]} intensity={sun} color="#fff4dc" />
  </>
);

export const Grass: React.FC<{ c?: string }> = ({ c = "#5fae4a" }) => (
  <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -60]}>
      <planeGeometry args={[600, 400]} />
      <meshLambertMaterial color={c} />
    </mesh>
    <B p={[0, 0.02, 4]} s={[600, 0.04, 8]} c="#6a6a72" />
    {Array.from({ length: 40 }).map((_, i) => (
      <B key={i} p={[-150 + i * 8, 0.05, 4]} s={[3, 0.02, 0.3]} c="#f2f2f2" />
    ))}
  </>
);

export const Car: React.FC<{ p: V3; color: string; r?: V3 }> = ({ p, color, r }) => (
  <group position={p} rotation={r ?? [0, 0, 0]}>
    <B p={[0, 1.1, 0]} s={[4.4, 1.2, 2.1]} c={color} />
    <B p={[-0.2, 2.1, 0]} s={[2.4, 0.9, 1.9]} c={color} />
    <B p={[-0.2, 2.1, 0]} s={[2.2, 0.7, 1.95]} c="#a8d4ff" />
    {[-1.4, 1.4].map((x) => [-1.05, 1.05].map((z) => <B key={`${x}${z}`} p={[x, 0.5, z]} s={[0.9, 0.9, 0.3]} c="#141414" />))}
    <B p={[2.21, 1.2, 0.6]} s={[0.05, 0.3, 0.4]} c="#fff6c0" glow />
    <B p={[2.21, 1.2, -0.6]} s={[0.05, 0.3, 0.4]} c="#fff6c0" glow />
  </group>
);

export const Home: React.FC<{ p: V3; wall: string; roof: string; r?: V3 }> = ({ p, wall, roof, r }) => (
  <group position={p} rotation={r ?? [0, 0, 0]}>
    <B p={[0, 3, 0]} s={[8, 6, 7]} c={wall} />
    <B p={[0, 6.6, 0]} s={[8.8, 1.2, 7.8]} c={roof} />
    <B p={[0, 7.6, 0]} s={[6, 0.8, 5.6]} c={roof} />
    <B p={[-1.8, 1.6, 3.52]} s={[1.6, 3.2, 0.06]} c="#6a4426" />
    <B p={[1.8, 3.6, 3.52]} s={[2, 1.6, 0.06]} c="#bfe2ff" />
  </group>
);

export const Tree: React.FC<{ p: V3; bend?: number }> = ({ p, bend = 0 }) => (
  <group position={p} rotation={[0, 0, -bend]}>
    <B p={[0, 2, 0]} s={[0.8, 4, 0.8]} c="#6a4a2a" />
    <group rotation={[0, 0, -bend * 0.6]} position={[0, 4, 0]}>
      <B p={[0, 1.6, 0]} s={[4.2, 3.2, 4.2]} c="#3f9a3a" />
      <B p={[0.3, 3.4, 0.2]} s={[2.8, 1.6, 2.8]} c="#4fae44" />
    </group>
  </group>
);

export const Bench: React.FC<{ p: V3 }> = ({ p }) => (
  <group position={p}>
    <B p={[0, 1.45, 0]} s={[5, 0.2, 1.4]} c="#a0683a" />
    <B p={[0, 2.6, -0.65]} s={[5, 1.4, 0.2]} c="#a0683a" />
    {[-2.2, 2.2].map((x) => (
      <B key={x} p={[x, 0.7, 0]} s={[0.25, 1.4, 1.2]} c="#2a2a2a" />
    ))}
  </group>
);

const skins = ["#f1c99a", "#d8a77a", "#e8b98a", "#c48a5a", "#f3d6b0"];
const shirts = ["#e23f3f", "#2f6fe0", "#f0b020", "#3aa06a", "#8a4ad0", "#f07a2a", "#20a0b0"];
/** Ordinary townsfolk. */
export const person = (i: number): Look => {
  const r = (k: number) => rand(i * 9.1 + k);
  const female = r(1) > 0.55;
  return {
    skin: skins[Math.floor(r(2) * skins.length)],
    shirt: shirts[Math.floor(r(3) * shirts.length)],
    pants: r(4) > 0.5 ? "#2b2f45" : "#3a2c20",
    shoes: "#1a1a1a",
    hair: r(5) > 0.5 ? "#2a1a10" : "#5a3a1a",
    hairStyle: female ? "long" : "short",
    hat: !female && r(6) > 0.7 ? "doppi" : "none",
  };
};

export const HERO: Look = {
  skin: "#f0c99a",
  shirt: "#f07a2a",
  sleeve: "#f07a2a",
  pants: "#2b2f45",
  shoes: "#f2f2f2",
  hair: "#1b1410",
  hairStyle: "short",
};
