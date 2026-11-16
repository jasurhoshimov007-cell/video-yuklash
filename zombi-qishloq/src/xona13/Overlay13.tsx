import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, shakeNoise } from "../anim";
import { buildGroups, Captions, fontFamily, Grain, STROKE, Vignette } from "../common/ui";
import { END_CARD_T, FLASHES, K, LINES, NAME, SCENES } from "./data";

const GROUPS = buildGroups(LINES);

const useSpring = (tv: number, at: number, damping = 10, stiffness = 180) => {
  const { fps } = useVideoConfig();
  return spring({ frame: Math.round((tv - at) * K * fps), fps, config: { damping, stiffness } });
};

const Glitch: React.FC<{ text: string; size: number; tv: number; color?: string }> = ({ text, size, tv, color = "#ff2424" }) => {
  const g = Math.sin(tv * 31) > 0.7 ? 1 : 0;
  const dx = shakeNoise(tv, 4) * 8 + g * 14;
  return (
    <div style={{ position: "relative", fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1 }}>
      <div style={{ position: "absolute", inset: 0, color: "#00e5ff", transform: `translate(${-dx}px,0)`, opacity: 0.7 }}>{text}</div>
      <div style={{ position: "absolute", inset: 0, color: "#ff00aa", transform: `translate(${dx}px,0)`, opacity: 0.7 }}>{text}</div>
      <div style={{ position: "relative", color, textShadow: `${STROKE}, 0 0 50px ${color}` }}>{text}</div>
    </div>
  );
};

const HookTitle: React.FC<{ tv: number }> = ({ tv }) => {
  const a = useSpring(tv, 0, 8, 160);
  const b = useSpring(tv, 0.5, 9, 180);
  if (tv > SCENES.hook[1]) return null;
  return (
    <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ transform: `scale(${a}) rotate(-2deg)` }}>
        <Glitch text="13-XONA" size={190} tv={tv} />
      </div>
      <div style={{ marginTop: 20, fontFamily, fontWeight: 900, fontSize: 58, color: "#fff", textShadow: STROKE, transform: `scale(${b})`, letterSpacing: 6 }}>
        MAKTABDAGI SIR
      </div>
    </div>
  );
};

const SchoolText: React.FC<{ tv: number }> = ({ tv }) => {
  const a = useSpring(tv, 3.3);
  const b = useSpring(tv, 4.5, 7, 220);
  if (tv < SCENES.school[0] || tv > SCENES.school[1]) return null;
  return (
    <div style={{ position: "absolute", top: 220, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ fontFamily, fontWeight: 900, fontSize: 110, color: "#fff", textShadow: STROKE, transform: `scale(${a})` }}>12 TA XONA</div>
      {tv > 4.5 ? (
        <div style={{ transform: `scale(${b}) rotate(4deg)` }}>
          <Glitch text="13 ?" size={170} tv={tv} />
        </div>
      ) : null}
    </div>
  );
};

const Poster: React.FC<{ tv: number }> = ({ tv }) => {
  const a = useSpring(tv, SCENES.photo[0], 12, 200);
  if (tv < SCENES.photo[0] || tv > SCENES.photo[1]) return null;
  const border = 70;
  return (
    <AbsoluteFill style={{ transform: `scale(${0.9 + a * 0.1}) rotate(${(1 - a) * -3}deg)` }}>
      <AbsoluteFill
        style={{
          border: `${border}px solid #efe6d0`,
          borderTopWidth: 300,
          borderBottomWidth: 420,
          boxShadow: "inset 0 0 0 6px #2a2a2a",
        }}
      />
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, textAlign: "center", fontFamily, fontWeight: 900, fontSize: 120, color: "#b31212", letterSpacing: 4 }}>
        IZLANMOQDA
      </div>
      <div style={{ position: "absolute", bottom: 210, left: 0, right: 0, textAlign: "center", fontFamily, fontWeight: 900, fontSize: 84, color: "#1d1d1d" }}>
        {NAME}, 12 YOSH
      </div>
      <div style={{ position: "absolute", bottom: 100, left: 0, right: 0, textAlign: "center", fontFamily, fontWeight: 700, fontSize: 64, color: "#3a3a3a" }}>
        Oxirgi marta: 1996-yil, 13-xona
      </div>
    </AbsoluteFill>
  );
};

const TodayStamp: React.FC<{ tv: number }> = ({ tv }) => {
  const a = useSpring(tv, 39.35, 7, 240);
  if (tv < 39.35 || tv > SCENES.calendar[1]) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 380,
        left: "50%",
        transform: `translateX(-50%) scale(${2 - a}) rotate(-10deg)`,
        opacity: a,
        border: "12px solid #e01818",
        color: "#e01818",
        fontFamily,
        fontWeight: 900,
        fontSize: 150,
        padding: "0 40px",
        borderRadius: 20,
        background: "rgba(255,255,255,.15)",
      }}
    >
      BUGUN
    </div>
  );
};

const Heart: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.2 4 6.2 4c2.3 0 3.9 1.4 4.8 2.8C11.9 5.4 13.5 4 15.8 4c4 0 5.8 4.4 4.2 7.7C19.5 16.4 12 21 12 21z"
      fill="#ff2d55"
      stroke="#000"
      strokeWidth="1.2"
    />
  </svg>
);

const EndCard: React.FC<{ tv: number }> = ({ tv }) => {
  const a = useSpring(tv, END_CARD_T + 0.1);
  const b = useSpring(tv, 41.2, 9, 200);
  const h = useSpring(tv, 41.7, 6, 220);
  const c = useSpring(tv, 42.4, 9, 200);
  if (tv < END_CARD_T) return null;
  const pulse = 1 + Math.sin(tv * 8) * 0.05;
  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center" }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.6), rgba(0,0,0,0) 35%, rgba(0,0,0,0) 50%, rgba(0,0,0,.75))" }} />
      <div style={{ position: "absolute", top: 220, left: 60, right: 60, textAlign: "center", transform: `scale(${a})` }}>
        <div style={{ fontSize: 112, fontWeight: 900, color: "#FFE600", textShadow: STROKE, lineHeight: 1.05 }}>MEN NIMA</div>
        <div style={{ fontSize: 112, fontWeight: 900, color: "#FFE600", textShadow: STROKE, lineHeight: 1.05 }}>QILAY?</div>
      </div>
      <div style={{ position: "absolute", top: 1180, transform: `scale(${b})`, fontSize: 80, fontWeight: 900, color: "#fff", textShadow: STROKE }}>
        IZOHDA YOZING ↓
      </div>
      <div style={{ position: "absolute", top: 1330, display: "flex", alignItems: "center", gap: 36 }}>
        <div style={{ transform: `scale(${h * pulse})` }}>
          <Heart size={150} />
        </div>
        <div
          style={{
            transform: `scale(${c * pulse})`,
            background: "#e8202a",
            color: "#fff",
            fontSize: 64,
            fontWeight: 900,
            padding: "22px 50px",
            borderRadius: 26,
            border: "6px solid #000",
            boxShadow: "0 12px 0 #000",
          }}
        >
          OBUNA BO‘LING
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Overlay13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tv = frame / fps / K;
  const flash = FLASHES.reduce((m, f) => Math.max(m, tv >= f ? clamp(1 - (tv - f) / 0.25, 0, 1) : 0), 0);
  const redPulse =
    tv > SCENES.slam[0] && tv < SCENES.slam[1] ? 0.12 + Math.max(0, Math.sin(tv * 10)) * 0.12 : tv < SCENES.hook[1] ? 0.06 : 0;
  const blackout = interpolate(tv, [29.15, 29.25, 29.5, 29.75], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "#ff1010", opacity: redPulse, mixBlendMode: "multiply" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,30,30,.25), rgba(0,0,0,0) 40%, rgba(20,10,10,.3))" }} />
      <Vignette strength={0.8} />
      <Grain frame={frame} opacity={0.11} />
      <HookTitle tv={tv} />
      <SchoolText tv={tv} />
      <Poster tv={tv} />
      <AbsoluteFill style={{ background: "#000", opacity: blackout }} />
      <Captions t={tv} groups={GROUPS} k={K} hideAfter={END_CARD_T} />
      <TodayStamp tv={tv} />
      <EndCard tv={tv} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.85 }} />
    </AbsoluteFill>
  );
};
