import { ErrorType, ControllerType, DataType } from "../../types/DataTypes";

/**
 * Defines the props for the Menu component.
 * @property {ErrorType} errorType The current error type.
 * @property {(errorType: ErrorType) => void} setErrorType Function to set the error type.
 * @property {ControllerType} controllerType The current controller type.
 * @property {(controllerType: ControllerType) => void} setControllerType Function to set the controller type.
 * @property {DataType} dataType The current data type.
 * @property {(dataType: DataType) => void} setDataType Function to set the data type.
 */
export interface MenuProps {
  errorType: ErrorType;
  setErrorType: (errorType: ErrorType) => void;
  controllerType: ControllerType;
  setControllerType: (controllerType: ControllerType) => void;
  dataType: DataType;
  setDataType: (dataType: DataType) => void;
}

/**
 * Renders a navigation menu component that allows the user to select the error
 * type, controller type, and data type. The component updates the
 * corresponding state variables when the user makes a selection.
 * @param props {@link MenuProps}
 * @returns The rendered navigation menu component.
 */
export const Menu = ({
  errorType,
  setErrorType,
  controllerType,
  setControllerType,
  dataType,
  setDataType
}: MenuProps) => {
  /**
   * Handles the change event for the error type selection.
   * @param event The change event triggered by the input element.
   */
  const handleErrorTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value as ErrorType;
    setErrorType(selectedValue);
  };

  /**
   * Handles the change event for the controller type selection.
   * @param event The change event triggered by the input element.
   */
  const handleControllerTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setControllerType(event.target.value as ControllerType);
  };

  /**
   * Handles the change event for the data type selection.
   * @param event The change event triggered by the input element.
   */
  const handleDataTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataType(event.target.value as DataType);
  };

  return (
    <nav className=" m-0 ">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Error Type Radio Buttons */}
        <div className="flex items-center">
          <span className="font-bold">Error:</span>
          <label className="flex items-center ml-2">
            <input
              type="radio"
              name="errorType"
              value={ErrorType.Position}
              className="form-radio h-4 w-4"
              aria-label="PositionError"
              checked={errorType === ErrorType.Position}
              onChange={handleErrorTypeChange}
            />
            <span className="ml-1">position</span>
          </label>
          <label className="flex items-center ml-2">
            <input
              type="radio"
              name="errorType"
              value={ErrorType.Rotation}
              className="form-radio h-4 w-4"
              aria-label="RotationError"
              checked={errorType === ErrorType.Rotation}
              onChange={handleErrorTypeChange}
            />
            <span className="ml-1">rotation</span>
          </label>
        </div>

        {/* Controller Type Radio Buttons */}
        <div className="flex items-center">
          <span className="font-bold">Controller:</span>
          <label className="flex items-center ml-2">
            <input
              type="radio"
              name="controllerType"
              value={ControllerType.OpenLoop}
              className="form-radio h-4 w-4"
              aria-label="OpenLoop"
              checked={controllerType === ControllerType.OpenLoop}
              onChange={handleControllerTypeChange}
            />
            <span className="ml-1">open-loop</span>
          </label>
          <label className="flex items-center ml-2">
            <input
              type="radio"
              name="controllerType"
              value={ControllerType.ClosedLoop}
              className="form-radio h-4 w-4"
              aria-label="ClosedLoop"
              checked={controllerType === ControllerType.ClosedLoop}
              onChange={handleControllerTypeChange}
            />
            <span className="ml-1">closed-loop</span>
          </label>
        </div>

        {/* Data Type Radio Buttons */}
        <div className="flex items-center">
          <span className="font-bold">Type:</span>
          <label className="flex items-center ml-2">
            <input
              type="radio"
              name="dataType"
              value={DataType.Simulation}
              className="form-radio h-4 w-4"
              aria-label="Simulation"
              checked={dataType === DataType.Simulation}
              onChange={handleDataTypeChange}
            />
            <span className="ml-1">simulation</span>
          </label>
          <label className="flex items-center ml-2">
            <input
              type="radio"
              name="dataType"
              value={DataType.Hardware}
              className="form-radio h-4 w-4"
              aria-label="Hardware"
              checked={dataType === DataType.Hardware}
              onChange={handleDataTypeChange}
            />
            <span className="ml-1">hardware</span>
          </label>
        </div>
      </div>
    </nav>
  );
};
