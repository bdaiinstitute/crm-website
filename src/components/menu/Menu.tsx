import { useId } from "react";
import { ErrorType, TrajectoryType, DataOrigin } from "../../types/DataTypes";

/**
 * Defines the props for the Menu component.
 * @property {ErrorType} errorType The current error type.
 * @property {(errorType: ErrorType) => void} setErrorType Function to set the error type.
 * @property {TrajectoryType} trajectoryType The current trajectory type.
 * @property {(trajectoryType: TrajectoryType) => void} setTrajectoryType Function to set the trajectory type.
 * @property {DataOrigin} dataOrigin The current data origin.
 * @property {(dataOrigin: DataOrigin) => void} setDataOrigin Function to set the data origin.
 * @property {boolean} showVideo Whether to show the video.
 * @property {(showVideo: boolean) => void} setShowVideo Function to set whether to show the video.
 * @property {boolean} errorTypeEnabled Whether to enable the error type radio buttons.
 * @property {boolean} trajectoryTypeEnabled Whether to enable the trajectory type radio buttons.
 * @property {boolean} dataOriginEnabled Whether to enable the data type radio buttons.
 * @property {boolean} showVideoEnabled Whether to enable the video toggle.
 */
export interface MenuProps {
  errorType: ErrorType;
  setErrorType: (errorType: ErrorType) => void;
  trajectoryType: TrajectoryType;
  setTrajectoryType: (trajectoryType: TrajectoryType) => void;
  dataOrigin: DataOrigin;
  setDataOrigin: (dataOrigin: DataOrigin) => void;
  showVideo?: boolean;
  setShowVideo?: (showVideo: boolean) => void;
  errorTypeOptionEnabled?: boolean;
  videoOptionEnabled?: boolean;
}

/**
 * Renders a navigation menu component that allows the user to select the error
 * type, trajectory type, and data type. The component updates the
 * corresponding state variables when the user makes a selection.
 * @param props {@link MenuProps}
 * @returns The rendered navigation menu component.
 */
export const Menu = ({
  errorType,
  setErrorType,
  trajectoryType,
  setTrajectoryType,
  dataOrigin,
  setDataOrigin,
  showVideo,
  setShowVideo,
  errorTypeOptionEnabled = true,
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
   * Handles the change event for the trajectory type selection.
   * @param event The change event triggered by the input element.
   */
  const handleTrajectoryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrajectoryType(event.target.value as TrajectoryType);
  };

  /**
   * Handles the change event for the data type selection.
   * @param event The change event triggered by the input element.
   */
  const handleDataOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataOrigin(event.target.value as DataOrigin);
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

  // sm, md, lg, xl, 2xl

  return (
    <nav className="container mx-auto bg-white">
      <div className="py-3 gap-x-6 flex flex-col items-center xl:flex-row justify-center">
        {/* Error */}
        <div className="flex items-center gap-x-2">
          <span className="font-bold">Error:</span>
          {errorTypeOptionEnabled ? (
            <>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`errorType-${uniqueId}`}
                  value={ErrorType.Position}
                  className="h-4 w-4"
                  aria-label="PositionError"
                  checked={errorType === ErrorType.Position}
                  onChange={handleErrorTypeChange}
                />
                <span className="ml-1 whitespace-nowrap">position</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`errorType-${uniqueId}`}
                  value={ErrorType.Rotation}
                  className="h-4 w-4"
                  aria-label="RotationError"
                  checked={errorType === ErrorType.Rotation}
                  onChange={handleErrorTypeChange}
                />
                <span className="ml-1 whitespace-nowrap">rotation</span>
              </label>
            </>
          ) : errorType === ErrorType.Position ? (
            <span className="ml-1 whitespace-nowrap">position</span>
          ) : (
            <span className="ml-1 whitespace-nowrap">rotation</span>
          )}
        </div>

        {/* Trajectories */}
        <div className="flex items-center gap-x-2">
          <span className="font-bold">Trajectories:</span>
          <label className="flex items-center gap-x-1">
            <input
              type="radio"
              name={`trajectoryType-${uniqueId}`}
              value={TrajectoryType.NominalPlan}
              className="h-4 w-4"
              aria-label="NominalPlan"
              checked={trajectoryType === TrajectoryType.NominalPlan}
              onChange={handleTrajectoryTypeChange}
            />
            <span className="whitespace-nowrap">nominal plan</span>
          </label>
          <label className="flex items-center gap-x-1">
            <input
              type="radio"
              name={`trajectoryType-${uniqueId}`}
              value={TrajectoryType.OpenLoop}
              className="h-4 w-4"
              aria-label="OpenLoop"
              checked={trajectoryType === TrajectoryType.OpenLoop}
              onChange={handleTrajectoryTypeChange}
            />
            <span className="whitespace-nowrap">open-loop</span>
          </label>
          <label className="flex items-center gap-x-1">
            <input
              type="radio"
              name={`trajectoryType-${uniqueId}`}
              value={TrajectoryType.ClosedLoop}
              className="h-4 w-4"
              aria-label="ClosedLoop"
              checked={trajectoryType === TrajectoryType.ClosedLoop}
              onChange={handleTrajectoryTypeChange}
            />
            <span className="whitespace-nowrap">closed-loop</span>
          </label>
        </div>

        {/* Data */}
        {trajectoryType != TrajectoryType.NominalPlan && (
          <div className="flex items-center gap-x-2">
            <span className="font-bold">Data:</span>
            <label className="flex items-center gap-x-1">
              <input
                type="radio"
                name={`dataOrigin-${uniqueId}`}
                value={DataOrigin.Simulation}
                className="h-4 w-4"
                aria-label="Simulation"
                checked={dataOrigin === DataOrigin.Simulation}
                onChange={handleDataOriginChange}
              />
              <span className="whitespace-nowrap">simulation</span>
            </label>
            <label className="flex items-center gap-x-1">
              <input
                type="radio"
                name={`dataOrigin-${uniqueId}`}
                value={DataOrigin.Hardware}
                className="h-4 w-4"
                aria-label="Hardware"
                checked={dataOrigin === DataOrigin.Hardware}
                onChange={handleDataOriginChange}
              />
              <span className="whitespace-nowrap">hardware</span>
            </label>
          </div>
        )}

        {/* Video */}
        {videoOptionEnabled &&
          trajectoryType != TrajectoryType.NominalPlan &&
          dataOrigin === DataOrigin.Hardware && (
            <div className="flex items-center gap-x-2">
              <span className="font-bold whitespace-nowrap">Video:</span>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name={`showVideo-${uniqueId}`}
                  className="h-4 w-4"
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
