import { getAbsoluteUrl } from "../../util/http";
import { TrajectoryType, DataOrigin } from "../../types/DataTypes";
import { IiwaEpisode, IiwaStats } from "./IiwaSceneState";

/**
 * Return the folder containing the IIWA episodes and stats.
 * @param trajectoryType Can be "NominalPLan", "OpenLoop" or "CloseLoop".
 * @param dataOrigin Can be "Hardware", "Simulation" or "Either".
 * @returns The folder containing the IIWA episodes and stats.
 */
const getDataFolder = (trajectoryType: TrajectoryType, dataOrigin: DataOrigin) => {
  let url = "";
  if (trajectoryType === TrajectoryType.NominalPlan) {
    url = getAbsoluteUrl(`data/iiwa/nominal/`);
  } else {
    const dataOriginFolder =
      dataOrigin === DataOrigin.Hardware ? "hardware" : "simulation";
    const trajectoryTypeFolder =
      trajectoryType === TrajectoryType.OpenLoop ? "open_loop" : "closed_loop";
    url = getAbsoluteUrl(`data/iiwa/${trajectoryTypeFolder}/${dataOriginFolder}`);
  }
  return url;
};

/**
 * Fetch a JSON file containing an IIWA episode.
 * @param id The file id.
 * @param trajectoryType Can be "NominalPLan", "OpenLoop" or "CloseLoop".
 * @param dataOrigin Can be "Hardware", "Simulation" or "Either".
 * @returns An IIWA episode.
 */
export const fetchIiwaEpisode = async (
  id: string,
  trajectoryType: TrajectoryType,
  dataType: DataOrigin
): Promise<IiwaEpisode> => {
  const dataFolder = getDataFolder(trajectoryType, dataType);
  const url = `${dataFolder}/${id}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};

/**
 * Return the URL for an IIWA episode video.
 * @param trajectoryType Can be "NominalPLan", "OpenLoop" or "CloseLoop".
 * @param episodeId The ID of the IIWA episode.
 * @returns The URL for the IIWA episode video.
 */
export const getIiwaVideoUrl = (
  trajectoryType: TrajectoryType,
  episodeId: string
): string => {
  let url = "";
  if (trajectoryType !== TrajectoryType.NominalPlan) {
    const trajectoryTypeFolder =
      trajectoryType === TrajectoryType.OpenLoop ? "open_loop" : "closed_loop";
    url = getAbsoluteUrl(`data/iiwa/${trajectoryTypeFolder}/videos/${episodeId}.mp4`);
  }
  return url;
};

/**
 * Return the URL for an IIWA episode goal image.
 * @param episodeId The ID of the IIWA episode.
 * @returns The URL for the IIWA episode goal image.
 */
export const getIiwaGoalUrl = (episodeId: string): string => {
  const url = getAbsoluteUrl(`data/iiwa/goals/${episodeId}.png`);
  return url;
};

/**
 * Fetch a JSON file containing IIWA episodes stats.
 * @param trajectoryType Can be "NominalPLan", "OpenLoop" or "CloseLoop".
 * @param dataOrigin Can be "Hardware", "Simulation" or "Either".
 * @returns IIWA episodes stats.
 */
export const fetchIiwaStats = async (
  trajectoryType: TrajectoryType,
  dataOrigin: DataOrigin
): Promise<IiwaStats> => {
  const dataFolder = getDataFolder(trajectoryType, dataOrigin);
  const url = `${dataFolder}/stats.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};
