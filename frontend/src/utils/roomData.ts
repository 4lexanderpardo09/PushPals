import type { RoomObject, CableDef } from '../types';

// Tile types
export const T = { VOID: 0, FLOOR: 1, WALL: 2 } as const;

// 18×12 grid — irregular octagon room
export const MAP: number[][] = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0],
  [0,0,0,0,2,2,1,1,1,1,1,1,1,2,2,0,0,0],
  [0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2,0,0],
  [0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
  [0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
  [0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
  [0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
  [0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2,0,0],
  [0,0,0,0,2,2,1,1,1,1,1,1,1,2,2,0,0,0],
  [0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

export const OBJECTS: RoomObject[] = [
  // Wall-mounted
  { key: 'pushpals_sign',   tx: 7,  ty: 2,  tz: 3,  wall: 'back' },
  { key: 'system_screen',   tx: 11, ty: 2,  tz: 3,  wall: 'back' },
  { key: 'github_logo',     tx: 15, ty: 3,  tz: 3,  wall: 'right' },
  { key: 'live_feed',       tx: 2,  ty: 6,  tz: 3,  wall: 'left' },

  // Central server
  { key: 'central_server',  tx: 9,  ty: 6,  tz: 1,  wall: null },

  // QA station
  { key: 'qa_desk',         tx: 4,  ty: 8,  tz: 0,  wall: null },
  { key: 'qa_monitor',      tx: 4,  ty: 8,  tz: 1,  wall: null },
  { key: 'qa_agent',        tx: 5,  ty: 8,  tz: 0,  wall: null },
  { key: 'qa_sign',         tx: 4,  ty: 8,  tz: 3,  wall: 'back' },

  // Reviewer station
  { key: 'reviewer_desk',   tx: 14, ty: 5,  tz: 0,  wall: null },
  { key: 'reviewer_monitor',tx: 14, ty: 5,  tz: 1,  wall: null },
  { key: 'reviewer_agent',  tx: 14, ty: 6,  tz: 0,  wall: null },
  { key: 'reviewer_sign',   tx: 14, ty: 5,  tz: 3,  wall: 'right' },

  // Docs station
  { key: 'docs_desk',       tx: 9,  ty: 9,  tz: 0,  wall: null },
  { key: 'docs_monitor',    tx: 9,  ty: 9,  tz: 1,  wall: null },
  { key: 'docs_agent',      tx: 8,  ty: 9,  tz: 0,  wall: null },
  { key: 'docs_sign',       tx: 9,  ty: 9,  tz: 3,  wall: 'back' },

  // Decorations
  { key: 'plant',           tx: 6,  ty: 3,  tz: 0,  wall: null },
  { key: 'filing_cabinet',  tx: 13, ty: 2,  tz: 0,  wall: null },
  { key: 'mission_board',   tx: 5,  ty: 2,  tz: 2.5,wall: 'back' },
  { key: 'water_cooler',    tx: 3,  ty: 6,  tz: 0,  wall: null },
  { key: 'big_plant',       tx: 3,  ty: 7,  tz: 0,  wall: null },
  { key: 'bookshelf',       tx: 4,  ty: 10, tz: 0,  wall: null },
  { key: 'trash_bin',       tx: 10, ty: 9,  tz: 0,  wall: null },
  { key: 'cardboard_box',   tx: 12, ty: 9,  tz: 0,  wall: null },
  { key: 'framed_picture',  tx: 15, ty: 4,  tz: 2.5,wall: 'right' },

  // Density additions
  { key: 'server_pedestal', tx: 9,  ty: 6,  tz: 0,  wall: null },
  { key: 'dual_monitor',    tx: 5,  ty: 8,  tz: 1,  wall: null },
  { key: 'dual_monitor',    tx: 13, ty: 5,  tz: 1,  wall: null },
  { key: 'keyboard',        tx: 4,  ty: 8,  tz: 1,  wall: null },
  { key: 'papers_stack',    tx: 5,  ty: 8,  tz: 1,  wall: null },
  { key: 'coffee_mug',      tx: 3,  ty: 8,  tz: 1,  wall: null },
  { key: 'keyboard',        tx: 14, ty: 5,  tz: 1,  wall: null },
  { key: 'papers_stack',    tx: 13, ty: 5,  tz: 1,  wall: null },
  { key: 'coffee_mug',      tx: 15, ty: 5,  tz: 1,  wall: null },
  { key: 'keyboard',        tx: 9,  ty: 9,  tz: 1,  wall: null },
  { key: 'papers_stack',    tx: 10, ty: 9,  tz: 1,  wall: null },
  { key: 'coffee_mug',      tx: 8,  ty: 9,  tz: 1,  wall: null },
  { key: 'wall_clock',      tx: 6,  ty: 2,  tz: 2.5,wall: 'back' },
  { key: 'framed_cert',     tx: 8,  ty: 2,  tz: 2.5,wall: 'back' },
  { key: 'speaker',         tx: 15, ty: 6,  tz: 2.5,wall: 'right' },
  { key: 'framed_cert',     tx: 2,  ty: 5,  tz: 2.5,wall: 'left' },
  { key: 'carpet',          tx: 9,  ty: 10, tz: 0,  wall: null },
  { key: 'carpet_text',     tx: 9,  ty: 10, tz: 0,  wall: null },
];

export const CABLES: CableDef[] = [
  { from: { tx: 9, ty: 6 }, to: { tx: 4, ty: 8 }, color: 0x00ff88 },
  { from: { tx: 9, ty: 6 }, to: { tx: 14, ty: 5 }, color: 0x44aaff },
  { from: { tx: 9, ty: 6 }, to: { tx: 9, ty: 9 }, color: 0xaa44ff },
];

export const COLS = MAP[0].length;
export const ROWS = MAP.length;
