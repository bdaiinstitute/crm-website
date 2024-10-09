import { getAbsoluteUrl } from "../../http";
import { ControllerType, DataType } from "../../types/DataTypes";
import { IiwaEpisode, IiwaStats } from "./IiwaSceneState";

/**
 * Return the folder containing the IIWA episodes and stats.
 * @param controllerType Can be either "open_loop" or "close_loop".
 * @param dataType Can be either "hardware" or "simulation".
 * @returns The folder containing the IIWA episodes and stats.
 */
const getDataFolder = (controllerType: ControllerType, dataType: DataType) => {
  const dataFolder = dataType === DataType.Hardware ? "hardware" : "simulation";
  const controllerFolder =
    controllerType === ControllerType.OpenLoop ? "open_loop" : "closed_loop";
  const url = getAbsoluteUrl(`data/iiwa/${dataFolder}/${controllerFolder}/`);
  return url;
};

/**
 * Fetch a JSON file containing an IIWA episode.
 * @param id The file id.
 * @param controllerType Can be either "open_loop" or "close_loop".
 * @param dataType Can be either "hardware" or "simulation".
 * @returns An IIWA episode.
 */
export const fetchIiwaEpisode = async (
  id: string,
  controllerType: ControllerType,
  dataType: DataType
): Promise<IiwaEpisode> => {
  const dataFolder = getDataFolder(controllerType, dataType);
  const url = `${dataFolder}/${id}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};

/**
 * Fetch a JSON file containing IIWA episodes stats.
 * @param controllerType Can be either "open_loop" or "close_loop".
 * @param dataType Can be either "hardware" or "simulation".
 * @returns IIWA episodes stats.
 */
export const fetchIiwaStats = async (
  controllerType: ControllerType,
  dataType: DataType
): Promise<IiwaStats> => {
  const dataFolder = getDataFolder(controllerType, dataType);
  const url = `${dataFolder}/stats.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};
