import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { K, SCENES } from "./data";
import { Overlay13 } from "./Overlay13";
import {
  S13Board,
  S13Calendar,
  S13Corridor,
  S13End,
  S13Guard,
  S13Hook,
  S13Inside,
  S13Morning,
  S13Open,
  S13Photo,
  S13Plate,
  S13School,
  S13Sleep,
  S13Slam,
  S13Wake,
} from "./Scenes13";

export type Xona13Props = {
  voiceFile: string;
  sfxVolume: number;
};

export const Xona13: React.FC<Xona13Props> = ({ voiceFile, sfxVolume }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const seq = (k: keyof typeof SCENES) => {
    const from = Math.round(SCENES[k][0] * K * fps);
    const to = Math.min(durationInFrames, Math.round(SCENES[k][1] * K * fps));
    return { from, durationInFrames: to - from, name: k };
  };
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...seq("hook")}><S13Hook /></Sequence>
      <Sequence {...seq("school")}><S13School /></Sequence>
      <Sequence {...seq("sleep")}><S13Sleep /></Sequence>
      <Sequence {...seq("wake")}><S13Wake /></Sequence>
      <Sequence {...seq("corridor")}><S13Corridor /></Sequence>
      <Sequence {...seq("plate")}><S13Plate /></Sequence>
      <Sequence {...seq("open")}><S13Open /></Sequence>
      <Sequence {...seq("inside")}><S13Inside /></Sequence>
      <Sequence {...seq("board")}><S13Board /></Sequence>
      <Sequence {...seq("slam")}><S13Slam /></Sequence>
      <Sequence {...seq("morning")}><S13Morning /></Sequence>
      <Sequence {...seq("guard")}><S13Guard /></Sequence>
      <Sequence {...seq("photo")}><S13Photo /></Sequence>
      <Sequence {...seq("calendar")}><S13Calendar /></Sequence>
      <Sequence {...seq("end")}><S13End /></Sequence>
      <Overlay13 />
      <Audio src={staticFile("sfx-xona13.wav")} volume={sfxVolume} />
      {voiceFile ? <Audio src={staticFile(voiceFile)} volume={1} /> : null}
    </AbsoluteFill>
  );
};
