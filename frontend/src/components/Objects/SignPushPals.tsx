import { useMemo } from 'react';
import { signPushPalsTexture } from '../../textures/generateAll';
import { tileToWorld } from '../../utils/isometric';

const tex = signPushPalsTexture();

export default function SignPushPals() {
  const pos = useMemo(() => tileToWorld(1, 2, 3.5), []);

  return (
    <group position={[pos.x, pos.y, pos.z]}>
      {/* Sign backing */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[7, 2.5]} />
        <meshBasicMaterial color="#0a0a0f" />
      </mesh>
      {/* Glowing text */}
      <mesh>
        <planeGeometry args={[7, 2.5]} />
        <meshBasicMaterial map={tex} transparent />
      </mesh>
      {/* Green glow light */}
      <pointLight position={[0, 0, 1]} intensity={0.8} color="#00ff88" distance={6} />
    </group>
  );
}
