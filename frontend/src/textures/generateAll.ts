import { createCanvas, dr, PX } from './pixelRenderer';
import type { AgentColors } from '../types';

function genDesk(): HTMLCanvasElement {
  const c = createCanvas(24, 12);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#553322';
  ctx.fillRect(0, 0, 24 * PX, 12 * PX);
  dr(ctx, 2, 0, 20, 2, '#664433');
  dr(ctx, 2, 8, 3, 4, '#332211');
  dr(ctx, 19, 8, 3, 4, '#332211');
  return c;
}

function genMonitor(): HTMLCanvasElement {
  const c = createCanvas(14, 10);
  const ctx = c.getContext('2d')!;
  dr(ctx, 5, 7, 4, 3, '#555555');
  dr(ctx, 1, 1, 12, 7, '#333333');
  dr(ctx, 2, 2, 10, 5, '#112244');
  dr(ctx, 3, 3, 8, 3, '#1a3366');
  ctx.fillStyle = '#224488';
  ctx.fillRect(3 * PX, 5 * PX, 8 * PX, 1 * PX);
  return c;
}

function genServer(): HTMLCanvasElement {
  const c = createCanvas(24, 24);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#222244';
  ctx.fillRect(0, 0, 24 * PX, 24 * PX);
  dr(ctx, 2, 2, 20, 8, '#1a1a38');
  dr(ctx, 2, 13, 20, 9, '#1a1a38');
  dr(ctx, 4, 3, 4, 3, '#00ff88');
  dr(ctx, 12, 3, 4, 3, '#44aaff');
  dr(ctx, 4, 14, 4, 3, '#00ff88');
  dr(ctx, 12, 14, 4, 3, '#ff8844');
  dr(ctx, 2, 11, 20, 1, '#333366');
  // Status LEDs
  dr(ctx, 2, 4, 1, 1, '#ff4444');
  dr(ctx, 2, 6, 1, 1, '#44ff44');
  dr(ctx, 2, 8, 1, 1, '#4488ff');
  dr(ctx, 2, 15, 1, 1, '#44ff44');
  dr(ctx, 2, 17, 1, 1, '#ffff44');
  dr(ctx, 2, 19, 1, 1, '#ff4444');
  return c;
}

function genPlant(): HTMLCanvasElement {
  const c = createCanvas(12, 14);
  const ctx = c.getContext('2d')!;
  dr(ctx, 2, 9, 8, 5, '#884422');
  dr(ctx, 3, 8, 6, 2, '#995533');
  ctx.fillStyle = '#33aa55';
  ctx.fillRect(2 * PX, 0, 4 * PX, 4 * PX);
  ctx.fillRect(6 * PX, 1, 4 * PX, 3 * PX);
  ctx.fillRect(4 * PX, 0, 4 * PX, 5 * PX);
  ctx.fillRect(3 * PX, 2, 6 * PX, 4 * PX);
  dr(ctx, 5, 5, 2, 4, '#336633');
  return c;
}

function genCabinet(): HTMLCanvasElement {
  const c = createCanvas(10, 14);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#444466';
  ctx.fillRect(0, 0, 10 * PX, 14 * PX);
  dr(ctx, 1, 2, 8, 1, '#555577');
  dr(ctx, 1, 7, 8, 1, '#555577');
  dr(ctx, 3, 4, 4, 1, '#888899');
  dr(ctx, 3, 9, 4, 1, '#888899');
  return c;
}

function genBookshelf(): HTMLCanvasElement {
  const c = createCanvas(14, 18);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#554433';
  ctx.fillRect(0, 0, 14 * PX, 18 * PX);
  dr(ctx, 1, 5, 12, 1, '#664455');
  dr(ctx, 1, 11, 12, 1, '#664455');
  const colors = ['#cc4444', '#4488cc', '#44cc88', '#ccaa44'];
  for (let i = 0; i < colors.length; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect((2 + i * 3) * PX, 1 * PX, 2 * PX, 4 * PX);
  }
  const colors2 = ['#8844cc', '#44cccc', '#cc8844'];
  for (let j = 0; j < colors2.length; j++) {
    ctx.fillStyle = colors2[j];
    ctx.fillRect((2 + j * 4) * PX, 7 * PX, 3 * PX, 4 * PX);
  }
  return c;
}

function genWaterCooler(): HTMLCanvasElement {
  const c = createCanvas(8, 16);
  const ctx = c.getContext('2d')!;
  dr(ctx, 1, 10, 6, 6, '#666688');
  ctx.fillStyle = '#4488cc';
  ctx.fillRect(2 * PX, 1 * PX, 4 * PX, 10 * PX);
  dr(ctx, 3, 2, 2, 7, '#66aadd');
  return c;
}

function genSign(text: string, fg: string, bg: string, w: number, h: number): HTMLCanvasElement {
  const c = createCanvas(w, h);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = bg || '#111122';
  ctx.fillRect(0, 0, w * PX, h * PX);
  ctx.fillStyle = fg || '#00ff88';
  ctx.fillRect(0, 0, w * PX, 1 * PX);
  ctx.fillRect(0, (h - 1) * PX, w * PX, 1 * PX);
  ctx.fillRect(0, 0, 1 * PX, h * PX);
  ctx.fillRect((w - 1) * PX, 0, 1 * PX, h * PX);
  ctx.font = `bold ${8 * PX}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, (w / 2) * PX, (h / 2) * PX);
  return c;
}

function genPushPalsSign(): HTMLCanvasElement {
  const c = createCanvas(48, 12);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 48 * PX, 12 * PX);
  ctx.fillStyle = '#00ff88';
  ctx.fillRect(0, 0, 48 * PX, 1 * PX);
  ctx.fillRect(0, 11 * PX, 48 * PX, 1 * PX);
  ctx.font = `bold ${7 * PX}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#00ff88';
  ctx.fillText('PUSHPALS', 24 * PX, 4 * PX);
  ctx.font = `bold ${4 * PX}px monospace`;
  ctx.fillText('AI CODE REVIEW', 24 * PX, 9 * PX);
  return c;
}

function genSystemScreen(): HTMLCanvasElement {
  const c = createCanvas(32, 16);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 32 * PX, 16 * PX);
  ctx.fillStyle = '#333366';
  ctx.fillRect(0, 0, 32 * PX, 1 * PX);
  ctx.fillRect(0, 15 * PX, 32 * PX, 1 * PX);
  ctx.font = `bold ${4 * PX}px monospace`;
  ctx.fillStyle = '#00ff88';
  ctx.fillText('SYSTEM STATUS', 2 * PX, 3 * PX);
  const items = ['GITHUB OK', 'WEBHOOK OK', 'AI ONLINE', 'AGENTS OK'];
  for (let i = 0; i < items.length; i++) {
    ctx.fillText(items[i], 2 * PX, (7 + i * 3) * PX);
  }
  return c;
}

function genAgent(colors: AgentColors): HTMLCanvasElement {
  const c = createCanvas(12, 20);
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 12 * PX, 20 * PX);
  dr(ctx, 2, 17, 3, 3, colors.shoe);
  dr(ctx, 7, 17, 3, 3, colors.shoe);
  dr(ctx, 2, 13, 3, 4, colors.pants);
  dr(ctx, 7, 13, 3, 4, colors.pants);
  ctx.fillStyle = colors.body;
  ctx.fillRect(3 * PX, 7 * PX, 6 * PX, 6 * PX);
  dr(ctx, 1, 8, 2, 4, colors.skin);
  dr(ctx, 9, 8, 2, 4, colors.skin);
  ctx.fillStyle = colors.skin;
  ctx.fillRect(3 * PX, 2 * PX, 6 * PX, 5 * PX);
  ctx.fillStyle = colors.hat;
  ctx.fillRect(2 * PX, 0, 8 * PX, 3 * PX);
  ctx.fillStyle = '#222222';
  ctx.fillRect(4 * PX, 4 * PX, 2 * PX, 1 * PX);
  dr(ctx, 1, 2, 10, 1, colors.hat);
  return c;
}

function genBox(): HTMLCanvasElement {
  const c = createCanvas(8, 8);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#886644';
  ctx.fillRect(0, 0, 8 * PX, 8 * PX);
  dr(ctx, 2, 0, 4, 3, '#997755');
  dr(ctx, 0, 3, 8, 1, '#664422');
  dr(ctx, 3, 0, 2, 3, '#aa8866');
  return c;
}

function genTrash(): HTMLCanvasElement {
  const c = createCanvas(6, 8);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#445566';
  ctx.fillRect(0, 0, 6 * PX, 8 * PX);
  dr(ctx, 0, 0, 6, 1, '#556677');
  dr(ctx, 0, 7, 6, 1, '#334455');
  dr(ctx, 2, 1, 2, 3, '#223344');
  return c;
}

function genPicture(): HTMLCanvasElement {
  const c = createCanvas(12, 10);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#664433';
  ctx.fillRect(0, 0, 12 * PX, 10 * PX);
  ctx.fillStyle = '#886655';
  ctx.fillRect(1 * PX, 1 * PX, 10 * PX, 8 * PX);
  ctx.fillStyle = '#44aaff';
  ctx.fillRect(3 * PX, 3 * PX, 3 * PX, 3 * PX);
  ctx.fillStyle = '#ff8844';
  ctx.fillRect(7 * PX, 2 * PX, 2 * PX, 4 * PX);
  ctx.fillStyle = '#44ff88';
  ctx.fillRect(4 * PX, 6 * PX, 4 * PX, 2 * PX);
  return c;
}

function genGitHub(): HTMLCanvasElement {
  const c = createCanvas(16, 16);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#111122';
  ctx.fillRect(0, 0, 16 * PX, 16 * PX);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(4 * PX, 4 * PX, 8 * PX, 8 * PX);
  ctx.fillRect(3 * PX, 3 * PX, 2 * PX, 2 * PX);
  ctx.fillRect(11 * PX, 3 * PX, 2 * PX, 2 * PX);
  ctx.fillStyle = '#111122';
  ctx.fillRect(5 * PX, 6 * PX, 2 * PX, 2 * PX);
  ctx.fillRect(9 * PX, 6 * PX, 2 * PX, 2 * PX);
  ctx.fillRect(5 * PX, 9 * PX, 6 * PX, 1 * PX);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(5 * PX, 12 * PX, 2 * PX, 3 * PX);
  ctx.fillRect(9 * PX, 12 * PX, 2 * PX, 3 * PX);
  return c;
}

function genMug(): HTMLCanvasElement {
  const c = createCanvas(6, 6);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#cc8844';
  ctx.fillRect(0, 0, 6 * PX, 6 * PX);
  dr(ctx, 5, 1, 1, 3, '#ddaa66');
  ctx.fillStyle = '#442200';
  ctx.fillRect(1 * PX, 0, 4 * PX, 2 * PX);
  return c;
}

function genPapers(): HTMLCanvasElement {
  const c = createCanvas(10, 6);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#ddddcc';
  ctx.fillRect(0, 0, 10 * PX, 6 * PX);
  dr(ctx, 1, 0, 8, 5, '#eeeedd');
  dr(ctx, 2, 1, 3, 1, '#666666');
  dr(ctx, 2, 3, 5, 1, '#666666');
  dr(ctx, 0, 0, 1, 1, '#bbbbaa');
  return c;
}

function genKeyboard(): HTMLCanvasElement {
  const c = createCanvas(14, 4);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#444444';
  ctx.fillRect(0, 0, 14 * PX, 4 * PX);
  ctx.fillStyle = '#666666';
  ctx.fillRect(1 * PX, 1 * PX, 12 * PX, 2 * PX);
  for (let kx = 2; kx < 12; kx += 2) {
    ctx.fillStyle = '#888888';
    ctx.fillRect(kx * PX, 1 * PX, 1 * PX, 2 * PX);
  }
  return c;
}

function genClock(): HTMLCanvasElement {
  const c = createCanvas(8, 8);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#555555';
  ctx.fillRect(0, 0, 8 * PX, 8 * PX);
  ctx.fillStyle = '#eeeeee';
  ctx.fillRect(1 * PX, 1 * PX, 6 * PX, 6 * PX);
  ctx.fillStyle = '#222222';
  ctx.fillRect(3 * PX, 3 * PX, 2 * PX, 2 * PX);
  dr(ctx, 4, 1, 1, 3, '#222222');
  dr(ctx, 3, 4, 3, 1, '#222222');
  return c;
}

function genCert(): HTMLCanvasElement {
  const c = createCanvas(10, 8);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#553322';
  ctx.fillRect(0, 0, 10 * PX, 8 * PX);
  ctx.fillStyle = '#ddeeff';
  ctx.fillRect(1 * PX, 1 * PX, 8 * PX, 6 * PX);
  ctx.fillStyle = '#ddaa44';
  ctx.fillRect(4 * PX, 3 * PX, 2 * PX, 2 * PX);
  return c;
}

function genSpeaker(): HTMLCanvasElement {
  const c = createCanvas(6, 8);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#333366';
  ctx.fillRect(0, 0, 6 * PX, 8 * PX);
  dr(ctx, 1, 1, 4, 5, '#444477');
  dr(ctx, 2, 2, 2, 3, '#2a2a55');
  ctx.fillStyle = '#00ff88';
  ctx.fillRect(2 * PX, 7 * PX, 2 * PX, 1 * PX);
  return c;
}

function genDualMonitor(): HTMLCanvasElement {
  const c = createCanvas(20, 10);
  const ctx = c.getContext('2d')!;
  dr(ctx, 8, 7, 4, 3, '#555555');
  dr(ctx, 1, 1, 8, 7, '#333333');
  dr(ctx, 2, 2, 6, 5, '#112244');
  dr(ctx, 3, 3, 4, 3, '#1a3366');
  dr(ctx, 11, 1, 8, 7, '#333333');
  dr(ctx, 12, 2, 6, 5, '#112244');
  dr(ctx, 13, 3, 4, 3, '#224488');
  dr(ctx, 9, 1, 2, 7, '#555555');
  return c;
}

function genServerPedestal(): HTMLCanvasElement {
  const c = createCanvas(22, 6);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#333355';
  ctx.fillRect(0, 0, 22 * PX, 6 * PX);
  dr(ctx, 0, 0, 22, 1, '#444477');
  dr(ctx, 2, 1, 18, 4, '#2a2a44');
  dr(ctx, 4, 2, 14, 2, '#222244');
  return c;
}

// --- Registry ---

export type TextureGenerator = () => HTMLCanvasElement;

export const AGENT_COLORS = {
  qa: { hat: '#ff6644', body: '#44aaff', pants: '#224466', shoe: '#553322', skin: '#ffcc88' },
  reviewer: { hat: '#885522', body: '#66dd88', pants: '#334422', shoe: '#553322', skin: '#ffcc88' },
  docs: { hat: '#774433', body: '#ff88aa', pants: '#553344', shoe: '#553322', skin: '#ffcc88' },
} as const;

export const textureGenerators: Record<string, TextureGenerator> = {
  desk: genDesk,
  monitor: genMonitor,
  server: genServer,
  plant: genPlant,
  cabinet: genCabinet,
  bookshelf: genBookshelf,
  water_cooler: genWaterCooler,
  pushpals_sign: genPushPalsSign,
  system_screen: genSystemScreen,
  mission_board: () => genSign('MISSION: REVIEW', '#88aaff', '#111133', 28, 12),
  live_feed: () => genSign('LIVE FEED', '#44ddff', '#0a1122', 28, 12),
  github_logo: genGitHub,
  qa_sign: () => genSign('QA', '#ff6644', '#1a1122', 14, 8),
  reviewer_sign: () => genSign('REV', '#66dd88', '#112211', 14, 8),
  docs_sign: () => genSign('DOCS', '#ff88aa', '#221122', 14, 8),
  qa_agent: () => genAgent(AGENT_COLORS.qa),
  reviewer_agent: () => genAgent(AGENT_COLORS.reviewer),
  docs_agent: () => genAgent(AGENT_COLORS.docs),
  cardboard_box: genBox,
  trash_bin: genTrash,
  framed_picture: genPicture,
  coffee_mug: genMug,
  papers_stack: genPapers,
  keyboard: genKeyboard,
  wall_clock: genClock,
  framed_cert: genCert,
  speaker: genSpeaker,
  dual_monitor: genDualMonitor,
  server_pedestal: genServerPedestal,
};
