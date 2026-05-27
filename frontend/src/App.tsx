import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene/Scene';
import Effects from './components/Effects/Effects';
import Overlay from './components/Overlay/Overlay';
import { useWebSocket } from './hooks/useWebSocket';

export default function App() {
  useWebSocket();

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a1a' }}>
      <Canvas
        gl={{ antialias: false }}
        camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0, 10] }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
        <Effects />
      </Canvas>
      <Overlay />
    </div>
  );
}
