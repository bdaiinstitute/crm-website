import { useCallback } from "react";
import { fetchIiwaEpisode } from "../iiwa/iiwaApi";

export const DownloadIiwaEpisode = () => {
  // Function to handle the download
  const handleDownload = useCallback(async () => {
    // This method inspect all episodes and extract the goal and the last trajectory
    // position.
    // Because goal and last position currently match, it modify the goal with some
    // random data.
    // Goals, last pose and errors are group together in a single stats file.

    const id = "id";

    const episode = await fetchIiwaEpisode(id);

    const newGoal = {
      position: {
        x: episode.goal.position.x,
        y: episode.goal.position.y
      },
      rotation: {
        theta: episode.goal.rotation.theta
      }
    };

    const newPoints = episode.points.map((point) => {
      const newPoint = {
        timeFromStart: point.timeFromStart,
        leftArm: {
          joint0: point.leftArm.joint0,
          joint1: point.leftArm.joint1,
          joint2: point.leftArm.joint2,
          joint3: point.leftArm.joint3,
          joint4: point.leftArm.joint4,
          joint5: point.leftArm.joint5,
          joint6: point.leftArm.joint6
        },
        rightArm: {
          joint0: point.rightArm.joint0,
          joint1: point.rightArm.joint1,
          joint2: point.rightArm.joint2,
          joint3: point.rightArm.joint3,
          joint4: point.rightArm.joint4,
          joint5: point.rightArm.joint5,
          joint6: point.rightArm.joint6
        },
        cylinder: {
          position: {
            x: point.cylinder.position.x,
            y: point.cylinder.position.y
          },
          rotation: {
            theta: point.cylinder.rotation.theta
          }
        }
      };
      return newPoint;
    });

    const newEpisode = {
      episodeId: episode.episodeId,
      goal: newGoal,
      points: newPoints
    };

    const jsonString = JSON.stringify(newEpisode, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = `episode_${id}.json`;

    // Append the anchor to the document body
    document.body.appendChild(link);

    // Programmatically click the anchor to trigger the download
    link.click();

    // Clean up by removing the anchor and revoking the Object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return <button onClick={handleDownload}>Download IIWA episode</button>;
};
