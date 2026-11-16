import React, { useEffect, useMemo, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { CanvasTexture, SRGBColorSpace } from "three";
import { rand } from "../anim";
import { B } from "../three/Props";

type V3 = [number, number, number];

/* ---------- text on a 3D plane (canvas texture) ---------- */
const useFontsReady = () => {
  const [ready, setReady] = useState(false);
  const [handle] = useState(() => delayRender("fonts for 3D text"));
  useEffect(() => {
    Promise.all([document.fonts.load("900 64px Poppins"), document.fonts.load("700 64px Poppins")])
      .catch(() => undefined)
      .then(() => {
        setReady(true);
        continueRender(handle);
      });
  }, [handle]);
  return ready;
};

export const TextPlane: React.FC<{
  p: V3;
  r?: V3;
  w: number;
  h: number;
  lines: string[];
  color?: string;
  bg?: string;
  weight?: number;
  /** font size as a fraction of plane height (per line) */
  size?: number;
  /** number of visible characters per line (chalk writing). undefined = all */
  reveal?: number[];
  glow?: boolean;
  chalk?: boolean;
}> = ({ p, r, w, h, lines, color = "#ffffff", bg, weight = 900, size = 0.7, reveal, glow, chalk }) => {
  const ready = useFontsReady();
  const key = `${lines.join("|")}|${reveal?.join(",")}|${color}|${bg}|${ready}`;
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = Math.max(64, Math.round(w * 160));
    c.height = Math.max(64, Math.round(h * 160));
    const g = c.getContext("2d")!;
    if (bg) {
      g.fillStyle = bg;
      g.fillRect(0, 0, c.width, c.height);
    }
    const lh = c.height / lines.length;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = `${weight} ${Math.round(lh * size)}px Poppins, sans-serif`;
    lines.forEach((ln, i) => {
      const n = reveal ? Math.max(0, Math.floor(reveal[i] ?? 0)) : ln.length;
      const txt = ln.slice(0, n);
      if (chalk) {
        g.fillStyle = "rgba(240,240,232,0.25)";
        for (let k = 0; k < 3; k++) g.fillText(txt, c.width / 2 + (k - 1) * 3, lh * (i + 0.5) + (k - 1) * 2);
      }
      g.fillStyle = color;
      if (glow) {
        g.shadowColor = color;
        g.shadowBlur = lh * 0.25;
      }
      g.fillText(txt, c.width / 2, lh * (i + 0.5));
    });
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    t.needsUpdate = true;
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <mesh position={p} rotation={r ?? [0, 0, 0]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} fog={!glow} depthWrite={false} />
    </mesh>
  );
};

/* ---------- environment ---------- */
export const IndoorEnv: React.FC<{ fog?: string; near?: number; far?: number; ambient?: number; tint?: string }> = ({
  fog = "#05060a",
  near = 10,
  far = 60,
  ambient = 0.35,
  tint = "#5c6a9a",
}) => (
  <>
    <color attach="background" args={[fog]} />
    <fog attach="fog" args={[fog, near, far]} />
    <ambientLight intensity={ambient} color={tint} />
    <hemisphereLight args={["#56607e", "#1a1612", ambient * 0.8]} />
  </>
);

/* ---------- ceiling light ---------- */
export const TubeLight: React.FC<{ p: V3; on: number; color?: string; light?: boolean }> = ({
  p,
  on,
  color = "#e9f4ff",
  light = true,
}) => (
  <group position={p}>
    <B p={[0, 0.15, 0]} s={[0.9, 0.3, 3.2]} c="#6b6b6b" />
    <B p={[0, -0.05, 0]} s={[0.6, 0.12, 2.9]} c={on > 0.5 ? color : "#3a3d40"} glow={on > 0.5} />
    {light && on > 0.05 ? <pointLight position={[0, -1, 0]} color={color} intensity={30 * on} distance={13} decay={1.5} /> : null}
  </group>
);

/** Flicker helper: 1 = on, 0 = off, deterministic. */
export const flick = (t: number, seed: number, base = 1, rate = 0.85) =>
  Math.sin(t * 19 + seed * 7.3) > rate || Math.sin(t * 7.1 + seed * 2.9) > rate + 0.08 ? 0 : base;

/* ---------- door ---------- */
export const Door: React.FC<{ p: V3; ry?: number; open?: number; label?: string; red?: number }> = ({
  p,
  ry = 0,
  open = 0,
  label,
  red = 0,
}) => (
  <group position={p} rotation={[0, ry, 0]}>
    {/* frame */}
    <B p={[-1.45, 2.7, 0]} s={[0.3, 5.4, 0.4]} c="#24180f" />
    <B p={[1.45, 2.7, 0]} s={[0.3, 5.4, 0.4]} c="#24180f" />
    <B p={[0, 5.5, 0]} s={[3.2, 0.3, 0.4]} c="#24180f" />
    {/* panel, hinge on the left edge */}
    <group position={[-1.3, 0, 0.05]} rotation={[0, -open * 1.6, 0]}>
      <B p={[1.3, 2.6, 0]} s={[2.6, 5.2, 0.16]} c="#4a3020" />
      <B p={[1.3, 3.9, 0.1]} s={[1.9, 1.5, 0.04]} c="#3d2618" />
      <B p={[1.3, 1.5, 0.1]} s={[1.9, 1.6, 0.04]} c="#3d2618" />
      <B p={[2.3, 2.6, 0.14]} s={[0.12, 0.35, 0.12]} c="#c9a24a" />
    </group>
    {label ? (
      <>
        <B p={[0, 6.25, 0.22]} s={[1.3, 0.8, 0.06]} c={red > 0 ? "#2a0606" : "#d8d2c0"} />
        <TextPlane
          p={[0, 6.25, 0.26]}
          w={1.2}
          h={0.72}
          lines={[label]}
          color={red > 0 ? "#ff2a2a" : "#1d1d1d"}
          glow={red > 0}
          size={0.85}
        />
      </>
    ) : null}
    {red > 0 ? (
      <>
        <B p={[0, 0.03, 0.4]} s={[2.6, 0.04, 0.6]} c="#ff2020" glow opacity={0.5 * red} />
        <pointLight position={[0, 6.2, 1.2]} color="#ff2a2a" intensity={14 * red} distance={8} decay={1.6} />
      </>
    ) : null}
  </group>
);

/* ---------- school corridor along -z, end wall at z=-L with a doorway ---------- */
export const Corridor: React.FC<{
  t: number;
  L?: number;
  lights?: number; // 0..1 overall
  flickerAmt?: number;
  day?: boolean;
  endDoor?: "door" | "wall";
  open?: number;
  red?: number;
}> = ({ t, L = 40, lights = 0, flickerAmt = 0, day = false, endDoor = "door", open = 0, red = 1 }) => {
  const len = L + 8;
  const zc = 6 - len / 2;
  const lower = day ? "#3d7a5f" : "#2e5a48";
  const upper = day ? "#e3dcc6" : "#cbc3ad";
  return (
    <group>
      {/* floor with tile lines */}
      <B p={[0, -0.05, zc]} s={[8, 0.1, len]} c={day ? "#8d8576" : "#5f5a52"} />
      {Array.from({ length: Math.floor(len / 2) }).map((_, i) => (
        <B key={i} p={[0, 0.01, 6 - i * 2]} s={[8, 0.01, 0.06]} c="#4a463f" />
      ))}
      {/* walls */}
      {[-4, 4].map((x) => (
        <React.Fragment key={x}>
          <B p={[x, 1.3, zc]} s={[0.2, 2.6, len]} c={lower} />
          <B p={[x, 4.8, zc]} s={[0.2, 4.4, len]} c={upper} />
          <B p={[x * 0.985, 2.65, zc]} s={[0.1, 0.12, len]} c="#7a6a4a" />
        </React.Fragment>
      ))}
      <B p={[0, 7.05, zc]} s={[8, 0.1, len]} c="#8c8a84" />
      {/* side doors (right wall) */}
      {["10", "11", "12"].map((n, i) => (
        <Door key={n} p={[3.85, 0, -6 - i * 10]} ry={-Math.PI / 2} label={n} />
      ))}
      {/* windows (left wall) */}
      {[-2, -12, -22, -32].map((z) => (
        <group key={z} position={[-3.88, 0, z]}>
          <B p={[0, 4.3, 0]} s={[0.06, 2.6, 3.6]} c={day ? "#cfe6ff" : "#16203a"} glow={day} />
          <B p={[0.05, 4.3, 0]} s={[0.08, 2.6, 0.12]} c="#e8e8e8" />
          <B p={[0.05, 4.3, 0]} s={[0.08, 0.12, 3.6]} c="#e8e8e8" />
        </group>
      ))}
      {/* ceiling lights */}
      {Array.from({ length: Math.ceil(L / 8) + 1 }).map((_, i) => {
        const on = lights * (flickerAmt > 0 ? flick(t, i + 1, 1, 1 - flickerAmt) : 1);
        return <TubeLight key={i} p={[0, 6.8, 2 - i * 8]} on={on} light={i % 2 === 0} />;
      })}
      {/* end wall with doorway x∈[-1.3,1.3], y<5.2 */}
      <B p={[-2.65, 3.5, -L]} s={[2.7, 7, 0.3]} c={upper} />
      <B p={[2.65, 3.5, -L]} s={[2.7, 7, 0.3]} c={upper} />
      <B p={[0, 6.1, -L]} s={[2.6, 1.8, 0.3]} c={upper} />
      {endDoor === "door" ? (
        <Door p={[0, 0, -L + 0.2]} open={open} label="13" red={red} />
      ) : (
        <B p={[0, 2.6, -L]} s={[2.6, 5.2, 0.3]} c={upper} />
      )}
    </group>
  );
};

/* ---------- room 13 behind the end wall (z from -L to -L-14) ---------- */
export const Room13: React.FC<{
  t: number;
  L?: number;
  reveal?: number[];
  lines: string[];
  redLight?: number;
}> = ({ t, L = 40, reveal = [0, 0, 0], lines, redLight = 1 }) => {
  const z0 = -L - 7;
  return (
    <group>
      <B p={[0, -0.05, z0]} s={[12, 0.1, 14]} c="#3a302a" />
      <B p={[0, 7.05, z0]} s={[12, 0.1, 14]} c="#241a18" />
      <B p={[-6, 3.5, z0]} s={[0.3, 7, 14]} c="#3b2a26" />
      <B p={[6, 3.5, z0]} s={[0.3, 7, 14]} c="#3b2a26" />
      <B p={[0, 3.5, -L - 14]} s={[12, 7, 0.3]} c="#3b2a26" />
      {/* blackboard */}
      <B p={[0, 4, -L - 13.8]} s={[9.6, 3.8, 0.12]} c="#3a2a1a" />
      <B p={[0, 4, -L - 13.72]} s={[9.2, 3.4, 0.1]} c="#1c3328" />
      <B p={[0, 2.15, -L - 13.55]} s={[9.2, 0.15, 0.4]} c="#3a2a1a" />
      <TextPlane
        p={[0, 4, -L - 13.62]}
        w={5}
        h={3.2}
        lines={lines}
        reveal={reveal}
        color="#f1f0e6"
        chalk
        weight={700}
        size={0.78}
      />
      {/* single desk + chair */}
      <B p={[0, 2.3, -L - 8]} s={[3, 0.2, 1.8]} c="#5a3d26" />
      {[-1.3, 1.3].map((x) => [-0.7, 0.7].map((z) => <B key={`${x}${z}`} p={[x, 1.1, -L - 8 + z]} s={[0.15, 2.2, 0.15]} c="#2a2a2a" />))}
      <B p={[0, 1.3, -L - 6.6]} s={[1.6, 0.15, 1.4]} c="#5a3d26" />
      {/* dust */}
      {Array.from({ length: 24 }).map((_, i) => (
        <B
          key={i}
          p={[(rand(i) - 0.5) * 10, 1 + ((rand(i + 9) * 6 + t * 0.15) % 6), -L - 2 - rand(i + 4) * 11]}
          s={[0.05, 0.05, 0.05]}
          c="#ffd0c0"
          glow
          opacity={0.6}
        />
      ))}
      <pointLight position={[0, 6, -L - 8]} color="#ff3030" intensity={36 * redLight} distance={18} decay={1.3} />
      <pointLight position={[0, 4, -L - 11]} color="#c9d6ff" intensity={10} distance={8} decay={1.5} />
    </group>
  );
};

/* ---------- classroom ---------- */
export const Clock: React.FC<{ p: V3; hour: number; minute: number }> = ({ p, hour, minute }) => {
  const ha = -((hour % 12) + minute / 60) * (Math.PI / 6);
  const ma = -minute * (Math.PI / 30);
  return (
    <group position={p}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.15, 32]} />
        <meshLambertMaterial color="#f2efe6" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.02]}>
        <cylinderGeometry args={[1.12, 1.12, 0.12, 32]} />
        <meshLambertMaterial color="#202020" />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <B key={i} p={[Math.sin(a) * 0.82, Math.cos(a) * 0.82, 0.09]} s={[0.08, 0.2, 0.02]} r={[0, 0, -a]} c="#202020" />;
      })}
      <group rotation={[0, 0, ha]} position={[0, 0, 0.11]}>
        <B p={[0, 0.25, 0]} s={[0.1, 0.55, 0.03]} c="#111" />
      </group>
      <group rotation={[0, 0, ma]} position={[0, 0, 0.13]}>
        <B p={[0, 0.36, 0]} s={[0.06, 0.78, 0.03]} c="#111" />
      </group>
      <B p={[0, 0, 0.15]} s={[0.12, 0.12, 0.03]} c="#b02020" />
    </group>
  );
};

export const Desk: React.FC<{ p: V3 }> = ({ p }) => (
  <group position={p}>
    <B p={[0, 2.4, 0]} s={[3.2, 0.18, 1.8]} c="#7a5634" />
    {[-1.4, 1.4].map((x) => [-0.7, 0.7].map((z) => <B key={`${x}${z}`} p={[x, 1.2, z]} s={[0.14, 2.4, 0.14]} c="#2f2f2f" />))}
    <B p={[0, 1.5, 1.6]} s={[2.2, 0.15, 1.2]} c="#7a5634" />
    <B p={[0, 2.4, 2.2]} s={[2.2, 1.6, 0.12]} c="#7a5634" />
    {[-0.9, 0.9].map((x) => [1.1, 2.1].map((z) => <B key={`c${x}${z}`} p={[x, 0.75, z]} s={[0.12, 1.5, 0.12]} c="#2f2f2f" />))}
  </group>
);

/** Classroom: front wall (board) at z=-10, windows on x=-9. `dusk` 0 = sunset, 1 = night. */
export const Classroom: React.FC<{ dusk: number; hour: number; minute: number; lights?: number }> = ({
  dusk,
  hour,
  minute,
  lights = 0,
}) => {
  const sky = dusk < 0.5 ? "#ff9a4a" : dusk < 0.8 ? "#5a4a8a" : "#121a36";
  return (
    <group>
      <B p={[0, -0.05, -1]} s={[18, 0.1, 18]} c="#6a4e36" />
      <B p={[0, 7.55, -1]} s={[18, 0.1, 18]} c="#c9c4b4" />
      <B p={[0, 3.75, -10]} s={[18, 7.5, 0.3]} c="#d6ceb6" />
      <B p={[0, 3.75, 8]} s={[18, 7.5, 0.3]} c="#d6ceb6" />
      <B p={[9, 3.75, -1]} s={[0.3, 7.5, 18]} c="#d6ceb6" />
      <B p={[-9, 1, -1]} s={[0.3, 2, 18]} c="#d6ceb6" />
      <B p={[-9, 6.75, -1]} s={[0.3, 1.5, 18]} c="#d6ceb6" />
      {[-7, -1, 5].map((z) => (
        <group key={z}>
          <B p={[-9.05, 4, z]} s={[0.1, 4, 4.4]} c={sky} glow />
          <B p={[-8.95, 4, z]} s={[0.12, 4, 0.15]} c="#f0f0f0" />
          <B p={[-8.95, 4, z]} s={[0.12, 0.15, 4.4]} c="#f0f0f0" />
        </group>
      ))}
      {[-4, 2].map((z) => (
        <B key={`p${z}`} p={[-9.1, 3.75, z]} s={[0.1, 7.5, 1.6]} c="#d6ceb6" />
      ))}
      <directionalLight
        position={[-20, 8, 4]}
        color={dusk < 0.5 ? "#ffb070" : "#6070b0"}
        intensity={dusk < 0.5 ? 1.6 : 0.5 * (1 - dusk) + 0.15}
      />
      {/* board + clock */}
      <B p={[0, 3.6, -9.8]} s={[10, 3.4, 0.12]} c="#3a2a1a" />
      <B p={[0, 3.6, -9.72]} s={[9.6, 3, 0.1]} c="#1e3a2c" />
      <Clock p={[0, 6.4, -9.78]} hour={hour} minute={minute} />
      <B p={[5.6, 1.4, -7.4]} s={[3.4, 2.8, 1.6]} c="#5a3d26" />
      {[-5, 0, 5].map((x) => [-4, 1, 6].map((z) => (x === 0 && z === 1 ? null : <Desk key={`${x}${z}`} p={[x, 0, z - 1.6]} />)))}
      <Desk p={[0, 0, -0.6]} />
      {[-4, 4].map((x) => (
        <TubeLight key={x} p={[x, 7.3, -1]} on={lights} light />
      ))}
    </group>
  );
};

/* ---------- school exterior at night ---------- */
export const School: React.FC<{ t: number }> = ({ t }) => (
  <group>
    <color attach="background" args={["#0b1230"]} />
    <fog attach="fog" args={["#0b1230", 30, 120]} />
    <ambientLight intensity={0.8} color="#5a6ea8" />
    <hemisphereLight args={["#7d94d6", "#1a1410", 0.9]} />
    <directionalLight position={[-20, 40, 25]} intensity={1.4} color="#b3c6ff" />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[300, 300]} />
      <meshLambertMaterial color="#2a3324" />
    </mesh>
    <B p={[0, 0.02, 14]} s={[8, 0.04, 30]} c="#4f4a44" />
    <B p={[0, 8, -2]} s={[42, 16, 10]} c="#c4b28a" />
    <B p={[0, 16.3, -2]} s={[43, 0.6, 11]} c="#7a6a50" />
    {Array.from({ length: 3 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => {
        const x = -17.5 + col * 5;
        if (row === 0 && (col === 3 || col === 4)) return null;
        const lit = rand(row * 10 + col) > 0.85;
        return <B key={`${row}-${col}`} p={[x, 3 + row * 5, 3.05]} s={[2.6, 2.8, 0.1]} c={lit ? "#ffcf6a" : "#1a2440"} glow={lit} />;
      }),
    )}
    {/* entrance */}
    <B p={[0, 2.6, 3.3]} s={[6, 5.2, 0.4]} c="#2a1c12" />
    <B p={[0, 6.4, 3.6]} s={[9, 0.5, 2]} c="#8a7a5a" />
    {[-3.6, 3.6].map((x) => <B key={x} p={[x, 3.1, 4.2]} s={[0.6, 6.2, 0.6]} c="#d8d0bc" />)}
    <B p={[0, 7.6, 3.15]} s={[9, 1.2, 0.1]} c="#2a4aa0" />
    <TextPlane p={[0, 7.6, 3.25]} w={8.6} h={1.1} lines={["13-MAKTAB"]} color="#ffffff" size={0.75} />
    {/* red window: the room that should not exist */}
    <B p={[20.5, 13, 3.05]} s={[2.6, 2.8, 0.1]} c={Math.sin(t * 6) > 0 ? "#ff2a2a" : "#7a0a0a"} glow />
    <pointLight position={[20.5, 13, 5]} color="#ff2a2a" intensity={20} distance={10} decay={1.5} />
    {/* trees + moon */}
    {[-26, -30, 26, 31, -12, 12].map((x, i) => (
      <group key={x} position={[x, 0, 10 + (i % 2) * 6]}>
        <B p={[0, 2, 0]} s={[0.7, 4, 0.7]} c="#3a2a1a" />
        <B p={[0, 6, 0]} s={[3.6, 5, 3.6]} c="#1d3a24" />
      </group>
    ))}
    <mesh position={[-25, 45, -90]}>
      <sphereGeometry args={[9, 24, 24]} />
      <meshBasicMaterial color="#eef2d0" toneMapped={false} fog={false} />
    </mesh>
  </group>
);

/* ---------- wall calendar ---------- */
export const Calendar: React.FC<{ p: V3; flip: number; from: string; to: string }> = ({ p, flip, from, to }) => (
  <group position={p}>
    <B p={[0, 0, 0]} s={[2.4, 3, 0.06]} c="#f4f1ea" />
    <B p={[0, 1.15, 0.04]} s={[2.4, 0.7, 0.04]} c="#c81e1e" />
    <TextPlane p={[0, 1.15, 0.08]} w={2.3} h={0.6} lines={["NOYABR"]} color="#ffffff" size={0.7} />
    <TextPlane p={[0, -0.3, 0.05]} w={2.3} h={2} lines={[to]} color="#c81e1e" size={0.8} />
    {/* old page flips up around its top edge */}
    {flip < 0.98 ? (
      <group position={[0, 0.8, 0.09]} rotation={[-flip * 2.8, 0, 0]}>
        <B p={[0, -1.1, 0]} s={[2.4, 2.2, 0.03]} c="#fbf9f4" />
        <TextPlane p={[0, -1.1, 0.03]} w={2.3} h={2} lines={[from]} color="#1d1d1d" size={0.8} />
      </group>
    ) : null}
  </group>
);
