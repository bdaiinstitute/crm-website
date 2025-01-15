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
 * Enum representing the origin of the data:
 * simulation, hardware or either.
 * Each type corresponds to a different 3D plot.
 */
export enum DataOrigin {
  Simulation = "Simulation",
  Hardware = "Hardware",
  Either = "Either"
}
