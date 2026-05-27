import { create } from 'zustand';
import type { AgentKey, AgentState, ConnectionStatus } from '../types';

const MAX_FEED_LINES = 6;

interface GameStore {
  agentStates: Record<AgentKey, AgentState>;
  liveFeed: string[];
  connectionStatus: ConnectionStatus;
  setAgentState: (key: AgentKey, state: AgentState, message?: string) => void;
  addFeedEvent: (source: string, text: string) => void;
  setConnection: (status: ConnectionStatus) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  agentStates: { qa: 'idle', reviewer: 'idle', docs: 'idle' },
  liveFeed: [],
  connectionStatus: 'disconnected',

  setAgentState: (key, state) => {
    set((s) => ({
      agentStates: { ...s.agentStates, [key]: state },
    }));
  },

  addFeedEvent: (source, text) => {
    const ts = new Date().toLocaleTimeString();
    set((s) => ({
      liveFeed: [`${ts} ${source} ${text}`, ...s.liveFeed].slice(0, MAX_FEED_LINES),
    }));
  },

  setConnection: (status) => {
    set({ connectionStatus: status });
    if (status === 'connected') get().addFeedEvent('SYSTEM', 'WebSocket connected');
    else if (status === 'disconnected') get().addFeedEvent('SYSTEM', 'Disconnected');
  },
}));
