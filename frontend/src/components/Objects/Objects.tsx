import { useMemo } from 'react';
import { OBJECTS } from '../../utils/roomData';
import { gridToWorld } from '../../utils/isometric';
import Desk from './Desk';
import Monitor from './Monitor';
import Server from './Server';
import Sign from './Sign';
import Decoration from './Decoration';
import Carpet from './Carpet';
import AgentSprite from './AgentSprite';
import type { RoomObject } from '../../types';

function ObjectRenderer({ obj }: { obj: RoomObject }) {
  const pos = useMemo(() => gridToWorld(obj.tx, obj.ty, obj.tz), [obj.tx, obj.ty, obj.tz]);

  switch (obj.key) {
    // Desks
    case 'qa_desk':
    case 'reviewer_desk':
    case 'docs_desk':
      return <Desk position={pos} />;

    // Monitors
    case 'qa_monitor':
    case 'reviewer_monitor':
    case 'docs_monitor':
      return <Monitor position={pos} />;

    // Server
    case 'central_server':
      return <Server position={pos} />;

    // Agents
    case 'qa_agent':
    case 'reviewer_agent':
    case 'docs_agent':
      return <AgentSprite agentKey={obj.key} position={pos} />;

    // Signs with glow
    case 'pushpals_sign':
      return <Sign position={pos} textureKey="pushpals_sign" scaleX={1.2} />;
    case 'qa_sign':
      return <Sign position={pos} textureKey="qa_sign" />;
    case 'reviewer_sign':
      return <Sign position={pos} textureKey="reviewer_sign" />;
    case 'docs_sign':
      return <Sign position={pos} textureKey="docs_sign" />;
    case 'system_screen':
      return <Sign position={pos} textureKey="system_screen" scaleX={0.8} />;
    case 'mission_board':
      return <Sign position={pos} textureKey="mission_board" />;
    case 'live_feed':
      return <Sign position={pos} textureKey="live_feed" />;
    case 'github_logo':
      return <Sign position={pos} textureKey="github_logo" />;
    case 'wall_clock':
      return <Sign position={pos} textureKey="wall_clock" />;
    case 'framed_cert':
      return <Sign position={pos} textureKey="framed_cert" />;
    case 'speaker':
      return <Sign position={pos} textureKey="speaker" />;
    case 'framed_picture':
      return <Sign position={pos} textureKey="framed_picture" />;

    // Decorations
    case 'plant':
    case 'big_plant':
      return <Decoration position={pos} textureKey="plant" scaleY={0.35} />;
    case 'filing_cabinet':
      return <Decoration position={pos} textureKey="cabinet" scaleY={0.35} />;
    case 'bookshelf':
      return <Decoration position={pos} textureKey="bookshelf" scaleY={0.45} />;
    case 'water_cooler':
      return <Decoration position={pos} textureKey="water_cooler" scaleY={0.4} />;
    case 'trash_bin':
      return <Decoration position={pos} textureKey="trash_bin" scaleY={0.2} />;
    case 'cardboard_box':
      return <Decoration position={pos} textureKey="cardboard_box" scaleY={0.2} />;
    case 'coffee_mug':
      return <Decoration position={pos} textureKey="coffee_mug" scaleY={0.15} />;
    case 'papers_stack':
      return <Decoration position={pos} textureKey="papers_stack" scaleY={0.15} />;
    case 'keyboard':
      return <Decoration position={pos} textureKey="keyboard" scaleY={0.1} />;
    case 'dual_monitor':
      return <Decoration position={pos} textureKey="dual_monitor" scaleY={0.25} />;
    case 'server_pedestal':
      return <Decoration position={pos} textureKey="server_pedestal" scaleY={0.15} />;

    // Specials
    case 'carpet':
      return <Carpet position={pos} />;
    case 'carpet_text':
      return null; // not implemented yet

    default:
      return null;
  }
}

export default function Objects() {
  return (
    <group>
      {OBJECTS.map((obj, i) => (
        <ObjectRenderer key={`${obj.key}-${i}`} obj={obj} />
      ))}
    </group>
  );
}
