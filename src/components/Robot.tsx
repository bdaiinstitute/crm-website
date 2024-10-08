import { URDFRobot } from "urdf-loader";

export interface RobotProps {
  robot: URDFRobot;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Component to display a robotic arm.
 */
export const Robot = ({
  robot,
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: RobotProps) => {
  return <primitive object={robot} position={position} rotation={rotation} />;
};
