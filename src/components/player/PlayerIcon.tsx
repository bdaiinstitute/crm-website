import { faRedoAlt, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlayerState } from "./PlayerState";

/**
 * Props for the PlayerIcon component.
 * @param playerState The player state.
 */
interface PlayerIconProps {
  playerState: PlayerState;
}

/**
 * This is the icon to display on the player control button based on the
 * current player state.
 * @param props {@link PlayerIconProps}
 * @returns The icon to display on the control button.
 */
export const PlayerIcon = ({ playerState }: PlayerIconProps) => {
  switch (playerState) {
    case PlayerState.Completed:
      return <FontAwesomeIcon icon={faRedoAlt} />;
      break;
    case PlayerState.InitialState:
    case PlayerState.Paused:
      return <FontAwesomeIcon icon={faPlay} />;
      break;
    case PlayerState.Playing:
      return <FontAwesomeIcon icon={faPause} />;
      break;
    case PlayerState.Disabled:
      return <FontAwesomeIcon icon={faPlay} color="#C0C0C0" />;
      break;
  }
};
