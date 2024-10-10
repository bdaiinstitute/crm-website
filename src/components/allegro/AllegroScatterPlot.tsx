import { memo, useCallback, useEffect, useState } from "react";

import * as THREE from "three";
import Plot from "react-plotly.js";
import { Euler, Quaternion } from "three";
import { Data, Datum, Layout, PlotMouseEvent } from "plotly.js";

import { AllegroStats } from "./AllegroSceneState";

// Define a structure for plot custom data.
interface CustomData {
  id: string;
  segment: string;
  error: number;
}

const unwrapYaw = (yaw: number, previousYaw: number = 0): number => {
  const twoPi = Math.PI * 2;
  const delta = yaw - previousYaw;

  if (delta > Math.PI) {
    return yaw - twoPi;
  } else if (delta < -Math.PI) {
    return yaw + twoPi;
  }
  return yaw;
};

/**
 * Converts a Quaternion to Euler angles.
 * @param q The Quaternion to convert.
 * @returns An object with the roll, pitch, and yaw angles in degrees.
 */
const quaternionToEuler = (
  quaternion: Quaternion
): { roll: number; pitch: number; yaw: number } => {
  const euler = new Euler().setFromQuaternion(quaternion, "XYZ");
  const roll = euler.x;
  const pitch = euler.y;
  const yaw = euler.z;
  return {
    roll,
    pitch,
    yaw
  };
};

/**
 * Props for the ScatterPlotComponent component.
 * @param stats All Allegro episodes info.
 * @param onPointSelected A callback function invoked when the user clicks on
 * a point on the scatter plot.
 */
export interface AllegroScatterPlotProps {
  stats: AllegroStats | undefined;
  onPointSelected: (id: string) => void;
}

/**
 * This is a component to display a scatter plot and invoke a callback when
 * a point is clicked.
 *
 * IMPORTANT:
 * The Plot component does not work well with "memo". In this scenario,
 * all mouse events are not correctly connected and fail to fire.
 * Two workarounds have to be implemented to resolve the problem:
 * 1. An initialization state must to be added and updated on the first mount
 *    to trigger a re-rendering;
 * 2. The onClick event must be given a function reference and not a handler
 *    reference.
 * @param props {@link AllegroScatterPlotProps}
 * @returns A scatter plot.
 */
export const AllegroScatterPlotComponent = ({
  stats,
  onPointSelected
}: AllegroScatterPlotProps) => {
  // Initialization state.
  const [, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  // Event handler for clicking on a point
  const handleClick = useCallback(
    (event: PlotMouseEvent) => {
      if (event.points && event.points.length > 0) {
        const point = event.points[0];
        if (point) {
          const customData = point.customdata as unknown as CustomData;
          const id = customData.id;
          onPointSelected(id);
        }
      }
    },
    [onPointSelected]
  );

  if (stats) {
    const ids: CustomData[] = [];
    const goalRollPositions: number[] = [];
    const goalPitchPositions: number[] = [];
    const goalYawPositions: number[] = [];
    const errors: number[] = [];

    stats.forEach((episode) => {
      const goalQuaternion = new THREE.Quaternion(
        episode.goal.rotation.w,
        episode.goal.rotation.x,
        episode.goal.rotation.y,
        episode.goal.rotation.z
      );

      const { roll, pitch, yaw } = quaternionToEuler(goalQuaternion);

      goalPitchPositions.push(pitch);
      goalRollPositions.push(roll);
      goalYawPositions.push(yaw);

      // Extract error.
      const error = episode.rotationError;
      errors.push(error);
      // Extract id and other properties.
      const match = episode.episodeId.match(/segment_(\d+)/);
      if (match) {
        ids.push({
          id: episode.episodeId,
          segment: match[1],
          error: error
        });
      } else {
        ids.push({ id: "", segment: "", error: 0 });
      }
    });

    const goalMaxRollPosition = Math.max(...goalRollPositions);
    const goalMinRollPosition = Math.min(...goalRollPositions);

    const goalMaxPitchPosition = Math.max(...goalPitchPositions);
    const goalMinPitchPosition = Math.min(...goalPitchPositions);

    const goalMaxYawPosition = Math.max(...goalYawPositions);
    const goalMinYawPosition = Math.min(...goalYawPositions);

    const minError = Math.min(...errors);
    const maxError = Math.max(...errors);

    // Prepare the plot data.
    const data: Data[] = [
      {
        name: "Episodes",
        x: goalRollPositions,
        y: goalPitchPositions,
        z: goalYawPositions,
        mode: "markers",
        type: "scatter3d",
        marker: {
          size: 6,
          color: errors, // Use the error values for coloring.
          colorscale: "Viridis",
          cmin: minError, // Minimum of the error range.
          cmax: maxError, // Maximum of the error range.
          colorbar: {
            tickformat: ".3f", // Format ticks to three decimal places.
            thickness: 10,
            len: 0.8,
            x: 1.05, // Position it to the right of the plot.
            y: 0.45
          }
        },
        customdata: ids as unknown as Datum[],
        hovertemplate: `<b>ID:</b> (segment %{customdata.segment})<br><b>Δroll:</b> %{x:.4f}<br><b>Δpitch:</b> %{y:.4f}<br><b>Δyaw:</b> %{z:.4f}<br><b>Error:</b> %{customdata.error:.4f}<extra></extra>`
      }
    ];

    // Prepare the plot layout.
    const layout: Partial<Layout> = {
      scene: {
        xaxis: {
          title: "Δroll",
          range: [goalMinRollPosition, goalMaxRollPosition],
          fixedrange: true,
          showgrid: true,
          gridcolor: "#AAAAAA",
          gridwidth: 1,
          tick0: 0,
          zeroline: true,
          zerolinecolor: "#000000",
          zerolinewidth: 1
        },
        yaxis: {
          title: "Δpitch",
          range: [goalMinPitchPosition, goalMaxPitchPosition],
          fixedrange: true,
          showgrid: true,
          gridcolor: "#AAAAAA",
          gridwidth: 1,
          tick0: 0,
          zeroline: true,
          zerolinecolor: "#000000",
          zerolinewidth: 1
        },
        zaxis: {
          title: "Δyaw",
          range: [goalMinYawPosition, goalMaxYawPosition],
          fixedrange: true,
          showgrid: true,
          gridcolor: "#AAAAAA",
          gridwidth: 1,
          tick0: 0,
          zeroline: true,
          zerolinecolor: "#000000",
          zerolinewidth: 1
        },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 },
          center: { x: 0.1, y: -0.15, z: -0.05 }
        }
      },
      margin: { l: 0, r: 0, t: 0, b: 0 }, // Removes all margins
      showlegend: false,
      plot_bgcolor: "#F0F0F0",
      paper_bgcolor: "#F0F0F0"
    };

    return (
      <div className="w-full">
        <div className="aspect-square bg-white rounded-md overflow-hidden">
          <Plot
            data={data}
            layout={layout}
            // This event does not work with a handler reference, and must be
            // given a function reference instead.
            onClick={(event: PlotMouseEvent) => handleClick(event)}
            config={{
              responsive: true,
              displayModeBar: false
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    );
  }

  return <div></div>;
};

// Memoize the named component
export const AllegroScatterPlot = memo(AllegroScatterPlotComponent);
