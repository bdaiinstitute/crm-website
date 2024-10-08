/**
 * Props for the Grid component.
 * @property size The size of the grid in meters.
 * @property primarySubdivisionCount The number of grid subdivisions.
 * @property secondarySubdivisionCount The number of divisions within a grid division.
 * @property primarySubdivisionColor The primary grid color.
 * @property secondarySubdivisionColor The secondary grid color.
 */
export interface GridProps {
  size: number;
  primarySubdivisionCount?: number;
  secondarySubdivisionCount?: number;
  primarySubdivisionColor?: string | number;
  secondarySubdivisionColor?: string | number;
}

/**
 * This is grid component on the (x,y) plane.
 * @param props {@link GridProps}
 * @returns A grid component.
 */
export const Grid = ({
  size = 2,
  primarySubdivisionCount = 2,
  secondarySubdivisionCount = 10,
  primarySubdivisionColor = "#aaaaaa",
  secondarySubdivisionColor = "#3a3a3a"
}: GridProps) => {
  return (
    <group rotation-x={Math.PI / 2}>
      <gridHelper
        args={[
          size,
          secondarySubdivisionCount * primarySubdivisionCount,
          secondarySubdivisionColor,
          secondarySubdivisionColor
        ]}
      />
      <gridHelper
        args={[
          size,
          primarySubdivisionCount,
          primarySubdivisionColor,
          primarySubdivisionColor
        ]}
      />
    </group>
  );
};
