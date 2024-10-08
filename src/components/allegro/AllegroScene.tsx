import { memo, useEffect, useRef } from "react";

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
import { Cube } from "../geometry/Cube";
import { Frame } from "../geometry/Frame";
import { CubeState, AllegroSceneState } from "./AllegroSceneState";
import { useRobotContext } from "../../hooks/useRobotContext";
import { CubeOutline } from "../geometry/CubeOutline";

interface SceneProps {
  goal: CubeState;
  state: AllegroSceneState;
  cameraPosition: [number, number, number];
  controlsEnabled?: boolean;
}

/**
 * Component to display the scene with an Allegro hand and a cube.
 *
 * ThreeJS default coordinate frame is y-up. There is a method to change the
 * reference frame to z-up:
 * THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);
 *
 * Unfortunately, the GizmoHelper only works with the default y-up frame.
 * For this reason, we decided to apply some rotations to the whole scene to
 * make it z-up and change labels and colors in the GizmoHelper, instead.
 */
const SceneComponent = ({
  goal,
  state,
  cameraPosition,
  controlsEnabled = true
}: SceneProps) => {
  const hand = useRobotContext();
  const cubeRef = useRef(null);

  useEffect(() => {
    hand.setJointValue("joint_0", state.hand.joint0);
    hand.setJointValue("joint_1", state.hand.joint1);
    hand.setJointValue("joint_2", state.hand.joint2);
    hand.setJointValue("joint_3", state.hand.joint3);
    hand.setJointValue("joint_4", state.hand.joint4);
    hand.setJointValue("joint_5", state.hand.joint5);
    hand.setJointValue("joint_6", state.hand.joint6);
    hand.setJointValue("joint_7", state.hand.joint7);
    hand.setJointValue("joint_8", state.hand.joint8);
    hand.setJointValue("joint_9", state.hand.joint9);
    hand.setJointValue("joint_10", state.hand.joint10);
    hand.setJointValue("joint_11", state.hand.joint11);
    hand.setJointValue("joint_12", state.hand.joint12);
    hand.setJointValue("joint_13", state.hand.joint13);
    hand.setJointValue("joint_14", state.hand.joint14);
    hand.setJointValue("joint_15", state.hand.joint15);
  }, [state, hand]);

  return (
    <div className="w-full">
      <div className="aspect-square bg-white rounded-md overflow-hidden">
        <Canvas
          shadows
          // only re-render when props changed or when requested.
          // frameloop="demand"
          style={{
            backgroundColor: "#192635",
            borderRadius: "inherit",
            margin: "0 auto" // Center horizontally.
          }}
        >
          <AdaptiveDpr />
          <ambientLight intensity={1.0} />
          <spotLight
            position={[0, 2, 2]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={3.14}
          />

          {/* We rotate the whole scene to make it z-up. */}
          <group
            rotation-x={-Math.PI / 2}
            rotation-z={-Math.PI / 2}
            position={[0.0, -0.05, -0.067]}
          >
            <Robot
              robot={hand}
              position={[0, 0, 0]}
              rotation={[Math.PI, Math.PI / 2, 0]}
            />

            {/* The moving cube. */}
            <group
              ref={cubeRef}
              position={[
                state.cube.position.x,
                state.cube.position.y,
                state.cube.position.z
              ]}
              quaternion={[
                state.cube.rotation.x,
                state.cube.rotation.y,
                state.cube.rotation.z,
                state.cube.rotation.w
              ]}
            >
              <Cube size={0.06} opacity={0.75} />
              <Frame size={0.1} thickness={0.001} />
            </group>

            {/* The goal. */}
            <group
              position={[goal.position.x, goal.position.y, goal.position.z]}
              quaternion={[
                goal.rotation.x,
                goal.rotation.y,
                goal.rotation.z,
                goal.rotation.w
              ]}
            >
              <CubeOutline size={0.06} thickness={0.0015} color={"#FFFFFF"} />
            </group>

            {/* Floor. */}
            <Grid size={1} primarySubdivisionCount={2} secondarySubdivisionCount={10} />
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
