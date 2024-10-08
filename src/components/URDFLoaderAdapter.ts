import { LoadingManager, Object3D } from "three";
import URDFLoader, { URDFRobot } from "urdf-loader";

/**
 * This code defines a class URDFLoaderAdapter that extends the URDFLoader from
 * the urdf-loader package. It acts as an adapter to make URDFLoader compatible
 * with the useLoader hook in react-three-fiber.
 * This ensures that the URDFLoader behaves like a standard loader from
 * Three.js, which react-three-fiber expects.
 * The class also provides methods to manage the asynchronous loading of URDF
 * robots and their associated meshes.
 */
export default class URDFLoaderAdapter extends URDFLoader {
  // Unused variables to make this look like a Loader<URDFRobot>
  crossOrigin = "anonymous";
  withCredentials = false;
  path = "";
  resourcePath = "";
  requestHeader = {};

  // Captures the loading status of all ongoing invocations of loadMeshCb so we
  // can wait to return loadAsync based on mesh load status.
  private meshesLoading: Promise<Object3D>[] = [];

  override loadMeshCb = (
    url: string,
    manager: LoadingManager,
    onLoad: (obj: Object3D, err?: Error) => void
  ) => {
    this.meshesLoading.push(
      new Promise((resolve, reject) =>
        this.defaultMeshLoader(url, manager, (loadedObj: Object3D, err?: Error) => {
          onLoad(loadedObj, err);
          if (err) {
            reject(err);
          } else {
            resolve(loadedObj);
          }
        })
      )
    );
  };

  /**
   * Load URDF and meshes synchronously.
   */
  override load(
    url: string,
    onLoad: (robot: URDFRobot) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (event: ErrorEvent) => void
  ) {
    super.load(url, onLoad, onProgress, onError);
  }

  /**
   * Load URDF and meshes asynchronously.
   */
  override loadAsync(url: string, onProgress?: (event: ProgressEvent) => void) {
    return new Promise<URDFRobot>((resolve, reject) => {
      this.load(
        url,
        (value) => {
          // Wait for all meshes to finish loading before declaring the robot finished.
          Promise.all(this.meshesLoading)
            .then(() => {
              resolve(value);
            })
            .catch((e) => {
              reject(e); // Propagate the error.
            });
        },
        onProgress,
        () => reject(new Error("Error loading URDF."))
      );
    });
  }

  setCrossOrigin(value: string) {
    this.crossOrigin = value;
    return this;
  }

  setWithCredentials(value: boolean) {
    this.withCredentials = value;
    return this;
  }

  setPath(value: string) {
    this.path = value;
    return this;
  }

  setResourcePath(value: string) {
    this.resourcePath = value;
    return this;
  }

  setRequestHeader(value: { [header: string]: string }) {
    this.requestHeader = value;
    return this;
  }
}
