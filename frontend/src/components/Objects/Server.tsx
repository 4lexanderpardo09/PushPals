import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '../../hooks/useTexture';

interface Props { position: [number, number, number] }

export default function Server({ position }: Props) {
  const texture = useTexture('server');
  const glowLayers = useRef<(THREE.Sprite | null)[]>([null, null, null, null]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    glowLayers.current.forEach((sprite, i) => {
      if (!sprite) return;
      sprite.material.opacity = (0.12 / (i + 1)) * (0.5 + 0.5 * Math.sin(t * 2 + i));
      const s = 1 + (i + 1) * (0.12 + 0.04 * Math.sin(t * 1.5 + i * 0.5));
      sprite.scale.set(s, s, 1);
    });
  });

  return (
    <group position={position}>
      <sprite scale={[0.6, 0.6, 1]}>
        <spriteMaterial map={texture} transparent depthWrite={false} />
      </sprite>
      {[0, 1, 2, 3].map((i) => (
        <sprite
          key={i}
          ref={(el) => { glowLayers.current[i] = el; }}
          scale={[0.7, 0.7, 1]}
        >
          <spriteMaterial
            map={texture}
            transparent
            depthWrite={false}
            opacity={0.08 / (i + 1)}
            color="#00ff88"
          />
        </sprite>
      ))}
    </group>
  );
}
