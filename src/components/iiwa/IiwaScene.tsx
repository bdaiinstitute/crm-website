import { memo, useEffect } from "react";

import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei";

import { Robot } from "../Robot";
import { Grid } from "../geometry/Grid";
import { Frame } from "../geometry/Frame";
import { Sector } from "../geometry/Sector";
import { Cylinder } from "../geometry/Cylinder";
import { CylinderState, IiwaSceneState } from "./IiwaSceneState";
import { CircleOutline } from "../geometry/CircleOutline";
import { useRobotContext } from "../../hooks/useRobotContext";

/**
 * Defines the props for the SceneComponent component.
 * @param goal The desired state of the cylinder.
 * @param state The current state of the IIWA scene.
 * @param cameraPosition The position of the camera in the scene.
 * @param controlsEnabled Whether the camera controls should be enabled.
 */
interface SceneProps {
  goal: CylinderState;
  state: IiwaSceneState;
  cameraPosition: [number, number, number];
  controlsEnabled?: boolean;
}

/**
 * Component to display the scene with two arms and a cylinder.
 *
 * ThreeJS default coordinate frame is y-up. There is a method to change the
 * reference frame to z-up:
 * THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);
 *
 * Unfortunately, the GizmoHelper only works with the default y-up frame.
 * For this reason, we decided to apply some rotations to the whole scene to
 * make it z-up and change labels and colors in the GizmoHelper, instead.
 *
 * @param {SceneProps} The props for the component.
 */
const SceneComponent = ({
  goal,
  state,
  cameraPosition,
  controlsEnabled = true
}: SceneProps) => {
  const leftArm = useRobotContext();
  const rightArm = useRobotContext();
  useEffect(() => {
    leftArm.setJointValue("iiwa_joint0", state.leftArm.joint0);
    leftArm.setJointValue("iiwa_joint1", state.leftArm.joint1);
    leftArm.setJointValue("iiwa_joint2", state.leftArm.joint2);
    leftArm.setJointValue("iiwa_joint3", state.leftArm.joint3);
    leftArm.setJointValue("iiwa_joint4", state.leftArm.joint4);
    leftArm.setJointValue("iiwa_joint5", state.leftArm.joint5);
    leftArm.setJointValue("iiwa_joint6", state.leftArm.joint6);
    rightArm.setJointValue("iiwa_joint0", state.rightArm.joint0);
    rightArm.setJointValue("iiwa_joint1", state.rightArm.joint1);
    rightArm.setJointValue("iiwa_joint2", state.rightArm.joint2);
    rightArm.setJointValue("iiwa_joint3", state.rightArm.joint3);
    rightArm.setJointValue("iiwa_joint4", state.rightArm.joint4);
    rightArm.setJointValue("iiwa_joint5", state.rightArm.joint5);
    rightArm.setJointValue("iiwa_joint6", state.rightArm.joint6);
  }, [state, leftArm, rightArm]);

  let startAngle = 0;
  let endAngle = 0;
  if (state.cylinder.rotation.theta - goal.rotation.theta > 0) {
    startAngle = 0;
    endAngle = state.cylinder.rotation.theta - goal.rotation.theta;
  } else {
    startAngle = state.cylinder.rotation.theta - goal.rotation.theta;
    endAngle = 0;
  }

  return (
    <div className="w-full">
      <div className="aspect-square bg-white rounded-md overflow-hidden">
        <Canvas
          // only re-render when props changed or when requested.
          // frameloop="demand"
          style={{
            backgroundColor: "#192635",
            borderRadius: "inherit",
            margin: "0 auto" // Center horizontally.
          }}
        >
          <AdaptiveDpr />
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[0, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
            color={"#FFFFFF"}
          />

          {/* We rotate the whole scene to make it z-up. */}
          <group
            rotation-x={-Math.PI / 2}
            rotation-z={-Math.PI / 2}
            position={[0, -0.2, -0.35]}
          >
            <Robot robot={leftArm} position={[0, 0.45, 0]} />
            <Robot robot={rightArm} position={[0, -0.45, 0]} />

            {/* The moving cylinder. */}
            <group
              position={[state.cylinder.position.x, state.cylinder.position.y, 0.25]}
              rotation-z={state.cylinder.rotation.theta}
            >
              <Cylinder radius={0.14} height={0.5} color={"#ff8888"} opacity={0.75} />
              <Frame size={0.4} />
            </group>

            {/* The goal. */}
            <group
              position={[goal.position.x, goal.position.y, -0.00001]}
              rotation-z={goal.rotation.theta}
            >
              <CircleOutline radius={0.14} thickness={0.004} color={"#FFFFFF"} />
              <Sector
                color={"#FFFFFF"}
                radius={0.14}
                startAngle={startAngle}
                endAngle={endAngle}
              />
            </group>

            {/* Floor. */}
            <Grid size={4} primarySubdivisionCount={2} secondarySubdivisionCount={10} />
          </group>

          <PerspectiveCamera
            makeDefault
            position={[cameraPosition[1], cameraPosition[2], cameraPosition[0]]}
            fov={20}
          />
          <OrbitControls makeDefault enableRotate={controlsEnabled} />

          {/* We invert colors and labels to make it look like z-up. */}

          <group scale={[-1, -1, 1]}>
            <GizmoHelper alignment="top-left" margin={[80, 80]}>
              <GizmoViewport
                axisColors={["#2f7f4f", "#3b5b9d", "#9d4b4b"]}
                labels={["Y", "Z", "X"]}
                labelColor="white"
                disabled={!controlsEnabled}
              />
            </GizmoHelper>
          </group>
        </Canvas>
      </div>
    </div>
  );
};

// Memoize the named component
export const Scene = memo(SceneComponent);
