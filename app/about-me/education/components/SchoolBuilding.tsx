"use client";

import { FC } from "react";
import { Html } from "@react-three/drei";

interface SchoolBuildingProps {
  name: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  onEnter: () => void;
}

const SchoolBuilding: FC<SchoolBuildingProps> = ({
  name,
  position,
  size,
  color,
  onEnter,
}) => {
  const handleClick = () => onEnter();

  return (
    <mesh position={position} castShadow receiveShadow onClick={handleClick}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
      <Html position={[0, size[1] / 2 + 0.5, 0]}>
        <div style={{ color: "white", textAlign: "center", cursor: "pointer" }}>
          {name}
        </div>
      </Html>
    </mesh>
  );
};

export default SchoolBuilding;
