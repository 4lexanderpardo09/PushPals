import hashlib
import hmac

from app.core.config import settings


def verify_signature(payload: bytes, signature: str | None) -> bool:
    """Verify X-Hub-Signature-256 against WEBHOOK_SECRET."""
    if not signature:
        return False
    expected = "sha256=" + hmac.new(
        settings.webhook_secret.encode(), payload, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
