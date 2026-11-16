import { Composition } from "remotion";
import { ZombiReel } from "./ZombiReel";
import { Xona13 } from "./xona13/Xona13";

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
    </>
  );
};
