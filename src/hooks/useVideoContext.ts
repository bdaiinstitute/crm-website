import { useState } from "react";

/**
 * Defines the interface for the video context, which includes the current time,
 * duration, and video URL, along with functions to update these values.
 * @param currentTime The current time of the video.
 * @param setCurrentTime A function to update the current time.
 * @param duration The duration of the video.
 * @param setDuration A function to update the duration.
 * @param videoUrl The URL of the video.
 * @param setVideoUrl A function to update the video URL.
 */
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
