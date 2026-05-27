export type AgentKey = 'qa' | 'reviewer' | 'docs' | 'system';
export type AgentState = 'idle' | 'running' | 'done' | 'error' | 'complete' | 'all_error';

export interface AgentStatus {
  key: AgentKey;
  name: string;
  emoji: string;
  state: AgentState;
  message: string;
  eventId?: string;
}

export interface RoomLayout {
  width: number;
  height: number;
  tileSize: number;
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}
