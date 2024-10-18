import { useId } from "react";
import { ErrorType, ControllerType, DataType } from "../../types/DataTypes";

/**
 * Defines the props for the Menu component.
 * @property {ErrorType} errorType The current error type.
 * @property {(errorType: ErrorType) => void} setErrorType Function to set the error type.
 * @property {ControllerType} controllerType The current controller type.
 * @property {(controllerType: ControllerType) => void} setControllerType Function to set the controller type.
 * @property {DataType} dataType The current data type.
 * @property {(dataType: DataType) => void} setDataType Function to set the data type.
 * @property {boolean} showVideo Whether to show the video.
 * @property {(showVideo: boolean) => void} setShowVideo Function to set whether to show the video.
 * @property {boolean} errorTypeEnabled Whether to show the error type radio buttons.
 * @property {boolean} controllerTypeEnabled Whether to show the controller type radio buttons.
 * @property {boolean} dataTypeEnabled Whether to show the data type radio buttons.
 * @property {boolean} showVideoEnabled Whether to show the video toggle.
 */
/**
 * Defines the props for the Menu component.
 * @param errorType The current error type.
 * @param setErrorType Function to set the error type.
 * @param controllerType The current controller type.
 * @param setControllerType Function to set the controller type.
 * @param dataType The current data type.
 * @param setDataType Function to set the data type.
 * @param showVideo Whether to show the video.
 * @param setShowVideo Function to set whether to show the video.
 * @param errorTypeOptionEnabled Whether to show the error type radio buttons.
 * @param controllerTypeOptionEnabled Whether to show the controller type radio buttons.
 * @param dataTypeOptionEnabled Whether to show the data type radio buttons.
 * @param videoOptionEnabled Whether to show the video toggle.
 */
export interface MenuProps {
  errorType: ErrorType;
  setErrorType: (errorType: ErrorType) => void;
  controllerType: ControllerType;
  setControllerType: (controllerType: ControllerType) => void;
  dataType: DataType;
  setDataType: (dataType: DataType) => void;
  showVideo?: boolean;
  setShowVideo?: (showVideo: boolean) => void;
  errorTypeOptionEnabled?: boolean;
  controllerTypeOptionEnabled?: boolean;
  dataTypeOptionEnabled?: boolean;
  videoOptionEnabled?: boolean;
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
  setDataType,
  showVideo,
  setShowVideo,
  errorTypeOptionEnabled = true,
  controllerTypeOptionEnabled = true,
  dataTypeOptionEnabled = true,
  videoOptionEnabled = false
}: MenuProps) => {
  // Generate a unique ID for this component instance
  const uniqueId = useId();

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

  /**
   * Handles the change event for the show video selection.
   * @param event The change event triggered by the input element.
   */
  const handleShowVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (setShowVideo) {
      setShowVideo(isChecked);
    }
  };

  return (
    <nav className=" m-0 bg">
      <div className="container mx-auto px-2 py-3 gap-x-6 flex flex-col lg:flex-row items-start md:items-center md:justify-start">
        {errorTypeOptionEnabled /* Error Type Radio Buttons */ && (
          <div className="flex items-center">
            <span className="font-bold">Error:</span>
            <label className="flex items-center ml-2">
              <input
                type="radio"
                name={`errorType-${uniqueId}`}
                value={ErrorType.Position}
                className="form-radio h-4 w-4"
                aria-label="PositionError"
                checked={errorType === ErrorType.Position}
                onChange={handleErrorTypeChange}
              />
              <span className="ml-1 whitespace-nowrap">position</span>
            </label>
            <label className="flex items-center ml-2">
              <input
                type="radio"
                name={`errorType-${uniqueId}`}
                value={ErrorType.Rotation}
                className="form-radio h-4 w-4"
                aria-label="RotationError"
                checked={errorType === ErrorType.Rotation}
                onChange={handleErrorTypeChange}
              />
              <span className="ml-1 whitespace-nowrap">rotation</span>
            </label>
          </div>
        )}

        {controllerTypeOptionEnabled /* Controller Type Radio Buttons */ && (
          <div className="flex items-center">
            <span className="font-bold">Controller:</span>
            <label className="flex items-center ml-2">
              <input
                type="radio"
                name={`controllerType-${uniqueId}`}
                value={ControllerType.OpenLoop}
                className="form-radio h-4 w-4"
                aria-label="OpenLoop"
                checked={controllerType === ControllerType.OpenLoop}
                onChange={handleControllerTypeChange}
              />
              <span className="ml-1 whitespace-nowrap">open-loop</span>
            </label>
            <label className="flex items-center ml-2">
              <input
                type="radio"
                name={`controllerType-${uniqueId}`}
                value={ControllerType.ClosedLoop}
                className="form-radio h-4 w-4"
                aria-label="ClosedLoop"
                checked={controllerType === ControllerType.ClosedLoop}
                onChange={handleControllerTypeChange}
              />
              <span className="ml-1 whitespace-nowrap">closed-loop</span>
            </label>
          </div>
        )}

        {dataTypeOptionEnabled /* Data Type Radio Buttons */ && (
          <div className="flex items-center">
            <span className="font-bold">Data:</span>
            <label className="flex items-center ml-2">
              <input
                type="radio"
                name={`dataType-${uniqueId}`}
                value={DataType.Simulation}
                className="form-radio h-4 w-4"
                aria-label="Simulation"
                checked={dataType === DataType.Simulation}
                onChange={handleDataTypeChange}
              />
              <span className="ml-1 whitespace-nowrap">simulation</span>
            </label>
            <label className="flex items-center ml-2">
              <input
                type="radio"
                name={`dataType-${uniqueId}`}
                value={DataType.Hardware}
                className="form-radio h-4 w-4"
                aria-label="Hardware"
                checked={dataType === DataType.Hardware}
                onChange={handleDataTypeChange}
              />
              <span className="ml-1 whitespace-nowrap">hardware</span>
            </label>
          </div>
        )}

        {videoOptionEnabled &&
          dataTypeOptionEnabled &&
          dataType === DataType.Hardware && (
            <div className="flex items-center">
              <span className="font-bold whitespace-nowrap">Video:</span>
              <label className="flex items-center ml-2">
                <input
                  type="checkbox"
                  name={`showVideo-${uniqueId}`}
                  className="form-checkbox h-4 w-4"
                  aria-label="ShowVideo"
                  checked={showVideo}
                  onChange={handleShowVideoChange}
                />
              </label>
            </div>
          )}
      </div>
    </nav>
  );
};
