import React from "react";
import { rand } from "../anim";
import { Look } from "../three/Blocky";
import { B } from "../three/Props";

type V3 = [number, number, number];

export const NARR: Look = {
  skin: "#f0c99a",
  shirt: "#2f8a4a",
  sleeve: "#2f8a4a",
  pants: "#2b2f45",
  shoes: "#f2f2f2",
  hair: "#2a1a10",
  hairStyle: "short",
};
export const SARDOR: Look = {
  skin: "#e2b080",
  shirt: "#f0b020",
  sleeve: "#f0b020",
  pants: "#3a3a48",
  shoes: "#1a1a1a",
  hair: "#1b1410",
  hairStyle: "short",
  hat: "cap",
  hatCol: "#d02a2a",
};
export const STRANGER: Look = {
  skin: "#d8b090",
  shirt: "#141418",
  sleeve: "#141418",
  pants: "#101014",
  shoes: "#050505",
  hair: "#0a0a0a",
  hairStyle: "short",
  belt: "#2a2a30",
};

export const Stack: React.FC<{ p: V3; r?: V3 }> = ({ p, r }) => (
  <group position={p} rotation={r ?? [0, 0, 0]}>
    <B p={[0, 0, 0]} s={[0.9, 0.32, 0.45]} c="#3f9a4a" />
    <B p={[0, 0, 0]} s={[0.22, 0.34, 0.47]} c="#f4f1e0" />
  </group>
);

/** Black duffel bag. `open` 0..1 lifts the flap; money shows when open. */
export const Bag: React.FC<{ p: V3; r?: V3; open?: number; glow?: number }> = ({ p, r, open = 0, glow = 0 }) => (
  <group position={p} rotation={r ?? [0, 0, 0]}>
    <B p={[0, 0.7, 0]} s={[3, 1.4, 1.6]} c="#141416" />
    <B p={[-0.8, 1.6, 0]} s={[0.15, 0.5, 0.15]} c="#2a2a2e" />
    <B p={[0.8, 1.6, 0]} s={[0.15, 0.5, 0.15]} c="#2a2a2e" />
    <B p={[0, 1.85, 0]} s={[1.75, 0.15, 0.15]} c="#2a2a2e" />
    {open > 0.05 ? (
      <>
        {Array.from({ length: 12 }).map((_, i) => (
          <Stack key={i} p={[-1.0 + (i % 4) * 0.68, 1.25 + Math.floor(i / 8) * 0.3, -0.45 + (Math.floor(i / 4) % 2) * 0.6]} />
        ))}
        <group position={[0, 1.42, -0.8]} rotation={[-open * 1.9, 0, 0]}>
          <B p={[0, 0, 0.8]} s={[3, 0.1, 1.6]} c="#1c1c20" />
        </group>
        <pointLight position={[0, 3, 0.6]} color="#7dff8a" intensity={18 * glow} distance={8} decay={1.4} />
      </>
    ) : (
      <B p={[0, 1.42, 0]} s={[3.02, 0.08, 1.62]} c="#1c1c20" />
    )}
  </group>
);

/** Flying bills (money rain) starting at time `t0`, around `c`. */
export const Bills: React.FC<{ t: number; t0: number; c: V3; n?: number; spread?: number }> = ({ t, t0, c, n = 40, spread = 4 }) => {
  const dt = t - t0;
  if (dt < 0) return null;
  return (
    <group position={c}>
      {Array.from({ length: n }).map((_, i) => {
        const vx = (rand(i) - 0.5) * spread * 2;
        const vz = (rand(i + 50) - 0.5) * spread;
        const vy = 6 + rand(i + 9) * 6;
        const tt = Math.min(dt, 3);
        const y = Math.max(0.05, vy * tt - 4.5 * tt * tt + Math.sin(t * 3 + i) * 0.2 * (tt > 1 ? 1 : 0));
        return (
          <B key={i} p={[vx * tt, y, vz * tt]} s={[0.6, 0.02, 0.28]} c={rand(i + 3) > 0.5 ? "#4fae5a" : "#3f9a4a"} r={[t * (3 + rand(i) * 4) + i, t * 2 + i, t * 3]} />
        );
      })}
    </group>
  );
};

/** Abandoned room. x ∈ [-9,9], z ∈ [-8,8], h=7. Door on the back wall (z=-8) at x=3, window on the left wall. */
export const Room: React.FC<{
  t: number;
  dusk?: number; // 0 = golden sun shafts, 1 = night
  hole?: number; // 0..1 lifted floorboard
  doorOpen?: number;
  headlights?: number; // 0..1 car lights through the window
  backlight?: number; // light behind the open door
}> = ({ t, dusk = 0, hole = 0, doorOpen = 0, headlights = 0, backlight = 0 }) => {
  const wall = "#8a7a62";
  const sun = dusk < 0.5;
  return (
    <group>
      <color attach="background" args={[sun ? "#2a1e14" : "#07080c"]} />
      <fog attach="fog" args={[sun ? "#2a1e14" : "#07080c", 14, 45]} />
      <ambientLight intensity={sun ? 0.55 : 0.25} color={sun ? "#c8a070" : "#5a6a9a"} />
      <hemisphereLight args={[sun ? "#ffcf90" : "#4a5a8a", "#1a120a", sun ? 0.5 : 0.25]} />
      {sun ? <directionalLight position={[-20, 12, 6]} intensity={1.6} color="#ffb060" /> : null}
      {/* floor planks */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = -8.5 + i;
        const lifted = i >= 8 && i <= 10 && hole > 0;
        return lifted ? (
          <React.Fragment key={i}>
            <group position={[x - 0.5, 0, 0]} rotation={[0, 0, hole * (2.6 + (i - 8) * 0.12)]}>
              <B p={[0.5, 0.05, 0]} s={[0.96, 0.12, 3.2]} c="#6a4a2e" />
            </group>
            <B p={[x, -0.05, 4.8]} s={[0.96, 0.12, 6.4]} c="#62442a" />
            <B p={[x, -0.05, -4.8]} s={[0.96, 0.12, 6.4]} c="#62442a" />
          </React.Fragment>
        ) : (
          <B key={i} p={[x, -0.05, 0]} s={[0.96, 0.12, 16]} c={i % 3 === 0 ? "#5a3e26" : i % 3 === 1 ? "#6a4a2e" : "#62442a"} />
        );
      })}
      {hole > 0 ? (
        <>
          <B p={[0.5, -1.6, 0]} s={[2.9, 0.1, 3.2]} c="#1a120a" />
          <pointLight position={[0.5, 1.8, 0.5]} color="#ffd090" intensity={45 * hole} distance={7} decay={1.4} />
        </>
      ) : null}
      <B p={[0, 7.05, 0]} s={[18, 0.1, 16]} c="#3a3026" />
      {/* walls */}
      <B p={[9, 3.5, 0]} s={[0.3, 7, 16]} c={wall} />
      <B p={[0, 3.5, 8]} s={[18, 7, 0.3]} c={wall} />
      <B p={[-9, 1.2, 0]} s={[0.3, 2.4, 16]} c={wall} />
      <B p={[-9, 6.2, 0]} s={[0.3, 1.6, 16]} c={wall} />
      <B p={[-9, 3.9, 4.5]} s={[0.3, 3, 7]} c={wall} />
      <B p={[-9, 3.9, -5.5]} s={[0.3, 3, 5]} c={wall} />
      {/* boarded window z∈[-3,1] */}
      <B p={[-9.1, 3.9, -1]} s={[0.1, 3, 4]} c={sun ? "#ffcf8a" : headlights > 0.05 ? "#fff6d0" : "#141a2a"} glow={sun || headlights > 0.05} />
      {[-0.6, 0.5, 1.5].map((y, i) => (
        <B key={i} p={[-8.9, 3.4 + y, -1]} s={[0.12, 0.45, 4.4]} c="#5a4228" r={[0.08 * (i - 1), 0, 0]} />
      ))}
      {/* sun shafts */}
      {sun
        ? [0, 1, 2].map((i) => (
            <B key={i} p={[-5, 2.4 + i * 0.4, -1 + i * 0.6]} s={[9, 0.5, 0.9]} c="#ffd79a" glow opacity={0.1} r={[0, 0, -0.35]} />
          ))
        : null}
      {/* headlights sweep */}
      {headlights > 0.05 ? (
        <>
          <B p={[-4, 3.6, -1 + Math.sin(t * 1.5) * 1.5]} s={[10, 1.2, 1.4]} c="#fff6d0" glow opacity={0.14 * headlights} r={[0, 0.25 * Math.sin(t * 1.5), -0.12]} />
          <pointLight position={[-7.5, 3.6, -1 + Math.sin(t * 1.5) * 2]} color="#fff2c8" intensity={70 * headlights} distance={20} decay={1.3} />
        </>
      ) : null}
      {/* back wall with doorway x∈[1.6,4.4] */}
      <B p={[-3.7, 3.5, -8]} s={[10.6, 7, 0.3]} c={wall} />
      <B p={[6.7, 3.5, -8]} s={[4.6, 7, 0.3]} c={wall} />
      <B p={[3, 6.1, -8]} s={[2.8, 1.8, 0.3]} c={wall} />
      <group position={[1.6, 0, -7.85]} rotation={[0, -doorOpen * 1.7, 0]}>
        <B p={[1.4, 2.6, 0]} s={[2.8, 5.2, 0.16]} c="#4a3420" />
        <B p={[2.5, 2.6, 0.12]} s={[0.15, 0.3, 0.12]} c="#8a7a4a" />
      </group>
      {backlight > 0 ? (
        <>
          <B p={[3, 2.6, -10.2]} s={[3.4, 5.6, 0.1]} c="#fff0d0" glow opacity={backlight} />
          <pointLight position={[3, 3, -6.5]} color="#fff0d0" intensity={40 * backlight} distance={16} decay={1.3} />
        </>
      ) : null}
      {/* stains + junk */}
      {Array.from({ length: 10 }).map((_, i) => (
        <B key={i} p={[-8 + rand(i) * 16, 1 + rand(i + 4) * 5, 7.83]} s={[0.8 + rand(i + 2), 0.6 + rand(i + 3), 0.02]} c="#6a5a46" />
      ))}
      <B p={[6.5, 0.8, 4]} s={[4, 1.6, 2]} c="#5a3a3a" />
      <B p={[6.5, 1.9, 4.9]} s={[4, 1.4, 0.4]} c="#5a3a3a" />
      <group position={[-5, 0.5, 5]} rotation={[0, 0.6, 1.4]}>
        <B p={[0, 0, 0]} s={[1.2, 0.15, 1.2]} c="#6a4a2e" />
        <B p={[0, 0.7, -0.55]} s={[1.2, 1.4, 0.12]} c="#6a4a2e" />
      </group>
      {Array.from({ length: 30 }).map((_, i) => (
        <B key={`d${i}`} p={[-8 + rand(i + 40) * 16, ((rand(i + 41) * 6 + t * 0.12) % 6) + 0.5, -7 + rand(i + 42) * 14]} s={[0.05, 0.05, 0.05]} c="#ffe0b0" glow opacity={0.5} />
      ))}
    </group>
  );
};

/** Abandoned house exterior at dusk. */
export const HouseOutside: React.FC<{ t: number }> = ({ t }) => (
  <group>
    <color attach="background" args={["#d07850"]} />
    <fog attach="fog" args={["#d07850", 30, 120]} />
    <ambientLight intensity={0.7} color="#ffc090" />
    <hemisphereLight args={["#ffb070", "#2a2010", 0.6]} />
    <directionalLight position={[-30, 12, 20]} intensity={1.6} color="#ffb060" />
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[300, 300]} />
      <meshLambertMaterial color="#6a6a3a" />
    </mesh>
    <B p={[0, 4.5, -6]} s={[18, 9, 10]} c="#8a7a62" />
    <B p={[0, 9.5, -6]} s={[19, 1, 11]} c="#4a3426" r={[0, 0, 0.05]} />
    <B p={[-6, 10.2, -6]} s={[5, 1.2, 11]} c="#4a3426" r={[0, 0, 0.35]} />
    {[-5.5, 5.5].map((x) => (
      <group key={x}>
        <B p={[x, 5.5, -0.95]} s={[3, 3, 0.1]} c="#141210" />
        <B p={[x, 5.3, -0.85]} s={[3.4, 0.4, 0.1]} c="#6a4a2e" r={[0, 0, 0.3]} />
        <B p={[x, 6, -0.85]} s={[3.4, 0.4, 0.1]} c="#6a4a2e" r={[0, 0, -0.25]} />
      </group>
    ))}
    <B p={[0, 2.6, -0.95]} s={[3, 5.2, 0.1]} c="#2a1c12" />
    {Array.from({ length: 16 }).map((_, i) => (
      <B key={i} p={[-14 + i * 1.9, 1.2, 8]} s={[0.25, 2.4 - (i % 3 === 0 ? 1 : 0), 0.25]} c="#5a4228" r={[0, 0, (rand(i) - 0.5) * 0.4]} />
    ))}
    <B p={[-6, 1.8, 8]} s={[12, 0.2, 0.15]} c="#5a4228" />
    {Array.from({ length: 40 }).map((_, i) => (
      <B key={`g${i}`} p={[-16 + rand(i) * 32, 0.4, -2 + rand(i + 1) * 14]} s={[0.3, 0.8 + rand(i + 2), 0.3]} c="#7a8a3a" r={[0, 0, Math.sin(t * 2 + i) * 0.1]} />
    ))}
    <group position={[13, 0, 2]}>
      <B p={[0, 3.5, 0]} s={[0.8, 7, 0.8]} c="#3a2a1e" />
      <B p={[1.2, 6, 0]} s={[2.6, 0.4, 0.4]} c="#3a2a1e" r={[0, 0, 0.5]} />
      <B p={[-1, 5, 0]} s={[2, 0.4, 0.4]} c="#3a2a1e" r={[0, 0, -0.6]} />
    </group>
    <mesh position={[-30, 14, -80]}>
      <sphereGeometry args={[8, 24, 24]} />
      <meshBasicMaterial color="#ffd080" toneMapped={false} fog={false} />
    </mesh>
  </group>
);

export const BlackCar: React.FC<{ p: V3; ry?: number; lights?: number }> = ({ p, ry = 0, lights = 1 }) => (
  <group position={p} rotation={[0, ry, 0]}>
    <B p={[0, 1.1, 0]} s={[5, 1.3, 2.3]} c="#0c0c10" />
    <B p={[-0.3, 2.2, 0]} s={[2.8, 1, 2.1]} c="#0c0c10" />
    <B p={[-0.3, 2.2, 0]} s={[2.6, 0.8, 2.15]} c="#1a2030" />
    {[-1.7, 1.7].map((x) => [-1.15, 1.15].map((z) => <B key={`${x}${z}`} p={[x, 0.5, z]} s={[1, 1, 0.3]} c="#050505" />))}
    <B p={[2.51, 1.25, 0.7]} s={[0.05, 0.35, 0.5]} c="#fff6d0" glow />
    <B p={[2.51, 1.25, -0.7]} s={[0.05, 0.35, 0.5]} c="#fff6d0" glow />
    <pointLight position={[4, 1.4, 0]} color="#fff2c8" intensity={40 * lights} distance={18} decay={1.3} />
  </group>
);
