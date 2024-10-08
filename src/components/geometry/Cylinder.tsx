/**
 * Props for the Cylinder component.
 * @property radius The cylinder radius.
 * @property height The cylinder height.
 * @property color The cylinder color.
 * @property opacity The cylinder opacity.
 */
interface CylinderProps {
  radius: number;
  height: number;
  color: string | number;
  opacity?: number;
}

/**
 * This is a cylinder oriented along the z-axis.
 * @param props {@link CylinderProps}
 * @returns A cylinder.
 */
export const Cylinder = ({ radius, height, color, opacity = 1 }: CylinderProps) => {
  return (
    <mesh rotation-x={Math.PI / 2} castShadow receiveShadow>
      <cylinderGeometry attach="geometry" args={[radius, radius, height]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};
