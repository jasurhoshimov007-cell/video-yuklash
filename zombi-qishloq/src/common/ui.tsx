import { loadFont } from "@remotion/fonts";
import React from "react";
import { AbsoluteFill, spring, staticFile, useVideoConfig } from "remotion";

export const fontFamily = "Poppins";
loadFont({ family: fontFamily, url: staticFile("fonts/Poppins-700.ttf"), weight: "700" });
loadFont({ family: fontFamily, url: staticFile("fonts/Poppins-900.ttf"), weight: "900" });

export const STROKE =
  "0 0 2px #000, 4px 4px 0 #000, -4px 4px 0 #000, 4px -4px 0 #000, -4px -4px 0 #000, 0 8px 18px rgba(0,0,0,.8)";

export type Line = { t0: number; t1: number; text: string };
type W = { w: string; t0: number; t1: number };

/** Splits voice lines into ≤3-word karaoke groups, timed by word length. */
export const buildGroups = (lines: Line[]): W[][] => {
  const groups: W[][] = [];
  for (const line of lines) {
    const words = line.text.split(" ").filter((w) => w !== "—");
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

/** Karaoke captions. `t` is in the same time base as the groups; `k` converts it to real seconds. */
export const Captions: React.FC<{ t: number; groups: W[][]; k?: number; top?: string; hideAfter?: number }> = ({
  t,
  groups,
  k = 1,
  top = "60%",
  hideAfter = Infinity,
}) => {
  const { fps } = useVideoConfig();
  if (t > hideAfter) return null;
  const g = groups.find((gr) => t >= gr[0].t0 && t < gr[gr.length - 1].t1 + 0.15);
  if (!g) return null;
  const pop = spring({ frame: Math.round((t - g[0].t0) * k * fps), fps, config: { damping: 11, stiffness: 220 } });
  return (
    <div
      style={{
        position: "absolute",
        top,
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

export const Grain: React.FC<{ frame: number; opacity?: number }> = ({ frame, opacity = 0.09 }) => (
  <AbsoluteFill style={{ opacity, mixBlendMode: "overlay" }}>
    <svg width="100%" height="100%">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 30} stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.75 }) => (
  <AbsoluteFill
    style={{ background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,${strength}) 100%)` }}
  />
);
