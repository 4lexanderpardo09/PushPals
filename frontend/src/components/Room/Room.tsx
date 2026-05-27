import Walls from './Wall';
import FloorTiles from './FloorTile';

export default function Room() {
  return (
    <group>
      <Walls />
      <FloorTiles />
    </group>
  );
}
