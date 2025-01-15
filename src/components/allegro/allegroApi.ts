import { getAbsoluteUrl } from "../../util/http";
import { TrajectoryType, DataType } from "../../types/DataTypes";
import { AllegroEpisode, AllegroStats } from "./AllegroSceneState";

/**
 * Return the folder containing the IIWA episodes and stats.
 * @param controllerType Can be either "open_loop" or "close_loop".
 * @param dataType Can be either "hardware" or "simulation".
 * @returns The folder containing the IIWA episodes and stats.
 */
const getDataFolder = (controllerType: TrajectoryType, dataType: DataType) => {
  const dataFolder = dataType === DataType.Hardware ? "hardware" : "simulation";
  const controllerFolder =
    controllerType === TrajectoryType.OpenLoop ? "open_loop" : "closed_loop";
  const url = getAbsoluteUrl(`data/allegro/${dataFolder}/${controllerFolder}`);
  return url;
};

/**
 * Fetch a JSON file containing an Allegro hand episode.
 * @param episodeId The file id.
 * @param trajectoryType Can be either "open_loop" or "close_loop".
 * @param dataType Can be either "hardware" or "simulation".
 * @returns An Allegro hand episode.
 */
export const fetchAllegroEpisode = async (
  episodeId: string,
  trajectoryType: TrajectoryType,
  dataType: DataType
): Promise<AllegroEpisode> => {
  const dataFolder = getDataFolder(trajectoryType, dataType);
  const url = `${dataFolder}/${episodeId}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};

/**
 * Return the URL for an Allegro episode video.
 * @param controllerType The type of controller used for the episode, either
 * "open_loop" or "closed_loop".
 * @param episodeId The ID of the Allegro episode.
 * @returns The URL for the Allegro episode video.
 */
export const getAllegroVideoUrl = (
  controllerType: TrajectoryType,
  episodeId: string
): string => {
  const controllerFolder =
    controllerType === TrajectoryType.OpenLoop ? "open_loop" : "closed_loop";
  const url = getAbsoluteUrl(`data/allegro/videos/${controllerFolder}/${episodeId}.mp4`);
  return url;
};

/**
 * Return the URL for an Allegro episode goal image.
 * @param controllerType The type of controller used for the episode, either
 * "open_loop" or "closed_loop".
 * @param episodeId The ID of the IIWA episode.
 * @returns The URL for the Allegro episode goal image.
 */
export const getAllegroGoalUrl = (episodeId: string): string => {
  const url = getAbsoluteUrl(`data/allegro/goals/${episodeId}.png`);
  return url;
};

/**
 * Fetch a JSON file containing Allegro episodes stats.
 * @param controllerType Can be either "open_loop" or "close_loop".
 * @param dataType Can be either "hardware" or "simulation".
 * @returns Allegro episodes stats.
 */
export const fetchAllegroStats = async (
  controllerType: TrajectoryType,
  dataType: DataType
): Promise<AllegroStats> => {
  const dataFolder = getDataFolder(controllerType, dataType);
  const url = `${dataFolder}/stats.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};
