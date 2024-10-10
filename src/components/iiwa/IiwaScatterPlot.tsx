import { memo, useCallback, useEffect, useState } from "react";

import Plot from "react-plotly.js";
import { Data, Datum, Layout, PlotMouseEvent } from "plotly.js";

import { ErrorType } from "../../types/DataTypes";
import { IiwaStats } from "./IiwaSceneState";

// Define a structure for plot custom data.
interface CustomData {
  id: string;
  seed: string;
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
// Fo this reason we use a recommended rotation threshold of 0.4rad and a
// translation threshold of 0.1m.

const MAX_DISTANCE_ERROR = 0.1; // m
const MAX_ROTATION_ERROR = 0.4; // rad

/**
 * Props for the ScatterPlot3DComponent component.
 * @param stats All IIWA episodes info.
 * @param onPointSelected A callback function invoked when the user clicks on
 * a point on the scatter plot.
 */
export interface IiwaScatterPlotProps {
  stats: IiwaStats | undefined;
  errorType: ErrorType;
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
 * @param props {@link IiwaScatterPlotProps}
 * @returns A scatter plot.
 */
export const IiwaScatterPlotComponent = ({
  stats,
  errorType,
  onPointSelected
}: IiwaScatterPlotProps) => {
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
    const goalXPositions: number[] = [];
    const goalYPositions: number[] = [];
    const goalThetaPositions: number[] = [];
    const errors: number[] = [];

    stats.forEach((episode) => {
      // Extract the delta x between the initial position and the goal.
      goalXPositions.push(episode.goal.position.x - episode.initialPose.position.x);
      // Extract the delta y between the initial position and the goal.
      goalYPositions.push(episode.goal.position.y - episode.initialPose.position.y);
      // Extract the delta theta between the initial position and the goal.
      goalThetaPositions.push(
        episode.goal.rotation.theta - episode.initialPose.rotation.theta
      );
      // Extract error.
      const error =
        errorType === ErrorType.Position
          ? episode.translationError
          : episode.rotationError;
      errors.push(error);
      // Extract id and other properties.
      const match = episode.episodeId.match(/seed_(\d+)_segment_(\d+)/);
      if (match) {
        ids.push({
          id: episode.episodeId,
          seed: match[1],
          segment: match[2],
          error: error
        });
      } else {
        ids.push({ id: "", seed: "", segment: "", error: 0 });
      }
    });

    const goalMaxXPosition = Math.max(...goalXPositions);
    const goalMinXPosition = Math.min(...goalXPositions);

    const goalMaxYPosition = Math.max(...goalYPositions);
    const goalMinYPosition = Math.min(...goalYPositions);

    const goalMaxThetaPosition = Math.max(...goalThetaPositions);
    const goalMinThetaPosition = Math.min(...goalThetaPositions);

    const minError = Math.min(...errors);
    const maxError =
      errorType === ErrorType.Position ? MAX_DISTANCE_ERROR : MAX_ROTATION_ERROR;

    // Prepare the plot data.
    const data: Data[] = [
      {
        name: "Episodes",
        x: goalXPositions,
        y: goalYPositions,
        z: goalThetaPositions,
        mode: "markers",
        type: "scatter3d",
        marker: {
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
        hovertemplate: `<b>ID:</b> (seed %{customdata.seed}, segment %{customdata.segment})<br><b>Δx:</b> %{x:.4f}<br><b>Δy:</b> %{y:.4f}<br><b>Δθ:</b> %{z:.4f}<br><b>Error:</b> %{customdata.error:.4f}<extra></extra>`
      }
    ];

    // Prepare the plot layout.
    const layout: Partial<Layout> = {
      scene: {
        xaxis: {
          title: "Δx",
          range: [goalMinXPosition, goalMaxXPosition],
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
          title: "Δy",
          range: [goalMinYPosition, goalMaxYPosition],
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
          title: "Δθ",
          range: [goalMinThetaPosition, goalMaxThetaPosition],
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
      <div className="relative w-full">
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
      </div>
    );
  }

  return <div></div>;
};

// Memoize the named component
export const IiwaScatterPlot = memo(IiwaScatterPlotComponent);
