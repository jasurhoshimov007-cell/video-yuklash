import React from "react";
import { rand } from "../anim";
import { Look } from "../three/Blocky";
import { B, House, Poplar } from "../three/Props";

type V3 = [number, number, number];

export const WinterNight: React.FC<{ fog?: string; ambient?: number; day?: boolean }> = ({ fog = "#101a30", ambient = 0.7, day = false }) => (
  <>
    <color attach="background" args={[day ? "#c8d4e4" : fog]} />
    <fog attach="fog" args={[day ? "#c8d4e4" : fog, 20, day ? 140 : 95]} />
    <ambientLight intensity={day ? 1.1 : ambient} color={day ? "#e4ecff" : "#6a7ab0"} />
    <hemisphereLight args={[day ? "#f0f4ff" : "#8a9ad0", day ? "#a0a8b8" : "#3a4258", day ? 0.9 : 0.6]} />
    <directionalLight position={[-20, 40, 25]} intensity={day ? 1.3 : 1.0} color={day ? "#fff6e8" : "#b8c8ff"} />
  </>
);

export const Snow: React.FC<{ t: number; n?: number; c?: V3; w?: number }> = ({ t, n = 160, c = [0, 0, 0], w = 50 }) => (
  <group position={c}>
    {Array.from({ length: n }).map((_, i) => {
      const x = (rand(i) - 0.5) * w + Math.sin(t * 0.8 + i) * 0.6;
      const z = (rand(i + 500) - 0.5) * w;
      const y = (((rand(i + 900) * 18 - t * (1.6 + rand(i + 3) * 0.8)) % 18) + 18) % 18;
      return <B key={i} p={[x, y, z]} s={[0.14, 0.14, 0.14]} c="#ffffff" glow opacity={0.85} />;
    })}
  </group>
);

export const SnowGround: React.FC = () => (
  <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[400, 400]} />
      <meshLambertMaterial color="#dfe6f2" />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 2]}>
      <planeGeometry args={[400, 9]} />
      <meshLambertMaterial color="#b8c2d2" />
    </mesh>
  </>
);

/** Village house with a snowy roof. Front faces +z when ry=0. */
export const SnowHouse: React.FC<{ p: V3; ry?: number; lit?: number; wall?: string; doorOpen?: number }> = ({ p, ry = 0, lit = 1, wall, doorOpen }) => (
  <group>
    <House p={p} ry={ry} lit={lit} wall={wall} doorOpen={doorOpen} />
    <group position={p} rotation={[0, ry, 0]}>
      <B p={[0, 6.85, 0]} s={[11.2, 0.5, 9.2]} c="#f4f7fc" />
      {lit > 0.5 ? <pointLight position={[2.5, 3.4, 5.5]} color="#ffb357" intensity={10} distance={9} decay={1.6} /> : null}
    </group>
  </group>
);

/** Two rows of houses along the street (x axis). North row at z=-10 faces +z. */
export const Street: React.FC<{ t: number; offAt?: number; offIndex?: number; ourLit?: number; ourDoor?: number; northDoor?: number }> = ({
  t,
  offAt = 999,
  offIndex = 2,
  ourLit = 1,
  northDoor = 0,
}) => (
  <group>
    {[-36, -24, -12, 0, 12, 24, 36].map((x, i) => (
      <SnowHouse key={`n${x}`} p={[x, 0, -10]} lit={i === offIndex && t > offAt ? 0 : rand(i + 3) > 0.15 ? 1 : 0} wall={["#b89a72", "#c4a882", "#a88a64"][i % 3]} doorOpen={i === offIndex ? northDoor : 0} />
    ))}
    {[-30, -18, 18, 30].map((x, i) => (
      <SnowHouse key={`s${x}`} p={[x, 0, 15]} ry={Math.PI} lit={rand(i + 11) > 0.3 ? 1 : 0} wall={["#ad8f68", "#bfa27a"][i % 2]} />
    ))}
    {/* our house */}
    <SnowHouse p={[0, 0, 15]} ry={Math.PI} lit={ourLit} wall="#c9b08a" />
    {[-42, -6, 6, 42].map((x) => (
      <Poplar key={x} p={[x, 0, -17]} h={13} />
    ))}
    {[-14, 14].map((x) => (
      <B key={x} p={[x, 3, -1.8]} s={[0.3, 6, 0.3]} c="#2a2a30" />
    ))}
  </group>
);

/** Footprints in the snow leading from the north-row door into the street, ending abruptly. */
export const Footprints: React.FC<{ x: number }> = ({ x }) => (
  <group>
    {Array.from({ length: 9 }).map((_, i) => (
      <B key={i} p={[x - 3.3 + (i % 2) * 0.7, 0.03, -5.4 + i * 0.95]} s={[0.4, 0.04, 0.7]} c="#8a94a8" />
    ))}
  </group>
);

const coats = ["#2a2e38", "#3a2a2a", "#2a3a34", "#38324a", "#4a3a2a", "#22262e"];
/** Villagers in winter coats. */
export const villager = (i: number): Look => {
  const r = (k: number) => rand(i * 7.7 + k);
  const female = r(1) > 0.55;
  return {
    skin: ["#e0b088", "#d8a77a", "#c89a6a", "#ecc49a"][Math.floor(r(2) * 4)],
    shirt: coats[Math.floor(r(3) * coats.length)],
    robe: !female && r(4) > 0.5 ? coats[Math.floor(r(5) * coats.length)] : undefined,
    pants: "#1e1e24",
    shoes: "#111",
    hair: female ? undefined : "#2a2420",
    hairStyle: female ? "none" : "short",
    hat: female ? "scarf" : r(6) > 0.4 ? "doppi" : "none",
    hatCol: female ? ["#5a2a3a", "#2a3a5a", "#4a4a4a"][Math.floor(r(7) * 3)] : "#141414",
    beard: !female && r(8) > 0.7 ? "#d8d8d8" : undefined,
  };
};

export const BOY: Look = {
  skin: "#f0c99a",
  shirt: "#2f5fa0",
  sleeve: "#2f5fa0",
  pants: "#22263a",
  shoes: "#e6e6e6",
  hair: "#2a1a10",
  hairStyle: "short",
};
export const GRANNY: Look = {
  skin: "#dcae84",
  shirt: "#6a2a3a",
  robe: "#5a2a3a",
  pants: "#2a1a1a",
  shoes: "#111",
  hat: "scarf",
  hatCol: "#e8e2d4",
};

export const Lantern: React.FC<{ p: V3; light?: boolean }> = ({ p, light }) => (
  <group position={p}>
    <B p={[0, 0, 0]} s={[0.45, 0.6, 0.45]} c="#ffc864" glow />
    <B p={[0, 0.38, 0]} s={[0.5, 0.12, 0.5]} c="#2a2a2a" />
    {light ? <pointLight position={[0, 0, 0.4]} color="#ffb050" intensity={12} distance={9} decay={1.6} /> : null}
  </group>
);

export const Suitcase: React.FC<{ p: V3 }> = ({ p }) => (
  <group position={p}>
    <B p={[0, 0.9, 0]} s={[1.6, 1.4, 0.6]} c="#8a3a2a" />
    <B p={[0, 1.75, 0]} s={[0.6, 0.25, 0.15]} c="#2a2a2a" />
  </group>
);
