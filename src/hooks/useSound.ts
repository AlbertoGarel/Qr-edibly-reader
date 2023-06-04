import * as React from "react";
import { Audio } from "expo-av";

export function useSound() {
  const [sound, setSound] = React.useState<any>();

  async function playSound() {
    //Loading Sound
    const { sound } = await Audio.Sound.createAsync(require("../assets/tones/navigate_next.mp3")
    );
    setSound(sound);

    // Playing Sound
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        // Unloading Sound
        sound.unloadAsync();
      }
      : undefined;
  }, []);

  return () => playSound();

}