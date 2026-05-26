import logging
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.webhook import router as webhook_router
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

_start_time = time.time()


@app.get("/")
async def root():
    return {"status": "ok", "service": "PushPals"}


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
