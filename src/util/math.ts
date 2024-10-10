import { Euler } from "three";
import * as THREE from "three";

/**
 * Converts a quaternion to Euler angles.
 * @param w The w component of the quaternion.
 * @param x The x component of the quaternion.
 * @param y The y component of the quaternion.
 * @param z The z component of the quaternion.
 * @returns An object with the roll, pitch, and yaw Euler angles.
 */
export const quaternionToEuler = (
  w: number,
  x: number,
  y: number,
  z: number
): { roll: number; pitch: number; yaw: number } => {
  const quaternion = new THREE.Quaternion(x, y, z, w);
  const euler = new Euler().setFromQuaternion(quaternion.normalize(), "XYZ");
  const roll = euler.x;
  const pitch = euler.y;
  const yaw = euler.z;
  return {
    roll,
    pitch,
    yaw
  };
};
