import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { SCENES } from "./data";
import { OverlayXabar } from "./OverlayXabar";
import { XCall, XEnd, XHook, XKnock, XLast, XLaugh, XMom, XText1, XText2, XVoice } from "./ScenesXabar";

export type XabarProps = {
  voiceFile: string;
  sfxVolume: number;
};

export const Xabar: React.FC<XabarProps> = ({ voiceFile, sfxVolume }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const seq = (k: keyof typeof SCENES) => {
    const from = Math.round(SCENES[k][0] * fps);
    const to = Math.min(durationInFrames, Math.round(SCENES[k][1] * fps));
    return { from, durationInFrames: to - from, name: k };
  };
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...seq("hook")}><XHook /></Sequence>
      <Sequence {...seq("text1")}><XText1 /></Sequence>
      <Sequence {...seq("laugh")}><XLaugh /></Sequence>
      <Sequence {...seq("knock")}><XKnock /></Sequence>
      <Sequence {...seq("mom")}><XMom /></Sequence>
      <Sequence {...seq("text2")}><XText2 /></Sequence>
      <Sequence {...seq("call")}><XCall /></Sequence>
      <Sequence {...seq("voice")}><XVoice /></Sequence>
      <Sequence {...seq("last")}><XLast /></Sequence>
      <Sequence {...seq("end")}><XEnd /></Sequence>
      <OverlayXabar />
      <Audio src={staticFile("sfx-xabar.wav")} volume={sfxVolume} />
      {voiceFile ? <Audio src={staticFile(voiceFile)} volume={1} /> : null}
    </AbsoluteFill>
  );
};
