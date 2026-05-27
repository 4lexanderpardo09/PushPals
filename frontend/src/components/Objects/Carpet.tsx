interface Props { position: [number, number, number] }

export default function Carpet({ position }: Props) {
  return (
    <mesh position={[position[0], position[1] + 0.01, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.5, 0.75]} />
      <meshBasicMaterial color="#1a2244" transparent opacity={0.3} />
    </mesh>
  );
}
