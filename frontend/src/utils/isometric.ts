export const TILE_W = 1;
export const TILE_H = 0.5;
export const HALF_W = TILE_W / 2;
export const HALF_H = TILE_H / 2;
export const ORIGIN_X = 0;
export const ORIGIN_Y = 0;

export function gridToWorld(
  tx: number,
  ty: number,
  tz = 0,
): [number, number, number] {
  return [
    (tx - ty) * HALF_W,
    tz * HALF_H,
    (tx + ty) * HALF_H,
  ];
}

export function isPerimeterWall(map: number[][], tx: number, ty: number): boolean {
  const dirs = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],           [1, 0],
    [-1, 1],  [0, 1],  [1, 1],
  ];
  for (const [dx, dy] of dirs) {
    const nx = tx + dx;
    const ny = ty + dy;
    if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[0].length) continue;
    if (map[ny][nx] === 0) return true;
  }
  return false;
}

export function depthKey(tx: number, ty: number, tz: number): number {
  return ty + tx + tz * 0.01;
}
