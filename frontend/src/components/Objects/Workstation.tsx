import { useMemo } from 'react';
import { codeScreenTexture, agentBadgeTexture } from '../../textures/generateAll';
import { tileToWorld } from '../../utils/isometric';

interface WorkstationProps {
  tx: number;
  ty: number;
  label: string;
  color: string;
  monitorCount?: number;
  rotation?: number;
}

export default function Workstation({
  tx, ty, label, color,
  monitorCount = 2,
  rotation = 0,
}: WorkstationProps) {
  const pos = useMemo(() => tileToWorld(tx, ty, 0), [tx, ty]);
  const codeTex = useMemo(() => codeScreenTexture(), []);
  const badgeTex = useMemo(() => agentBadgeTexture(label, color), [label, color]);
  const deskWidth = 2.2;

  return (
    <group position={[pos.x, 0, pos.z]} rotation={[0, rotation, 0]}>
      {/* Desk */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[deskWidth, 0.1, 1.4]} />
        <meshStandardMaterial color="#3d2817" roughness={0.7} />
      </mesh>
      {/* Desk legs */}
      {([[-deskWidth / 2 + 0.1, 0.25, -0.6] as [number, number, number],
        [deskWidth / 2 - 0.1, 0.25, -0.6] as [number, number, number],
        [-deskWidth / 2 + 0.1, 0.25, 0.6] as [number, number, number],
        [deskWidth / 2 - 0.1, 0.25, 0.6] as [number, number, number]]).map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      {/* Monitors */}
      {Array.from({ length: monitorCount }).map((_, i) => {
        const mx = (i - (monitorCount - 1) / 2) * 0.5;
        return (
          <group key={i} position={[mx, 1.1, -0.3]}>
            {/* Monitor stand */}
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.05, 0.3, 0.05]} />
              <meshStandardMaterial color="#333" />
            </mesh>
            {/* Monitor screen */}
            <mesh>
              <boxGeometry args={[0.7, 0.5, 0.05]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            {/* Screen content */}
            <mesh position={[0, 0, 0.031]}>
              <planeGeometry args={[0.65, 0.45]} />
              <meshBasicMaterial map={codeTex} />
            </mesh>
          </group>
        );
      })}
      {/* Keyboard */}
      <mesh position={[0, 0.55, 0.4]}>
        <boxGeometry args={[0.6, 0.05, 0.25]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Chair */}
      <mesh position={[0, 0.3, 1]}>
        <boxGeometry args={[0.7, 0.05, 0.7]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 0.5, 1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 8]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Agent badge — floating above desk */}
      <mesh position={[0, 1.9, -0.5]}>
        <planeGeometry args={[3, 0.5]} />
        <meshBasicMaterial map={badgeTex} transparent />
      </mesh>
      {/* Desk glow */}
      <pointLight position={[0, 1.5, 0]} intensity={0.2} color={color} distance={2} />
    </group>
  );
}
