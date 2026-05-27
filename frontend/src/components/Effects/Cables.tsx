import { useMemo } from 'react';
import * as THREE from 'three';

interface CableProps {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
}

function Cable({ from, to, color = '#00ff8866' }: CableProps) {
  const points = useMemo(() => {
    const midY = (from[1] + to[1]) / 2 + 0.5;
    return [
      new THREE.Vector3(from[0], from[1], from[2]),
      new THREE.Vector3(from[0], midY, from[2]),
      new THREE.Vector3(to[0], midY, to[2]),
      new THREE.Vector3(to[0], to[1], to[2]),
    ];
  }, [from, to]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 8, 0.02, 4, false]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

interface CablesProps {
  connections: { from: [number, number, number]; to: [number, number, number]; color?: string }[];
}

export default function Cables({ connections }: CablesProps) {
  return (
    <group>
      {connections.map((c, i) => (
        <Cable key={i} from={c.from} to={c.to} color={c.color} />
      ))}
    </group>
  );
}
