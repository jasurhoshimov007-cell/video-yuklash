import { loadFont } from "@remotion/fonts";
import React from "react";
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, shakeNoise } from "./anim";
import { END_CARD_T, FLASHES, LINES } from "./data";

const fontFamily = "Poppins";
loadFont({ family: fontFamily, url: staticFile("fonts/Poppins-700.ttf"), weight: "700" });
loadFont({ family: fontFamily, url: staticFile("fonts/Poppins-900.ttf"), weight: "900" });

const STROKE = "0 0 2px #000, 4px 4px 0 #000, -4px 4px 0 #000, 4px -4px 0 #000, -4px -4px 0 #000, 0 8px 18px rgba(0,0,0,.8)";

/* ---- karaoke captions: up to 3 words, active word yellow ---- */
type W = { w: string; t0: number; t1: number };
const buildWords = (): W[][] => {
  const groups: W[][] = [];
  for (const line of LINES) {
    const words = line.text.split(" ");
    const total = words.reduce((a, w) => a + w.length + 2, 0);
    let acc = line.t0;
    const ws: W[] = words.map((w) => {
      const d = ((w.length + 2) / total) * (line.t1 - line.t0);
      const r = { w, t0: acc, t1: acc + d };
      acc += d;
      return r;
    });
    for (let i = 0; i < ws.length; i += 3) groups.push(ws.slice(i, i + 3));
  }
  return groups;
};
const GROUPS = buildWords();

const Captions: React.FC<{ t: number }> = ({ t }) => {
  const { fps } = useVideoConfig();
  if (t > END_CARD_T) return null;
  const g = GROUPS.find((gr) => t >= gr[0].t0 && t < gr[gr.length - 1].t1 + 0.12);
  if (!g) return null;
  const pop = spring({ frame: Math.round((t - g[0].t0) * fps), fps, config: { damping: 11, stiffness: 220 } });
  return (
    <div
      style={{
        position: "absolute",
        top: "60%",
        left: 70,
        right: 70,
        textAlign: "center",
        transform: `translateY(-50%) scale(${0.7 + pop * 0.3})`,
        fontFamily,
        fontWeight: 900,
        fontSize: 92,
        lineHeight: 1.1,
        textTransform: "uppercase",
        letterSpacing: 1,
      }}
    >
      {g.map((w, i) => {
        const active = t >= w.t0;
        const now = t >= w.t0 && t < w.t1;
        return (
          <span
            key={i}
            style={{
              color: now ? "#FFE600" : active ? "#ffffff" : "rgba(255,255,255,.55)",
              textShadow: STROKE,
              display: "inline-block",
              margin: "0 12px",
              transform: now ? "scale(1.1)" : "none",
            }}
          >
            {w.w}
          </span>
        );
      })}
    </div>
  );
};

/* ---- hook title ---- */
const HookTitle: React.FC<{ t: number }> = ({ t }) => {
  const { fps } = useVideoConfig();
  if (t > 3.3) return null;
  const a = spring({ frame: Math.round(t * fps), fps, config: { damping: 9, stiffness: 160 } });
  const b = spring({ frame: Math.round((t - 0.35) * fps), fps, config: { damping: 8, stiffness: 180 } });
  const jx = shakeNoise(t, 3) * 6;
  const jy = shakeNoise(t, 5) * 6;
  const out = interpolate(t, [3.0, 3.3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 210, left: 60, right: 60, textAlign: "center", fontFamily, opacity: out }}>
      <div style={{ fontWeight: 900, fontSize: 70, color: "#fff", textShadow: STROKE, transform: `scale(${a})`, letterSpacing: 4 }}>
        QISHLOQDA
      </div>
      <div
        style={{
          fontWeight: 900,
          fontSize: 132,
          lineHeight: 1.0,
          color: "#8dff5a",
          textShadow: `${STROKE}, 0 0 40px rgba(120,255,80,.8)`,
          transform: `translate(${jx}px,${jy}px) scale(${b}) rotate(-3deg)`,
          marginTop: 10,
        }}
      >
        ZOMBI
        <br />
        APOKALIPSISI
      </div>
    </div>
  );
};

/* ---- name tag ---- */
const NameTag: React.FC<{ t: number; t0: number; t1: number; text: string; x: number; y: number; color: string }> = ({
  t,
  t0,
  t1,
  text,
  x,
  y,
  color,
}) => {
  const { fps } = useVideoConfig();
  if (t < t0 || t > t1) return null;
  const s = spring({ frame: Math.round((t - t0) * fps), fps, config: { damping: 10, stiffness: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%,-50%) scale(${s}) rotate(-4deg)`,
        background: color,
        color: "#fff",
        fontFamily,
        fontWeight: 900,
        fontSize: 56,
        padding: "10px 30px",
        borderRadius: 18,
        border: "6px solid #000",
        boxShadow: "0 10px 0 #000",
      }}
    >
      {text}
    </div>
  );
};

/* ---- CCTV ---- */
const Cctv: React.FC<{ t: number }> = ({ t }) => {
  if (t < 14.0 || t > 15.6) return null;
  const sec = Math.floor(17 + (t - 14.0));
  return (
    <AbsoluteFill style={{ fontFamily, color: "#fff" }}>
      <AbsoluteFill
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,.25) 0 3px, transparent 3px 7px)",
          mixBlendMode: "multiply",
        }}
      />
      <AbsoluteFill style={{ background: "rgba(40,90,50,.25)", mixBlendMode: "color" }} />
      <div style={{ position: "absolute", top: 130, left: 90, fontSize: 48, fontWeight: 700, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 30, height: 30, borderRadius: 15, background: Math.floor(t * 2) % 2 ? "#ff2a2a" : "transparent" }} />
        REC
      </div>
      <div style={{ position: "absolute", top: 130, right: 90, fontSize: 44, fontWeight: 700 }}>CAM 03</div>
      <div style={{ position: "absolute", bottom: 160, left: 90, fontSize: 44, fontWeight: 700 }}>
        03:{String(sec).padStart(2, "0")}:{String(Math.floor((t * 30) % 30)).padStart(2, "0")}
      </div>
    </AbsoluteFill>
  );
};

/* ---- end card ---- */
const EndCard: React.FC<{ t: number }> = ({ t }) => {
  const { fps } = useVideoConfig();
  if (t < END_CARD_T) return null;
  const a = spring({ frame: Math.round((t - END_CARD_T) * fps), fps, config: { damping: 10, stiffness: 160 } });
  const b = spring({ frame: Math.round((t - 40.1) * fps), fps, config: { damping: 9, stiffness: 180 } });
  const c = spring({ frame: Math.round((t - 41.0) * fps), fps, config: { damping: 9, stiffness: 180 } });
  const pulse = 1 + Math.sin(t * 8) * 0.04;
  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center" }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,0) 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,.7))" }} />
      <div style={{ position: "absolute", top: 230, left: 70, right: 70, textAlign: "center", transform: `scale(${a})` }}>
        <div style={{ fontSize: 84, fontWeight: 900, color: "#fff", textShadow: STROKE, lineHeight: 1.1 }}>SIZNINGCHA</div>
        <div style={{ fontSize: 96, fontWeight: 900, color: "#FFE600", textShadow: STROKE, lineHeight: 1.1 }}>NIMA BO‘LADI?</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1260,
          transform: `scale(${b})`,
          fontSize: 78,
          fontWeight: 900,
          color: "#fff",
          textShadow: STROKE,
        }}
      >
        IZOHDA YOZING ↓
      </div>
      <div
        style={{
          position: "absolute",
          top: 1440,
          transform: `scale(${c * pulse})`,
          background: "#e8202a",
          color: "#fff",
          fontSize: 66,
          fontWeight: 900,
          padding: "22px 60px",
          borderRadius: 26,
          border: "6px solid #000",
          boxShadow: "0 12px 0 #000",
        }}
      >
        OBUNA BO‘LING
      </div>
    </AbsoluteFill>
  );
};

/* ---- film look ---- */
const Grain: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill style={{ opacity: 0.09, mixBlendMode: "overlay" }}>
    <svg width="100%" height="100%">
      <filter id="g">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 30} stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#g)" />
    </svg>
  </AbsoluteFill>
);

export const Overlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const flash = FLASHES.reduce((m, f) => Math.max(m, t >= f ? clamp(1 - (t - f) / 0.22, 0, 1) : 0), 0);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(20,60,30,.18), rgba(0,0,0,0) 35%, rgba(10,30,40,.25))" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,.75) 100%)" }} />
      <Grain frame={frame} />
      <Cctv t={t} />
      <HookTitle t={t} />
      <NameTag t={t} t0={5.2} t1={6.95} text="JASUR" x={330} y={700} color="#2f6fe0" />
      <NameTag t={t} t0={5.85} t1={6.95} text="BIR QIZ" x={760} y={760} color="#e23f6c" />
      <NameTag t={t} t0={23.5} t1={24.9} text="MADINA" x={540} y={620} color="#e23f6c" />
      <Captions t={t} />
      <EndCard t={t} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.85 }} />
    </AbsoluteFill>
  );
};
