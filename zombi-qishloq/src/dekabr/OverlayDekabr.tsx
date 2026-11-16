import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, shakeNoise } from "../anim";
import { buildGroups, Captions, fontFamily, Grain, STROKE, Vignette } from "../common/ui";
import { END_CARD_T, FLASHES, LINES, OUR_OFF, SCENES } from "./data";

const GROUPS = buildGroups(LINES);

const useSpringAt = (t: number, at: number, damping = 11, stiffness = 200) => {
  const { fps } = useVideoConfig();
  return spring({ frame: Math.round((t - at) * fps), fps, config: { damping, stiffness } });
};
const fadeWin = (t: number, a: number, b: number) =>
  interpolate(t, [a, a + 0.15, b - 0.2, b], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const HookTitle: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, 0, 9, 170);
  const b = useSpringAt(t, 1.8, 8, 220);
  const op = fadeWin(t, 0, SCENES.hook[1]);
  return (
    <div style={{ position: "absolute", top: 200, left: 60, right: 60, textAlign: "center", fontFamily, opacity: op }}>
      <div style={{ fontSize: 80, fontWeight: 900, color: "#fff", textShadow: STROKE, transform: `scale(${a})` }}>HAR YILI</div>
      <div style={{ fontSize: 132, fontWeight: 900, color: "#FFE600", textShadow: `${STROKE}, 0 0 40px rgba(255,220,80,.5)`, transform: `scale(${a})`, lineHeight: 1.0 }}>1 ODAM</div>
      <div style={{ fontSize: 96, fontWeight: 900, color: "#ff3030", textShadow: STROKE, transform: `scale(${b}) rotate(-3deg)`, marginTop: 8 }}>YO‘QOLADI</div>
    </div>
  );
};

const CalendarCard: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, 7.1, 10, 200);
  const op = fadeWin(t, 7.1, 9.8);
  if (op <= 0) return null;
  return (
    <div style={{ position: "absolute", top: 200, left: "50%", transform: `translateX(-50%) scale(${a}) rotate(-3deg)`, opacity: op, fontFamily }}>
      <div style={{ width: 420, background: "#fbf8f0", borderRadius: 24, border: "6px solid #111", boxShadow: "0 16px 0 #111", overflow: "hidden", textAlign: "center" }}>
        <div style={{ background: "#c81e1e", color: "#fff", fontSize: 64, fontWeight: 900, padding: "12px 0" }}>DEKABR</div>
        <div style={{ fontSize: 230, fontWeight: 900, color: "#111", lineHeight: 1.05 }}>1</div>
      </div>
    </div>
  );
};

const RulePaper: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, 20.5, 9, 200);
  const op = fadeWin(t, 20.5, SCENES.rule[1]);
  if (op <= 0) return null;
  return (
    <div style={{ position: "absolute", top: 170, left: 90, right: 90, transform: `scale(${a}) rotate(2deg)`, opacity: op, fontFamily }}>
      <div style={{ background: "#f3ead6", border: "6px solid #111", borderRadius: 18, boxShadow: "0 16px 0 #111", padding: "26px 30px", textAlign: "center" }}>
        <div style={{ fontSize: 76, fontWeight: 900, color: "#c81e1e", letterSpacing: 6 }}>QOIDA</div>
        <div style={{ fontSize: 54, fontWeight: 900, color: "#111", lineHeight: 1.15, marginTop: 6 }}>1-DEKABR KECHASI</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: "#111", lineHeight: 1.1 }}>DERAZADAN</div>
        <div style={{ fontSize: 80, fontWeight: 900, color: "#c81e1e", lineHeight: 1.1 }}>QARAMA!</div>
      </div>
    </div>
  );
};

/** Window frame for the POV shot of the crowd. */
const WindowFrame: React.FC<{ t: number }> = ({ t }) => {
  if (t < SCENES.crowd[0] || t > SCENES.crowd[0] + 3.1) return null;
  const fog = 0.25 + Math.sin(t * 2) * 0.05;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ border: "70px solid #2a1c12", boxShadow: "inset 0 0 0 10px #140c06" }} />
      <div style={{ position: "absolute", top: 70, bottom: 70, left: "50%", width: 28, marginLeft: -14, background: "#2a1c12" }} />
      <div style={{ position: "absolute", left: 70, right: 70, top: "38%", height: 28, background: "#2a1c12" }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0) 40%, rgba(220,230,255,${fog}) 100%)` }} />
    </AbsoluteFill>
  );
};

const Heart: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.2 4 6.2 4c2.3 0 3.9 1.4 4.8 2.8C11.9 5.4 13.5 4 15.8 4c4 0 5.8 4.4 4.2 7.7C19.5 16.4 12 21 12 21z" fill="#ff2d55" stroke="#000" strokeWidth="1.2" />
  </svg>
);

const EndCard: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, END_CARD_T, 10, 170);
  const b = useSpringAt(t, 35.49, 9, 200);
  const h = useSpringAt(t, 36.0, 6, 220);
  const c = useSpringAt(t, 36.61, 9, 200);
  if (t < END_CARD_T) return null;
  const pulse = 1 + Math.sin(t * 8) * 0.05;
  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center" }}>
      <div style={{ position: "absolute", top: 210, left: 60, right: 60, textAlign: "center", transform: `scale(${a})` }}>
        <div style={{ fontSize: 100, fontWeight: 900, color: "#fff", textShadow: STROKE, lineHeight: 1.05 }}>SIZ</div>
        <div style={{ fontSize: 104, fontWeight: 900, color: "#FFE600", textShadow: STROKE, lineHeight: 1.05 }}>QARARDINGIZMI?</div>
      </div>
      <div style={{ position: "absolute", top: 1250, transform: `scale(${b})`, fontSize: 80, fontWeight: 900, color: "#fff", textShadow: STROKE }}>IZOHDA YOZING ↓</div>
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

export const OverlayDekabr: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const flash = FLASHES.reduce((m, f) => Math.max(m, t >= f ? clamp(1 - (t - f) / 0.2, 0, 1) : 0), 0);
  const black = interpolate(t, [OUR_OFF, OUR_OFF + 0.05, OUR_OFF + 0.7, OUR_OFF + 1.8], [0, 0.92, 0.92, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const jitter = t > OUR_OFF - 0.3 && t < OUR_OFF ? shakeNoise(t, 2) * 0.4 : 0;
  const topBusy = t < SCENES.hook[1] || (t > 7.1 && t < 9.8) || (t > 20.5 && t < SCENES.rule[1]);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(20,40,90,.22), rgba(0,0,0,0) 45%, rgba(10,20,50,.3))" }} />
      <WindowFrame t={t} />
      <Vignette strength={0.8} />
      <Grain frame={frame} opacity={0.09} />
      <AbsoluteFill style={{ background: "#000", opacity: Math.max(black, jitter > 0.2 ? 0.6 : 0) }} />
      <HookTitle t={t} />
      <CalendarCard t={t} />
      <RulePaper t={t} />
      <Captions t={t} groups={GROUPS} top={topBusy ? "66%" : "60%"} hideAfter={END_CARD_T} />
      <EndCard t={t} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.8 }} />
    </AbsoluteFill>
  );
};
