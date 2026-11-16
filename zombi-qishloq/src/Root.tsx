import { Composition } from "remotion";
import { ZombiReel } from "./ZombiReel";
import { Xona13 } from "./xona13/Xona13";
import { Xabar } from "./xabar/Xabar";
import { Yer } from "./yer/Yer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ZombiQishloq"
        component={ZombiReel}
        durationInFrames={1290}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ voiceFile: "voice.mp3", sfxVolume: 0.22 }}
      />
      <Composition
        id="Xona13"
        component={Xona13}
        durationInFrames={1215}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ voiceFile: "voice-xona13.mp3", sfxVolume: 0.22 }}
      />
      <Composition
        id="Xabar"
        component={Xabar}
        durationInFrames={1110}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ voiceFile: "voice-xabar.mp3", sfxVolume: 0.22 }}
      />
      <Composition
        id="Yer"
        component={Yer}
        durationInFrames={990}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ voiceFile: "voice-yer.mp3", sfxVolume: 0.22 }}
      />
    </>
  );
};
