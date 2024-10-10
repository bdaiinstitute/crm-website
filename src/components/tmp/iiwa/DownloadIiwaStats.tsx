import { useCallback } from "react";
import { IiwaEpisode } from "../../iiwa/IiwaSceneState";
import { getAbsoluteUrl } from "../../../util/http";
import { IIWA_CLOSED_LOOP_SIM_FILES } from "./iiwaFiles";

export const DownloadIiwaStats = () => {
  // Load
  const episodeFiles: string[] = IIWA_CLOSED_LOOP_SIM_FILES.map((file) => {
    return getAbsoluteUrl(`data/iiwa/${file}`);
  });

  // Function to handle the download
  const handleDownload = useCallback(async () => {
    // This method inspect all episodes and extract the goal and the last trajectory
    // position.
    // Because goal and last position currently match, it modify the goal with some
    // random data.
    // Goals, last pose and errors are group together in a single stats file.

    // Load and process all episodes.
    const fetchPromises: Promise<IiwaEpisode>[] = episodeFiles.map(async (file) => {
      console.log(file);
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${file}: ${response.status} ${response.statusText}`
        );
      }
      const data: IiwaEpisode = await response.json();
      return data;
    });

    const episodes: IiwaEpisode[] = await Promise.all(fetchPromises);
    const stats = episodes.map((episode) => {
      const goal = {
        position: {
          x: episode.goal.position.x,
          y: episode.goal.position.y
        },
        rotation: {
          theta: episode.goal.rotation.theta
        }
      };

      const initialPoint = episode.points[0].cylinder;
      const initialPose = {
        position: {
          x: initialPoint.position.x,
          y: initialPoint.position.y
        },
        rotation: {
          theta: initialPoint.rotation.theta
        }
      };

      const lastPoint = episode.points.slice(-1)[0].cylinder;
      const finalPose = {
        position: {
          x: lastPoint.position.x,
          y: lastPoint.position.y
        },
        rotation: {
          theta: lastPoint.rotation.theta
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
    link.download = "stats.json"; // Desired file name

    // Append the anchor to the document body
    document.body.appendChild(link);

    // Programmatically click the anchor to trigger the download
    link.click();

    // Clean up by removing the anchor and revoking the Object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [episodeFiles]);

  return (
    <>
      <button onClick={handleDownload}>IIWA simulation open_loop stats</button>
      <button onClick={handleDownload}>IIWA simulation closed_loop stats</button>
      <button onClick={handleDownload}>IIWA hardware open_loop stats</button>
      <button onClick={handleDownload}>IIWA hardware closed_loop stats</button>
    </>
  );
};
