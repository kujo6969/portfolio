"use client";

import { FC } from "react";
import { Html } from "@react-three/drei";

interface SchoolInteriorProps {
  schoolName: string;
  onExit: () => void;
}

const schoolData: Record<string, string[]> = {
  "High School": ["STEM Strand", "ICT Strand", "With Honors"],
  University: ["Bachelor's Degree", "Master's Degree", "Dean's List"],
};

const SchoolInterior: FC<SchoolInteriorProps> = ({ schoolName, onExit }) => {
  const degrees = schoolData[schoolName] || [];

  return (
    <>
      <color attach="background" args={["#1a1a2e"]} />

      <mesh position={[0, 1, 0]} receiveShadow>
        <boxGeometry args={[12, 6, 12]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      {degrees.map((degree, index) => (
        <mesh key={index} position={[index * 3 - 3, 1, -3]}>
          <boxGeometry args={[2, 1, 0.2]} />
          <meshStandardMaterial color="royalblue" />
          <Html position={[0, 0.8, 0]}>
            <div
              style={{
                color: "white",
                textAlign: "center",
                width: "150px",
              }}
            >
              {degree}
            </div>
          </Html>
        </mesh>
      ))}

      <Html position={[0, 3, 0]}>
        <button
          onClick={onExit}
          style={{
            background: "red",
            padding: "8px 16px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Exit School
        </button>
      </Html>
    </>
  );
};

export default SchoolInterior;
