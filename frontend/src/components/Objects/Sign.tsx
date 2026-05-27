import { useTexture } from '../../hooks/useTexture';

interface Props { position: [number, number, number]; textureKey: string; scaleX?: number }

export default function Sign({ position, textureKey, scaleX = 0.5 }: Props) {
  const texture = useTexture(textureKey);
  return (
    <sprite position={position} scale={[scaleX, 0.2, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}
