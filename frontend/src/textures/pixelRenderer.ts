export const PX = 3;

export function createCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = w * PX;
  c.height = h * PX;
  return c;
}

export function dr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
): void {
  ctx.fillStyle = color;
  ctx.fillRect(x * PX, y * PX, w * PX, h * PX);
}
