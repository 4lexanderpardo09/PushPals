import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import Room from '../Room/Room';
import Objects from '../Objects/Objects';
import Effects from '../Effects/Effects';

const ISO_DISTANCE = 25;
const ISO_PHI = Math.PI / 4;
const ISO_THETA = Math.acos(1 / Math.sqrt(3));

export default function Scene() {
  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[
          ISO_DISTANCE * Math.sin(ISO_THETA) * Math.sin(ISO_PHI),
          ISO_DISTANCE * Math.cos(ISO_THETA),
          ISO_DISTANCE * Math.sin(ISO_THETA) * Math.cos(ISO_PHI),
        ]}
        zoom={120}
        near={0.1}
        far={200}
      />
      <OrbitControls enableRotate={false} enableZoom={true} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />

      <Room />
      <Objects />
      <Effects />
    </>
  );
}
