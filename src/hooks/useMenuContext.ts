import { useState } from "react";
import { ErrorType, TrajectoryType, DataOrigin } from "../types/DataTypes";

/**
 * Defines the interface for the menu context, which includes state and updater
 * functions for error type, controller type, data type, and video visibility.
 * @param errorType The current error type.
 * @param setErrorType A function to update the error type.
 * @param trajectoryType The trajectory type.
 * @param setTrajectoryType A function to update the trajectory type.
 * @param dataOrigin The current data toriginype.
 * @param setDataOrigin A function to update the data origin.
 * @param showVideo Whether the video is visible.
 * @param setShowVideo A function to update the video visibility.
 */
interface MenuContextInterface {
  errorType: ErrorType;
  setErrorType: (type: ErrorType) => void;
  trajectoryType: TrajectoryType;
  setTrajectoryType: (type: TrajectoryType) => void;
  dataOrigin: DataOrigin;
  setDataOrigin: (type: DataOrigin) => void;
  showVideo: boolean;
  setShowVideo: (showVideo: boolean) => void;
}

/**
 * Provides a hook that manages state for error type, controller type,
 * and data type options.
 * @returns {MenuContextInterface} An object containing the current state and
 * updater functions for error type, controller type, and data type options.
 */
export const useMenuContext = (): MenuContextInterface => {
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.Rotation);
  const [trajectoryType, setTrajectoryType] = useState<TrajectoryType>(
    TrajectoryType.ClosedLoop
  );
  const [dataOrigin, setDataOrigin] = useState<DataOrigin>(DataOrigin.Hardware);
  const [showVideo, setShowVideo] = useState<boolean>(true);

  return {
    errorType,
    setErrorType,
    trajectoryType,
    setTrajectoryType,
    dataOrigin,
    setDataOrigin,
    showVideo,
    setShowVideo
  };
};

export default useMenuContext;
