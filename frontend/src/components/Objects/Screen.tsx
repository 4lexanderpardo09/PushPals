import { useMemo } from 'react';
import type * as THREE from 'three';

interface ScreenProps {
  x: number;
  y: number;
  z: number;
  texture: THREE.CanvasTexture;
  width?: number;
  height?: number;
  rotation?: number;
}

export default function Screen({
  x, y, z, texture,
  width = 3.5, height = 2.5,
  rotation = 0,
}: ScreenProps) {
  const pos = useMemo(() => ({ x, y, z }), [x, y, z]);

  return (
    <group position={[pos.x, pos.y, pos.z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[width + 0.2, height + 0.2]} />
        <meshBasicMaterial color="#111122" />
      </mesh>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <pointLight position={[0, 0, 0.5]} intensity={0.3} color="#00ff88" distance={3} />
    </group>
  );
}
