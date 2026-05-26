import logging

from fastapi import FastAPI

from app.api.webhook import router as webhook_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

app = FastAPI(title="PushPals", version="0.1.0")
app.include_router(webhook_router)


@app.get("/")
async def root():
    return {"status": "ok", "service": "PushPals"}
