import logging
import os
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.webhook import router as webhook_router
from app.api.ws import router as ws_router
from app.core.config import settings

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

app = FastAPI(title="PushPals", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(webhook_router)
app.include_router(ws_router)

_start_time = time.time()


@app.get("/health")
async def health():
    uptime_secs = int(time.time() - _start_time)
    return {
        "status": "ok",
        "version": "0.1.0",
        "uptime_secs": uptime_secs,
        "provider": settings.ai_provider,
        "model": settings.deepseek_model
        if settings.ai_provider in ("deepseek", "openai")
        else settings.anthropic_model,
    }


# Serve frontend static files
_frontend_dir = os.environ.get(
    "FRONTEND_DIR",
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "frontend"),
)
if os.path.isdir(_frontend_dir):
    app.mount("/", StaticFiles(directory=_frontend_dir, html=True), name="frontend")
