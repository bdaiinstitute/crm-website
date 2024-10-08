import { getAbsoluteUrl } from "../../http";
import { IiwaEpisode, IiwaStats } from "./IiwaSceneState";

/**
 * Fetch a JSON file containing an IIWA episode.
 * @param id The file id.
 * @returns An IIWA episode.
 */
export const fetchIiwaEpisode = async (id: string): Promise<IiwaEpisode> => {
  const url = getAbsoluteUrl(`data/iiwa/simulation/closed_loop/${id}.json`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};

/**
 * Fetch a JSON file containing IIWA episodes stats.
 * @returns IIWA episodes stats.
 */
export const fetchIiwaStats = async (): Promise<IiwaStats> => {
  const url = getAbsoluteUrl(`data/iiwa/simulation/closed_loop/stats.json`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};
