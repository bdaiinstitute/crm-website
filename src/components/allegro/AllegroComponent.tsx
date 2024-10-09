import { Suspense, useCallback, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { useQuery } from "@tanstack/react-query";

import { Player } from "../Player";
import { Menu } from "../menu/Menu";
import { Scene } from "./AllegroScene";
import { getAbsoluteUrl } from "../../http";
import { ScatterPlot } from "../ScatterPlot";
import { RobotContextProvider } from "../../context/RobotContext";
import { fetchAllegroEpisode, fetchAllegroStats } from "./allegroApi";
import { AllegroSceneState, AllegroStats, CubeState } from "./AllegroSceneState";
import useMenuContext from "../../hooks/useMenuContext";

/**
 * This is a component that renders an Allegro hand and a target object and allows the
 * user to play episodes selecting data from a scatter plot.
 */
export const AllegroComponent = () => {
  // State variables.
  const {
    errorType,
    setErrorType,
    controllerType,
    setControllerType,
    dataType,
    setDataType
  } = useMenuContext();

  const urdf = getAbsoluteUrl("models/allegro/urdf/allegro_right_hand.urdf");

  // Load episode statistics.
  const { data: stats } = useQuery<AllegroStats, Error>({
    queryKey: ["allegroStats", controllerType, dataType],
    queryFn: () => fetchAllegroStats(controllerType, dataType),
    placeholderData: []
  });

  /**
   * Handles the selection of a point in the scatter plot.
   * @param id The ID of the selected point.
   * @returns A Promise that resolves when the episode data has been fetched
   * and the scene state has been updated.
   */
  const handleSelectedPoint = useCallback(
    async (id: number) => {
      try {
        const episode = await fetchAllegroEpisode(id, controllerType, dataType);
        setGoal(episode.goal);
        setSceneSequence(episode.points);
      } catch (error) {
        throw new Error(`Error loading trajectory: ${(error as Error).message}`);
      }
    },
    [controllerType, dataType]
  );

  const [goal, setGoal] = useState<CubeState>({
    position: {
      x: 0.07481670858231289,
      y: 0.0033861859459129156,
      z: 0.05812032524744818
    },
    rotation: {
      w: 0.9512620870428025,
      x: -0.14976138347929052,
      y: 0.2230638640876131,
      z: -0.15137530284575615
    }
  });

  const [sceneState, setSceneState] = useState<AllegroSceneState>({
    timeFromStart: 0,
    hand: {
      joint0: 0.01,
      joint1: 1.24,
      joint2: 1.31,
      joint3: 1.13,
      joint4: -0.01,
      joint5: 0.77,
      joint6: 1.31,
      joint7: 1.39,
      joint8: 0.0,
      joint9: 1.24,
      joint10: 1.31,
      joint11: 1.13,
      joint12: 0.49,
      joint13: 1.58,
      joint14: 1.4,
      joint15: 1.36
    },
    cube: {
      position: {
        x: 0.065,
        y: 0.0,
        z: 0.042
      },
      rotation: {
        w: 1.0,
        x: 0.0,
        y: 0.0,
        z: 0.0
      }
    }
  });

  // State to hold the sequence of SceneStates.
  const [sceneSequence, setSceneSequence] = useState<AllegroSceneState[]>([sceneState]);

  /**
   * Player callback function that updates the scene state.
   * @param state The new scene state.
   */
  const onStateChanged = useCallback((state: AllegroSceneState) => {
    setSceneState(state);
  }, []);

  return (
    <>
      {/* Top Menu */}
      <Menu
        errorType={errorType}
        setErrorType={setErrorType}
        controllerType={controllerType}
        setControllerType={setControllerType}
        dataType={dataType}
        setDataType={setDataType}
      />

      <div className="container mx-auto px-2 py-2 max-w-3xl">
        {/* Center the column. */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center">
          {/* Scatter Plot. */}
          <div className="w-full md:w-1/2 px-1 mb-1">
            <ScatterPlot onPointSelected={handleSelectedPoint} />
          </div>

          {/* Scene. */}
          <div className="w-full md:w-1/2 px-1 mb-1">
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <Suspense fallback={<div>Loading robot...</div>}>
                <RobotContextProvider url={urdf}>
                  <Scene
                    goal={goal}
                    state={sceneState}
                    cameraPosition={[0.4, 0.4, 0.4]}
                  />
                </RobotContextProvider>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <div>
        <Player sequence={sceneSequence} onFrameChanged={onStateChanged} />
      </div>
    </>
  );
};
