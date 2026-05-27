import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CABLES } from '../../utils/roomData';
import { gridToWorld } from '../../utils/isometric';

export default function Cables() {
  const groupRef = useRef<THREE.Group>(null);
  const phases = useMemo(() => CABLES.map(() => Math.random() * Math.PI * 2), []);

  // Build bezier curves
  const { curves, colors } = useMemo(() => {
    const cs: THREE.CatmullRomCurve3[] = [];
    const cols: number[] = [];
    for (const cable of CABLES) {
      const from = gridToWorld(cable.from.tx, cable.from.ty, 0.2);
      const to = gridToWorld(cable.to.tx, cable.to.ty, 0.2);
      const midY = (from[1] + to[1]) / 2;
      const midX = (from[0] + to[0]) / 2;
      const midZ = (from[2] + to[2]) / 2;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(from[0], from[1], from[2]),
        new THREE.Vector3(midX, midY + 0.3, midZ),
        new THREE.Vector3(to[0], to[1], to[2]),
      ]);
      cs.push(curve);
      cols.push(cable.color);
    }
    return { curves: cs, colors: cols };
  }, []);

  // Tube mesh cache
  const tubeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    tubeRefs.current.forEach((mesh, i) => {
      if (!mesh || !(mesh.material instanceof THREE.MeshBasicMaterial)) return;
      const alpha = 0.3 + 0.2 * Math.sin(t * 1.5 + phases[i]);
      mesh.material.opacity = alpha;
    });
  });

  return (
    <group ref={groupRef}>
      {curves.map((curve, i) => {
        const color = colors[i];
        const r = (color >> 16) & 0xff;
        const g = (color >> 8) & 0xff;
        const b = color & 0xff;

        return (
          <group key={i}>
            {/* Cable body */}
            <mesh
              ref={(el) => { tubeRefs.current[i] = el; }}
              position={[0, 0, 0]}
            >
              <tubeGeometry args={[curve, 8, 0.02, 4, false]} />
              <meshBasicMaterial
                color={new THREE.Color(r / 255, g / 255, b / 255)}
                transparent
                opacity={0.35}
              />
            </mesh>
            {/* Glow overlay */}
            <mesh>
              <tubeGeometry args={[curve, 8, 0.04, 4, false]} />
              <meshBasicMaterial
                color={new THREE.Color(r / 255, g / 255, b / 255)}
                transparent
                opacity={0.1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
