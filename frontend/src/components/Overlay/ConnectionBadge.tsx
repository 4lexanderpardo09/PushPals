import { useGameStore } from '../../stores/useGameStore';

export default function ConnectionBadge() {
  const status = useGameStore((s) => s.connectionStatus);
  const color = status === 'connected' ? '#00ff88' : status === 'connecting' ? '#ffcc00' : '#ff4444';
  const label = status === 'connected' ? 'Connected' : status === 'connecting' ? 'Connecting...' : 'Disconnected';

  return (
    <span
      style={{
        fontFamily: 'monospace',
        fontSize: '10px',
        color,
        border: `1px solid ${color}`,
        padding: '2px 8px',
        borderRadius: '3px',
      }}
    >
      {label}
    </span>
  );
}
