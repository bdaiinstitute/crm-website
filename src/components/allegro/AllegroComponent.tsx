import { Suspense, useCallback, useRef, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { useQuery } from "@tanstack/react-query";

import { Menu } from "../menu/Menu";
import { Scene } from "./AllegroScene";
import { getAbsoluteUrl } from "../../util/http";
import useMenuContext from "../../hooks/useMenuContext";
import { SequencePlayer } from "../player/SequencePlayer";
import { AllegroScatterPlot } from "./AllegroScatterPlot";
import VideoPlayer, { VideoRef } from "../player/VideoPlayer";
import { RobotContextProvider } from "../../context/RobotContext";
import { VideoPlayerController } from "../player/VideoPlayerController";
import {
  AllegroEpisodeInfo,
  AllegroSceneState,
  AllegroStats,
  CubeState
} from "./AllegroSceneState";
import {
  fetchAllegroEpisode,
  fetchAllegroStats,
  getAllegroGoalUrl,
  getAllegroVideoUrl
} from "./allegroApi";

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

  const videoRef = useRef<VideoRef>(null);

  const urdf = getAbsoluteUrl("models/allegro/urdf/allegro_right_hand.urdf");

  const [episodeInfo, setEpisodeInfo] = useState<AllegroEpisodeInfo | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Load episode statistics.
  const { data: stats = [] } = useQuery<AllegroStats, Error>({
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
    async (episodeInfo: AllegroEpisodeInfo) => {
      try {
        const episode = await fetchAllegroEpisode(
          episodeInfo.episodeId,
          controllerType,
          dataType
        );

        // We are only interested in evaluating rotation errors.
        // For this reason, we use the last position of the cube as the position goal.
        const finalPose = episode.points[episode.points.length - 1].cube;
        episode.goal.position = finalPose.position;

        setGoal(episode.goal);
        setSceneSequence(episode.points);
        setEpisodeInfo(episodeInfo);
        setVideoUrl(getAllegroVideoUrl(controllerType, episodeInfo.episodeId));
      } catch (error) {
        throw new Error(`Error loading trajectory: ${(error as Error).message}`);
      }
    },
    [controllerType, dataType]
  );

  const [goal, setGoal] = useState<CubeState>({
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
        showVideo={showVideo}
        setShowVideo={setShowVideo}
        errorTypeEnabled={false}
        showVideoEnabled={true}
      />

      <div className="container mx-auto px-2 py-2 max-w-3xl">
        {/* Center the column. */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center">
          {/* Episode info. */}
          {!!episodeInfo?.episodeId?.trim() && (
            <div className="absolute top-3 left-4 z-10 bg-white bg-opacity-75 p-2 rounded shadow flex flex-col">
              <label className="mb-2 flex items-center">
                Id: {episodeInfo.episodeId}
              </label>
              <label className="flex items-center">
                Error: {episodeInfo.rotationError.toFixed(4)}
              </label>
            </div>
          )}

          {/* Scatter Plot. */}
          <div className="w-full md:w-1/2 px-1 mb-1">
            <AllegroScatterPlot stats={stats} onPointSelected={handleSelectedPoint} />
          </div>

          <div className="w-full md:w-1/2 px-1 mb-1">
            <div className={showVideo ? "" : "hidden"}>
              <div className="relative">
                {/* Video */}
                <VideoPlayer
                  ref={videoRef}
                  videoUrl={videoUrl}
                  onDurationChange={setDuration}
                  onTimeUpdate={setCurrentTime}
                />

                {/* Overlay Image */}
                <img
                  src={episodeInfo ? getAllegroGoalUrl(episodeInfo.episodeId) : ""}
                  alt="Overlay"
                  className="absolute top-2 right-2 w-1/4 h-1/4 pointer-events-none"
                  style={{
                    zIndex: 10,
                    opacity: 1,
                    objectFit: "scale-down"
                  }}
                />
              </div>
            </div>

            {/* Scene */}
            <div className={!showVideo ? "" : "hidden"}>
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
      </div>
      <div>
        <div className={showVideo ? "" : "hidden"}>
          <VideoPlayerController
            videoRef={videoRef}
            currentTime={currentTime}
            duration={duration}
          />
        </div>
        <div className={!showVideo ? "" : "hidden"}>
          <SequencePlayer sequence={sceneSequence} onFrameChanged={onStateChanged} />
        </div>
      </div>
    </>
  );
};
