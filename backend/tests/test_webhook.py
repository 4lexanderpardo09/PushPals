"""Test webhook endpoint."""

import hashlib
import hmac
import json

from tests.conftest import SAMPLE_PAYLOAD


def _sign(body: bytes) -> str:
    return "sha256=" + hmac.new(
        b"test-secret", body, hashlib.sha256
    ).hexdigest()


def _signed_request(payload: dict) -> tuple[dict, bytes]:
    """Return (headers, body) with correct HMAC signature on the exact bytes."""
    body = json.dumps(payload).encode()
    sig = _sign(body)
    headers = {
        "Content-Type": "application/json",
        "X-Hub-Signature-256": sig,
    }
    return headers, body


class TestWebhookRejection:
    def test_no_signature_returns_401(self, client):
        resp = client.post("/webhook", json={})
        assert resp.status_code == 401
        assert resp.json() == {"detail": "Invalid signature"}

    def test_bad_signature_returns_401(self, client):
        resp = client.post(
            "/webhook",
            json={"test": "data"},
            headers={
                "Content-Type": "application/json",
                "X-Hub-Signature-256": "sha256:badbadbad",
            },
        )
        assert resp.status_code == 401

    def test_no_commits_returns_200_ignored(self, client):
        payload = {"ref": "refs/heads/main", "repository": {}, "commits": []}
        headers, body = _signed_request(payload)
        resp = client.post("/webhook", content=body, headers=headers)
        assert resp.status_code == 200
        assert resp.json() == {"status": "ignored", "reason": "no commits"}

    def test_missing_commits_key_returns_200_ignored(self, client):
        payload = {"ref": "refs/heads/main", "repository": {}}
        headers, body = _signed_request(payload)
        resp = client.post("/webhook", content=body, headers=headers)
        assert resp.status_code == 200
        assert resp.json() == {"status": "ignored", "reason": "no commits"}


class TestWebhookAccept:
    def test_valid_webhook_returns_200_ok(self, client, monkeypatch):
        # Prevent background task from hitting real GitHub API
        async def mock_process(*args):
            pass

        monkeypatch.setattr("app.api.webhook._process_event", mock_process)

        headers, body = _signed_request(SAMPLE_PAYLOAD)
        resp = client.post("/webhook", content=body, headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["status"] == "ok"
        assert data["commit"] == "abc123def456"

    def test_different_branch_extracts_correctly(self, client, monkeypatch):
        async def mock_process(*args):
            pass

        monkeypatch.setattr("app.api.webhook._process_event", mock_process)

        payload = {**SAMPLE_PAYLOAD, "ref": "refs/heads/develop"}
        headers, body = _signed_request(payload)
        resp = client.post("/webhook", content=body, headers=headers)
        assert resp.status_code == 200
        assert resp.json()["status"] == "ok"
