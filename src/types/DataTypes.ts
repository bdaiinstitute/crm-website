/**
 * Enum representing the error type to be displayed on the 3D plot.
 * Each type corresponds to a different 3D plot.
 */
export enum ErrorType {
  Position = "PositionError",
  Rotation = "Rotation Error"
}

/**
 * Enum representing the different types of controllers that can be used.
 * Each type corresponds to a different 3D plot.
 */
export enum TrajectoryType {
  NominalPlan = "NominalPlan",
  OpenLoop = "OpenLoop",
  ClosedLoop = "ClosedLoop"
}

/**
 * Enum representing the different types of data that can be processed:
 * simulation or hardware.
 * Each type corresponds to a different 3D plot.
 */
export enum DataType {
  Simulation = "Simulation",
  Hardware = "Hardware"
}
