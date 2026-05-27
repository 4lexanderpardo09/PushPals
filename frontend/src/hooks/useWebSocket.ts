import { useEffect, useRef } from 'react';
import { useSceneStore } from '../stores/sceneStore';
import type { AgentKey, AgentState } from '../types';

const WS_URL = `ws://${window.location.hostname}:8000/ws`;

interface WsMessage {
  event_id: string;
  agent_key: string;
  agent_name: string;
  emoji: string;
  state: string;
  message: string;
}

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const updateAgent = useSceneStore((s) => s.updateAgent);
  const addEvent = useSceneStore((s) => s.addEvent);

  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout>;

    function connect() {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[WS] Connected');
        updateAgent('system', 'complete', 'WebSocket connected');
      };

      ws.onmessage = (event) => {
        try {
          const data: WsMessage = JSON.parse(event.data);
          const key = data.agent_key as AgentKey;

          updateAgent(key, data.state as AgentState, data.message, data.event_id);
          addEvent(key, `${data.emoji} ${data.agent_name}: ${data.state}${data.message ? ' — ' + data.message : ''}`);
        } catch { /* ignore parse errors */ }
      };

      ws.onclose = () => {
        console.log('[WS] Disconnected, reconnecting in 3s');
        reconnectTimer = setTimeout(connect, 3000);
      };

      ws.onerror = () => {
        ws.close();
      };
    }

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      wsRef.current?.close();
    };
  }, [updateAgent, addEvent]);
}
