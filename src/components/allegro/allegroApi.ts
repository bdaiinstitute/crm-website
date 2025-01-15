import { getAbsoluteUrl } from "../../util/http";
import { TrajectoryType, DataOrigin } from "../../types/DataTypes";
import { AllegroEpisode, AllegroStats } from "./AllegroSceneState";

/**
 * Return the folder containing the IIWA episodes and stats.
 * @param trajectoryType Can be "NominalPLan", "OpenLoop" or "CloseLoop".
 * @param dataOrigin Can be "Hardware", "Simulation" or "Either".
 * @returns The folder containing the IIWA episodes and stats.
 */
const getDataFolder = (trajectoryType: TrajectoryType, dataOrigin: DataOrigin) => {
  let url = "";
  if (trajectoryType === TrajectoryType.NominalPlan) {
    url = getAbsoluteUrl(`data/allegro/nominal/`);
  } else {
    const trajectoryTypeFolder =
      trajectoryType === TrajectoryType.OpenLoop ? "open_loop" : "closed_loop";
    const dataOriginFolder =
      dataOrigin === DataOrigin.Hardware ? "hardware" : "simulation";
    url = getAbsoluteUrl(`data/allegro/${trajectoryTypeFolder}/${dataOriginFolder}`);
  }
  return url;
};

/**
 * Fetch a JSON file containing an Allegro hand episode.
 * @param episodeId The file id.
 * @param trajectoryType Can be "NominalPLan", "OpenLoop" or "CloseLoop".
 * @param dataOrigin Can be "Hardware", "Simulation" or "Either".
 * @returns An Allegro hand episode.
 */
export const fetchAllegroEpisode = async (
  episodeId: string,
  trajectoryType: TrajectoryType,
  dataOrigin: DataOrigin
): Promise<AllegroEpisode> => {
  const dataFolder = getDataFolder(trajectoryType, dataOrigin);
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
 * @param trajectoryType Can be "NominalPLan", "OpenLoop" or "CloseLoop".
 * @param episodeId The ID of the Allegro episode.
 * @returns The URL for the Allegro episode video.
 */
export const getAllegroVideoUrl = (
  trajectoryType: TrajectoryType,
  episodeId: string
): string => {
  let url = "";
  if (trajectoryType !== TrajectoryType.NominalPlan) {
    const trajectoryTypeFolder =
      trajectoryType === TrajectoryType.OpenLoop ? "open_loop" : "closed_loop";
    url = getAbsoluteUrl(`data/allegro/${trajectoryTypeFolder}/videos/${episodeId}.mp4`);
  }
  return url;
};

/**
 * Return the URL for an Allegro episode goal image.
 * @param episodeId The ID of the IIWA episode.
 * @returns The URL for the Allegro episode goal image.
 */
export const getAllegroGoalUrl = (episodeId: string): string => {
  const url = getAbsoluteUrl(`data/allegro/goals/${episodeId}.png`);
  return url;
};

/**
 * Fetch a JSON file containing Allegro episodes stats.
 * @param trajectoryType Can be "NominalPLan", "OpenLoop" or "CloseLoop".
 * @param dataOrigin Can be "Hardware", "Simulation" or "Either".
 * @returns Allegro episodes stats.
 */
export const fetchAllegroStats = async (
  trajectoryType: TrajectoryType,
  dataOrigin: DataOrigin
): Promise<AllegroStats> => {
  const dataFolder = getDataFolder(trajectoryType, dataOrigin);
  const url = `${dataFolder}/stats.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};
