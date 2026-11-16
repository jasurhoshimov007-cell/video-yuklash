import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { SCENES } from "./data";
import { OverlayDekabr } from "./OverlayDekabr";
import { DCrowd, DDec1, DEnd, DHook, DLightsOut, DMorning, DNewcomer, DNormal, DRule, DWindow } from "./ScenesDekabr";

export type DekabrProps = {
  voiceFile: string;
  sfxVolume: number;
};

export const Dekabr: React.FC<DekabrProps> = ({ voiceFile, sfxVolume }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const seq = (k: keyof typeof SCENES) => {
    const from = Math.round(SCENES[k][0] * fps);
    const to = Math.min(durationInFrames, Math.round(SCENES[k][1] * fps));
    return { from, durationInFrames: to - from, name: k };
  };
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...seq("hook")}><DHook /></Sequence>
      <Sequence {...seq("normal")}><DNormal /></Sequence>
      <Sequence {...seq("dec1")}><DDec1 /></Sequence>
      <Sequence {...seq("morning")}><DMorning /></Sequence>
      <Sequence {...seq("newcomer")}><DNewcomer /></Sequence>
      <Sequence {...seq("rule")}><DRule /></Sequence>
      <Sequence {...seq("window")}><DWindow /></Sequence>
      <Sequence {...seq("crowd")}><DCrowd /></Sequence>
      <Sequence {...seq("lightsout")}><DLightsOut /></Sequence>
      <Sequence {...seq("end")}><DEnd /></Sequence>
      <OverlayDekabr />
      <Audio src={staticFile("sfx-dekabr.wav")} volume={sfxVolume} />
      {voiceFile ? <Audio src={staticFile(voiceFile)} volume={1} /> : null}
    </AbsoluteFill>
  );
};
