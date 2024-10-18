import { memo, useCallback, useEffect, useState } from "react";

import Plot from "react-plotly.js";
import { Data, Datum, Layout, PlotMouseEvent } from "plotly.js";

import { AllegroEpisodeInfo, AllegroStats } from "./AllegroSceneState";
import { quaternionToEuler } from "../../util/math";

// Define a structure for plot custom data.
interface CustomData {
  id: string;
  segment: string;
  error: number;
}

// In the dataset, there are few datapoints with large errors. Coloring nodes
// using the max error would push most points near the very dark side of the
// spectrum. The plot would have a few bright points (outliers) and many dark
// points.
// Additionally, max errors for hardware and sim data are different. Coloring
// nodes based on truncated error will make the color between different
// datasets comparable.
// Fo this reason we use a recommended rotation threshold of 0.6rad.
const MAX_ROTATION_ERROR = 1.4; // rad

/**
 * Props for the ScatterPlotComponent component.
 * @param stats All Allegro episodes info.
 * @param onPointSelected A callback function invoked when the user clicks on
 * a point on the scatter plot.
 */
export interface AllegroScatterPlotProps {
  stats: AllegroStats;
  onPointSelected: (episodeInfo: AllegroEpisodeInfo) => void;
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

          const episodeInfo = stats.find((episode) => episode.episodeId === id);
          if (episodeInfo) {
            onPointSelected(episodeInfo);
          }
        }
      }
    },
    [onPointSelected, stats]
  );

  const ids: CustomData[] = [];
  const goalRollPositions: number[] = [];
  const goalPitchPositions: number[] = [];
  const goalYawPositions: number[] = [];
  const errors: number[] = [];

  stats.forEach((episodeInfo) => {
    const { roll, pitch, yaw } = quaternionToEuler(
      episodeInfo.goal.rotation.w,
      episodeInfo.goal.rotation.x,
      episodeInfo.goal.rotation.y,
      episodeInfo.goal.rotation.z
    );

    goalPitchPositions.push(roll);
    goalRollPositions.push(pitch);
    goalYawPositions.push(yaw);

    // Extract error.
    const error = episodeInfo.rotationError;
    errors.push(error);

    // Extract id and other properties.
    const match = episodeInfo.episodeId.match(/segment_(\d+)/);
    if (match) {
      ids.push({
        id: episodeInfo.episodeId,
        segment: match[1],
        error: error
      });
    } else {
      ids.push({ id: "", segment: "", error: 0 });
    }
  });

  const minError = 0;
  const maxError = MAX_ROTATION_ERROR;

  // Main plot data.
  const data: Data[] = [
    {
      name: "Episodes",
      x: goalRollPositions,
      y: goalPitchPositions,
      z: goalYawPositions,
      mode: "markers",
      type: "scatter3d",
      marker: {
        color: errors, // Use the error values for coloring.
        colorscale: "Viridis",
        cmin: minError, // Minimum of the error range.
        cmax: maxError, // Maximum of the error range.
        colorbar: {
          title: "Error (rad)",
          titleside: "bottom",
          tickformat: ".3f", // Format ticks to three decimal places.
          thickness: 10,
          len: 0.8,
          x: 1.05, // Position it to the right of the plot.
          y: 0.45
        }
      },
      customdata: ids as unknown as Datum[],
      hovertemplate: `${
        "<b>ID:</b> (segment %{customdata.segment})<br>" +
        "<b>roll:</b> %{x:.4f} rad<br>" +
        "<b>pitch:</b> %{y:.4f} rad<br>" +
        "<b>yaw:</b> %{z:.4f} rad<br>" +
        "<b>Error:</b> %{customdata.error:.4f} rad" +
        "<extra></extra>"
      }`
    }
  ];

  // Prepare the plot layout.
  const layout: Partial<Layout> = {
    title: "<br><br>Goals",
    scene: {
      xaxis: {
        title: "roll (rad)",
        range: [-1, 1],
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
        title: "pitch (rad)",
        range: [-1, 1],
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
        title: "yaw (rad)",
        range: [-1, 1],
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
};

// Memoize the named component
export const AllegroScatterPlot = memo(AllegroScatterPlotComponent);
