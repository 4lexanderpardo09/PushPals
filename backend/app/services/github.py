import httpx

from app.core.config import settings

GITHUB_API = "https://api.github.com"
HEADERS = {
    "Authorization": f"Bearer {settings.github_token}",
    "User-Agent": "PushPals",
}


async def get_commit_diff(full_name: str, sha: str) -> str | None:
    """Fetch commit diff from GitHub API. Returns None if no changes."""
    url = f"{GITHUB_API}/repos/{full_name}/commits/{sha}"
    headers = {**HEADERS, "Accept": "application/vnd.github.v3.diff"}
    async with httpx.AsyncClient() as client:
        resp = await client.get(url, headers=headers)
        if resp.status_code == 204:
            return None
        resp.raise_for_status()
        return resp.text


async def post_commit_comment(full_name: str, sha: str, body: str) -> None:
    """Post a comment on a specific commit."""
    url = f"{GITHUB_API}/repos/{full_name}/commits/{sha}/comments"
    headers = {**HEADERS, "Accept": "application/vnd.github.v3+json"}
    payload = {"body": body}
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, headers=headers, json=payload)
        resp.raise_for_status()
