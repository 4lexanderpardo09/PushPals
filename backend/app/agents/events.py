"""Simple in-process event bus for real-time agent status."""

import asyncio
from dataclasses import dataclass


@dataclass
class AgentEvent:
    event_id: str
    agent_key: str
    agent_name: str
    emoji: str
    state: str  # running | done | error | complete
    message: str = ""


_clients: list[asyncio.Queue] = []


def subscribe() -> asyncio.Queue:
    q: asyncio.Queue = asyncio.Queue()
    _clients.append(q)
    return q


def unsubscribe(q: asyncio.Queue) -> None:
    if q in _clients:
        _clients.remove(q)


async def broadcast(event: AgentEvent) -> None:
    for q in _clients:
        await q.put(event)
