import React from "react";
import { rand } from "../anim";

type V3 = [number, number, number];

export const B: React.FC<{
  p: V3;
  s: V3;
  c: string;
  r?: V3;
  glow?: boolean;
  opacity?: number;
}> = ({ p, s, c, r, glow, opacity }) => (
  <mesh position={p} rotation={r ?? [0, 0, 0]}>
    <boxGeometry args={s} />
    {glow ? (
      <meshBasicMaterial
        color={c}
        toneMapped={false}
        fog={false}
        transparent={opacity !== undefined}
        opacity={opacity ?? 1}
      />
    ) : (
      <meshLambertMaterial
        color={c}
        transparent={opacity !== undefined}
        opacity={opacity ?? 1}
      />
    )}
  </mesh>
);

/** Night sky + fog + moonlight. */
export const NightEnv: React.FC<{
  fog?: string;
  near?: number;
  far?: number;
  moon?: number;
  ambient?: number;
  tint?: string;
}> = ({ fog = "#101a3a", near = 20, far = 100, moon = 1, ambient = 0.9, tint }) => (
  <>
    <color attach="background" args={[fog]} />
    <fog attach="fog" args={[fog, near, far]} />
    <ambientLight intensity={ambient} color={tint ?? "#5a6ea8"} />
    <hemisphereLight args={["#7d94d6", "#2a2018", 1.0]} />
    <directionalLight position={[-20, 40, 25]} intensity={1.7 * moon} color="#b3c6ff" />
  </>
);

export const Moon: React.FC<{ p: V3; size?: number }> = ({ p, size = 9 }) => (
  <group position={p}>
    <mesh>
      <sphereGeometry args={[size, 24, 24]} />
      <meshBasicMaterial color="#e9f0c4" toneMapped={false} fog={false} />
    </mesh>
    <mesh>
      <sphereGeometry args={[size * 1.6, 24, 24]} />
      <meshBasicMaterial color="#9fd36a" transparent opacity={0.12} fog={false} />
    </mesh>
  </group>
);

export const Ground: React.FC<{ c?: string; road?: boolean }> = ({
  c = "#2c3a22",
  road = true,
}) => (
  <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -40]}>
      <planeGeometry args={[400, 400]} />
      <meshLambertMaterial color={c} />
    </mesh>
    {road ? (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -40]}>
        <planeGeometry args={[9, 400]} />
        <meshLambertMaterial color="#5a4a36" />
      </mesh>
    ) : null}
  </>
);

/** Uzbek mud-brick village house with flat roof and beam ends. */
export const House: React.FC<{
  p: V3;
  ry?: number;
  w?: number;
  d?: number;
  h?: number;
  wall?: string;
  lit?: number; // 0..1 window light
  doorOpen?: number;
}> = ({ p, ry = 0, w = 10, d = 8, h = 6, wall = "#b89a72", lit = 0, doorOpen = 0 }) => {
  const winCol = lit > 0.5 ? "#ffc35a" : "#141824";
  return (
    <group position={p} rotation={[0, ry, 0]}>
      <B p={[0, h / 2, 0]} s={[w, h, d]} c={wall} />
      <B p={[0, h + 0.3, 0]} s={[w + 1, 0.6, d + 1]} c="#6b5236" />
      {Array.from({ length: Math.floor(w / 1.6) }).map((_, i) => (
        <B
          key={i}
          p={[-w / 2 + 0.8 + i * 1.6, h - 0.1, d / 2 + 0.6]}
          s={[0.3, 0.3, 1.2]}
          c="#4a3826"
        />
      ))}
      {/* door */}
      <group position={[-w / 4 - 0.8, 0, d / 2 + 0.02]} rotation={[0, -doorOpen * 1.6, 0]}>
        <B p={[0.8, 1.8, 0]} s={[1.6, 3.6, 0.15]} c="#5b3a1f" />
        <B p={[1.35, 1.8, 0.1]} s={[0.15, 0.15, 0.1]} c="#c9a24a" />
      </group>
      {/* windows */}
      <B p={[w / 4, 3.4, d / 2 + 0.02]} s={[1.8, 1.6, 0.1]} c={winCol} glow={lit > 0.5} />
      <B p={[w / 4, 3.4, d / 2 + 0.08]} s={[0.12, 1.6, 0.06]} c="#3a2a1a" />
      <B p={[w / 4, 3.4, d / 2 + 0.08]} s={[1.8, 0.12, 0.06]} c="#3a2a1a" />
    </group>
  );
};

export const Poplar: React.FC<{ p: V3; h?: number }> = ({ p, h = 12 }) => (
  <group position={p}>
    <B p={[0, h * 0.2, 0]} s={[0.6, h * 0.4, 0.6]} c="#4a3a2a" />
    <B p={[0, h * 0.6, 0]} s={[2, h * 0.65, 2]} c="#1f3d22" />
    <B p={[0, h * 0.95, 0]} s={[1.2, h * 0.2, 1.2]} c="#24472a" />
  </group>
);

export const FruitTree: React.FC<{ p: V3 }> = ({ p }) => (
  <group position={p}>
    <B p={[0, 1.6, 0]} s={[0.7, 3.2, 0.7]} c="#4a3626" />
    <B p={[0, 4.2, 0]} s={[4, 2.6, 4]} c="#25452a" />
    <B p={[0.6, 5.6, 0.3]} s={[2.6, 1.4, 2.6]} c="#2b5030" />
  </group>
);

export const MudWall: React.FC<{ p: V3; len: number; ry?: number }> = ({ p, len, ry = 0 }) => (
  <group position={p} rotation={[0, ry, 0]}>
    <B p={[0, 1.2, 0]} s={[len, 2.4, 0.8]} c="#9c805c" />
    <B p={[0, 2.5, 0]} s={[len, 0.25, 1]} c="#7e6648" />
  </group>
);

export const LampPost: React.FC<{ p: V3; t: number; seed?: number; on?: boolean }> = ({
  p,
  t,
  seed = 1,
  on = true,
}) => {
  const flick =
    on && !(Math.sin(t * 17 + seed * 5) > 0.82 && Math.sin(t * 3.1 + seed) > 0.2) ? 1 : 0.08;
  return (
    <group position={p}>
      <B p={[0, 4, 0]} s={[0.3, 8, 0.3]} c="#2a2a2e" />
      <B p={[0.9, 7.9, 0]} s={[2, 0.25, 0.25]} c="#2a2a2e" />
      <B p={[1.7, 7.5, 0]} s={[0.7, 0.4, 0.7]} c={flick > 0.5 ? "#ffd27a" : "#3a3426"} glow={flick > 0.5} />
      <pointLight position={[1.7, 7, 0]} color="#ffbe5c" intensity={60 * flick} distance={20} decay={1.7} />
    </group>
  );
};

/** Glowing drifting green fog slabs. */
export const GreenFog: React.FC<{ t: number; center: V3; count?: number; spread?: number; strength?: number }> = ({
  t,
  center,
  count = 14,
  spread = 30,
  strength = 1,
}) => (
  <group position={center}>
    {Array.from({ length: count }).map((_, i) => {
      const r1 = rand(i + 1);
      const r2 = rand(i + 21);
      const r3 = rand(i + 41);
      const x = (r1 - 0.5) * spread + Math.sin(t * 0.4 + i) * 2;
      const z = (r2 - 0.5) * spread + Math.cos(t * 0.3 + i) * 2;
      const y = 0.6 + r3 * 2.5 + Math.sin(t * 0.8 + i * 2) * 0.3;
      const s = 6 + r3 * 8;
      return (
        <mesh key={i} position={[x, y, z]} rotation={[-Math.PI / 2, 0, t * 0.05 + i]}>
          <planeGeometry args={[s, s]} />
          <meshBasicMaterial
            color="#5dff6a"
            transparent
            opacity={0.07 * strength}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      );
    })}
    <pointLight position={[0, 3, 0]} color="#5dff6a" intensity={90 * strength} distance={40} decay={1.4} />
  </group>
);

/** Cotton/wheat field rows. */
export const Field: React.FC<{ p: V3; rows?: number; len?: number }> = ({ p, rows = 9, len = 40 }) => (
  <group position={p}>
    {Array.from({ length: rows }).map((_, i) => (
      <group key={i} position={[(i - rows / 2) * 3, 0, 0]}>
        <B p={[0, 0.15, 0]} s={[1.6, 0.3, len]} c="#3a2c1e" />
        {Array.from({ length: Math.floor(len / 2.2) }).map((__, j) => (
          <B
            key={j}
            p={[0, 0.8 + rand(i * 50 + j) * 0.3, -len / 2 + j * 2.2 + 1]}
            s={[1.1, 1.1 + rand(i * 30 + j) * 0.6, 1.1]}
            c={rand(i * 7 + j) > 0.5 ? "#4f6b2e" : "#5d7a34"}
          />
        ))}
      </group>
    ))}
  </group>
);

/** Shepherd's sheep. */
export const Sheep: React.FC<{ p: V3; ry?: number; t: number; seed?: number }> = ({ p, ry = 0, t, seed = 0 }) => (
  <group position={p} rotation={[0, ry, 0]}>
    <B p={[0, 1.4, 0]} s={[1.8, 1.3, 2.4]} c="#e6e2d6" />
    <group position={[0, 1.7, 1.3]} rotation={[Math.sin(t * 2 + seed) * 0.15, 0, 0]}>
      <B p={[0, 0, 0.3]} s={[0.8, 0.8, 0.8]} c="#2a2420" />
    </group>
    {[-0.6, 0.6].map((x) =>
      [-0.8, 0.8].map((z) => <B key={`${x}${z}`} p={[x, 0.4, z]} s={[0.35, 0.8, 0.35]} c="#2a2420" />),
    )}
  </group>
);

export const River: React.FC<{ p: V3; t: number; w?: number }> = ({ p, t, w = 18 }) => (
  <group position={p}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[300, w]} />
      <meshLambertMaterial color="#1b3a5c" />
    </mesh>
    {Array.from({ length: 30 }).map((_, i) => {
      const x = ((i * 13.3 + t * 6) % 120) - 60;
      return (
        <B
          key={i}
          p={[x, -1.45, (rand(i) - 0.5) * (w - 2)]}
          s={[3 + rand(i + 9) * 3, 0.02, 0.15]}
          c="#6fa0d0"
          glow
          opacity={0.5}
        />
      );
    })}
    {/* banks */}
    <B p={[0, -0.8, w / 2 + 1]} s={[300, 1.6, 2]} c="#3b3022" />
    <B p={[0, -0.8, -w / 2 - 1]} s={[300, 1.6, 2]} c="#3b3022" />
  </group>
);

/** Rope bridge. Pivot (entry bank) at `p`, deck extends along +z for `len`.
 *  `cut` 0..1 swings the deck down around the pivot (ropes cut at the far end). */
export const Bridge: React.FC<{ p: V3; len?: number; cut?: number }> = ({ p, len = 24, cut = 0 }) => (
  <group position={p}>
    {[0, len].map((z) =>
      [-2.4, 2.4].map((x) => <B key={`${x}${z}`} p={[x, 1.2, z]} s={[0.5, 3.4, 0.5]} c="#4a3420" />),
    )}
    <group rotation={[cut * 1.45, 0, 0]}>
      {Array.from({ length: len }).map((_, i) => (
        <B key={i} p={[0, 0.1, i + 0.5]} s={[4.2, 0.25, 0.8]} c={i % 3 === 0 ? "#6b4c2c" : "#7a5832"} />
      ))}
      <B p={[-2.2, 1.4, len / 2]} s={[0.1, 0.1, len]} c="#c9b07a" />
      <B p={[2.2, 1.4, len / 2]} s={[0.1, 0.1, len]} c="#c9b07a" />
    </group>
  </group>
);

/** Ground with a gap for a river between z0 and z1. */
export const GroundGap: React.FC<{ z0: number; z1: number; c?: string }> = ({ z0, z1, c = "#2c3a22" }) => (
  <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, z0 - 150]}>
      <planeGeometry args={[400, 300]} />
      <meshLambertMaterial color={c} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, z1 + 150]}>
      <planeGeometry args={[400, 300]} />
      <meshLambertMaterial color={c} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, z0 - 150]}>
      <planeGeometry args={[9, 300]} />
      <meshLambertMaterial color="#5a4a36" />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, z1 + 150]}>
      <planeGeometry args={[9, 300]} />
      <meshLambertMaterial color="#5a4a36" />
    </mesh>
  </>
);

/** Street of houses along -z. */
export const Village: React.FC<{ t: number; length?: number; lit?: boolean; lampsOn?: boolean }> = ({
  t,
  length = 6,
  lit = true,
  lampsOn = true,
}) => (
  <group>
    {Array.from({ length }).map((_, i) => {
      const z = 6 - i * 15;
      const wallA = ["#b89a72", "#c4a882", "#a88a64"][i % 3];
      const wallB = ["#ad8f68", "#bfa27a", "#b3956d"][(i + 1) % 3];
      return (
        <group key={i}>
          <House p={[-12, 0, z]} ry={Math.PI / 2} wall={wallA} lit={lit && rand(i) > 0.4 ? 1 : 0} />
          <House p={[12, 0, z - 6]} ry={-Math.PI / 2} wall={wallB} lit={lit && rand(i + 5) > 0.5 ? 1 : 0} />
          <Poplar p={[-7, 0, z - 7]} h={11 + rand(i + 3) * 4} />
          <FruitTree p={[7.5, 0, z + 2]} />
          <MudWall p={[-6.5, 0, z + 1]} len={6} ry={Math.PI / 2} />
          {i % 2 === 0 ? <LampPost p={[5, 0, z - 3]} t={t} seed={i} on={lampsOn} /> : null}
        </group>
      );
    })}
  </group>
);
