import { useMemo } from 'react';
import * as THREE from 'three';
import { floorTileTexture } from '../../textures/generateAll';
import { tileToWorld, getTileSize } from '../../utils/isometric';

const TILE = getTileSize();
const tex = floorTileTexture();

interface FloorTileProps {
  tx: number;
  ty: number;
}

export default function FloorTile({ tx, ty }: FloorTileProps) {
  const pos = useMemo(() => tileToWorld(tx, ty), [tx, ty]);

  // Sides dark, top textured
  const materials = useMemo(() => {
    const side = new THREE.MeshBasicMaterial({ color: '#0a0a18' });
    const top = new THREE.MeshBasicMaterial({ map: tex });
    return [side, side, top, side, side, side];
  }, []);

  return (
    <mesh position={[pos.x, -0.4, pos.z]} material={materials}>
      <boxGeometry args={[TILE * 0.95, 0.8, TILE * 0.95]} />
    </mesh>
  );
}
