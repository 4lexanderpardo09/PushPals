import { useTexture } from '../../hooks/useTexture';

interface Props { position: [number, number, number] }

export default function Monitor({ position }: Props) {
  const texture = useTexture('monitor');
  return (
    <sprite position={position} scale={[0.35, 0.2, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}
