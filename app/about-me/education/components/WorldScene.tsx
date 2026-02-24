"use client";

import { FC } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Physics, usePlane } from "@react-three/cannon";
import { Sky, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import PlayerController from "./PlayerController";

const Floor = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  const grassTexture = useLoader(
    THREE.TextureLoader,
    "/textures/grass_diffuse.jpg",
  );
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(20, 20);

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[120, 120]} />
      <meshStandardMaterial map={grassTexture} />
    </mesh>
  );
};

const ThreeFloorBuilding = ({
  position,
  rotation = [0, 0, 0] as [number, number, number],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const wallTexture = useLoader(
    THREE.TextureLoader,
    "/textures/concrete_wall_diffuse.jpg",
  );
  const wallNormal = useLoader(
    THREE.TextureLoader,
    "/textures/concrete_wall_normal.jpg",
  );
  const metalTexture = useLoader(
    THREE.TextureLoader,
    "/textures/metal_roof.jpg",
  );
  const windowTexture = useLoader(
    THREE.TextureLoader,
    "/textures/window_glass.jpg",
  );

  return (
    <group position={position} rotation={rotation}>
      {/* Walls */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[12, 9, 30]} />
        <meshStandardMaterial
          map={wallTexture}
          normalMap={wallNormal}
          roughness={0.7}
        />
      </mesh>

      {/* Floor Dividers */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[12, 0.2, 30]} />
        <meshStandardMaterial color="#c5c5c5" roughness={0.8} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[12, 0.2, 30]} />
        <meshStandardMaterial color="#c5c5c5" roughness={0.8} />
      </mesh>

      {/* Windows */}
      {Array.from({ length: 6 }).map((_, colIdx) =>
        Array.from({ length: 3 }).map((_, rowIdx) => (
          <mesh
            key={`${colIdx}-${rowIdx}`}
            position={[6.1, 2.5 - rowIdx * 3, -12 + colIdx * 5.5]}
          >
            <boxGeometry args={[0.1, 1.5, 4]} />
            <meshStandardMaterial
              map={windowTexture}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        )),
      )}

      {/* Roof */}
      <mesh position={[0, 6, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[7, 4, 4]} />
        <meshStandardMaterial map={metalTexture} roughness={0.4} />
      </mesh>
    </group>
  );
};

const WorldScene: FC = () => {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 15, 60], fov: 60 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

        <Physics>
          <Floor />

          {/* Gate */}
          <mesh position={[0, 3, 35]} castShadow receiveShadow>
            <boxGeometry args={[14, 6, 2]} />
            <meshStandardMaterial color="#d9d9d9" roughness={0.5} />
          </mesh>
          <mesh position={[-8, 3, 35]} castShadow receiveShadow>
            <boxGeometry args={[2, 6, 2]} />
            <meshStandardMaterial color="#bfbfbf" roughness={0.5} />
          </mesh>
          <mesh position={[8, 3, 35]} castShadow receiveShadow>
            <boxGeometry args={[2, 6, 2]} />
            <meshStandardMaterial color="#bfbfbf" roughness={0.5} />
          </mesh>
          <Html position={[0, 7, 36]}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                background: "rgba(255,255,255,0.8)",
                padding: "4px 12px",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              Catmon Integrated School
            </div>
          </Html>

          {/* Buildings */}
          <ThreeFloorBuilding position={[-20, 4.5, 0]} />
          <ThreeFloorBuilding
            position={[20, 4.5, 0]}
            rotation={[0, Math.PI, 0]}
          />

          {/* Back Connection (end of buildings) */}
          <mesh position={[0, 7, -15]} castShadow receiveShadow>
            <boxGeometry args={[40, 3, 6]} />
            <meshStandardMaterial color="#dedbd6" roughness={0.5} />
          </mesh>

          <PlayerController />
        </Physics>

        <OrbitControls />
      </Canvas>
    </>
  );
};

export default WorldScene;
