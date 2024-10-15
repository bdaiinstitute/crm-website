import { useCallback, useEffect, useState } from "react";

import { getTrackBackground, Range } from "react-range";

import { VideoRef } from "./VideoPlayer";
import { PlayerIcon } from "./PlayerIcon";
import { PlayerState } from "./PlayerState";

import "./Player.css";

/**
 * Props for the player component.
 * @param sequence A sequence of elements.
 * @param onFrameChanged A callback invoked when the frame changes.
 */
export interface VideoPlayerControllerProps {
  videoRef: React.RefObject<VideoRef>;
  currentTime: number;
  duration: number;
}

/**
 * This is a player component. The user can play and pause a sequence and
 * select the current frame using a control bar.
 * @param props {@link VideoPlayerControllerProps}
 * @returns A sequence player.
 */
export const VideoPlayerController = ({
  videoRef,
  currentTime,
  duration
}: VideoPlayerControllerProps) => {
  // The player state.
  const [state, setState] = useState<PlayerState>(PlayerState.Playing);

  useEffect(() => {
    if (currentTime === duration) {
      setState(PlayerState.Completed);
    } else if (currentTime === 0) {
      setState(PlayerState.Playing);
    }
  }, [currentTime, duration]);

  // Playback control, only available when sequence length > 0.
  const handlePlayPause = useCallback(() => {
    switch (state) {
      case PlayerState.Completed:
      case PlayerState.InitialState:
        videoRef.current?.seek(0);
        videoRef.current?.play();
        setState(PlayerState.Playing);
        break;
      case PlayerState.Paused:
        videoRef.current?.play();
        setState(PlayerState.Playing);
        break;
      case PlayerState.Playing:
        videoRef.current?.pause();
        setState(PlayerState.Paused);
        break;
    }
  }, [state, videoRef]);

  // Bar handle, only available when the sequence length is greater than 0.
  const handleProgressBarChange = useCallback(
    (currentTime: number) => {
      if (currentTime < duration) {
        setState(PlayerState.Paused);
        videoRef.current?.pause();
        videoRef.current?.seek(currentTime);
      } else if (currentTime === duration) {
        setState(PlayerState.Completed);
        videoRef.current?.seek(currentTime);
      }
    },
    [duration, videoRef]
  );

  return (
    <div className="player-container">
      {/* Button enabled when the duration is greater than 0. */}
      <button
        className={"player-button"}
        onClick={handlePlayPause}
        disabled={duration <= 0}
      >
        <PlayerIcon playerState={state} />
      </button>
      {/* Component enabled when the duration is greater than 0. */}
      {duration > 0 ? (
        <Range
          values={[currentTime]}
          step={0.1}
          min={0}
          max={duration}
          onChange={(values) => handleProgressBarChange(values[0])}
          renderTrack={({ props, children }) => (
            <div
              className="range-track-wrapper"
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
            >
              <div
                ref={props.ref}
                className="range-track"
                style={{
                  background: getTrackBackground({
                    values: [currentTime],
                    colors: ["#548BF4", "#C0C0C0"],
                    min: 0,
                    max: duration
                  })
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div className="range-thumb" {...props} key={props.key} />
          )}
        />
      ) : (
        <div className="disabled-track" />
      )}
    </div>
  );
};
