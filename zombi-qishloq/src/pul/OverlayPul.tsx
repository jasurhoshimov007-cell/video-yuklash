import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, easeOut } from "../anim";
import { buildGroups, Captions, fontFamily, Grain, STROKE, Vignette } from "../common/ui";
import { END_CARD_T, FLASHES, LINES, SCENES } from "./data";

const GROUPS = buildGroups(LINES);

const useSpringAt = (t: number, at: number, damping = 11, stiffness = 200) => {
  const { fps } = useVideoConfig();
  return spring({ frame: Math.round((t - at) * fps), fps, config: { damping, stiffness } });
};
const fmt = (v: number) => "$" + Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const Counter: React.FC<{ t: number; win: [number, number]; from: number; dur: number; title?: string }> = ({ t, win, from, dur, title }) => {
  const a = useSpringAt(t, win[0]);
  if (t < win[0] || t > win[1]) return null;
  const v = easeOut(clamp((t - from) / dur, 0, 1)) * 1_000_000;
  const done = v > 999_990;
  return (
    <div style={{ position: "absolute", top: 190, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", fontFamily }}>
      {title ? <div style={{ fontSize: 66, fontWeight: 900, color: "#fff", textShadow: STROKE, transform: `scale(${a})` }}>{title}</div> : null}
      <div
        style={{
          fontSize: done ? 150 : 140,
          fontWeight: 900,
          color: "#5dff6a",
          textShadow: `${STROKE}, 0 0 50px rgba(90,255,110,.6)`,
          transform: `scale(${a * (done ? 1 + Math.sin(t * 10) * 0.03 : 1)})`,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1.05,
        }}
      >
        {fmt(v)}
      </div>
    </div>
  );
};

const Heart: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.2 4 6.2 4c2.3 0 3.9 1.4 4.8 2.8C11.9 5.4 13.5 4 15.8 4c4 0 5.8 4.4 4.2 7.7C19.5 16.4 12 21 12 21z" fill="#ff2d55" stroke="#000" strokeWidth="1.2" />
  </svg>
);

const VoteBtn: React.FC<{ label: string; color: string; s: number }> = ({ label, color, s }) => (
  <div
    style={{
      transform: `scale(${s})`,
      background: color,
      color: "#fff",
      fontSize: 92,
      fontWeight: 900,
      width: 340,
      textAlign: "center",
      padding: "18px 0",
      borderRadius: 30,
      border: "7px solid #000",
      boxShadow: "0 14px 0 #000",
      textShadow: "0 4px 0 rgba(0,0,0,.4)",
    }}
  >
    {label}
  </div>
);

const EndCard: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, END_CARD_T, 10, 170);
  const v1 = useSpringAt(t, 33.6, 8, 220);
  const v2 = useSpringAt(t, 33.9, 8, 220);
  const b = useSpringAt(t, 35.35, 9, 200);
  const h = useSpringAt(t, 35.9, 6, 220);
  const c = useSpringAt(t, 36.34, 9, 200);
  if (t < END_CARD_T) return null;
  const pulse = 1 + Math.sin(t * 8) * 0.05;
  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center" }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.65), rgba(0,0,0,0) 40%, rgba(0,0,0,0) 50%, rgba(0,0,0,.8))" }} />
      <div style={{ position: "absolute", top: 190, left: 60, right: 60, textAlign: "center", transform: `scale(${a})` }}>
        <div style={{ fontSize: 80, fontWeight: 900, color: "#fff", textShadow: STROKE, lineHeight: 1.08 }}>SIZ PULNI</div>
        <div style={{ fontSize: 96, fontWeight: 900, color: "#FFE600", textShadow: STROKE, lineHeight: 1.08 }}>QAYTARARDINGIZMI?</div>
      </div>
      <div style={{ position: "absolute", top: 520, display: "flex", gap: 50 }}>
        <VoteBtn label="HA" color="#22a84a" s={v1} />
        <VoteBtn label="YO‘Q" color="#e0303a" s={v2} />
      </div>
      <div style={{ position: "absolute", top: 1250, transform: `scale(${b})`, fontSize: 78, fontWeight: 900, color: "#fff", textShadow: STROKE }}>IZOHDA YOZING ↓</div>
      <div style={{ position: "absolute", top: 1400, display: "flex", alignItems: "center", gap: 36 }}>
        <div style={{ transform: `scale(${h * pulse})` }}>
          <Heart size={150} />
        </div>
        <div style={{ transform: `scale(${c * pulse})`, background: "#e8202a", color: "#fff", fontSize: 64, fontWeight: 900, padding: "22px 50px", borderRadius: 26, border: "6px solid #000", boxShadow: "0 12px 0 #000" }}>
          OBUNA BO‘LING
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const OverlayPul: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const flash = FLASHES.reduce((m, f) => Math.max(m, t >= f ? clamp(1 - (t - f) / 0.22, 0, 1) : 0), 0);
  const red = t >= SCENES.mistake[0] && t < SCENES.mistake[1] ? 0.25 : 0;
  const sweep = interpolate(t, [20.9, 21.4, 22.0], [0, 0.35, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const topBusy = t < SCENES.hook[1] || (t > 13.0 && t < 15.8);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "#ff2010", opacity: red, mixBlendMode: "multiply" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(60,30,10,.2), rgba(0,0,0,0) 45%, rgba(30,15,5,.3))" }} />
      <AbsoluteFill style={{ background: "linear-gradient(100deg, rgba(255,246,208,0) 30%, rgba(255,246,208,1) 50%, rgba(255,246,208,0) 70%)", opacity: sweep }} />
      <Vignette strength={0.75} />
      <Grain frame={frame} opacity={0.09} />
      <Counter t={t} win={[0, SCENES.hook[1]]} from={0.3} dur={2.4} title="TASHLANDIQ UYDAN" />
      <Counter t={t} win={[13.2, SCENES.money[1]]} from={13.4} dur={1.9} />
      <Captions t={t} groups={GROUPS} top={topBusy ? "63%" : "60%"} hideAfter={END_CARD_T} />
      <EndCard t={t} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.8 }} />
    </AbsoluteFill>
  );
};
