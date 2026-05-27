import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/useGameStore';
import type { AgentKey, AgentState } from '../types';

interface WSEvent {
  event_id: string;
  agent_key: string;
  agent_name: string;
  state: string;
  message: string;
}

function mapState(raw: string): AgentState {
  switch (raw) {
    case 'running': return 'running';
    case 'done': return 'done';
    case 'error':
    case 'all_error': return 'error';
    default: return 'idle';
  }
}

const VALID_AGENTS = new Set(['qa', 'reviewer', 'docs']);

export function useWebSocket() {
  const setAgentState = useGameStore((s) => s.setAgentState);
  const setConnection = useGameStore((s) => s.setConnection);
  const addFeedEvent = useGameStore((s) => s.addFeedEvent);
  const reconnectRef = useRef<number | null>(null);

  useEffect(() => {
    const host = document.body.dataset.backendHost || 'localhost:8000';
    const proto = host.includes('localhost') || host.includes('127.0.0.1') ? 'ws:' : 'wss:';
    const url = `${proto}//${host}/ws`;

    let ws: WebSocket | null = null;

    function connect() {
      setConnection('connecting');
      ws = new WebSocket(url);
      ws.onopen = () => setConnection('connected');
      ws.onclose = () => {
        setConnection('disconnected');
        reconnectRef.current = window.setTimeout(connect, 3000);
      };
      ws.onerror = () => ws?.close();
      ws.onmessage = (event) => {
        try {
          const data: WSEvent = JSON.parse(event.data);
          if (data.agent_key === 'system') {
            if (data.state === 'complete') addFeedEvent('SYSTEM', 'Review complete');
            return;
          }
          if (VALID_AGENTS.has(data.agent_key)) {
            const agentKey = data.agent_key as AgentKey;
            setAgentState(agentKey, mapState(data.state), data.message);
          }
        } catch {
          // ignore malformed
        }
      };
    }

    connect();
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      ws?.close();
    };
  }, [setAgentState, setConnection, addFeedEvent]);
}
