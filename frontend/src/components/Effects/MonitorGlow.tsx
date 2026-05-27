import { useMemo } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  color: string;
}

export default function MonitorGlow({ position, color }: Props) {
  const mesh = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.8, 0.3);
    return geo;
  }, []);

  return (
    <mesh
      position={[position[0], position[1] - 0.01, position[2] + 0.3]}
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={mesh}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}
