"""Shared fixtures and test setup."""

import pytest
from fastapi.testclient import TestClient


SAMPLE_DIFF = """diff --git a/app/main.py b/app/main.py
index abc..def 100644
--- a/app/main.py
+++ b/app/main.py
@@ -1,3 +1,4 @@
+def hello():
+    print("hello world")
"""

SAMPLE_PAYLOAD = {
    "ref": "refs/heads/main",
    "repository": {"full_name": "testuser/testrepo"},
    "commits": [{"id": "abc123def456"}],
}


@pytest.fixture(autouse=True)
def override_settings(monkeypatch):
    """Override all env-dependent settings so tests don't touch real env."""
    monkeypatch.setattr("app.core.config.settings.webhook_secret", "test-secret")
    monkeypatch.setattr("app.core.config.settings.github_token", "test-token")
    monkeypatch.setattr("app.core.config.settings.deepseek_api_key", "test-key")
    monkeypatch.setattr("app.core.config.settings.anthropic_api_key", "test-key")
    monkeypatch.setattr("app.core.config.settings.ai_provider", "deepseek")
    monkeypatch.setattr("app.core.config.settings.agent_timeout", 5)


@pytest.fixture
def client():
    """FastAPI TestClient with default settings override."""
    from app.main import app

    return TestClient(app)
