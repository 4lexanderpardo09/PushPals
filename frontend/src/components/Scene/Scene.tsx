import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { getTileSize, tileToWorld } from '../../utils/isometric';
import Room from '../Room/Room';
import CentralServer from '../Objects/CentralServer';
import SignPushPals from '../Objects/SignPushPals';
import Screen from '../Objects/Screen';
import Workstation from '../Objects/Workstation';
import Character from '../Objects/Character';
import Cables from '../Effects/Cables';
import Lighting from '../Effects/Lighting';
import { useSceneStore } from '../../stores/sceneStore';
import {
  Plant, Shelf, Cabinet, WaterCooler, Rug, CardboardBox, TrashCan,
} from '../Objects/Furniture';
import {
  statusScreenTexture,
  liveFeedTexture,
  githubLogoTexture,
  missionBoardTexture,
} from '../../textures/generateAll';

const TILE = getTileSize();
const ROOM_W = 20;
const ROOM_H = 15;
const HW = (ROOM_W * TILE) / 2;
const HH = (ROOM_H * TILE) / 2;
const CENTER_X = ((ROOM_W - ROOM_H) * TILE) / 4;
const CENTER_Z = ((ROOM_W + ROOM_H) * TILE) / 4;

function ServerPos() {
  const p = tileToWorld(10, 7, 0);
  return [p.x, 1, p.z] as [number, number, number];
}

export default function Scene() {
  const serverPos = ServerPos();
  const qaState = useSceneStore((s) => s.agents.qa.state);
  const reviewerState = useSceneStore((s) => s.agents.reviewer.state);
  const docsState = useSceneStore((s) => s.agents.docs.state);

  const cableConnections = [
    { from: serverPos, to: [0, 2.5, -HH + 0.1] as [number, number, number] },
    { from: serverPos, to: [HW - 0.1, 2.5, -1.5] as [number, number, number] },
    { from: serverPos, to: [tileToWorld(5, 11, 0).x, 0.5, tileToWorld(5, 11, 0).z] as [number, number, number] },
    { from: serverPos, to: [tileToWorld(16, 7, 0).x, 0.5, tileToWorld(16, 7, 0).z] as [number, number, number] },
    { from: serverPos, to: [tileToWorld(10, 12, 0).x, 0.5, tileToWorld(10, 12, 0).z] as [number, number, number] },
  ];

  return (
    <Canvas
      orthographic
      camera={{
        position: [CENTER_X + 6, 3, CENTER_Z + 6],
        zoom: 80,
        near: 0.1,
        far: 500,
      }}
      style={{ background: '#0a0a0f' }}
    >
      <OrbitControls
        enableRotate={false}
        enablePan={true}
        enableZoom={true}
        target={[CENTER_X, 0, CENTER_Z]}
        maxZoom={200}
        minZoom={5}
      />

      <ambientLight intensity={0.4} color="#4466aa" />
      <directionalLight position={[10, 20, 10]} intensity={0.5} color="#88ffbb" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#00ff88" />

      <Room />
      <SignPushPals />
      <CentralServer />
      <Cables connections={cableConnections} />
      <Lighting />

      <Screen x={0} y={2.5} z={-HH + 0.1} texture={statusScreenTexture()} width={4} height={3} />
      <Screen x={HW - 0.1} y={2.5} z={-1.5} texture={liveFeedTexture()} width={3} height={3.5} rotation={Math.PI / 2} />
      <Screen x={HW - 0.1} y={3.5} z={3} texture={githubLogoTexture()} width={1.5} height={1.5} rotation={Math.PI / 2} />
      <Screen x={-1.5} y={1.9} z={tileToWorld(0, 3, 0).z + 0.2} texture={missionBoardTexture()} width={2.5} height={1.6} />

      <Workstation tx={5} ty={11} label="QA AGENT" color="#ff4466" monitorCount={2} rotation={0} />
      <Character tx={5} ty={11.8} color="#ff4466" hatColor="#cc0000" state={qaState} />

      <Workstation tx={16} ty={7} label="REVIEWER AGENT" color="#44ff88" monitorCount={3} rotation={-Math.PI / 2} />
      <Character tx={15.2} ty={7} color="#44ff88" state={reviewerState} />

      <Workstation tx={10} ty={12} label="DOCS AGENT" color="#aa66ff" monitorCount={1} rotation={0} />
      <Character tx={10} ty={12.8} color="#aa66ff" state={docsState} />

      <Shelf tx={2} ty={12} width={1.5} />
      <Shelf tx={17} ty={2} width={2} />
      <Cabinet tx={1} ty={7} />
      <WaterCooler tx={18} ty={10} />
      <Plant tx={2} ty={3} />
      <Plant tx={12} ty={5} />
      <Plant tx={17} ty={12} />
      <Rug tx={10} ty={13.5} />
      <CardboardBox tx={18} ty={13} stack={2} />
      <CardboardBox tx={1} ty={13} stack={1} />
      <TrashCan tx={11} ty={13} />
    </Canvas>
  );
}
