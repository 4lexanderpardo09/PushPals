"""Test GitHub API client with mocked HTTP calls."""

from unittest.mock import patch

import httpx
import pytest


@pytest.fixture(autouse=True)
def mock_env(monkeypatch):
    """Ensure we use test token in HEADERS."""
    monkeypatch.setattr("app.services.github.HEADERS", {
        "Authorization": "Bearer test-token",
        "User-Agent": "PushPals",
    })


def _make_response(status: int, text: str = "", request: httpx.Request | None = None) -> httpx.Response:
    """Build httpx.Response with _request set so raise_for_status() works."""
    if request is None:
        request = httpx.Request("GET", "https://api.github.com/test")
    resp = httpx.Response(status, text=text, request=request)
    return resp


class TestGetCommitDiff:
    async def test_returns_diff_on_200(self):
        req = httpx.Request("GET", "https://api.github.com/repos/user/repo/commits/abc")
        mock_resp = _make_response(200, text="diff --git a/file.py b/file.py", request=req)

        with patch("app.services.github.httpx.AsyncClient") as mock_client:
            mock_client.return_value.__aenter__.return_value.get.return_value = mock_resp

            from app.services.github import get_commit_diff

            result = await get_commit_diff("user/repo", "abc123")
            assert result == "diff --git a/file.py b/file.py"

    async def test_returns_none_on_204(self):
        req = httpx.Request("GET", "https://api.github.com/repos/user/repo/commits/abc")
        mock_resp = _make_response(204, request=req)

        with patch("app.services.github.httpx.AsyncClient") as mock_client:
            mock_client.return_value.__aenter__.return_value.get.return_value = mock_resp

            from app.services.github import get_commit_diff

            result = await get_commit_diff("user/repo", "abc123")
            assert result is None

    async def test_raises_on_404(self):
        req = httpx.Request("GET", "https://api.github.com/repos/user/repo/commits/abc")
        mock_resp = _make_response(404, request=req)

        with patch("app.services.github.httpx.AsyncClient") as mock_client:
            mock_client.return_value.__aenter__.return_value.get.return_value = mock_resp

            from app.services.github import get_commit_diff

            with pytest.raises(httpx.HTTPStatusError):
                await get_commit_diff("user/repo", "abc123")


class TestPostCommitComment:
    async def test_posts_successfully(self):
        req = httpx.Request("POST", "https://api.github.com/repos/user/repo/commits/abc/comments")
        mock_resp = _make_response(201, request=req)

        with patch("app.services.github.httpx.AsyncClient") as mock_client:
            mock_client.return_value.__aenter__.return_value.post.return_value = mock_resp

            from app.services.github import post_commit_comment

            await post_commit_comment("user/repo", "abc123", "body text")

    async def test_raises_on_failure(self):
        req = httpx.Request("POST", "https://api.github.com/repos/user/repo/commits/abc/comments")
        mock_resp = _make_response(403, request=req)

        with patch("app.services.github.httpx.AsyncClient") as mock_client:
            mock_client.return_value.__aenter__.return_value.post.return_value = mock_resp

            from app.services.github import post_commit_comment

            with pytest.raises(httpx.HTTPStatusError):
                await post_commit_comment("user/repo", "abc123", "body")
