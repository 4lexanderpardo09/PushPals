import * as THREE from 'three';

function createCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  return [canvas, ctx];
}

function nearestTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  return tex;
}

export function floorTileTexture(size = 32): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(size, size);
  // Dark base matching wall palette
  ctx.fillStyle = '#18182a';
  ctx.fillRect(0, 0, size, size);

  // Subtle grid line
  ctx.strokeStyle = '#22223a';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, size - 1, size - 1);

  return nearestTexture(canvas);
}

export function wallBlockTexture(size = 48): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(size, size);
  const cols = 4;
  const rows = 4;
  const bw = size / cols;
  const bh = size / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * bw;
      const y = r * bh;
      const brightness = 0x1a + Math.floor(Math.random() * 8);
      const color = `rgb(${brightness}, ${brightness + 4}, ${brightness + 8})`;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, bw, bh);
      ctx.strokeStyle = '#0a0a1a';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, bw, bh);
    }
  }

  ctx.fillStyle = '#00ff8808';
  ctx.fillRect(0, 0, size, size);

  return nearestTexture(canvas);
}

export function screenContentTexture(width = 128, height = 96): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(width, height);
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#00ff8806';
  for (let y = 0; y < height; y += 3) {
    ctx.fillRect(0, y, width, 1);
  }

  ctx.font = '8px monospace';
  ctx.fillStyle = '#00ff88';
  ctx.fillText('PUSHPALS v1.0', 4, 12);
  ctx.fillStyle = '#00ff8844';
  ctx.fillText('> SYSTEM READY', 4, 24);
  ctx.fillText('> AGENTS ONLINE', 4, 36);
  ctx.fillText('> AWAITING PUSH', 4, 48);

  return nearestTexture(canvas);
}

export function statusScreenTexture(): THREE.CanvasTexture {
  const w = 160;
  const h = 120;
  const [canvas, ctx] = createCanvas(w, h);
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, w, h);

  ctx.font = 'bold 10px monospace';
  ctx.fillStyle = '#00ff88';
  ctx.textAlign = 'center';
  ctx.fillText('SYSTEM STATUS', w / 2, 14);

  ctx.textAlign = 'left';
  ctx.font = '7px monospace';
  const items = [
    'GITHUB CONNECTED',
    'WEBHOOK ACTIVE',
    'AI PROVIDER ONLINE',
    'AGENTS READY',
  ];
  items.forEach((item, i) => {
    const y = 30 + i * 18;
    ctx.fillStyle = '#00ff88';
    ctx.fillText('✓', 10, y);
    ctx.fillStyle = '#88ffbb';
    ctx.fillText(item, 24, y);
  });

  return nearestTexture(canvas);
}

export function liveFeedTexture(): THREE.CanvasTexture {
  const w = 128;
  const h = 160;
  const [canvas, ctx] = createCanvas(w, h);
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, w, h);

  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = '#00ff88';
  ctx.textAlign = 'center';
  ctx.fillText('LIVE FEED', w / 2, 12);

  ctx.textAlign = 'left';
  ctx.font = '6px monospace';
  const logs = [
    '> Push received',
    '> Fetching diff...',
    '> QA analysis...',
    '> Code review...',
    '> Docs generation...',
    '> Comment posted',
  ];
  logs.forEach((msg, i) => {
    const alpha = 1 - i * 0.12;
    ctx.fillStyle = `rgba(0, 255, 136, ${Math.max(alpha, 0.3)})`;
    ctx.fillText(msg, 8, 26 + i * 14);
  });

  return nearestTexture(canvas);
}

export function signPushPalsTexture(): THREE.CanvasTexture {
  const w = 256;
  const h = 96;
  const [canvas, ctx] = createCanvas(w, h);
  ctx.clearRect(0, 0, w, h);

  ctx.textAlign = 'center';
  ctx.font = 'bold 48px monospace';
  ctx.fillStyle = '#00ff88';
  ctx.fillText('PUSHPALS', w / 2, 48);

  ctx.shadowColor = '#00ff88';
  ctx.shadowBlur = 20;
  ctx.fillText('PUSHPALS', w / 2, 48);
  ctx.shadowBlur = 0;

  ctx.font = '14px monospace';
  ctx.fillStyle = '#66ffaa';
  ctx.fillText('AI CODE REVIEW AGENTS', w / 2, 76);

  return nearestTexture(canvas);
}

export function githubLogoTexture(): THREE.CanvasTexture {
  const size = 64;
  const [canvas, ctx] = createCanvas(size, size);
  ctx.clearRect(0, 0, size, size);

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2 - 4, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(size / 2 - 16, size / 2 - 22, 6, 10);
  ctx.fillRect(size / 2 + 10, size / 2 - 22, 6, 10);

  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 15;

  return nearestTexture(canvas);
}

export function agentBadgeTexture(label: string, color: string): THREE.CanvasTexture {
  const w = 128;
  const h = 24;
  const [canvas, ctx] = createCanvas(w, h);
  ctx.clearRect(0, 0, w, h);

  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.fillText(label, w / 2, 16);

  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fillText(label, w / 2, 16);
  ctx.shadowBlur = 0;

  return nearestTexture(canvas);
}

export function codeScreenTexture(): THREE.CanvasTexture {
  const w = 96;
  const h = 64;
  const [canvas, ctx] = createCanvas(w, h);
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, w, h);

  ctx.font = '5px monospace';
  const lines = [
    ['def review():', '#66ffaa'],
    ['  diff = fetch()', '#00ff88'],
    ['  result = agent.run()', '#88ffbb'],
    ['  return result', '#44ddaa'],
    ['', '#000'],
    ['> Ready', '#00ff8844'],
  ];

  lines.forEach(([text, color], i) => {
    ctx.fillStyle = color;
    ctx.fillText(text, 4, 8 + i * 9);
  });

  return nearestTexture(canvas);
}

export function missionBoardTexture(): THREE.CanvasTexture {
  const w = 128;
  const h = 80;
  const [canvas, ctx] = createCanvas(w, h);
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, w, h);

  ctx.font = 'bold 8px monospace';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText("TODAY'S MISSION", w / 2, 12);

  ctx.textAlign = 'left';
  ctx.font = '7px monospace';
  const tasks = [
    '☑ REVIEW CODE',
    '☑ CATCH BUGS',
    '☑ IMPROVE DOCS',
    '☑ KEEP CODE CLEAN',
  ];
  tasks.forEach((task, i) => {
    ctx.fillStyle = '#333';
    ctx.fillText(task, 16, 26 + i * 12);
  });

  return nearestTexture(canvas);
}
