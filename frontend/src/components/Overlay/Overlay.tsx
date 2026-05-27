import ConnectionBadge from './ConnectionBadge';
import AgentDot from './AgentDot';

export default function Overlay() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: 'rgba(10, 10, 26, 0.85)',
        border: '1px solid #222244',
        borderRadius: 6,
        padding: '6px 16px',
        zIndex: 100,
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 8,
        color: '#888',
      }}
    >
      <ConnectionBadge />
      <AgentDot agent="qa" />
      <AgentDot agent="reviewer" />
      <AgentDot agent="docs" />
    </div>
  );
}
