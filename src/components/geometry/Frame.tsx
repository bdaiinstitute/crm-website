import { Vector3 } from "three";

import { Arrow } from "./Arrow";

/**
 * Props for the Frame component.
 * @param size The frame arrows length.
 * @param thickness The frame arrows thickness.
 * @param displayX True to display the X arrow. Default is true.
 * @param displayT True to display the Y arrow. Default is true.
 * @param display| True to display the Z arrow. Default is true.
 */
interface FrameProps {
  size?: number;
  thickness?: number;
  opacity?: number;
  displayX?: boolean;
  displayY?: boolean;
  displayZ?: boolean;
}

/**
 * This component displays a coordinate frame with three arrows (x, y, z).
 * @param props {@link FrameProps}
 * @return A coordinate frame.
 */
export const Frame = ({
  size = 1,
  thickness = 0.005,
  displayX = true,
  displayY = true,
  displayZ = true
}: FrameProps) => {
  const centerRadius = 2 * thickness;
  const sphereSectors = 30;
  const headThickness = 4 * thickness;
  const headLength = 20 * thickness;
  return (
    <group>
      {/* Center of the frame. */}
      <mesh>
        <sphereGeometry args={[centerRadius, sphereSectors, sphereSectors]} />
        <meshStandardMaterial color={0xffffff} />
      </mesh>
      {/* Arrow X. */}
      {displayX && (
        <Arrow
          direction={new Vector3(1, 0, 0)}
          length={size}
          color={0x9d4b4b}
          thickness={thickness}
          headThickness={headThickness}
          headLength={headLength}
        />
      )}
      {/* Arrow Y. */}
      {displayY && (
        <Arrow
          direction={new Vector3(0, 1, 0)}
          length={size}
          color={0x2f7f4f}
          thickness={thickness}
          headThickness={headThickness}
          headLength={headLength}
        />
      )}
      {/* Arrow Z. */}
      {displayZ && (
        <Arrow
          direction={new Vector3(0, 0, 1)}
          length={size}
          color={0x3b5b9d}
          thickness={thickness}
          headThickness={headThickness}
          headLength={headLength}
        />
      )}
    </group>
  );
};
