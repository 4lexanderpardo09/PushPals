import { useMemo } from 'react';
import { wallBlockTexture } from '../../textures/generateAll';

const WALL_HEIGHT = 4;
const tex = wallBlockTexture();

interface WallProps {
  x: number;
  z: number;
  width: number;
  rotation?: number; // radians
}

export default function Wall({ x, z, width, rotation = 0 }: WallProps) {
  const pos = useMemo(() => ({ x, z }), [x, z]);

  return (
    <group position={[pos.x, WALL_HEIGHT / 2, pos.z]} rotation={[0, rotation, 0]}>
      <mesh>
        <boxGeometry args={[width, WALL_HEIGHT, 0.15]} />
        <meshBasicMaterial map={tex} />
      </mesh>
    </group>
  );
}
