"""Simple in-process event bus for real-time agent status.

Subscribers register an asyncio.Queue, broadcast pushes AgentEvent to all.
"""

import asyncio
from dataclasses import dataclass


@dataclass
class AgentEvent:
    """Event emitted when an agent changes state.

    state: running | done | error | complete | all_error
    """

    event_id: str
    agent_key: str  # "qa" | "reviewer" | "docs" | "system"
    agent_name: str
    emoji: str
    state: str
    message: str = ""


_clients: list[asyncio.Queue] = []


def subscribe() -> asyncio.Queue:
    """Register a new subscriber queue. Returns queue to receive events."""
    q: asyncio.Queue = asyncio.Queue()
    _clients.append(q)
    return q


def unsubscribe(q: asyncio.Queue) -> None:
    """Remove a subscriber queue. Called on WS disconnect."""
    if q in _clients:
        _clients.remove(q)


async def broadcast(event: AgentEvent) -> None:
    """Push event to all subscriber queues. Iterates copy for safe concurrent unsubscribe."""
    for q in _clients.copy():
        await q.put(event)
