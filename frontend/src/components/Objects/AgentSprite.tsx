import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '../../hooks/useTexture';
import { useGameStore } from '../../stores/useGameStore';
import type { AgentKey } from '../../types';

function toKey(base: string): AgentKey {
  if (base === 'qa_agent') return 'qa';
  if (base === 'reviewer_agent') return 'reviewer';
  return 'docs';
}

interface Props {
  agentKey: string;
  position: [number, number, number];
}

export default function AgentSprite({ agentKey, position }: Props) {
  const key = toKey(agentKey);
  const texture = useTexture(agentKey);
  const spriteRef = useRef<THREE.Sprite>(null);
  const baseX = position[0];
  const baseY = position[1];
  const phase = useRef(Math.random() * Math.PI * 2);

  const state = useGameStore((s) => s.agentStates[key]);

  useFrame(({ clock }) => {
    const sprite = spriteRef.current;
    if (!sprite) return;
    const t = clock.getElapsedTime();
    const p = phase.current;

    switch (state) {
      case 'idle':
        sprite.position.y = baseY + Math.sin(t * 2 + p) * 0.02;
        sprite.position.x = baseX + Math.sin(t * 0.7 + p * 2) * 0.005;
        break;
      case 'running':
        sprite.position.y = baseY + Math.sin(t * 8 + p) * 0.015;
        sprite.position.x = baseX + Math.sin(t * 12 + p) * 0.005;
        break;
      case 'done':
        sprite.position.y = baseY - Math.abs(Math.sin(t * 3 + p)) * 0.04;
        break;
      case 'error':
        sprite.position.x = baseX + (Math.random() - 0.5) * 0.03;
        break;
    }
  });

  return (
    <sprite ref={spriteRef} position={position} scale={[0.3, 0.5, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}
