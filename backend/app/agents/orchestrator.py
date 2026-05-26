import asyncio
import logging

from app.agents.prompts import AGENT_PROMPTS
from app.agents.provider import AIProvider, create_provider
from app.core.config import settings

logger = logging.getLogger(__name__)


async def _run_single(provider: AIProvider, key: str, diff: str) -> tuple[str, str]:
    """Run one agent. Returns (key, response_text) for gathering."""
    prompt = AGENT_PROMPTS[key]
    try:
        text = await asyncio.wait_for(
            provider.complete(
                system=prompt["system"],
                user=f"Revisa este diff:\n\n{diff}",
            ),
            timeout=settings.agent_timeout,
        )
        logger.info("Agent %s done", prompt["name"])
        return key, text
    except asyncio.TimeoutError:
        msg = f"⚠️ {prompt['emoji']} {prompt['name']} excedió el tiempo límite ({settings.agent_timeout}s)."
        logger.error("Agent %s timeout", prompt["name"])
        return key, msg
    except Exception as e:
        msg = f"⚠️ {prompt['emoji']} {prompt['name']} error: {e}"
        logger.error("Agent %s failed: %s", prompt["name"], e)
        return key, msg


async def run_all(diff: str) -> dict[str, str]:
    """Run all agents in parallel. Returns {key: response_text}."""
    provider = create_provider()
    tasks = [_run_single(provider, k, diff) for k in AGENT_PROMPTS]
    results = await asyncio.gather(*tasks)
    return dict(results)


def format_comment(results: dict[str, str]) -> str:
    """Format agent responses into Markdown comment body."""
    sections = []
    for key in ["qa", "reviewer", "docs"]:
        prompt = AGENT_PROMPTS[key]
        sections.append(f"### {prompt['emoji']} {prompt['name']}\n{results[key]}")
    return "## 🤖 Agent Team Review\n\n" + "\n\n".join(sections)
