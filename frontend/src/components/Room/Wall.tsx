import { useMemo } from 'react';
import * as THREE from 'three';
import { MAP, T } from '../../utils/roomData';
import { isPerimeterWall } from '../../utils/isometric';

function WallTile({ tx, ty, isTall }: { tx: number; ty: number; isTall: boolean }) {
  const geo = useMemo(() => new THREE.BoxGeometry(1, isTall ? 2 : 0.3, 0.5), [isTall]);
  const color = useMemo(() => {
    if (isTall) return new THREE.Color('#222244');
    const shades = ['#1e1e3e', '#222244', '#26264e'];
    return new THREE.Color(shades[(tx + ty) % shades.length]);
  }, [isTall, tx, ty]);

  // Position: center box at half its height above floor
  const height = isTall ? 2 : 0.3;
  const x = (tx - ty) * 0.5;
  const z = (tx + ty) * 0.25;
  const y = height / 2;

  return (
    <mesh position={[x, y, z]} geometry={geo}>
      <meshLambertMaterial color={color} />
    </mesh>
  );
}

export default function Walls() {
  const wallTiles = useMemo(() => {
    const tiles: Array<{ tx: number; ty: number; isTall: boolean }> = [];
    for (let ty = 0; ty < MAP.length; ty++) {
      for (let tx = 0; tx < MAP[0].length; tx++) {
        if (MAP[ty][tx] === T.WALL) {
          tiles.push({ tx, ty, isTall: isPerimeterWall(MAP, tx, ty) });
        }
      }
    }
    return tiles;
  }, []);

  return (
    <group>
      {wallTiles.map((t) => (
        <WallTile key={`${t.tx}-${t.ty}`} {...t} />
      ))}
    </group>
  );
}
