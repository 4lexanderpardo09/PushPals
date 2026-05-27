export type AgentKey = 'qa' | 'reviewer' | 'docs';
export type AgentState = 'idle' | 'running' | 'done' | 'error';
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';
export type WallSide = 'back' | 'left' | 'right' | null;

export interface RoomObject {
  key: string;
  tx: number;
  ty: number;
  tz: number;
  wall: WallSide;
}

export interface CableDef {
  from: { tx: number; ty: number };
  to: { tx: number; ty: number };
  color: number;
}

export interface AgentColors {
  hat: string;
  body: string;
  pants: string;
  shoe: string;
  skin: string;
}
