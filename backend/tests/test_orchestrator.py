"""Test agent orchestration: providers, error isolation, comment formatting."""

import asyncio

import pytest

from app.agents.orchestrator import format_comment, run_all, run_single
from app.agents.provider import AIProvider
from app.agents.prompts import AGENT_PROMPTS
from tests.conftest import SAMPLE_DIFF


class FakeProvider(AIProvider):
    """Returns responses keyed by agent role found in system prompt."""

    def __init__(self, responses: dict[str, str]):
        self.responses = responses

    async def complete(self, system: str, user: str) -> str:
        # Match agent key by scanning system prompt for distinctive role text
        for key, cfg in AGENT_PROMPTS.items():
            if cfg["system"] == system:
                return self.responses.get(key, "")
        return ""


class FailProvider(AIProvider):
    """Provider that always raises."""

    async def complete(self, system: str, user: str) -> str:
        msg = "API failure"
        raise RuntimeError(msg)


class SlowProvider(AIProvider):
    """Provider that sleeps past timeout."""

    async def complete(self, system: str, user: str) -> str:
        await asyncio.sleep(10)
        return "too late"


class TestRunSingle:
    async def test_returns_response_on_success(self):
        provider = FakeProvider({"qa": "Found a bug"})
        key, text, success = await run_single(provider, "qa", SAMPLE_DIFF)
        assert key == "qa"
        assert text == "Found a bug"
        assert success is True

    async def test_returns_error_message_on_exception(self):
        provider = FailProvider()
        key, text, success = await run_single(provider, "qa", SAMPLE_DIFF)
        assert key == "qa"
        assert "⚠️" in text
        assert "QA" in text
        assert "API failure" in text
        assert success is False

    async def test_timeout_returns_specific_message(self, monkeypatch):
        monkeypatch.setattr("app.core.config.settings.agent_timeout", 1)
        provider = SlowProvider()
        key, text, success = await run_single(provider, "qa", SAMPLE_DIFF)
        assert key == "qa"
        assert "excedió" in text
        assert "tiempo límite" in text
        assert success is False


class TestRunAll:
    async def test_returns_all_keys(self, monkeypatch):
        monkeypatch.setattr(
            "app.agents.orchestrator.create_provider",
            lambda: FakeProvider({
                "qa": "qa result",
                "reviewer": "review result",
                "docs": "docs result",
            }),
        )
        results = await run_all(SAMPLE_DIFF)
        assert set(results.keys()) == {"qa", "reviewer", "docs"}
        assert results["qa"] == "qa result"
        assert results["reviewer"] == "review result"
        assert results["docs"] == "docs result"

    async def test_error_isolation(self, monkeypatch):
        """One agent fails, others still return results."""

        class MixedProvider(AIProvider):
            async def complete(self, system: str, user: str) -> str:
                cfg = AGENT_PROMPTS["docs"]
                if system == cfg["system"]:
                    msg = "Docs crash"
                    raise RuntimeError(msg)
                return "ok result"

        monkeypatch.setattr(
            "app.agents.orchestrator.create_provider",
            lambda: MixedProvider(),
        )
        results = await run_all(SAMPLE_DIFF)
        assert results["qa"] == "ok result"
        assert results["reviewer"] == "ok result"
        assert "⚠️" in results["docs"]
        assert "Docs crash" in results["docs"]


class TestFormatComment:
    def test_formats_all_sections(self):
        results = {
            "qa": "Bug found",
            "reviewer": "Refactor needed",
            "docs": "Add docstring",
        }
        output = format_comment(results)
        assert "## 🤖 Agent Team Review" in output
        assert "### 🐛 QA" in output
        assert "### 🔍 Code Review" in output
        assert "### 📚 Documentation" in output
        assert "Bug found" in output
        assert "Refactor needed" in output
        assert "Add docstring" in output

    def test_handles_empty_responses(self):
        results = {"qa": "", "reviewer": "", "docs": ""}
        output = format_comment(results)
        assert "### 🐛 QA" in output
        assert output.strip() != ""
