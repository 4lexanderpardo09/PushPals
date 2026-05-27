import { create } from 'zustand';
import type { AgentKey, AgentState } from '../types';

interface AgentInfo {
  state: AgentState;
  message: string;
  lastEventId?: string;
}

interface SceneState {
  agents: Record<AgentKey, AgentInfo>;
  events: { agentKey: AgentKey; message: string; time: number }[];
  updateAgent: (key: AgentKey, state: AgentState, message?: string, eventId?: string) => void;
  addEvent: (agentKey: AgentKey, message: string) => void;
}

const initialAgent = (): AgentInfo => ({ state: 'idle', message: '' });

export const useSceneStore = create<SceneState>((set) => ({
  agents: {
    qa: initialAgent(),
    reviewer: initialAgent(),
    docs: initialAgent(),
    system: initialAgent(),
  },
  events: [],
  updateAgent: (key, state, message = '', eventId) =>
    set((s) => ({
      agents: {
        ...s.agents,
        [key]: { state, message, lastEventId: eventId },
      },
    })),
  addEvent: (agentKey, message) =>
    set((s) => ({
      events: [{ agentKey, message, time: Date.now() }, ...s.events].slice(0, 20),
    })),
}));
