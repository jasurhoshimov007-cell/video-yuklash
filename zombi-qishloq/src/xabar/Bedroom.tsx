import React from "react";
import { B } from "../three/Props";

/** Night bedroom. Room x,z ∈ [-8,8], height 7.5. Bed on the left (head at +z),
 *  door on the front wall (z=-8) at x=3, window above the bed on the back wall. */
export const Bedroom: React.FC<{
  t: number;
  knock?: number; // -1..1 door jolt
  handle?: number; // handle rotation (rad)
  feet?: number; // 0..1 visibility of feet shadow under the door
  feetShift?: number;
  phoneOnStand?: boolean;
  phoneLit?: number;
  moon?: number;
}> = ({ t, knock = 0, handle = 0, feet = 0, feetShift = 0, phoneOnStand = false, phoneLit = 0, moon = 1 }) => {
  const wall = "#2b3550";
  return (
    <group>
      <color attach="background" args={["#05070d"]} />
      <fog attach="fog" args={["#05070d", 14, 40]} />
      <ambientLight intensity={0.35} color="#5a6a9a" />
      <hemisphereLight args={["#4a5a8a", "#140f0c", 0.35]} />
      <directionalLight position={[-6, 9, 22]} intensity={0.9 * moon} color="#9fb4ff" />
      {/* floor, ceiling, walls */}
      <B p={[0, -0.05, 0]} s={[16, 0.1, 16]} c="#4a3a2e" />
      <B p={[0, 7.55, 0]} s={[16, 0.1, 16]} c="#1e2436" />
      <B p={[-8, 3.75, 0]} s={[0.3, 7.5, 16]} c={wall} />
      <B p={[8, 3.75, 0]} s={[0.3, 7.5, 16]} c={wall} />
      {/* back wall with window above the bed */}
      <B p={[2.5, 3.75, 8]} s={[11, 7.5, 0.3]} c={wall} />
      <B p={[-6.7, 3.75, 8]} s={[2.6, 7.5, 0.3]} c={wall} />
      <B p={[-4.5, 1.6, 8]} s={[1.8, 3.2, 0.3]} c={wall} />
      <B p={[-4.5, 6.9, 8]} s={[1.8, 1.2, 0.3]} c={wall} />
      <B p={[-4.5, 4.8, 8.1]} s={[1.8, 3.2, 0.05]} c="#8fa6ff" glow />
      <B p={[-4.5, 4.8, 7.95]} s={[0.1, 3.2, 0.1]} c="#151a28" />
      <B p={[-4.5, 4.8, 7.95]} s={[1.8, 0.1, 0.1]} c="#151a28" />
      <B p={[-5.7, 4.6, 7.7]} s={[0.7, 4.4, 0.2]} c="#3a1c24" />
      <B p={[-3.3, 4.6, 7.7]} s={[0.7, 4.4, 0.2]} c="#3a1c24" />
      <pointLight position={[-4.5, 4.8, 6.5]} color="#8fa6ff" intensity={18 * moon} distance={12} decay={1.4} />
      {/* front wall with doorway at x=3 */}
      <B p={[-3.25, 3.75, -8]} s={[9.5, 7.5, 0.3]} c={wall} />
      <B p={[6.25, 3.75, -8]} s={[3.5, 7.5, 0.3]} c={wall} />
      <B p={[3, 6.4, -8]} s={[3, 2.2, 0.3]} c={wall} />
      {/* door + handle */}
      <group position={[3, 0, -7.85]} rotation={[0, knock * 0.012, 0]}>
        <B p={[0, 2.65, 0]} s={[2.9, 5.3, 0.18]} c="#6a4a32" />
        <B p={[0, 3.9, 0.1]} s={[2.2, 1.6, 0.04]} c="#5a3e2a" />
        <B p={[0, 1.6, 0.1]} s={[2.2, 1.7, 0.04]} c="#5a3e2a" />
        <group position={[1.1, 2.6, 0.2]} rotation={[0, 0, handle]}>
          <B p={[-0.25, 0, 0]} s={[0.6, 0.14, 0.14]} c="#c9a24a" />
        </group>
        <B p={[1.1, 2.6, 0.12]} s={[0.24, 0.4, 0.06]} c="#a0802a" />
      </group>
      {/* light under the door + feet shadows */}
      <B p={[3, 0.03, -7.55]} s={[2.6, 0.04, 0.6]} c="#ffcf8a" glow opacity={0.85} />
      {feet > 0.01 ? (
        <>
          <B p={[2.4 + feetShift, 0.06, -7.55]} s={[0.55, 0.04, 0.62]} c="#1a120a" />
          <B p={[3.5 + feetShift * 0.6, 0.06, -7.55]} s={[0.55, 0.04, 0.62]} c="#1a120a" />
        </>
      ) : null}
      <pointLight position={[3, 0.4, -6.9]} color="#ffbe70" intensity={8} distance={5} decay={1.5} />
      {/* bed */}
      <B p={[-4.5, 0.8, 3.5]} s={[4.6, 1.6, 8]} c="#3a2a1e" />
      <B p={[-4.5, 1.85, 3.5]} s={[4.4, 0.5, 7.8]} c="#c8d0e0" />
      <B p={[-4.5, 2.25, 1.8]} s={[4.6, 0.45, 4.6]} c="#3b5ba0" />
      <B p={[-4.5, 2.4, 6.6]} s={[3, 0.55, 1.4]} c="#e8ecf4" />
      <B p={[-4.5, 2.7, 7.6]} s={[4.8, 3.4, 0.4]} c="#3a2a1e" />
      {/* nightstand + lamp + phone */}
      <B p={[-1.2, 1.1, 6.4]} s={[1.8, 2.2, 1.6]} c="#4a3626" />
      <B p={[-1.5, 2.6, 6.7]} s={[0.4, 0.8, 0.4]} c="#2a2a2a" />
      <B p={[-1.5, 3.2, 6.7]} s={[0.9, 0.6, 0.9]} c="#6a6a5a" />
      {phoneOnStand ? (
        <group position={[-1.0, 2.25 + (phoneLit > 0.5 ? Math.abs(Math.sin(t * 60)) * 0.02 : 0), 6.1]}>
          <B p={[0, 0, 0]} s={[0.55, 0.07, 1]} c="#121318" />
          <B p={[0, 0.045, 0]} s={[0.46, 0.02, 0.86]} c={phoneLit > 0.5 ? "#cfe4ff" : "#1a1c24"} glow={phoneLit > 0.5} />
          {phoneLit > 0.5 ? <pointLight position={[0, 0.8, 0]} color="#bcd6ff" intensity={10 * phoneLit} distance={6} decay={1.5} /> : null}
        </group>
      ) : null}
      {/* desk, chair, poster, rug */}
      <B p={[5.8, 2.3, 4.5]} s={[3.4, 0.2, 2]} c="#5a4232" />
      {[4.4, 7.2].map((x) => [3.7, 5.3].map((z) => <B key={`${x}${z}`} p={[x, 1.1, z]} s={[0.15, 2.2, 0.15]} c="#2a2a2a" />))}
      <B p={[5.8, 3.4, 4.9]} s={[1.8, 1.2, 0.1]} c="#101218" />
      <B p={[7.8, 4.5, 0]} s={[0.05, 2.6, 1.8]} c="#7a2a3a" />
      <B p={[7.75, 4.6, 0]} s={[0.05, 1.2, 1.2]} c="#e0c060" />
      <B p={[0, 0.02, -1]} s={[6, 0.03, 4]} c="#5a2a2a" />
    </group>
  );
};
