import { useMemo } from 'react';
import * as THREE from 'three';
import { MAP, T } from '../../utils/roomData';
import { TILE_W, TILE_H } from '../../utils/isometric';

export default function FloorTiles() {
  const mesh = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(TILE_W, TILE_H);
    return geometry;
  }, []);

  const tiles: Array<{ tx: number; ty: number; color: THREE.Color }> = useMemo(() => {
    const result = [];
    for (let ty = 0; ty < MAP.length; ty++) {
      for (let tx = 0; tx < MAP[0].length; tx++) {
        if (MAP[ty][tx] === T.FLOOR) {
          const isEven = (tx + ty) % 2 === 0;
          result.push({
            tx,
            ty,
            color: new THREE.Color(isEven ? '#1a1a33' : '#15152a'),
          });
        }
      }
    }
    return result;
  }, []);

  return (
    <group>
      {tiles.map((tile) => {
        const x = (tile.tx - tile.ty) * 0.5;
        const z = (tile.tx + tile.ty) * 0.25;
        return (
          <mesh
            key={`${tile.tx}-${tile.ty}`}
            position={[x, -0.01, z]}
            rotation={[-Math.PI / 2, 0, 0]}
            geometry={mesh}
          >
            <meshBasicMaterial color={tile.color} />
          </mesh>
        );
      })}
    </group>
  );
}
