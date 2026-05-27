import { useMemo } from 'react';
import { tileToWorld } from '../../utils/isometric';

function Pos({ tx, ty, height = 0 }: { tx: number; ty: number; height?: number }) {
  const p = useMemo(() => tileToWorld(tx, ty, height), [tx, ty, height]);
  return p;
}

export function Plant({ tx, ty }: { tx: number; ty: number }) {
  const p = Pos({ tx, ty });
  return (
    <group position={[p.x, 0, p.z]}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.25, 0.2, 0.3, 8]} />
        <meshStandardMaterial color="#5c3a1e" />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.35, 6, 6]} />
        <meshStandardMaterial color="#2d8a4e" />
      </mesh>
      <mesh position={[0.15, 0.5, 0.1]}>
        <sphereGeometry args={[0.15, 5, 5]} />
        <meshStandardMaterial color="#3daa5e" />
      </mesh>
      <mesh position={[-0.1, 0.45, -0.15]}>
        <sphereGeometry args={[0.12, 5, 5]} />
        <meshStandardMaterial color="#3daa5e" />
      </mesh>
    </group>
  );
}

export function Shelf({ tx, ty, width = 2 }: { tx: number; ty: number; width?: number }) {
  const p = Pos({ tx, ty });
  return (
    <group position={[p.x, 0, p.z]}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[width, 0.05, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[width, 0.05, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[width, 0.05, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Side panels */}
      <mesh position={[-width / 2, 0.9, 0]}>
        <boxGeometry args={[0.05, 1.8, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[width / 2, 0.9, 0]}>
        <boxGeometry args={[0.05, 1.8, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Books on shelves */}
      {[0.6, 1.2, 1.8].map((sy, si) => (
        Array.from({ length: 3 }).map((_, bi) => (
          <mesh key={`${si}-${bi}`} position={[-0.4 + bi * 0.4, sy, 0]}>
            <boxGeometry args={[0.2, 0.3 - bi * 0.05, 0.35]} />
            <meshStandardMaterial color={['#8b4513', '#5c3a1e', '#a0522d', '#3d2817'][bi % 4]} />
          </mesh>
        ))
      ))}
    </group>
  );
}

export function Cabinet({ tx, ty }: { tx: number; ty: number }) {
  const p = Pos({ tx, ty });
  return (
    <group position={[p.x, 0, p.z]}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.6, 1.2, 0.5]} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>
      {/* Drawer lines */}
      <mesh position={[0, 0.3, 0.26]}>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[0, 0.9, 0.26]}>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}

export function WaterCooler({ tx, ty }: { tx: number; ty: number }) {
  const p = Pos({ tx, ty });
  return (
    <group position={[p.x, 0, p.z]}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.3, 8]} />
        <meshStandardMaterial color="#4488cc" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export function Rug({ tx, ty }: { tx: number; ty: number }) {
  const p = Pos({ tx, ty, height: 0 });
  return (
    <mesh position={[p.x, 0.005, p.z]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2.5, 1.2]} />
      <meshStandardMaterial color="#1a1a2e" />
    </mesh>
  );
}

export function CardboardBox({ tx, ty, stack = 1 }: { tx: number; ty: number; stack?: number }) {
  const p = Pos({ tx, ty });
  return (
    <group position={[p.x, 0, p.z]}>
      {Array.from({ length: stack }).map((_, i) => (
        <mesh key={i} position={[0, 0.15 + i * 0.3, 0]}>
          <boxGeometry args={[0.35, 0.25, 0.35]} />
          <meshStandardMaterial color="#8b6914" />
        </mesh>
      ))}
    </group>
  );
}

export function TrashCan({ tx, ty }: { tx: number; ty: number }) {
  const p = Pos({ tx, ty });
  return (
    <group position={[p.x, 0, p.z]}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.4, 8]} />
        <meshStandardMaterial color="#224466" />
      </mesh>
    </group>
  );
}
