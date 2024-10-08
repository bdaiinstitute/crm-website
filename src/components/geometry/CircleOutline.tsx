/**
 * Props for the CircleOutline component.
 * @property radius The outline radius.
 * @property color The outline color.
 */
export interface CircleOutlineProps {
  radius: number;
  thickness: number;
  color?: string | number;
}

/**
 * Component to display an circle outlline.
 * @param props {@link CircleOutlineProps}
 * @returns A circle outline.
 */
export const CircleOutline = ({
  radius,
  thickness,
  color = "white"
}: CircleOutlineProps) => {
  const radialSegments = 64;
  const tubularSegments = 64;
  const arc = Math.PI * 2;
  return (
    <mesh>
      <torusGeometry args={[radius, thickness, radialSegments, tubularSegments, arc]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
