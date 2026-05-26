import logging

from fastapi import APIRouter, BackgroundTasks, HTTPException, Request

from app.agents.orchestrator import format_comment, run_all
from app.core.security import verify_signature
from app.services.github import get_commit_diff, post_commit_comment

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/webhook")
async def handle_webhook(request: Request, background_tasks: BackgroundTasks):
    """Receive GitHub push event. Return 200 instantly, process in background."""
    payload = await request.body()
    signature = request.headers.get("X-Hub-Signature-256")

    if not verify_signature(payload, signature):
        raise HTTPException(status_code=401, detail="Invalid signature")

    body = await request.json()
    repo = body.get("repository") or {}
    commits = body.get("commits") or []
    ref = body.get("ref") or ""

    if not commits:
        logger.info("No commits in push, ignoring")
        return {"status": "ignored", "reason": "no commits"}

    full_name = repo.get("full_name", "")
    sha = commits[0].get("id", "")
    branch = ref.replace("refs/heads/", "")

    logger.info("Event received: %s %s (%s)", full_name, sha, branch)
    background_tasks.add_task(_process_event, full_name, sha)
    return {"status": "ok", "commit": sha}


async def _process_event(full_name: str, sha: str) -> None:
    """Fetch diff, run agents, post comment."""
    logger.info("Fetching diff %s %s", full_name, sha)
    diff = await get_commit_diff(full_name, sha)

    if not diff:
        logger.info("No diff for %s %s, skipping", full_name, sha)
        return

    logger.info("Running agents %s %s", full_name, sha)
    results = await run_all(diff)

    comment = format_comment(results)
    logger.info("Posting comment %s %s", full_name, sha)
    try:
        await post_commit_comment(full_name, sha, comment)
        logger.info("Comment posted %s %s", full_name, sha)
    except Exception as e:
        logger.error("Failed to post comment %s %s: %s", full_name, sha, e)
