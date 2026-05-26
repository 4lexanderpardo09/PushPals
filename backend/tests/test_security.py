"""Test webhook HMAC-SHA256 signature verification."""

import hashlib
import hmac

from app.core.security import verify_signature


def _sign(payload: bytes, secret: str = "test-secret") -> str:
    return "sha256=" + hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()


class TestVerifySignature:
    def test_valid_signature(self):
        payload = b'{"test": "data"}'
        sig = _sign(payload)
        assert verify_signature(payload, sig) is True

    def test_invalid_signature(self):
        payload = b'{"test": "data"}'
        assert verify_signature(payload, "sha256:wrongsig") is False

    def test_wrong_secret(self):
        payload = b'{"test": "data"}'
        sig = _sign(payload, secret="other-secret")
        assert verify_signature(payload, sig) is False

    def test_missing_signature(self):
        payload = b'{"test": "data"}'
        assert verify_signature(payload, None) is False

    def test_empty_signature(self):
        payload = b'{"test": "data"}'
        assert verify_signature(payload, "") is False

    def test_signature_wrong_prefix(self):
        payload = b'{"test": "data"}'
        assert verify_signature(payload, "md5:abc123") is False
