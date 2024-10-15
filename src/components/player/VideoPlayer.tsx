import { forwardRef, useRef, useImperativeHandle, useEffect } from "react";

/**
 * Defines the props for the Video component.
 * @param videoUrl The URL of the video to be played.
 * @param onTimeUpdate An optional callback function that is called whenever
 * the current time of the video changes. The callback receives the current
 * time in seconds as a parameter.
 */
interface VideoProps {
  videoUrl: string | null;
  onTimeUpdate?: (currentTime: number) => void;
  onDurationChange?: (duration: number) => void;
}

/**
 * Defines the interface for a video component reference, which provides methods
 * to control the video playback.
 */
export interface VideoRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

/**
 * A component that renders a video.
 * @param props {@link VideoProps}
 * @returns A component to render videos.
 */
const Video = forwardRef<VideoRef, VideoProps>(
  ({ videoUrl, onTimeUpdate, onDurationChange }: VideoProps, ref) => {
    const innerRef = useRef<HTMLVideoElement>(null);

    // Auto play the video.
    useEffect(() => {
      innerRef.current?.play();
    }, [videoUrl]);

    useImperativeHandle(ref, () => {
      return {
        play: () => {
          innerRef.current?.play();
        },
        pause: () => {
          innerRef.current?.pause();
        },
        seek: (time: number) => {
          if (innerRef.current) {
            innerRef.current.currentTime = time;
          }
        }
      };
    });

    return (
      <div className="w-full">
        <div className="aspect-square bg-black rounded-md overflow-hidden">
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            {videoUrl && videoUrl != "" && (
              <video
                ref={innerRef}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "38% 50%"
                }}
                src={videoUrl}
                controls={false}
                onLoadedMetadata={(e) =>
                  onDurationChange?.((e.target as HTMLVideoElement).duration)
                }
                onTimeUpdate={(e) =>
                  onTimeUpdate?.((e.target as HTMLVideoElement).currentTime)
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);
export default Video;
