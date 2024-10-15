import { useCallback, useEffect, useRef, useState } from "react";

import { getTrackBackground, Range } from "react-range";

import { PlayerIcon } from "./PlayerIcon";
import { PlayerState } from "./PlayerState";

import "./Player.css";

/**
 * Props for the player component.
 * @param sequence A sequence of elements.
 * @param onFrameChanged A callback invoked when the frame changes.
 */
export interface SequencePlayerProps<T> {
  sequence: T[];
  onFrameChanged: (state: T) => void;
}

/**
 * This is a player component. The user can play and pause a sequence and
 * select the current frame using a control bar.
 * @param props {@link SequencePlayerProps}
 * @returns A sequence player.
 */
export const SequencePlayer = <T,>({
  sequence,
  onFrameChanged
}: SequencePlayerProps<T>) => {
  // Used to check when the sequence changes.
  const prevSequenceRef = useRef<T[]>(sequence);

  // Current frame.
  const [frame, setFrame] = useState(0);

  // The player state.
  const [state, setState] = useState<PlayerState>(PlayerState.InitialState);

  // Ref to store the playback interval.
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (sequence?.length > 0) {
      // Check if the sequence has changed.
      if (prevSequenceRef.current != sequence) {
        prevSequenceRef.current = sequence;
        setFrame(0);
        setState(PlayerState.Playing);
      } else if (state == PlayerState.Playing) {
        if (frame < sequence.length - 1) {
          // Start the timer.
          intervalRef.current = setInterval(() => {
            setFrame((prev) => prev + 1);
          }, 10);
        } else if (frame === sequence.length - 1) {
          setState(PlayerState.Completed);
        }
        onFrameChanged(sequence[frame]);
      } else if (state == PlayerState.Paused) {
        onFrameChanged(sequence[frame]);
      }
    }
    if (!sequence || sequence.length <= 1) {
      setState(PlayerState.Disabled);
    }
    return () => {
      // Method called immediately after a dependency changes.
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sequence, frame, state, onFrameChanged]);

  // Playback control, only available when sequence length > 0.
  const handlePlayPause = useCallback(() => {
    switch (state) {
      case PlayerState.Completed:
      case PlayerState.InitialState:
        setFrame(0);
        setState(PlayerState.Playing);
        break;
      case PlayerState.Paused:
        setState(PlayerState.Playing);
        break;
      case PlayerState.Playing:
        setState(PlayerState.Paused);
        break;
    }
  }, [state]);

  // Bar handle, only available when the sequence length is greater than 0.
  const handleProgressBarChange = useCallback(
    (newFrame: number) => {
      if (newFrame < sequence.length - 1) {
        setState(PlayerState.Paused);
        setFrame(newFrame);
      } else if (newFrame === sequence.length - 1) {
        setState(PlayerState.Completed);
        setFrame(newFrame);
      }
    },
    [sequence.length]
  );

  return (
    <div className="player-container">
      {/* Button enabled when the sequence length is greater than 0. */}
      <button
        className={"player-button"}
        onClick={handlePlayPause}
        disabled={sequence.length <= 1}
      >
        <PlayerIcon playerState={state} />
      </button>
      {/* Component enabled when the sequence length is greater than 0. */}
      {sequence.length > 1 ? (
        <Range
          values={[frame]}
          step={1}
          min={0}
          max={sequence.length - 1}
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
                    values: [frame],
                    colors: ["#548BF4", "#C0C0C0"],
                    min: 0,
                    max: sequence.length - 1
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
