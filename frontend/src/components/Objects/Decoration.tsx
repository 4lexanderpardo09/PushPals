import { useTexture } from '../../hooks/useTexture';

interface Props { position: [number, number, number]; textureKey: string; scaleY?: number }

export default function Decoration({ position, textureKey, scaleY = 0.3 }: Props) {
  const texture = useTexture(textureKey);
  return (
    <sprite position={position} scale={[0.3, scaleY, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}
