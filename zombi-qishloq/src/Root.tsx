import { Composition } from "remotion";
import { ZombiReel } from "./ZombiReel";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ZombiQishloq"
      component={ZombiReel}
      durationInFrames={1290}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ voiceFile: "voice.mp3", sfxVolume: 0.22 }}
    />
  );
};
