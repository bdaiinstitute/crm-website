import { Suspense, useCallback, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { useQuery } from "@tanstack/react-query";

import { Player } from "../Player";
import { Scene } from "./IiwaScene";
import { Menu } from "../menu/Menu";
import { getAbsoluteUrl } from "../../util/http";
import { IiwaScatterPlot } from "./IiwaScatterPlot";
import useMenuContext from "../../hooks/useMenuContext";
import { fetchIiwaEpisode, fetchIiwaStats } from "./iiwaApi";
import { RobotContextProvider } from "../../context/RobotContext";
import {
  CylinderState,
  IiwaEpisode,
  IiwaEpisodeInfo,
  IiwaSceneState,
  IiwaStats
} from "./IiwaSceneState";
import { ErrorType } from "../../types/DataTypes";

/**
 * This is a component that renders two IIWA arms and a target object and allows the
 * user to play episodes selecting data from a scatter plot.
 */
export const IiwaComponent = () => {
  // State variables.
  const {
    errorType,
    setErrorType,
    controllerType,
    setControllerType,
    dataType,
    setDataType
  } = useMenuContext();

  const urdf = getAbsoluteUrl("/models/iiwa/urdf/iiwa7.urdf");

  const [episodeInfo, setEpisodeInfo] = useState<IiwaEpisodeInfo | null>(null);

  // Extract id and other properties.
  let seed = "";
  let segment = "";
  if (episodeInfo) {
    const match = episodeInfo.episodeId.match(/seed_(\d+)_segment_(\d+)/);
    if (match) {
      seed = match[1];
      segment = match[2];
    }
  }

  // Load episode statistics.
  const { data: stats = [] } = useQuery<IiwaStats, Error>({
    queryKey: ["iiwaStats", controllerType, dataType],
    queryFn: () => fetchIiwaStats(controllerType, dataType),
    placeholderData: []
  });

  /**
   * Handles the selection of a point in the scatter plot.
   * @param id The ID of the selected point.
   * @returns A Promise that resolves when the episode data has been fetched
   * and the scene state has been updated.
   */
  const handleSelectedPoint = useCallback(
    async (episodeInfo: IiwaEpisodeInfo) => {
      try {
        const episode: IiwaEpisode = await fetchIiwaEpisode(
          episodeInfo.episodeId,
          controllerType,
          dataType
        );
        setGoal(episode.goal);
        setSceneSequence(episode.points);
        setEpisodeInfo(episodeInfo);
      } catch (error) {
        throw new Error(`Error loading episode: ${(error as Error).message}`);
      }
    },
    [controllerType, dataType]
  );

  const [goal, setGoal] = useState<CylinderState>({
    position: {
      x: 0.5,
      y: 0
    },
    rotation: { theta: 0 }
  });

  const [sceneState, setSceneState] = useState<IiwaSceneState>({
    timeFromStart: 0,
    leftArm: {
      joint0: 0,
      joint1: Math.PI / 2,
      joint2: -Math.PI / 2,
      joint3: 0.6,
      joint4: 0,
      joint5: -Math.PI / 2,
      joint6: 0
    },
    rightArm: {
      joint0: 0,
      joint1: Math.PI / 2,
      joint2: -Math.PI / 2,
      joint3: -0.6,
      joint4: 0,
      joint5: Math.PI / 2,
      joint6: 0
    },
    cylinder: {
      position: {
        x: 0.5,
        y: 0
      },
      rotation: { theta: 0 }
    }
  });

  // State to hold the sequence of SceneStates.
  const [sceneSequence, setSceneSequence] = useState<IiwaSceneState[]>([sceneState]);

  /**
   * Player callback function that updates the scene state.
   * @param state The new scene state.
   */
  const onStateChanged = useCallback((state: IiwaSceneState) => {
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
          {/* Episode info. */}
          {!!episodeInfo?.episodeId?.trim() && (
            <div className="absolute top-3 left-4 z-10 bg-white bg-opacity-75 p-2 rounded shadow flex flex-col">
              <label className="mb-2 flex items-center">
                Id: (seed: {seed}, segment: {segment})
              </label>
              <label className="flex items-center">
                Error:{" "}
                {errorType === ErrorType.Rotation
                  ? episodeInfo.rotationError.toFixed(4)
                  : episodeInfo.translationError.toFixed(4)}
              </label>
            </div>
          )}
          {/* Scatter Plot. */}
          <div className="w-full md:w-1/2 px-1 mb-1">
            <IiwaScatterPlot
              stats={stats}
              errorType={errorType}
              onPointSelected={handleSelectedPoint}
            />
          </div>

          {/* Scene. */}
          <div className="w-full md:w-1/2 px-1 mb-1">
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <Suspense fallback={<div>Loading robot...</div>}>
                <RobotContextProvider url={urdf}>
                  <Scene
                    goal={goal}
                    state={sceneState}
                    cameraPosition={[2.5, 2.5, 2.5]}
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
