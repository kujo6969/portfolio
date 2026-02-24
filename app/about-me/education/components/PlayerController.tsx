"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import * as THREE from "three";

interface PlayerControllerProps {
  onPositionChange?: (position: THREE.Vector3) => void;
}

const PlayerController = ({ onPositionChange }: PlayerControllerProps) => {
  const { camera } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 1, 10],
    args: [0.5],
    linearDamping: 0.99,
    fixedRotation: true,
  }));

  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const down = (e: KeyboardEvent) =>
      (keys.current[e.key.toLowerCase()] = true);
    const up = (e: KeyboardEvent) =>
      (keys.current[e.key.toLowerCase()] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    const direction = new THREE.Vector3();

    camera.getWorldDirection(forward);
    forward.y = 0; // prevent flying
    forward.normalize();

    // Get right direction
    right.crossVectors(forward, camera.up).normalize();

    if (keys.current["w"]) direction.add(forward);
    if (keys.current["s"]) direction.sub(forward);
    if (keys.current["a"]) direction.sub(right);
    if (keys.current["d"]) direction.add(right);

    if (direction.length() > 0) {
      direction.normalize();
      api.velocity.set(direction.x * 5, 0, direction.z * 5);
    }

    const playerPos = new THREE.Vector3();
    ref.current.getWorldPosition(playerPos);

    camera.position.copy(playerPos);
    camera.position.y += 1.5;

    if (onPositionChange) {
      onPositionChange(playerPos);
    }
  });

  return <PointerLockControls />;
};

export default PlayerController;
