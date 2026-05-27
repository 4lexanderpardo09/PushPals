import { useMemo } from 'react';
import { tileToWorld } from '../../utils/isometric';

export default function CentralServer() {
  const pos = useMemo(() => tileToWorld(10, 7, 0), []);

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Base platform */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[3, 0.3, 3]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Server body */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 1.7, 2]} />
        <meshStandardMaterial color="#222233" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Glow panel front */}
      <mesh position={[0, 1, 1.01]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshBasicMaterial color="#00ff88" opacity={0.6} transparent />
      </mesh>
      {/* Glow panel top */}
      <mesh position={[0, 1.86, 0]}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial color="#00ff88" opacity={0.3} transparent />
      </mesh>
      {/* Glow strip left */}
      <mesh position={[-1.01, 0.6, 0]}>
        <planeGeometry args={[0.1, 0.8]} />
        <meshBasicMaterial color="#00ff88" opacity={0.5} transparent />
      </mesh>
      {/* Glow strip right */}
      <mesh position={[1.01, 0.6, 0]}>
        <planeGeometry args={[0.1, 0.8]} />
        <meshBasicMaterial color="#00ff88" opacity={0.5} transparent />
      </mesh>
      {/* Server ambient glow */}
      <pointLight position={[0, 1.5, 0]} intensity={0.5} color="#00ff88" distance={4} />
    </group>
  );
}
