import { Composition } from "remotion";
import { ZombiReel } from "./ZombiReel";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ZombiQishloq"
      component={ZombiReel}
      durationInFrames={1200}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ voiceFile: "", sfxVolume: 0.9 }}
    />
  );
};
