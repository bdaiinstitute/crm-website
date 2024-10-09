import { useCallback } from "react";
import { AllegroEpisode } from "../../allegro/AllegroSceneState";
import {
  ALLEGRO_HARDWARE_CLOSED_LOOP_FILES,
  ALLEGRO_HARDWARE_OPEN_LOOP_FILES,
  ALLEGRO_SIMULATION_CLOSED_LOOP_FILES,
  ALLEGRO_SIMULATION_OPEN_LOOP_FILES
} from "../allegro/allegroFiles";
import { getAbsoluteUrl } from "../../../http";
import { ControllerType, DataType } from "../../../types/DataTypes";

export const DownloadAllegroStats = () => {
  // Function to handle the download
  const handleDownload = useCallback(
    async (dataType: DataType, controllerType: ControllerType) => {
      // This method inspect all episodes and extract the goal and the last trajectory
      // position.
      // Because goal and last position currently match, it modify the goal with some
      // random data.
      // Goals, last pose and errors are group together in a single stats file.

      const episodeNames: string[] = [];
      if (dataType === DataType.Simulation) {
        if (controllerType === ControllerType.OpenLoop) {
          episodeNames.push(...ALLEGRO_SIMULATION_OPEN_LOOP_FILES);
        } else if (controllerType === ControllerType.ClosedLoop) {
          episodeNames.push(...ALLEGRO_SIMULATION_CLOSED_LOOP_FILES);
        }
      } else if (dataType === DataType.Hardware) {
        if (controllerType === ControllerType.OpenLoop) {
          episodeNames.push(...ALLEGRO_HARDWARE_OPEN_LOOP_FILES);
        } else if (controllerType === ControllerType.ClosedLoop) {
          episodeNames.push(...ALLEGRO_HARDWARE_CLOSED_LOOP_FILES);
        }
      }

      // Load
      const episodeFiles: string[] = episodeNames.map((file) => {
        return getAbsoluteUrl(`data/allegro/${file}`);
      });

      // Load and process all episodes.
      const fetchPromises: Promise<AllegroEpisode>[] = episodeFiles.map(async (file) => {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${file}: ${response.status} ${response.statusText}`
          );
        }
        const data: AllegroEpisode = await response.json();
        return data;
      });

      const episodes: AllegroEpisode[] = await Promise.all(fetchPromises);
      const stats = episodes.map((episode) => {
        const goal = {
          position: {
            x: episode.goal.position.x,
            y: episode.goal.position.y,
            z: episode.goal.position.z
          },
          rotation: {
            w: episode.goal.rotation.w,
            x: episode.goal.rotation.x,
            y: episode.goal.rotation.y,
            z: episode.goal.rotation.z
          }
        };

        const initialPoint = episode.points[0].cube;
        const initialPose = {
          position: {
            x: initialPoint.position.x,
            y: initialPoint.position.y,
            z: initialPoint.position.z
          },
          rotation: {
            w: initialPoint.rotation.w,
            x: initialPoint.rotation.x,
            y: initialPoint.rotation.y,
            z: initialPoint.rotation.z
          }
        };

        const lastPoint = episode.points.slice(-1)[0].cube;
        const finalPose = {
          position: {
            x: lastPoint.position.x,
            y: lastPoint.position.y,
            z: lastPoint.position.z
          },
          rotation: {
            w: lastPoint.rotation.w,
            x: lastPoint.rotation.x,
            y: lastPoint.rotation.y,
            z: lastPoint.rotation.z
          }
        };

        return {
          episodeId: episode.episodeId,
          goal: goal,
          initialPose: initialPose,
          finalPose: finalPose
        };
      });

      const jsonString = JSON.stringify(stats, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;

      let fileName = "";
      if (dataType === DataType.Simulation) {
        if (controllerType === ControllerType.OpenLoop) {
          fileName = "allegro_simulation_open_loop.json";
        } else if (controllerType === ControllerType.ClosedLoop) {
          fileName = "allegro_simulation_closed_loop.json";
        }
      } else if (dataType === DataType.Hardware) {
        if (controllerType === ControllerType.OpenLoop) {
          fileName = "allegro_hardware_open_loop.json";
        } else if (controllerType === ControllerType.ClosedLoop) {
          fileName = "allegro_hardware_closed_loop.json";
        }
      }
      link.download = fileName;

      // Append the anchor to the document body
      document.body.appendChild(link);

      // Programmatically click the anchor to trigger the download
      link.click();

      // Clean up by removing the anchor and revoking the Object URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    []
  );

  return (
    <>
      <button
        className="button"
        onClick={() => handleDownload(DataType.Simulation, ControllerType.OpenLoop)}
      >
        Allegro simulation open_loop stats
      </button>
      <button
        className="button"
        onClick={() => handleDownload(DataType.Simulation, ControllerType.ClosedLoop)}
      >
        Allegro simulation closed_loop stats
      </button>
      <button
        className="button"
        onClick={() => handleDownload(DataType.Hardware, ControllerType.OpenLoop)}
      >
        Allegro hardware open_loop stats
      </button>
      <button
        className="button"
        onClick={() => handleDownload(DataType.Hardware, ControllerType.ClosedLoop)}
      >
        Allegro hardware closed_loop stats
      </button>
    </>
  );
};
