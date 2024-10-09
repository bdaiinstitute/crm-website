import { createContext, PropsWithChildren } from "react";

import { URDFRobot } from "urdf-loader";

import { useSuspenseQuery } from "@tanstack/react-query";

import URDFLoaderAdapter from "../components/URDFLoaderAdapter";

/**
 * This is Context Creator.
 */
export const RobotContext = createContext<URDFRobot | undefined>(undefined);

/**
 * Fetch URDF and load the robot asynchronously.
 */
const loadRobot = async (url: string): Promise<URDFRobot> => {
  const loader = new URDFLoaderAdapter();
  const basePath = new URL(".", url).href;
  loader.setResourcePath(basePath);
  const loadedRobot = await loader.loadAsync(url);
  return loadedRobot;
};

/**
 * This is the Context Provider i.e. the component that provides the
 * new context and the object within.
 */
export const RobotContextProvider = ({
  url,
  children
}: PropsWithChildren<{ url: string }>) => {
  // The method useSuspenseQuery is used together with <Suspense> to display a
  // temporary message while loading.
  const { data: robot } = useSuspenseQuery({
    // The queryKey, used for caching, must include the URL to uniquely
    // identify each query based on the URL.
    queryKey: ["robot", url],
    queryFn: () => loadRobot(url)
  });

  return <RobotContext.Provider value={robot}>{children}</RobotContext.Provider>;
};
