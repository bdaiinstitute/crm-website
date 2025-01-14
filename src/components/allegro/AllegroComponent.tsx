import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { useQuery } from "@tanstack/react-query";

import { Menu } from "../menu/Menu";
import { Scene } from "./AllegroScene";
import { getAbsoluteUrl } from "../../util/http";
import useMenuContext from "../../hooks/useMenuContext";
import { SequencePlayer } from "../player/SequencePlayer";
import { AllegroScatterPlot } from "./AllegroScatterPlot";
import useVideoContext from "../../hooks/useVideoContext";
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
import { DataType } from "../../types/DataTypes";

/**
 * This is a component that renders an Allegro hand and a target object and allows the
 * user to play episodes selecting data from a scatter plot.
 */
export const AllegroComponent = () => {
  // Whether the video and the sequence should start playing automatically.
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  const urdf = getAbsoluteUrl("models/allegro/urdf/allegro_right_hand.urdf");

  // The selected summary metadata: goal, start and end state but not trajectory.
  const [episodeInfo, setEpisodeInfo] = useState<AllegroEpisodeInfo | null>(null);

  // The episode goal.
  const [goal, setGoal] = useState<CubeState>();

  // The episode sequence.
  const [sceneSequence, setSceneSequence] = useState<AllegroSceneState[]>([]);

  // The episode current state.
  const [sceneState, setSceneState] = useState<AllegroSceneState>();

  /**
   * These values are used to manage the state of the component, including the
   * type of error, controller, and data being displayed, as well as whether
   * the video should be shown.
   */
  const {
    errorType,
    setErrorType,
    controllerType,
    setControllerType,
    dataType,
    setDataType,
    showVideo,
    setShowVideo
  } = useMenuContext();

  // Load episode statistics.
  const { data: stats = [] } = useQuery<AllegroStats, Error>({
    queryKey: ["allegroStats", controllerType, dataType],
    queryFn: () => fetchAllegroStats(controllerType, dataType),
    placeholderData: []
  });

  /**
   * These values are used to manage the state of the video playback.
   */
  const videoRef = useRef<VideoRef>(null);
  const { currentTime, setCurrentTime, duration, setDuration, videoUrl, setVideoUrl } =
    useVideoContext();

  /**
   * Invoked when an episode is selected, programmatically or from the scatter
   * plot.
   * @param episodeInfo The episode summary.
   * @param autoPlay Whether to play the episode automatically.
   * @returns A Promise that resolves when the episode data has been fetched
   * and the scene state has been updated.
   */
  const loadEpisode = useCallback(
    async (episodeInfo: AllegroEpisodeInfo, autoPlay: boolean) => {
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

        setAutoPlay(autoPlay);
        setGoal(episode.goal);
        setSceneSequence(episode.points);
        setEpisodeInfo(episodeInfo);
        setVideoUrl(getAllegroVideoUrl(controllerType, episodeInfo.episodeId));
      } catch (error) {
        throw new Error(`Error loading trajectory: ${(error as Error).message}`);
      }
    },
    [controllerType, dataType, setVideoUrl]
  );

  // This is called when an episode info is selected.
  const handlePointSelected = useCallback(
    async (episodeInfo: AllegroEpisodeInfo) => {
      await loadEpisode(episodeInfo, true); // Autoplay on click.
    },
    [loadEpisode]
  );

  // This is called when all episodes information are loaded.
  useEffect(() => {
    if (stats && stats.length > 0) {
      loadEpisode(stats[0], false); // Disable autoplay on page load.
    }
  }, [loadEpisode, stats]);

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
        errorTypeOptionEnabled={false}
        videoOptionEnabled={true}
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
                Error: {episodeInfo.rotationError.toFixed(4)} rad
              </label>
            </div>
          )}

          {/* Scatter Plot. */}
          <div className="w-full md:w-1/2 px-1 mb-1">
            <AllegroScatterPlot stats={stats} onPointSelected={handlePointSelected} />
          </div>

          <div className="w-full md:w-1/2 px-1 mb-1">
            <div className={showVideo && dataType === DataType.Hardware ? "" : "hidden"}>
              <div className="relative">
                {/* Video */}
                <VideoPlayer
                  ref={videoRef}
                  videoUrl={videoUrl}
                  onDurationChange={setDuration}
                  onTimeUpdate={setCurrentTime}
                  scaleFactor={1.1}
                  horizontalShift={0.01}
                  autoPlay={autoPlay}
                />

                {/* Overlay Image */}
                {episodeInfo && episodeInfo.episodeId && (
                  <div>
                    <div
                      className="absolute"
                      style={{
                        top: "1%",
                        right: "13%",
                        zIndex: 11,
                        opacity: 1,
                        color: "white",
                        fontSize: "1.2rem",
                        textAlign: "right"
                      }}
                    >
                      Goal
                    </div>
                    <div
                      className="absolute"
                      style={{
                        top: "1%",
                        left: "5%",
                        zIndex: 11,
                        opacity: 1,
                        color: "white",
                        fontSize: "1.2rem"
                      }}
                    >
                      1x
                    </div>
                    <img
                      src={getAllegroGoalUrl(episodeInfo.episodeId)}
                      alt="Overlay"
                      className="absolute pointer-events-none"
                      style={{
                        top: "3%",
                        right: "-1%",
                        zIndex: 10,
                        opacity: 1,
                        objectFit: "scale-down",
                        width: "38%",
                        height: "38%"
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Scene */}
            <div
              className={!showVideo || dataType === DataType.Simulation ? "" : "hidden"}
            >
              <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <Suspense fallback={<div>Loading robot...</div>}>
                  <RobotContextProvider url={urdf}>
                    {goal && sceneState && (
                      <Scene
                        goal={goal}
                        state={sceneState}
                        cameraPosition={[0.5, 0.5, 0.3]}
                      />
                    )}
                  </RobotContextProvider>
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={showVideo && dataType === DataType.Hardware ? "" : "hidden"}>
          <VideoPlayerController
            videoRef={videoRef}
            currentTime={currentTime}
            duration={duration}
            autoPlay={autoPlay}
          />
        </div>
        <div className={!showVideo || dataType === DataType.Simulation ? "" : "hidden"}>
          <SequencePlayer
            sequence={sceneSequence}
            onFrameChanged={onStateChanged}
            autoPlay={autoPlay}
          />
        </div>
      </div>
    </>
  );
};
