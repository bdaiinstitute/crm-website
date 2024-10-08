import { useContext, useMemo } from "react";
import { RobotContext } from "../context/RobotContext";

/**
 * This is the Context Consumer i.e. the method that returns the object stored
 * within the context.
 */
export const useRobotContext = () => {
  const robot = useContext(RobotContext);
  if (robot === undefined) {
    throw new Error("Tried to use RobotContext outside of a RobotContextProvider!");
  } else {
    return useMemo(() => robot.clone(), [robot]);
  }
};
