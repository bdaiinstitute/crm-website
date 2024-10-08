import { useMemo } from "react";
import { Euler, Vector3 } from "three";

/**
 * Props for the CubeOutline component.
 * @property size The cuve outline size.
 * @property color The outline color.
 */
interface CubeOutlineProps {
  size: number;
  color: string | number;
  thickness: number;
}

/**
 * This is a cube outline oriented along the z-axis.
 * @param props {@link CubeOutlineProps}
 * @returns A cube outline.
 */
export const CubeOutline = ({ size, thickness, color = "white" }: CubeOutlineProps) => {
  const sectors = 32;
  const radius = thickness / 2;

  const cylinders = useMemo(
    () => [
      { position: new Vector3(size / 2, 0, size / 2), rotation: new Euler(0, 0, 0) },
      { position: new Vector3(-size / 2, 0, size / 2), rotation: new Euler(0, 0, 0) },
      { position: new Vector3(-size / 2, 0, -size / 2), rotation: new Euler(0, 0, 0) },
      { position: new Vector3(size / 2, 0, -size / 2), rotation: new Euler(0, 0, 0) },
      {
        position: new Vector3(size / 2, size / 2, 0),
        rotation: new Euler(Math.PI / 2, 0, 0)
      },
      {
        position: new Vector3(-size / 2, size / 2, 0),
        rotation: new Euler(Math.PI / 2, 0, 0)
      },
      {
        position: new Vector3(-size / 2, -size / 2, 0),
        rotation: new Euler(Math.PI / 2, 0, 0)
      },
      {
        position: new Vector3(size / 2, -size / 2, 0),
        rotation: new Euler(Math.PI / 2, 0, 0)
      },
      {
        position: new Vector3(0, size / 2, size / 2),
        rotation: new Euler(0, 0, Math.PI / 2)
      },
      {
        position: new Vector3(0, -size / 2, size / 2),
        rotation: new Euler(0, 0, Math.PI / 2)
      },
      {
        position: new Vector3(0, -size / 2, -size / 2),
        rotation: new Euler(0, 0, Math.PI / 2)
      },
      {
        position: new Vector3(0, size / 2, -size / 2),
        rotation: new Euler(0, 0, Math.PI / 2)
      }
    ],
    [size]
  );

  return (
    <group>
      {cylinders.map((cylinder, index) => (
        <mesh key={index} position={cylinder.position} rotation={cylinder.rotation}>
          <cylinderGeometry args={[radius, radius, size, sectors]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};
