"""WebSocket endpoint for real-time agent status.

Sends JSON messages with fields:
- event_id: str — webhook event identifier
- agent_key: str — "qa" | "reviewer" | "docs" | "system"
- agent_name: str — display name
- emoji: str
- state: str — "running" | "done" | "error" | "complete" | "all_error"
- message: str
"""

import asyncio
import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.agents.events import subscribe, unsubscribe

logger = logging.getLogger(__name__)
router = APIRouter()


@router.websocket("/ws")
async def agent_status(websocket: WebSocket):
    await websocket.accept()
    queue = subscribe()
    logger.info("WS client connected")
    try:
        while True:
            try:
                event = await asyncio.wait_for(queue.get(), timeout=30.0)
            except asyncio.TimeoutError:
                continue
            await websocket.send_json({
                "event_id": event.event_id,
                "agent_key": event.agent_key,
                "agent_name": event.agent_name,
                "emoji": event.emoji,
                "state": event.state,
                "message": event.message,
            })
    except WebSocketDisconnect:
        logger.info("WS client disconnected")
    except Exception as e:
        logger.error("WS error: %s", e)
    finally:
        unsubscribe(queue)
