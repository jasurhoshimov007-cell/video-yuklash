import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, easeOut, rand } from "../anim";
import { buildGroups, Captions, fontFamily, Grain, STROKE, Vignette } from "../common/ui";
import { END_CARD_T, FLASHES, LINES, SCENES, STOP_T } from "./data";

const GROUPS = buildGroups(LINES);

const useSpringAt = (t: number, at: number, damping = 11, stiffness = 200) => {
  const { fps } = useVideoConfig();
  return spring({ frame: Math.round((t - at) * fps), fps, config: { damping, stiffness } });
};
const fadeWin = (t: number, a: number, b: number) =>
  interpolate(t, [a, a + 0.15, b - 0.2, b], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const Top: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <div style={{ position: "absolute", top: 190, left: 70, right: 70, display: "flex", flexDirection: "column", alignItems: "center", fontFamily, opacity }}>
    {children}
  </div>
);

const HookTitle: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, 0, 8, 170);
  const b = useSpringAt(t, 0.5, 9, 200);
  if (t > 2.95) return null;
  return (
    <Top>
      <div style={{ fontSize: 76, fontWeight: 900, color: "#fff", textShadow: STROKE, transform: `scale(${b})` }}>AGAR YER</div>
      <div style={{ fontSize: 190, fontWeight: 900, color: "#FFE600", textShadow: `${STROKE}, 0 0 50px rgba(255,230,0,.6)`, transform: `scale(${a})`, lineHeight: 1 }}>
        5 SONIYA
      </div>
      <div style={{ fontSize: 76, fontWeight: 900, color: "#fff", textShadow: STROKE, transform: `scale(${b})` }}>TO‘XTASA?</div>
    </Top>
  );
};

const Stop: React.FC<{ t: number; at: number }> = ({ t, at }) => {
  const s = useSpringAt(t, at, 7, 260);
  if (t < at || t > at + 0.75) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 560,
          height: 560,
          background: "#d81e1e",
          clipPath: "polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${2.2 - s * 1.2}) rotate(${(1 - s) * 20}deg)`,
          opacity: s,
          fontFamily,
          fontWeight: 900,
          fontSize: 170,
          color: "#fff",
          marginTop: -300,
        }}
      >
        STOP
      </div>
    </AbsoluteFill>
  );
};

const SpeedCounter: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, 5.4);
  const op = fadeWin(t, SCENES.speed[0] + 0.05, SCENES.speed[1]);
  if (op <= 0) return null;
  const v = Math.round(easeOut(clamp((t - 5.6) / 3.0, 0, 1)) * 1670);
  return (
    <Top opacity={op}>
      <div style={{ fontSize: 52, fontWeight: 700, color: "#cfe4ff", textShadow: STROKE, letterSpacing: 4 }}>EKVATORDA</div>
      <div style={{ fontSize: 200, fontWeight: 900, color: "#FFE600", textShadow: `${STROKE}, 0 0 50px rgba(255,230,0,.5)`, transform: `scale(${a})`, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {v.toLocaleString("en-US").replace(",", " ")}
      </div>
      <div style={{ fontSize: 76, fontWeight: 900, color: "#fff", textShadow: STROKE }}>KM / SOAT</div>
    </Top>
  );
};

const Together: React.FC<{ t: number }> = ({ t }) => {
  const op = fadeWin(t, 11.4, SCENES.calm[1]);
  if (op <= 0) return null;
  const shift = ((t * 220) % 120) - 60;
  return (
    <Top opacity={op}>
      <div style={{ fontSize: 70, fontWeight: 900, color: "#fff", textShadow: STROKE }}>HAMMASI BIRGA</div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 6 }}>
        <div style={{ fontSize: 110, fontWeight: 900, color: "#FFE600", textShadow: STROKE, transform: `translateX(${shift * 0.2}px)` }}>➜</div>
        <div style={{ fontSize: 84, fontWeight: 900, color: "#FFE600", textShadow: STROKE }}>1670 KM/SOAT</div>
      </div>
    </Top>
  );
};

const Bars: React.FC<{ t: number; win: [number, number]; title: string; a: [string, number, string]; b: [string, number, string] }> = ({ t, win, title, a, b }) => {
  const op = fadeWin(t, win[0], win[1]);
  if (op <= 0) return null;
  const grow = easeOut(clamp((t - win[0] - 0.1) / 0.9, 0, 1));
  const max = Math.max(a[1], b[1]);
  const Row: React.FC<{ r: [string, number, string]; color: string; big?: boolean }> = ({ r, color, big }) => (
    <div style={{ marginTop: 18, width: "100%" }}>
      <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", textShadow: STROKE, marginBottom: 8 }}>{r[0]}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ height: big ? 78 : 64, width: `${(r[1] / max) * 72 * grow}%`, background: color, border: "5px solid #000", borderRadius: 14, boxShadow: "0 8px 0 #000" }} />
        <div style={{ fontSize: big ? 60 : 50, fontWeight: 900, color, textShadow: STROKE, whiteSpace: "nowrap" }}>{r[2]}</div>
      </div>
    </div>
  );
  return (
    <div style={{ position: "absolute", top: 170, left: 80, right: 80, fontFamily, opacity: op }}>
      <div style={{ fontSize: 64, fontWeight: 900, color: "#FFE600", textShadow: STROKE, textAlign: "center" }}>{title}</div>
      <Row r={a} color="#9fd0ff" />
      <Row r={b} color="#ff4a3a" big />
    </div>
  );
};

const SpeedLines: React.FC<{ t: number; on: number }> = ({ t, on }) => {
  if (on <= 0) return null;
  return (
    <AbsoluteFill style={{ opacity: on * 0.55, overflow: "hidden" }}>
      {Array.from({ length: 26 }).map((_, i) => {
        const y = rand(i) * 1920;
        const w = 200 + rand(i + 1) * 500;
        const x = ((t * (2600 + rand(i + 2) * 1800) + rand(i + 3) * 3000) % 2600) - 800;
        return <div key={i} style={{ position: "absolute", top: y, left: x, width: w, height: 4 + rand(i + 4) * 6, background: "rgba(255,255,255,.9)", borderRadius: 4 }} />;
      })}
    </AbsoluteFill>
  );
};

const Heart: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.2 4 6.2 4c2.3 0 3.9 1.4 4.8 2.8C11.9 5.4 13.5 4 15.8 4c4 0 5.8 4.4 4.2 7.7C19.5 16.4 12 21 12 21z" fill="#ff2d55" stroke="#000" strokeWidth="1.2" />
  </svg>
);

const EndCard: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, END_CARD_T + 0.1, 10, 170);
  const b = useSpringAt(t, 29.02, 9, 200);
  const h = useSpringAt(t, 29.5, 6, 220);
  const c = useSpringAt(t, 30.03, 9, 200);
  if (t < END_CARD_T) return null;
  const pulse = 1 + Math.sin(t * 8) * 0.05;
  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center" }}>
      <div style={{ position: "absolute", top: 200, left: 60, right: 60, textAlign: "center", transform: `scale(${a})` }}>
        <div style={{ fontSize: 96, fontWeight: 900, color: "#fff", textShadow: STROKE, lineHeight: 1.05 }}>SIZ BUNI</div>
        <div style={{ fontSize: 104, fontWeight: 900, color: "#FFE600", textShadow: STROKE, lineHeight: 1.05 }}>BILARMIDINGIZ?</div>
      </div>
      <div style={{ position: "absolute", top: 1240, transform: `scale(${b})`, fontSize: 80, fontWeight: 900, color: "#fff", textShadow: STROKE }}>IZOHDA YOZING ↓</div>
      <div style={{ position: "absolute", top: 1390, display: "flex", alignItems: "center", gap: 36 }}>
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

export const OverlayYer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const flash = FLASHES.reduce((m, f) => Math.max(m, t >= f ? clamp(1 - (t - f) / 0.22, 0, 1) : 0), 0);
  const lines =
    t >= SCENES.chaos[0] && t < SCENES.chaos[1] ? 1 : t >= 16.1 && t < SCENES.fly[1] ? 1 : t >= SCENES.wind[0] && t < SCENES.wind[1] ? 0.6 : 0;
  const red = t >= SCENES.chaos[0] && t < SCENES.chaos[1] ? 0.22 : 0;
  const blue = interpolate(t, [24.0, 24.5], [0, 0.95], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (t < SCENES.wave[1] ? 1 : 0);
  const topBusy = t < 2.95 || (t > 5.3 && t < 10) || (t > 11.4 && t < 14.3) || (t > 17.3 && t < 20.9) || (t > 24.7 && t < 27.4);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "#ff2010", opacity: red, mixBlendMode: "multiply" }} />
      <Vignette strength={0.55} />
      <Grain frame={frame} opacity={0.06} />
      <SpeedLines t={t} on={lines} />
      <AbsoluteFill style={{ background: "#1a5fa8", opacity: blue }} />
      <HookTitle t={t} />
      <SpeedCounter t={t} />
      <Together t={t} />
      <Bars t={t} win={[17.3, 20.9]} title="OVOZDAN TEZ!" a={["Ovoz tezligi", 343, "343 m/s"]} b={["Siz uchasiz", 465, "465 m/s"]} />
      <Bars t={t} win={[24.7, 27.4]} title="BO‘RONDAN KUCHLI!" a={["Eng kuchli bo‘ron", 300, "~300 km/soat"]} b={["Bu shamol", 1670, "1670 km/soat"]} />
      <Captions t={t} groups={GROUPS} top={topBusy ? "64%" : "60%"} hideAfter={END_CARD_T} />
      <Stop t={t} at={2.95} />
      <Stop t={t} at={STOP_T} />
      <EndCard t={t} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.8 }} />
    </AbsoluteFill>
  );
};
