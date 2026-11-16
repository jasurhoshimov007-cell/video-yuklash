import React from "react";
import { rand } from "../anim";

export type Look = {
  skin: string;
  shirt: string;
  sleeve?: string;
  pants: string;
  shoes: string;
  hair?: string;
  hairStyle?: "short" | "long" | "none";
  hat?: "doppi" | "scarf" | "cap" | "none";
  hatCol?: string;
  beard?: string;
  robe?: string; // long chapan over the shirt
  belt?: string;
  zombie?: boolean;
};

export type Motion = "idle" | "walk" | "run" | "shamble" | "zrun" | "knock";

export type Pose = {
  x: number;
  z: number;
  y?: number;
  yaw?: number;
  motion?: Motion;
  phase?: number;
  face?: "calm" | "scared" | "shock" | "brave" | "zombie" | "blank" | "sleep";
  /** 0..1 – green glow in a human's eyes (twist) */
  eyeGlow?: number;
  headYaw?: number;
  headPitch?: number;
  headRoll?: number;
  lean?: number;
  /** tumble angle around x (falling) */
  fall?: number;
  /** override arm x rotations */
  aL?: number;
  aR?: number;
  aLz?: number;
  aRz?: number;
  lL?: number;
  lR?: number;
  scale?: number;
  item?: "sickle" | "phone";
};

type BoxProps = {
  p: [number, number, number];
  s: [number, number, number];
  c: string;
  glow?: boolean;
  r?: [number, number, number];
};

const Box: React.FC<BoxProps> = ({ p, s, c, glow, r }) => (
  <mesh position={p} rotation={r ?? [0, 0, 0]}>
    <boxGeometry args={s} />
    {glow ? (
      <meshBasicMaterial color={c} toneMapped={false} fog={false} />
    ) : (
      <meshLambertMaterial color={c} />
    )}
  </mesh>
);

export const Blocky: React.FC<{ t: number; pose: Pose; look: Look }> = ({
  t,
  pose,
  look,
}) => {
  const ph = pose.phase ?? 0;
  const motion = pose.motion ?? "idle";
  const tt = t + ph;
  let legL = 0;
  let legR = 0;
  let armL = 0;
  let armR = 0;
  let armLz = 0;
  let armRz = 0;
  let lean = pose.lean ?? 0;
  let bob = 0;
  let roll = 0;
  let headRoll = pose.headRoll ?? 0;
  const breathe = 1 + Math.sin(tt * 2.2) * 0.015;

  if (motion === "idle") {
    armL = Math.sin(tt * 1.6) * 0.05;
    armR = -Math.sin(tt * 1.6) * 0.05;
    armLz = 0.06;
    armRz = -0.06;
  } else if (motion === "walk") {
    const s = Math.sin(tt * 8);
    legL = s * 0.6;
    legR = -s * 0.6;
    armL = -s * 0.55;
    armR = s * 0.55;
    bob = Math.abs(Math.cos(tt * 8)) * 0.1;
  } else if (motion === "run") {
    const s = Math.sin(tt * 13);
    legL = s * 1.0;
    legR = -s * 1.0;
    armL = -s * 1.1;
    armR = s * 1.1;
    lean += 0.22;
    bob = Math.abs(Math.cos(tt * 13)) * 0.3;
  } else if (motion === "shamble") {
    const s = Math.sin(tt * 4.5);
    legL = s * 0.35;
    legR = -s * 0.35;
    armL = -1.45 + Math.sin(tt * 3.1) * 0.12;
    armR = -1.55 + Math.sin(tt * 2.7 + 1) * 0.12;
    roll = Math.sin(tt * 2.25) * 0.08;
    headRoll += 0.25 + Math.sin(tt * 1.7) * 0.1;
    lean += 0.08;
    bob = Math.abs(Math.cos(tt * 4.5)) * 0.08;
  } else if (motion === "zrun") {
    const s = Math.sin(tt * 11);
    legL = s * 0.9;
    legR = -s * 0.9;
    armL = -1.5 + s * 0.25;
    armR = -1.5 - s * 0.25;
    lean += 0.3;
    headRoll += 0.2;
    bob = Math.abs(Math.cos(tt * 11)) * 0.25;
  } else if (motion === "knock") {
    armR = -1.5 + Math.max(0, Math.sin(tt * 14)) * 0.5;
    armL = 0.05;
  }
  if (pose.aL !== undefined) armL = pose.aL;
  if (pose.aR !== undefined) armR = pose.aR;
  if (pose.aLz !== undefined) armLz = pose.aLz;
  if (pose.aRz !== undefined) armRz = pose.aRz;
  if (pose.lL !== undefined) legL = pose.lL;
  if (pose.lR !== undefined) legR = pose.lR;

  // blink every ~3.3 s
  const blinkCycle = (tt * 0.3 + rand(ph + 3)) % 1;
  const blink = blinkCycle < 0.035;

  const face = pose.face ?? (look.zombie ? "zombie" : "calm");
  const sleeve = look.sleeve ?? look.shirt;
  const s = pose.scale ?? 1;

  const eyeH = blink ? 0.04 : face === "shock" || face === "scared" ? 0.3 : 0.22;
  const zf = 0.62;

  const eyes =
    face === "blank" ? null : face === "sleep" ? (
      <>
        <Box p={[-0.27, 0.08, zf]} s={[0.2, 0.05, 0.04]} c="#121218" />
        <Box p={[0.27, 0.08, zf]} s={[0.2, 0.05, 0.04]} c="#121218" />
        <Box p={[0, -0.3, zf]} s={[0.2, 0.07, 0.04]} c="#121218" />
      </>
    ) : face === "zombie" ? (
      <>
        <Box p={[-0.27, 0.08, zf]} s={[0.26, 0.2, 0.04]} c="#7dff4a" glow />
        <Box p={[0.27, 0.12, zf]} s={[0.26, 0.2, 0.04]} c="#7dff4a" glow />
        <Box p={[0, -0.3, zf]} s={[0.55, 0.22, 0.04]} c="#1a0d0d" />
        <Box p={[-0.12, -0.22, zf + 0.02]} s={[0.08, 0.08, 0.02]} c="#e8e3c8" />
        <Box p={[0.14, -0.22, zf + 0.02]} s={[0.08, 0.08, 0.02]} c="#e8e3c8" />
      </>
    ) : (
      <>
        <Box p={[-0.27, 0.1, zf]} s={[0.16, eyeH, 0.04]} c="#121218" />
        <Box p={[0.27, 0.1, zf]} s={[0.16, eyeH, 0.04]} c="#121218" />
        {pose.eyeGlow && pose.eyeGlow > 0.01 ? (
          <>
            <Box
              p={[-0.27, 0.1, zf + 0.01]}
              s={[0.2 * pose.eyeGlow, 0.26 * pose.eyeGlow, 0.04]}
              c="#7dff4a"
              glow
            />
            <Box
              p={[0.27, 0.1, zf + 0.01]}
              s={[0.2 * pose.eyeGlow, 0.26 * pose.eyeGlow, 0.04]}
              c="#7dff4a"
              glow
            />
          </>
        ) : null}
        {face === "shock" ? (
          <Box p={[0, -0.3, zf]} s={[0.26, 0.3, 0.04]} c="#7a1414" />
        ) : face === "scared" ? (
          <>
            <Box p={[0, -0.32, zf]} s={[0.38, 0.1, 0.04]} c="#121218" />
            <Box p={[-0.27, 0.34, zf]} s={[0.24, 0.05, 0.04]} c="#121218" r={[0, 0, 0.3]} />
            <Box p={[0.27, 0.34, zf]} s={[0.24, 0.05, 0.04]} c="#121218" r={[0, 0, -0.3]} />
          </>
        ) : face === "brave" ? (
          <>
            <Box p={[0, -0.3, zf]} s={[0.36, 0.07, 0.04]} c="#121218" />
            <Box p={[-0.27, 0.32, zf]} s={[0.26, 0.06, 0.04]} c="#121218" r={[0, 0, -0.3]} />
            <Box p={[0.27, 0.32, zf]} s={[0.26, 0.06, 0.04]} c="#121218" r={[0, 0, 0.3]} />
          </>
        ) : (
          <Box p={[0, -0.3, zf]} s={[0.34, 0.07, 0.04]} c="#121218" />
        )}
      </>
    );

  return (
    <group
      position={[pose.x, (pose.y ?? 0) + bob, pose.z]}
      rotation={[0, pose.yaw ?? 0, 0]}
      scale={[s, s, s]}
    >
      {/* soft contact shadow */}
      <mesh position={[0, 0.02 - bob, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
      <group rotation={[lean + (pose.fall ?? 0), 0, roll]}>
        {/* legs (pivot at hip y=2) */}
        <group position={[-0.5, 2, 0]} rotation={[legL, 0, 0]}>
          <Box p={[0, -1, 0]} s={[0.96, 2, 0.96]} c={look.pants} />
          <Box p={[0, -1.8, 0.05]} s={[1, 0.4, 1.06]} c={look.shoes} />
        </group>
        <group position={[0.5, 2, 0]} rotation={[legR, 0, 0]}>
          <Box p={[0, -1, 0]} s={[0.96, 2, 0.96]} c={look.pants} />
          <Box p={[0, -1.8, 0.05]} s={[1, 0.4, 1.06]} c={look.shoes} />
        </group>
        {/* torso */}
        <group position={[0, 3, 0]} scale={[1, breathe, 1]}>
          <Box p={[0, 0, 0]} s={[2, 2, 1]} c={look.shirt} />
          {look.robe ? (
            <>
              <Box p={[-0.62, -0.25, 0.02]} s={[0.8, 2.6, 1.06]} c={look.robe} />
              <Box p={[0.62, -0.25, 0.02]} s={[0.8, 2.6, 1.06]} c={look.robe} />
              <Box p={[0, -0.35, -0.02]} s={[2.04, 2.4, 1.02]} c={look.robe} />
            </>
          ) : null}
          {look.belt ? <Box p={[0, -0.6, 0]} s={[2.08, 0.25, 1.08]} c={look.belt} /> : null}
          {look.zombie ? (
            <>
              <Box p={[0.5, -0.6, 0.51]} s={[0.5, 0.4, 0.02]} c="#2a2a22" />
              <Box p={[-0.6, 0.4, 0.51]} s={[0.3, 0.5, 0.02]} c="#3c4a30" />
            </>
          ) : null}
        </group>
        {/* arms (pivot at shoulder) */}
        <group position={[-1.5, 3.9, 0]} rotation={[armL, 0, armLz]}>
          <Box p={[0, -0.9, 0]} s={[0.96, 2, 0.96]} c={sleeve} />
          <Box p={[0, -1.7, 0]} s={[0.98, 0.42, 0.98]} c={look.skin} />
        </group>
        <group position={[1.5, 3.9, 0]} rotation={[armR, 0, armRz]}>
          <Box p={[0, -0.9, 0]} s={[0.96, 2, 0.96]} c={sleeve} />
          <Box p={[0, -1.7, 0]} s={[0.98, 0.42, 0.98]} c={look.skin} />
          {pose.item === "phone" ? (
            <>
              <Box p={[0, -1.95, 0.35]} s={[0.5, 0.12, 0.9]} c="#15161c" />
              <Box p={[0, -2.02, 0.35]} s={[0.4, 0.02, 0.75]} c="#bfe0ff" glow />
              <Box p={[0, -1.95, 0.82]} s={[0.12, 0.08, 0.04]} c="#ffffff" glow />
            </>
          ) : null}
          {pose.item === "sickle" ? (
            <>
              <Box p={[0, -1.85, 0.5]} s={[0.18, 0.18, 0.9]} c="#4a3020" />
              <Box p={[0, -1.6, 1.15]} s={[0.08, 0.7, 0.18]} c="#d8dde6" r={[0.5, 0, 0]} />
              <Box p={[0, -1.15, 1.0]} s={[0.08, 0.4, 0.16]} c="#d8dde6" r={[-0.6, 0, 0]} />
            </>
          ) : null}
        </group>
        {/* head (pivot at neck) */}
        <group
          position={[0, 4, 0]}
          rotation={[pose.headPitch ?? 0, pose.headYaw ?? 0, headRoll]}
        >
          <group position={[0, 0.62, 0]}>
            <Box p={[0, 0, 0]} s={[1.22, 1.22, 1.22]} c={look.skin} />
            {eyes}
            {look.beard ? (
              <Box p={[0, -0.5, 0.45]} s={[1.1, 0.5, 0.4]} c={look.beard} />
            ) : null}
            {look.hair && look.hairStyle !== "none" ? (
              <>
                <Box p={[0, 0.6, -0.04]} s={[1.32, 0.26, 1.34]} c={look.hair} />
                <Box p={[0, 0.15, -0.55]} s={[1.32, 0.9, 0.26]} c={look.hair} />
                <Box p={[-0.62, 0.3, -0.1]} s={[0.1, 0.6, 1.1]} c={look.hair} />
                <Box p={[0.62, 0.3, -0.1]} s={[0.1, 0.6, 1.1]} c={look.hair} />
                <Box p={[0, 0.48, 0.58]} s={[1.3, 0.26, 0.16]} c={look.hair} />
                {look.hairStyle === "long" ? (
                  <>
                    <Box p={[0, -0.45, -0.58]} s={[1.36, 1.5, 0.3]} c={look.hair} />
                    <Box p={[-0.66, -0.2, -0.05]} s={[0.14, 1.2, 0.9]} c={look.hair} />
                    <Box p={[0.66, -0.2, -0.05]} s={[0.14, 1.2, 0.9]} c={look.hair} />
                  </>
                ) : null}
              </>
            ) : null}
            {look.hat === "doppi" ? (
              <>
                <Box p={[0, 0.78, 0]} s={[1.3, 0.36, 1.3]} c={look.hatCol ?? "#141414"} />
                <Box p={[0, 0.79, 0.66]} s={[0.24, 0.2, 0.02]} c="#f2f2f2" />
                <Box p={[0.66, 0.79, 0]} s={[0.02, 0.2, 0.24]} c="#f2f2f2" />
                <Box p={[-0.66, 0.79, 0]} s={[0.02, 0.2, 0.24]} c="#f2f2f2" />
              </>
            ) : null}
            {look.hat === "cap" ? (
              <>
                <Box p={[0, 0.72, -0.02]} s={[1.32, 0.36, 1.32]} c={look.hatCol ?? "#1f2a3a"} />
                <Box p={[0, 0.58, 0.78]} s={[1.2, 0.08, 0.5]} c="#111111" />
                <Box p={[0, 0.74, 0.67]} s={[0.3, 0.22, 0.02]} c="#d4b04a" />
              </>
            ) : null}
            {look.hat === "scarf" ? (
              <>
                <Box p={[0, 0.5, -0.05]} s={[1.38, 0.4, 1.38]} c={look.hatCol ?? "#c23b6a"} />
                <Box p={[0, -0.1, -0.6]} s={[1.38, 1.4, 0.2]} c={look.hatCol ?? "#c23b6a"} />
                <Box p={[-0.68, 0.0, -0.05]} s={[0.12, 1.1, 1.3]} c={look.hatCol ?? "#c23b6a"} />
                <Box p={[0.68, 0.0, -0.05]} s={[0.12, 1.1, 1.3]} c={look.hatCol ?? "#c23b6a"} />
              </>
            ) : null}
          </group>
        </group>
      </group>
    </group>
  );
};

/* ---------- cast ---------- */

export const JASUR: Look = {
  skin: "#f0c99a",
  shirt: "#2f6fe0",
  sleeve: "#2f6fe0",
  pants: "#2b2f45",
  shoes: "#f2f2f2",
  hair: "#1b1410",
  hairStyle: "short",
  hat: "doppi",
};

export const MADINA: Look = {
  skin: "#f3d0a6",
  shirt: "#e23f6c",
  sleeve: "#f7f2ea",
  pants: "#e23f6c",
  shoes: "#3a1a22",
  hair: "#23150f",
  hairStyle: "long",
};

export const CHOPON: Look = {
  skin: "#d8a77a",
  shirt: "#6a4a2e",
  robe: "#5a3b22",
  belt: "#c49a3a",
  pants: "#3a2c20",
  shoes: "#1c140e",
  beard: "#e8e8e8",
  hat: "doppi",
};

const zSkins = ["#7fae6a", "#8fb878", "#6e9c62", "#9ab886"];
const zShirts = ["#4b5a7a", "#7a4b4b", "#5a6b3a", "#6b5a7a", "#8a7a5a", "#3e6670"];
const zPants = ["#2e2a24", "#3b3346", "#2a3a3a", "#40342a"];

/** Generates a deterministic zombie villager look. */
export const zombieLook = (i: number): Look => {
  const r = (k: number) => rand(i * 13.7 + k);
  const female = r(1) > 0.6;
  const robe = !female && r(2) > 0.55;
  return {
    skin: zSkins[Math.floor(r(3) * zSkins.length)],
    shirt: zShirts[Math.floor(r(4) * zShirts.length)],
    pants: zPants[Math.floor(r(5) * zPants.length)],
    shoes: "#1a1a1a",
    robe: robe ? (r(6) > 0.5 ? "#3d4f6e" : "#6e3d3d") : undefined,
    hair: female ? undefined : "#2a2420",
    hairStyle: female ? "none" : "short",
    hat: female ? "scarf" : r(7) > 0.5 ? "doppi" : "none",
    hatCol: female ? (r(8) > 0.5 ? "#7a3a5a" : "#3a5a7a") : "#141414",
    zombie: true,
  };
};
