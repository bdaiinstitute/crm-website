/**
 * These types are used to represent the trajectories of each object
 * in the scene.
 */

/**
 * Represents the state of an IIWA arm, the angles of each joint.
 */
export interface IiwaArmState {
  joint0: number;
  joint1: number;
  joint2: number;
  joint3: number;
  joint4: number;
  joint5: number;
  joint6: number;
}

/**
 * Represents the state of a cylinder in the scene, including its
 * position and rotation.
 */
export interface CylinderState {
  position: {
    x: number;
    y: number;
  };
  rotation: {
    theta: number;
  };
}

/**
 * Represents the state of the IIWA scene, including the state of the left and
 * right arms, and the state of the cylinder object.
 */
export interface IiwaSceneState {
  timeFromStart: number;
  leftArm: IiwaArmState;
  rightArm: IiwaArmState;
  cylinder: CylinderState;
}

/**
 * Represents an episode of IIWA manipulation.
 */
export interface IiwaEpisode {
  episodeId: string;
  translationError: number;
  rotationError: number;
  goal: CylinderState;
  points: IiwaSceneState[];
}

/**
 * Provides information about an IIWA episode.
 */
export interface IiwaEpisodeInfo {
  episodeId: string;
  translationError: number;
  rotationError: number;
  goal: {
    position: {
      x: number;
      y: number;
    };
    rotation: {
      theta: number;
    };
  };
  initialPose: {
    position: {
      x: number;
      y: number;
    };
    rotation: {
      theta: number;
    };
  };
  finalPose: {
    position: {
      x: number;
      y: number;
    };
    rotation: {
      theta: number;
    };
  };
}

export type IiwaStats = IiwaEpisodeInfo[];
