// useOptions.ts
import { useState } from "react";
import { ErrorType, ControllerType, DataType } from "../types/DataTypes";

/**
 * Defines the return type for the `useOptions` hook, which provides state and
 * updater functions for managing error type, controller type, and data type
 * options.
 */
interface UseOptionsReturn {
  errorType: ErrorType;
  setErrorType: (type: ErrorType) => void;
  controllerType: ControllerType;
  setControllerType: (type: ControllerType) => void;
  dataType: DataType;
  setDataType: (type: DataType) => void;
}

/**
 * Provides a React hook that manages state for error type, controller type,
 * and data type options.
 *
 * The `useOptions` hook returns an object with the current state values for
 * each option type, as well as updater functions to set the state of each option.
 *
 * @returns {UseOptionsReturn} An object containing the current state and
 * updater functions for error type, controller type, and data type options.
 */
const useOptions = (): UseOptionsReturn => {
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

export default useOptions;
