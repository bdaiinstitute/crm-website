import { useState } from "react";
import { ErrorType, ControllerType, DataType } from "../types/DataTypes";

/**
 * Defines the interface for the menu context, which includes state and updater
 * functions for error type, controller type, data type, and video visibility.
 * @param errorType The current error type.
 * @param setErrorType A function to update the error type.
 * @param controllerType The current controller type.
 * @param setControllerType A function to update the controller type.
 * @param dataType The current data type.
 * @param setDataType A function to update the data type.
 * @param showVideo Whether the video is visible.
 * @param setShowVideo A function to update the video visibility.
 */
interface MenuContextInterface {
  errorType: ErrorType;
  setErrorType: (type: ErrorType) => void;
  controllerType: ControllerType;
  setControllerType: (type: ControllerType) => void;
  dataType: DataType;
  setDataType: (type: DataType) => void;
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
  const [controllerType, setControllerType] = useState<ControllerType>(
    ControllerType.OpenLoop
  );
  const [dataType, setDataType] = useState<DataType>(DataType.Simulation);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  return {
    errorType,
    setErrorType,
    controllerType,
    setControllerType,
    dataType,
    setDataType,
    showVideo,
    setShowVideo
  };
};

export default useMenuContext;
