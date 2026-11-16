import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { SCENES } from "./data";
import { OverlayYer } from "./OverlayYer";
import { YCalm, YChaos, YEarth, YEnd, YFly, YSpeed, YStop, YWave, YWind } from "./ScenesYer";

export type YerProps = {
  voiceFile: string;
  sfxVolume: number;
};

export const Yer: React.FC<YerProps> = ({ voiceFile, sfxVolume }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const seq = (k: keyof typeof SCENES) => {
    const from = Math.round(SCENES[k][0] * fps);
    const to = Math.min(durationInFrames, Math.round(SCENES[k][1] * fps));
    return { from, durationInFrames: to - from, name: k };
  };
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...seq("earth")}><YEarth /></Sequence>
      <Sequence {...seq("chaos")}><YChaos /></Sequence>
      <Sequence {...seq("speed")}><YSpeed /></Sequence>
      <Sequence {...seq("calm")}><YCalm /></Sequence>
      <Sequence {...seq("stop")}><YStop /></Sequence>
      <Sequence {...seq("fly")}><YFly /></Sequence>
      <Sequence {...seq("wave")}><YWave /></Sequence>
      <Sequence {...seq("wind")}><YWind /></Sequence>
      <Sequence {...seq("end")}><YEnd /></Sequence>
      <OverlayYer />
      <Audio src={staticFile("sfx-yer.wav")} volume={sfxVolume} />
      {voiceFile ? <Audio src={staticFile(voiceFile)} volume={1} /> : null}
    </AbsoluteFill>
  );
};
