import { type Vec3 } from '../types';

const TILE_SIZE = 1.2;

export function tileToWorld(tx: number, ty: number, height = 0): Vec3 {
  return {
    x: (tx - ty) * TILE_SIZE / 2,
    y: height,
    z: (tx + ty) * TILE_SIZE / 2,
  };
}

export function getTileSize(): number {
  return TILE_SIZE;
}

export function worldToTile(wx: number, wz: number): { tx: number; ty: number } {
  const tx = (wx / (TILE_SIZE / 2) + wz / (TILE_SIZE / 2)) / 2;
  const ty = (wz / (TILE_SIZE / 2) - wx / (TILE_SIZE / 2)) / 2;
  return { tx, ty };
}
