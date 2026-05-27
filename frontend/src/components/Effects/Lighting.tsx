export default function Lighting() {
  return (
    <group>
      {/* Server glow */}
      <pointLight position={[0, 2.5, 0]} intensity={0.6} color="#00ff88" distance={6} decay={1} />
      {/* PushPals sign glow */}
      <pointLight position={[-1, 3.5, 2]} intensity={0.5} color="#00ff88" distance={5} decay={1} />
      {/* System Status screen glow */}
      <pointLight position={[0, 2, -7.5]} intensity={0.4} color="#00ff88" distance={4} decay={1} />
      {/* QA desk glow */}
      <pointLight position={[-5, 1.5, 5]} intensity={0.3} color="#ff4466" distance={3} decay={1} />
      {/* Reviewer desk glow */}
      <pointLight position={[8, 1.5, -1]} intensity={0.3} color="#44ff88" distance={3} decay={1} />
      {/* Docs desk glow */}
      <pointLight position={[0, 1.5, 7]} intensity={0.3} color="#aa66ff" distance={3} decay={1} />
    </group>
  );
}
