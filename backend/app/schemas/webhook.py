from pydantic import BaseModel


class CommitInfo(BaseModel):
    full_name: str
    sha: str
    ref: str


class WebhookPayload(BaseModel):
    repository: dict | None = None
    commits: list[dict] | None = None
    ref: str | None = None
