import { useState } from "react";

interface VideoContextInterface {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (time: number) => void;
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
}

/**
 * Provides a hook that manages state for error type, controller type,
 * and data type options.
 * @returns {VideoContextInterface} An object containing the current state and
 * updater functions for error type, controller type, and data type options.
 */
export const useVideoContext = (): VideoContextInterface => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return {
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    videoUrl,
    setVideoUrl
  };
};

export default useVideoContext;
