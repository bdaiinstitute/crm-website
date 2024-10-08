import { getAbsoluteUrl } from "../../http";
import { AllegroEpisode } from "./AllegroSceneState";

/**
 * Fetch a JSON file containing an Allegro hand episode.
 * @param id The file id.
 * @returns An Allegro hand episode.
 */
export const fetchAllegroEpisode = async (id: number): Promise<AllegroEpisode> => {
  const url = getAbsoluteUrl(`data/allegro/episode_${id}.json`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};
