import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { useQuery } from "@tanstack/react-query";

import { Scene } from "./IiwaScene";
import { Menu } from "../menu/Menu";
import { getAbsoluteUrl } from "../../util/http";
import { DataType, ErrorType } from "../../types/DataTypes";
import { IiwaScatterPlot } from "./IiwaScatterPlot";
import useMenuContext from "../../hooks/useMenuContext";
import { SequencePlayer } from "../player/SequencePlayer";
import useVideoContext from "../../hooks/useVideoContext";
import VideoPlayer, { VideoRef } from "../player/VideoPlayer";
import { RobotContextProvider } from "../../context/RobotContext";
import { VideoPlayerController } from "../player/VideoPlayerController";
import {
  fetchIiwaEpisode,
  fetchIiwaStats,
  getIiwaGoalUrl,
  getIiwaVideoUrl
} from "./iiwaApi";
import {
  CylinderState,
  IiwaEpisode,
  IiwaEpisodeInfo,
  IiwaSceneState,
  IiwaStats
} from "./IiwaSceneState";

/**
 * This is a component that renders two IIWA arms and a target object and allows the
 * user to play episodes selecting data from a scatter plot.
 */
export const IiwaComponent = () => {
  // Whether the video and the sequence should start playing automatically.
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  const urdf = getAbsoluteUrl("/models/iiwa/urdf/iiwa7.urdf");

  // The selected episode summary: goal, start and end state but not trajectory.
  const [episodeInfo, setEpisodeInfo] = useState<IiwaEpisodeInfo>();

  // The episode goal.
  const [goal, setGoal] = useState<CylinderState>();

  // The current sequence.
  const [sceneSequence, setSceneSequence] = useState<IiwaSceneState[]>([]);

  // The episode current state.
  const [sceneState, setSceneState] = useState<IiwaSceneState>();

  /**
   * These values are used to manage the state of the component, including the
   * type of error, trajectory, and data being displayed, as well as whether
   * the video should be shown.
   */
  const {
    errorType,
    setErrorType,
    trajectoryType,
    setTrajectoryType,
    dataType,
    setDataType,
    showVideo,
    setShowVideo
  } = useMenuContext();

  // Load all episodes metadata.
  const { data: stats = [] } = useQuery<IiwaStats, Error>({
    queryKey: ["iiwaStats", trajectoryType, dataType],
    queryFn: () => fetchIiwaStats(trajectoryType, dataType),
    placeholderData: []
  });

  /**
   * These values are used to manage the state of the video playback.
   */
  const videoRef = useRef<VideoRef>(null);
  const { currentTime, setCurrentTime, duration, setDuration, videoUrl, setVideoUrl } =
    useVideoContext();

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

  /**
   * Invoked when an episode is selected, programmatically or from the scatter
   * plot.
   * @param episodeInfo The episode summary.
   * @param autoPlay Whether to play the episode automatically.
   * @returns A Promise that resolves when the episode data has been fetched
   * and the scene state has been updated.
   */
  const loadEpisode = useCallback(
    async (episodeInfo: IiwaEpisodeInfo, autoPlayEnabled: boolean) => {
      try {
        const episode: IiwaEpisode = await fetchIiwaEpisode(
          episodeInfo.episodeId,
          trajectoryType,
          dataType
        );
        setAutoPlay(autoPlayEnabled);
        setGoal(episode.goal);
        setSceneSequence(episode.points);
        setEpisodeInfo(episodeInfo);
        setVideoUrl(getIiwaVideoUrl(trajectoryType, episodeInfo.episodeId));
      } catch (error) {
        throw new Error(`Error loading episode: ${(error as Error).message}`);
      }
    },
    [trajectoryType, dataType, setVideoUrl]
  );

  // This is called when an episode info is selected.
  const handlePointSelected = useCallback(
    async (episodeInfo: IiwaEpisodeInfo) => {
      await loadEpisode(episodeInfo, true); // Autoplay on click.
    },
    [loadEpisode]
  );

  // This is called when all episodes information are loaded.
  useEffect(() => {
    if (stats && stats.length > 0) {
      setAutoPlay(false);
      loadEpisode(stats[0], false); // Disable autoplay on page load.
    }
  }, [loadEpisode, stats]);

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
        trajectoryType={trajectoryType}
        setTrajectoryType={setTrajectoryType}
        dataType={dataType}
        setDataType={setDataType}
        showVideo={showVideo}
        setShowVideo={setShowVideo}
        errorTypeOptionEnabled={true}
        videoOptionEnabled={true}
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
                  ? episodeInfo.rotationError.toFixed(4) + " rad"
                  : episodeInfo.translationError.toFixed(4) + " m"}
              </label>
            </div>
          )}

          {/* Scatter Plot. */}
          <div className="w-full md:w-1/2 px-1 mb-1">
            <IiwaScatterPlot
              stats={stats}
              errorType={errorType}
              onPointSelected={handlePointSelected}
            />
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
                  scaleFactor={1.0}
                  autoPlay={autoPlay}
                />

                {/* Overlay Image */}
                {episodeInfo && episodeInfo.episodeId && (
                  <div>
                    <div
                      className="absolute"
                      style={{
                        bottom: "1%",
                        right: "13%",
                        zIndex: 11,
                        opacity: 1,
                        color: "white",
                        fontSize: "1.2rem",
                        textAlign: "center"
                      }}
                    >
                      Goal
                    </div>
                    <div
                      className="absolute"
                      style={{
                        bottom: "1%",
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
                      src={getIiwaGoalUrl(episodeInfo.episodeId)}
                      alt="Overlay"
                      className="absolute pointer-events-none"
                      style={{
                        bottom: "4%",
                        right: "2%",
                        zIndex: 10,
                        width: "30%",
                        height: "30%",
                        opacity: 1,
                        objectFit: "scale-down"
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Scene. */}
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
                        cameraPosition={[0, 0, 4.5]}
                      />
                    )}
                  </RobotContextProvider>
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};
