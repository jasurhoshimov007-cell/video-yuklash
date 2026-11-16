import { useThree } from "@react-three/fiber";
import React, { useLayoutEffect } from "react";
import { PerspectiveCamera } from "three";
import { clamp, easeInOut, lerp, shakeNoise, Vec3 } from "../anim";

export type Shot = {
  /** start/end in seconds, local to the scene */
  t: [number, number];
  eye: [Vec3, Vec3];
  at: [Vec3, Vec3];
  fov?: [number, number];
  roll?: number;
  shake?: number;
  linear?: boolean;
};

export const shotAt = (shots: Shot[], t: number) => {
  let shot = shots[0];
  for (const s of shots) {
    if (t >= s.t[0]) shot = s;
  }
  return shot;
};

/** Drives the R3F camera from the current scene time (no useFrame). */
export const Cam: React.FC<{ t: number; shots: Shot[]; extraShake?: number }> = ({
  t,
  shots,
  extraShake = 0,
}) => {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const shot = shotAt(shots, t);
  const raw = clamp((t - shot.t[0]) / (shot.t[1] - shot.t[0]), 0, 1);
  const p = shot.linear ? raw : easeInOut(raw);
  const sh = (shot.shake ?? 0) + extraShake;
  const eye: Vec3 = [
    lerp(shot.eye[0][0], shot.eye[1][0], p) + shakeNoise(t, 1) * sh,
    lerp(shot.eye[0][1], shot.eye[1][1], p) + shakeNoise(t, 2) * sh,
    lerp(shot.eye[0][2], shot.eye[1][2], p),
  ];
  const at: Vec3 = [
    lerp(shot.at[0][0], shot.at[1][0], p),
    lerp(shot.at[0][1], shot.at[1][1], p),
    lerp(shot.at[0][2], shot.at[1][2], p),
  ];
  const fov = shot.fov ? lerp(shot.fov[0], shot.fov[1], p) : 50;
  const roll = (shot.roll ?? 0) + shakeNoise(t, 7) * sh * 0.02;

  useLayoutEffect(() => {
    camera.position.set(eye[0], eye[1], eye[2]);
    camera.up.set(0, 1, 0);
    camera.lookAt(at[0], at[1], at[2]);
    camera.rotateZ(roll);
    camera.fov = fov;
    camera.near = 0.1;
    camera.far = 400;
    camera.updateProjectionMatrix();
  });
  return null;
};
