import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import { tileToWorld } from '../../utils/isometric';
import type { AgentState } from '../../types';

interface CharacterProps {
  tx: number;
  ty: number;
  color: string;
  hatColor?: string;
  state?: AgentState;
}

export default function Character({ tx, ty, color, hatColor, state = 'idle' }: CharacterProps) {
  const pos = useMemo(() => tileToWorld(tx, ty, 0.55), [tx, ty]);
  const armLRef = useRef<Mesh>(null);
  const armRRef = useRef<Mesh>(null);

  // Subtle typing animation when working
  useFrame(({ clock }) => {
    if (!armLRef.current || !armRRef.current) return;
    if (state === 'running') {
      const t = clock.getElapsedTime();
      armLRef.current.position.z = Math.sin(t * 4) * 0.03;
      armRRef.current.position.z = Math.sin(t * 4 + Math.PI) * 0.03;
    } else {
      armLRef.current.position.z = 0;
      armRRef.current.position.z = 0;
    }
  });

  // State-based glow
  const glowColor = state === 'done' ? '#00ff88'
    : state === 'error' ? '#ff4444'
    : state === 'running' ? '#ffaa00'
    : '#00000000';

  return (
    <group position={[pos.x, pos.y, pos.z]}>
      {/* State glow ring */}
      {state !== 'idle' && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.25, 0.35, 16]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.4} />
        </mesh>
      )}
      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.18, 6, 6]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      {/* Hat */}
      {hatColor && (
        <mesh position={[0, 0.78, 0]}>
          <boxGeometry args={[0.25, 0.08, 0.2]} />
          <meshStandardMaterial color={hatColor} />
        </mesh>
      )}
      {/* Arms */}
      <mesh ref={armLRef} position={[-0.3, 0.4, 0]}>
        <boxGeometry args={[0.08, 0.25, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh ref={armRRef} position={[0.3, 0.4, 0]}>
        <boxGeometry args={[0.08, 0.25, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
