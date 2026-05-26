"""WebSocket endpoint for real-time agent status."""

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
            event = await queue.get()
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
    finally:
        unsubscribe(queue)
