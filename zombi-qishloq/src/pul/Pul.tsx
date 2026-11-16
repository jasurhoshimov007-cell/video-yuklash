import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { SCENES } from "./data";
import { OverlayPul } from "./OverlayPul";
import { PAsks, PCar, PDoor, PEnd, PEnter, PFloor, PHide, PHook, PJoy, PMistake, PMoney } from "./ScenesPul";

export type PulProps = {
  voiceFile: string;
  sfxVolume: number;
};

export const Pul: React.FC<PulProps> = ({ voiceFile, sfxVolume }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const seq = (k: keyof typeof SCENES) => {
    const from = Math.round(SCENES[k][0] * fps);
    const to = Math.min(durationInFrames, Math.round(SCENES[k][1] * fps));
    return { from, durationInFrames: to - from, name: k };
  };
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...seq("hook")}><PHook /></Sequence>
      <Sequence {...seq("mistake")}><PMistake /></Sequence>
      <Sequence {...seq("enter")}><PEnter /></Sequence>
      <Sequence {...seq("floor")}><PFloor /></Sequence>
      <Sequence {...seq("money")}><PMoney /></Sequence>
      <Sequence {...seq("joy")}><PJoy /></Sequence>
      <Sequence {...seq("car")}><PCar /></Sequence>
      <Sequence {...seq("door")}><PDoor /></Sequence>
      <Sequence {...seq("asks")}><PAsks /></Sequence>
      <Sequence {...seq("hide")}><PHide /></Sequence>
      <Sequence {...seq("end")}><PEnd /></Sequence>
      <OverlayPul />
      <Audio src={staticFile("sfx-pul.wav")} volume={sfxVolume} />
      {voiceFile ? <Audio src={staticFile(voiceFile)} volume={1} /> : null}
    </AbsoluteFill>
  );
};
