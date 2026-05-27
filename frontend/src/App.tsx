import { useWebSocket } from './hooks/useWebSocket';
import Scene from './components/Scene/Scene';

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 10,
  backgroundImage:
    'linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)',
  backgroundSize: '4px 4px',
};

export default function App() {
  useWebSocket();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Scene />
      <div style={overlayStyle} />
    </div>
  );
}
