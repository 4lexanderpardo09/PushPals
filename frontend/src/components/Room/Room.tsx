import { useMemo } from 'react';
import FloorTile from './FloorTile';
import Wall from './Wall';
import { tileToWorld, getTileSize } from '../../utils/isometric';

const ROOM_W = 20;
const ROOM_H = 15;
const HALF_TILE = getTileSize() / 2;

// Tile grid world-space boundaries
const corners = [tileToWorld(0, 0), tileToWorld(ROOM_W, 0), tileToWorld(0, ROOM_H), tileToWorld(ROOM_W, ROOM_H)];
const minX = Math.min(...corners.map(p => p.x));
const maxX = Math.max(...corners.map(p => p.x));
const minZ = Math.min(...corners.map(p => p.z));
const maxZ = Math.max(...corners.map(p => p.z));

interface WallSegment {
  x: number;
  z: number;
  width: number;
  rotation: number;
}

export default function Room() {
  const tiles = useMemo(() => {
    const grid: { tx: number; ty: number }[] = [];
    for (let ty = 0; ty < ROOM_H; ty++) {
      for (let tx = 0; tx < ROOM_W; tx++) {
        grid.push({ tx, ty });
      }
    }
    return grid;
  }, []);

  // Walls at tile grid edges + half-tile so tile edges meet wall face
  const walls: WallSegment[] = useMemo(() => {
    const w = maxX - minX;
    const d = maxZ - minZ;
    return [
      { x: (maxX + minX) / 2, z: minZ - HALF_TILE, width: w + getTileSize(), rotation: 0 },
      { x: minX - HALF_TILE, z: (maxZ + minZ) / 2, width: d + getTileSize(), rotation: Math.PI / 2 },
    ];
  }, []);

  return (
    <group>
      {tiles.map((t) => (
        <FloorTile key={`${t.tx}-${t.ty}`} tx={t.tx} ty={t.ty} />
      ))}
      {walls.map((w, i) => (
        <Wall key={i} {...w} />
      ))}
    </group>
  );
}
