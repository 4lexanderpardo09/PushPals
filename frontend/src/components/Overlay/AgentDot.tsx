import { useGameStore } from '../../stores/useGameStore';
import type { AgentKey } from '../../types';

const COLORS: Record<string, string> = {
  idle: '#666666',
  running: '#ffcc00',
  done: '#00ff88',
  error: '#ff4444',
};

interface Props { agent: AgentKey }

export default function AgentDot({ agent }: Props) {
  const state = useGameStore((s) => s.agentStates[agent]);
  const color = COLORS[state] || '#666';

  return (
    <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#888' }}>
      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: color, marginRight: 4 }} />
      {agent.toUpperCase()}
    </span>
  );
}
