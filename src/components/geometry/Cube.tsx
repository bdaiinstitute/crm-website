import * as THREE from "three";
import { Texture, TextureLoader } from "three";

import { useLoader } from "@react-three/fiber";

/**
 * Props for the Cube component.
 * @property size The size of the cube.
 * @property opacity The cube opacity.
 */
interface CubeProps {
  size: number;
  opacity?: number;
}

/**
 * This is a cube with numbered faces.
 * @param props {@link CubeProps}
 * @returns A cube.
 */
export const Cube = ({ size, opacity = 1 }: CubeProps) => {
  // Dynamically get the base URL from Vite's environment variables
  const BASE_URL = `${window.location.origin}${import.meta.env.BASE_URL}`;

  const texture: Texture[] = useLoader(TextureLoader, [
    `${BASE_URL}models/allegro/textures/1.png`,
    `${BASE_URL}models/allegro/textures/2.png`,
    `${BASE_URL}models/allegro/textures/3.png`,
    `${BASE_URL}models/allegro/textures/4.png`,
    `${BASE_URL}models/allegro/textures/5.png`,
    `${BASE_URL}models/allegro/textures/6.png`
  ]) as Texture[];

  return (
    <mesh rotation-x={Math.PI / 2} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        attach="material-0"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[1]}
      />
      <meshStandardMaterial
        attach="material-1"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[3]}
      />
      <meshStandardMaterial
        attach="material-2"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[0]}
      />
      <meshStandardMaterial
        attach="material-3"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[5]}
      />
      <meshStandardMaterial
        attach="material-4"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[4]}
      />
      <meshStandardMaterial
        attach="material-5"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[2]}
      />
    </mesh>
  );
};
