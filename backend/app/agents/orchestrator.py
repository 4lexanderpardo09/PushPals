import asyncio
import logging
import time

from app.agents.events import AgentEvent, broadcast
from app.agents.prompts import AGENT_PROMPTS
from app.agents.provider import AIProvider, create_provider
from app.core.config import settings

logger = logging.getLogger(__name__)


async def run_single(
    provider: AIProvider, key: str, diff: str, event_id: str = ""
) -> tuple[str, str, bool]:
    """Run one agent. Returns (key, response_text, success)."""
    prompt = AGENT_PROMPTS[key]
    success = False
    if event_id:
        await broadcast(
            AgentEvent(event_id, key, prompt["name"], prompt["emoji"], "running")
        )

    t0 = time.monotonic()
    try:
        text = await asyncio.wait_for(
            provider.complete(
                system=prompt["system"],
                user=f"Revisa este diff:\n\n{diff}",
            ),
            timeout=settings.agent_timeout,
        )
        elapsed = time.monotonic() - t0
        logger.info("Agent %s done in %.1fs", prompt["name"], elapsed)
        success = True

        if event_id:
            await broadcast(
                AgentEvent(
                    event_id, key, prompt["name"], prompt["emoji"], "done",
                    f"Completado en {elapsed:.1f}s",
                )
            )
        return key, text, success
    except asyncio.TimeoutError:
        msg = f"⚠️ {prompt['emoji']} {prompt['name']} excedió el tiempo límite ({settings.agent_timeout}s)."
        logger.error("Agent %s timeout", prompt["name"])
        if event_id:
            await broadcast(
                AgentEvent(event_id, key, prompt["name"], prompt["emoji"], "error", msg)
            )
        return key, msg, success
    except Exception as e:
        msg = f"⚠️ {prompt['emoji']} {prompt['name']} error: {e}"
        logger.error("Agent %s failed: %s", prompt["name"], e)
        if event_id:
            await broadcast(
                AgentEvent(event_id, key, prompt["name"], prompt["emoji"], "error", str(e))
            )
        return key, msg, success


async def run_all(diff: str, event_id: str = "") -> dict[str, str]:
    """Run all agents in parallel. Returns {key: response_text}."""
    provider = create_provider()
    tasks = [run_single(provider, k, diff, event_id) for k in AGENT_PROMPTS]
    results = await asyncio.gather(*tasks)

    if event_id:
        any_ok = any(r[2] for r in results)
        state = "complete" if any_ok else "all_error"
        msg = "" if any_ok else "Todos los agentes fallaron"
        await broadcast(
            AgentEvent(event_id, "system", "System", "🤖", state, msg)
        )

    return {r[0]: r[1] for r in results}


def format_comment(results: dict[str, str]) -> str:
    """Format agent responses into Markdown comment body."""
    sections = []
    for key in ["qa", "reviewer", "docs"]:
        prompt = AGENT_PROMPTS[key]
        sections.append(f"### {prompt['emoji']} {prompt['name']}\n{results[key]}")
    return "## 🤖 Agent Team Review\n\n" + "\n\n".join(sections)
