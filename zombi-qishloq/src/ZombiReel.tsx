import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { SCENES } from "./data";
import { Overlay } from "./Overlay";
import {
  SceneBridge,
  SceneChase,
  SceneDoor,
  SceneEnding,
  SceneEscape,
  SceneField,
  SceneHook,
  SceneRoof,
  SceneShepherd,
  SceneVillage,
  SceneWindow,
} from "./scenes";

export type ZombiReelProps = {
  /** file in public/, e.g. "voice.mp3". Empty = no voice-over yet. */
  voiceFile: string;
  sfxVolume: number;
};

export const ZombiReel: React.FC<ZombiReelProps> = ({ voiceFile, sfxVolume }) => {
  const { fps } = useVideoConfig();
  const seq = (k: keyof typeof SCENES) => ({
    from: Math.round(SCENES[k][0] * fps),
    durationInFrames: Math.round((SCENES[k][1] - SCENES[k][0]) * fps),
    name: k,
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#05070d" }}>
      <Sequence {...seq("hook")}><SceneHook /></Sequence>
      <Sequence {...seq("roof")}><SceneRoof /></Sequence>
      <Sequence {...seq("field")}><SceneField /></Sequence>
      <Sequence {...seq("shepherd")}><SceneShepherd /></Sequence>
      <Sequence {...seq("village")}><SceneVillage /></Sequence>
      <Sequence {...seq("window")}><SceneWindow /></Sequence>
      <Sequence {...seq("door")}><SceneDoor /></Sequence>
      <Sequence {...seq("escape")}><SceneEscape /></Sequence>
      <Sequence {...seq("chase")}><SceneChase /></Sequence>
      <Sequence {...seq("bridge")}><SceneBridge /></Sequence>
      <Sequence {...seq("ending")}><SceneEnding /></Sequence>
      <Overlay />
      <Audio src={staticFile("sfx.wav")} volume={sfxVolume} />
      {voiceFile ? <Audio src={staticFile(voiceFile)} volume={1} /> : null}
    </AbsoluteFill>
  );
};
