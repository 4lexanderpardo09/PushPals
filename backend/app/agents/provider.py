from abc import ABC, abstractmethod

from openai import AsyncOpenAI

from app.core.config import settings


class AIProvider(ABC):
    """Abstract interface for AI model providers."""

    @abstractmethod
    async def complete(self, system: str, user: str) -> str:
        ...


class OpenAICompatibleProvider(AIProvider):
    """Generic OpenAI-compatible API (DeepSeek, Groq, Together, etc.)."""

    def __init__(self) -> None:
        self.client = AsyncOpenAI(
            api_key=settings.deepseek_api_key,
            base_url=settings.deepseek_base_url,
        )
        self.model = settings.deepseek_model

    async def complete(self, system: str, user: str) -> str:
        resp = await self.client.chat.completions.create(
            model=self.model,
            max_tokens=2000,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
        )
        return resp.choices[0].message.content or ""


class AnthropicProvider(AIProvider):
    """Anthropic Claude API."""

    def __init__(self) -> None:
        from anthropic import AsyncAnthropic

        self.client = AsyncAnthropic(api_key=settings.anthropic_api_key)
        self.model = settings.anthropic_model

    async def complete(self, system: str, user: str) -> str:
        resp = await self.client.messages.create(
            model=self.model,
            max_tokens=2000,
            system=system,
            messages=[{"role": "user", "content": user}],
        )
        return "".join(block.text for block in resp.content if block.type == "text")


_PROVIDERS = {
    "deepseek": OpenAICompatibleProvider,
    "openai": OpenAICompatibleProvider,
    "anthropic": AnthropicProvider,
}


def create_provider() -> AIProvider:
    """Factory: return provider instance based on AI_PROVIDER setting."""
    cls = _PROVIDERS.get(settings.ai_provider)
    if not cls:
        raise ValueError(
            f"Unknown provider '{settings.ai_provider}'. "
            f"Options: {', '.join(_PROVIDERS)}"
        )
    return cls()
