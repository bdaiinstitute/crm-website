import { useEffect, useRef } from "react";

import { Group, Vector3 } from "three";

/**
 * Props for the Arrow component.
 * @property direction Vector representing the direction of the arrow.
 * @property color The arrow color.
 * @property length The arrow length.
 * @property thickness The shaft thickness (default is 0.02).
 * @property headLength The arrow head length (default is 0.2).
 * @property headThickness The arrow head thickness (default is 0.1).
 */
interface ArrowProps {
  direction: Vector3;
  length: number;
  color: string | number;
  thickness?: number;
  headLength?: number;
  headThickness?: number;
}

/**
 * Component to display an arrow from the origin pointing to the given direction.
 * @param props {@link ArrowProps}
 * @returns A 3D arrow.
 */
export const Arrow = ({
  direction,
  color,
  length,
  thickness = 0.02,
  headLength = 0.2,
  headThickness = 0.1
}: ArrowProps) => {
  const groupRef = useRef<Group>(null);
  const sectors = 12;
  useEffect(() => {
    if (groupRef.current) {
      // Normalize the direction vector
      const dir = direction.clone().normalize();
      // Align the arrow with the given direction
      groupRef.current.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), dir);
    }
  }, [direction]);

  return (
    <group ref={groupRef}>
      {/* Shaft */}
      <mesh renderOrder={1} position={[0, 0.5 * length - 0.5 * headLength, 0]}>
        <cylinderGeometry args={[thickness, thickness, length - headLength, sectors]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh position={[0, length - headLength, 0]}>
        <coneGeometry args={[headThickness, headLength, sectors]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};
