import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, shakeNoise } from "../anim";
import { buildGroups, Captions, fontFamily, Grain, STROKE, Vignette } from "../common/ui";
import { BLACKOUT, CALL_WINDOW, CHAT_WINDOWS, END_CARD_T, FLASHES, LINES, MSGS, SCENES } from "./data";

const GROUPS = buildGroups(LINES);

const useSpringAt = (t: number, at: number, damping = 12, stiffness = 200) => {
  const { fps } = useVideoConfig();
  return spring({ frame: Math.round((t - at) * fps), fps, config: { damping, stiffness } });
};

const inWin = (t: number, w: [number, number]) => t >= w[0] && t < w[1];

/* ---------- phone frame ---------- */
const PhoneFrame: React.FC<{ t: number; win: [number, number]; children: React.ReactNode }> = ({ t, win, children }) => {
  const a = useSpringAt(t, win[0]);
  const out = interpolate(t, [win[1] - 0.25, win[1]], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const buzz = Math.abs(shakeNoise(t, 9)) * 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        top: 250,
        height: 1180,
        transform: `translateY(${(1 - a) * 900 + out * 1200}px) rotate(${(1 - a) * 6 + buzz}deg)`,
        background: "#0b0b0f",
        borderRadius: 70,
        border: "14px solid #1c1c22",
        boxShadow: "0 30px 80px rgba(0,0,0,.8), 0 0 60px rgba(120,160,255,.25)",
        overflow: "hidden",
        fontFamily,
      }}
    >
      <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", width: 200, height: 46, borderRadius: 30, background: "#000" }} />
      <div style={{ position: "absolute", top: 22, left: 50, color: "#fff", fontSize: 36, fontWeight: 700 }}>03:00</div>
      <div style={{ position: "absolute", top: 22, right: 50, color: "#fff", fontSize: 30, fontWeight: 700 }}>▮▮▮ 12%</div>
      {children}
    </div>
  );
};

const ChatHeader: React.FC = () => (
  <div style={{ position: "absolute", top: 90, left: 0, right: 0, height: 150, borderBottom: "2px solid #22232a", display: "flex", alignItems: "center", gap: 26, padding: "0 40px" }}>
    <div style={{ width: 96, height: 96, borderRadius: 48, background: "linear-gradient(135deg,#5a6270,#2a2e38)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 48, fontWeight: 900 }}>
      M
    </div>
    <div>
      <div style={{ color: "#fff", fontSize: 48, fontWeight: 900 }}>Men (o‘zim)</div>
      <div style={{ color: "#5fd36a", fontSize: 30, fontWeight: 700 }}>onlayn</div>
    </div>
  </div>
);

const Typing: React.FC<{ t: number }> = ({ t }) => (
  <div style={{ alignSelf: "flex-start", background: "#26272e", borderRadius: 36, padding: "26px 34px", display: "flex", gap: 12 }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: 18, height: 18, borderRadius: 9, background: "#9a9aa6", opacity: 0.4 + 0.6 * Math.max(0, Math.sin(t * 10 - i)) }} />
    ))}
  </div>
);

const Bubble: React.FC<{ t: number; at: number; text: string; isNew: boolean }> = ({ t, at, text, isNew }) => {
  const s = useSpringAt(t, at, 10, 260);
  return (
    <div
      style={{
        alignSelf: "flex-start",
        maxWidth: "85%",
        transform: `scale(${s})`,
        transformOrigin: "left bottom",
        background: isNew ? "#d01e2a" : "#26272e",
        color: "#fff",
        borderRadius: 40,
        borderBottomLeftRadius: 10,
        padding: "26px 36px",
        fontSize: 60,
        fontWeight: 900,
        lineHeight: 1.15,
        boxShadow: isNew ? "0 0 40px rgba(255,40,40,.5)" : "none",
      }}
    >
      {text}
      <div style={{ fontSize: 26, fontWeight: 700, opacity: 0.6, marginTop: 6, textAlign: "right" }}>03:0{MSGS.findIndex((m) => m.t === at)}</div>
    </div>
  );
};

const Chat: React.FC<{ t: number }> = ({ t }) => {
  const win = CHAT_WINDOWS.find((w) => inWin(t, w));
  if (!win) return null;
  const visible = MSGS.filter((m) => m.t <= t);
  const next = MSGS.find((m) => m.t > t && m.t - t < 0.9);
  const newest = visible[visible.length - 1];
  return (
    <PhoneFrame t={t} win={win}>
      <ChatHeader />
      <div style={{ position: "absolute", top: 270, left: 40, right: 40, bottom: 40, display: "flex", flexDirection: "column", gap: 30, justifyContent: "flex-end" }}>
        {visible.map((m) => (
          <Bubble key={m.t} t={t} at={m.t} text={m.text} isNew={m === newest && t - m.t < 3} />
        ))}
        {next ? <Typing t={t} /> : null}
      </div>
    </PhoneFrame>
  );
};

const Call: React.FC<{ t: number }> = ({ t }) => {
  if (!inWin(t, CALL_WINDOW)) return null;
  const connected = t > 21.0;
  const secs = Math.max(0, Math.floor(t - 21.0));
  const ring = 1 + Math.max(0, Math.sin(t * 9)) * 0.08;
  return (
    <PhoneFrame t={t} win={CALL_WINDOW}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1b2a3a,#0b0b0f)" }} />
      <div style={{ position: "absolute", top: 200, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: 120,
            background: "linear-gradient(135deg,#e2a0b0,#8a4a6a)",
            transform: `scale(${connected ? 1 : ring})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 110,
            fontWeight: 900,
          }}
        >
          O
        </div>
        <div style={{ color: "#fff", fontSize: 86, fontWeight: 900 }}>Onam</div>
        <div style={{ color: connected ? "#5fd36a" : "#c8c8d0", fontSize: 44, fontWeight: 700 }}>
          {connected ? `00:0${secs}` : "Qo‘ng‘iroq qilinmoqda..."}
        </div>
        {connected ? (
          <div style={{ marginTop: 40, background: "#26272e", color: "#fff", borderRadius: 36, padding: "26px 36px", fontSize: 50, fontWeight: 700, maxWidth: 640, textAlign: "center" }}>
            “Kasalxonadaman, navbatchilikdaman...”
          </div>
        ) : null}
      </div>
      <div style={{ position: "absolute", bottom: 90, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 150, height: 150, borderRadius: 75, background: "#e0303a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 70, fontWeight: 900 }}>
          ✕
        </div>
      </div>
    </PhoneFrame>
  );
};

const HookTitle: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, 0, 9, 170);
  const b = useSpringAt(t, 0.45, 8, 200);
  if (t > SCENES.hook[1]) return null;
  const jx = shakeNoise(t, 3) * 5;
  return (
    <div style={{ position: "absolute", top: 190, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", fontFamily }}>
      <div style={{ fontSize: 210, fontWeight: 900, color: "#fff", textShadow: `${STROKE}, 0 0 50px rgba(140,180,255,.8)`, transform: `scale(${a})`, lineHeight: 1 }}>03:00</div>
      <div
        style={{
          marginTop: 20,
          fontSize: 78,
          fontWeight: 900,
          color: "#ff2a2a",
          textShadow: `${STROKE}, 0 0 40px rgba(255,40,40,.7)`,
          transform: `translate(${jx}px,0) scale(${b}) rotate(-2deg)`,
          textAlign: "center",
          lineHeight: 1.05,
        }}
      >
        O‘ZIMDAN
        <br />
        XABAR KELDI
      </div>
    </div>
  );
};

const Heart: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.2 4 6.2 4c2.3 0 3.9 1.4 4.8 2.8C11.9 5.4 13.5 4 15.8 4c4 0 5.8 4.4 4.2 7.7C19.5 16.4 12 21 12 21z" fill="#ff2d55" stroke="#000" strokeWidth="1.2" />
  </svg>
);

const EndCard: React.FC<{ t: number }> = ({ t }) => {
  const a = useSpringAt(t, 31.5, 10, 170);
  const b = useSpringAt(t, 32.59, 9, 200);
  const h = useSpringAt(t, 33.0, 6, 220);
  const c = useSpringAt(t, 33.54, 9, 200);
  if (t < 31.5) return null;
  const pulse = 1 + Math.sin(t * 8) * 0.05;
  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center" }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.6), rgba(0,0,0,0) 38%, rgba(0,0,0,0) 50%, rgba(0,0,0,.75))" }} />
      <div style={{ position: "absolute", top: 210, left: 60, right: 60, textAlign: "center", transform: `scale(${a})` }}>
        <div style={{ fontSize: 84, fontWeight: 900, color: "#fff", textShadow: STROKE, lineHeight: 1.08 }}>SIZ ORQANGIZGA</div>
        <div style={{ fontSize: 104, fontWeight: 900, color: "#FFE600", textShadow: STROKE, lineHeight: 1.08 }}>QARARDINGIZMI?</div>
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

export const OverlayXabar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const flash = FLASHES.reduce((m, f) => Math.max(m, t >= f ? clamp(1 - (t - f) / 0.22, 0, 1) : 0), 0);
  const phoneUp = CHAT_WINDOWS.some((w) => inWin(t, w)) || inWin(t, CALL_WINDOW);
  const black = interpolate(t, [BLACKOUT[0], BLACKOUT[0] + 0.05, BLACKOUT[1], BLACKOUT[1] + 0.4], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(20,40,90,.25), rgba(0,0,0,0) 45%, rgba(10,20,50,.3))" }} />
      <Vignette strength={0.8} />
      <Grain frame={frame} opacity={0.1} />
      {phoneUp ? <AbsoluteFill style={{ background: "rgba(0,0,0,.45)" }} /> : null}
      <HookTitle t={t} />
      <Chat t={t} />
      <Call t={t} />
      <AbsoluteFill style={{ background: "#000", opacity: black }} />
      <Captions t={t} groups={GROUPS} top={phoneUp ? "83%" : "60%"} hideAfter={END_CARD_T} />
      <EndCard t={t} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.85 }} />
    </AbsoluteFill>
  );
};
