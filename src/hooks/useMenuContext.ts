import { useState } from "react";
import { ErrorType, ControllerType, DataType } from "../types/DataTypes";

interface MenuInterface {
  errorType: ErrorType;
  setErrorType: (type: ErrorType) => void;
  controllerType: ControllerType;
  setControllerType: (type: ControllerType) => void;
  dataType: DataType;
  setDataType: (type: DataType) => void;
}

/**
 * Provides a hook that manages state for error type, controller type,
 * and data type options.
 * @returns {MenuInterface} An object containing the current state and
 * updater functions for error type, controller type, and data type options.
 */
export const useMenuContext = (): MenuInterface => {
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.Rotation);
  const [controllerType, setControllerType] = useState<ControllerType>(
    ControllerType.OpenLoop
  );
  const [dataType, setDataType] = useState<DataType>(DataType.Simulation);

  return {
    errorType,
    setErrorType,
    controllerType,
    setControllerType,
    dataType,
    setDataType
  };
};

export default useMenuContext;
