import { useTexture } from '../../hooks/useTexture';

interface Props { position: [number, number, number] }

export default function Desk({ position }: Props) {
  const texture = useTexture('desk');
  return (
    <sprite position={position} scale={[0.6, 0.25, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}
