import { useMemo } from "react";

import * as THREE from "three";

/**
 * Props for the sector component.
 * @param radius The sector radius.
 * @param startAngle The start angle.
 * @param endAngle The end angle.
 * @param color The sector color.
 */
export interface SectorProps {
  radius: number;
  startAngle: number;
  endAngle: number; // In radians
  color: string | number;
}

/**
 * This is sector component on the (x,y) plane.
 * @param props {@link SectorProps}
 * @returns A sector component.
 */
export const Sector = ({
  radius = 1,
  startAngle = 0, // In radians
  endAngle = Math.PI / 2, // In radians
  color = "red"
}: SectorProps) => {
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(0, 0);
    return shape;
  }, [radius, startAngle, endAngle]);

  return (
    <mesh>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
};
