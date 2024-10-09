/**
 * These types are used to represent the trajectories of each object
 * in the scene.
 */

/**
 * Represents the state of the allegro hand, the angles of each joint.
 */
export interface AllegroHandState {
  joint0: number; // 2nd finger, base roll.
  joint1: number; // 2nd finger 1st joint pitch.
  joint2: number; // 2nd finger, 2nd joint pitch.
  joint3: number; // 2nd finger, 3rd joint pitch.
  joint4: number; // 3rd finger, base roll.
  joint5: number; // 3rd finger, 1st joint pitch.
  joint6: number; // 3rd finger, 2nd joint pitch.
  joint7: number; // 3rd finger, 3rd joint pitch.
  joint8: number; // 4th finger, base roll.
  joint9: number; // 4th finger, 1st joint pitch.
  joint10: number; // 4th finger, 2nd joint pitch.
  joint11: number; // 4th finger, 3rd joint pitch.
  joint12: number; // 1st finger (thumb), base pitch.
  joint13: number; // 1st finger (thumb), base roll.
  joint14: number; // 1st finger (thumb), 1st joint pitch.
  joint15: number; // 1st finger (thumb), 2nd joint pitch.
}

/**
 * Represents the state of a cube in the scene, including its
 * position and rotation.
 */
export interface CubeState {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    w: number;
    x: number;
    y: number;
    z: number;
  };
}

/**
 * Represents the state of the Allegro scene, including the state of the hand
 * and the state of the cube.
 */
export interface AllegroSceneState {
  timeFromStart: number;
  hand: AllegroHandState;
  cube: CubeState;
}

/**
 * Represents an episode of Allegro manipulation.
 */
export interface AllegroEpisode {
  episodeId: number;
  goal: CubeState;
  points: AllegroSceneState[];
}

/**
 * Provides information about an Allegro episode.
 */
export interface AllegroEpisodeInfo {
  episodeId: string;
  goal: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    rotation: {
      w: number;
      x: number;
      y: number;
      z: number;
    };
  };
  initialPose: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    rotation: {
      w: number;
      x: number;
      y: number;
      z: number;
    };
  };
  finalPose: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    rotation: {
      w: number;
      x: number;
      y: number;
      z: number;
    };
  };
}

export type AllegroStats = AllegroEpisodeInfo[];
