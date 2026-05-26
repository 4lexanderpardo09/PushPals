# PushPals

Multi-agent code review bot. GitHub webhook → 3 AI agents (QA, Reviewer, Docs) → commit comment with feedback.

## How It Works

```
GitHub Push → POST /webhook → FastAPI
  → Get diff from GitHub API
  → 3 agents in parallel (QA, Reviewer, Docs)
  → Post combined comment to commit SHA
  → Return 200 instantly (background processing)
```

## Quick Start

```bash
git clone https://github.com/4lexanderpardo09/PushPals.git && cd PushPals
make setup
# Edita backend/.env con tus API keys
make run
```

## Prerequisites

- Python 3.11+
- GitHub token with `repo` scope (classic) or `Contents: read` + `Commit comments: write` (fine-grained)
- API key for your AI provider (DeepSeek, Anthropic, or OpenAI-compatible)

## Setup (manual)

```bash
# Virtualenv
python3 -m venv .venv && source .venv/bin/activate

# Install
pip install -r backend/requirements.txt

# Config
cp backend/.env.example backend/.env
# Edita backend/.env (ver variables abajo)
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AI_PROVIDER` | No | `deepseek` (default), `anthropic`, or `openai` |
| `DEEPSEEK_API_KEY` | Si provider=deepseek | DeepSeek API key |
| `DEEPSEEK_MODEL` | No | Default: `deepseek-chat` |
| `ANTHROPIC_API_KEY` | Si provider=anthropic | Anthropic API key |
| `ANTHROPIC_MODEL` | No | Default: `claude-3-5-sonnet-20240620` |
| `GITHUB_TOKEN` | Sí | GitHub personal access token |
| `WEBHOOK_SECRET` | Sí | Secret for HMAC webhook verification |

### Run

```bash
make run        # uvicorn con reload
# o manual:
cd backend && uvicorn app.main:app --reload --port 8000
```

### Expose with ngrok

```bash
ngrok http 8000
# → https://xxxx.ngrok-free.dev
```

### Configure GitHub Webhook

1. Repo → Settings → Webhooks → Add webhook
2. **Payload URL**: `https://tu-ngrok-url.ngrok-free.dev/webhook`
3. **Content type**: `application/json`
4. **Secret**: tu `WEBHOOK_SECRET`
5. **Events**: Just the push event
6. **Active**: ✅

Haz un push al repo y el feedback aparece como comentario en el commit.

## Docker

```bash
make docker-run
# o:
docker compose up --build
```

## Test

```bash
make test
# o:
cd backend && python -m pytest tests/ -v
```

## API

| Endpoint | Description |
|----------|-------------|
| `GET /` | Health check |
| `GET /health` | Status + version + uptime + provider info |
| `POST /webhook` | Receive GitHub push events |

## Provider System

Swap AI provider by changing `AI_PROVIDER` in `.env`:

```ini
AI_PROVIDER=deepseek    # DeepSeek (default)
AI_PROVIDER=anthropic   # Claude
AI_PROVIDER=openai      # OpenAI / compatible
```

Each provider uses its own env vars. See `.env.example`.

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Python 3.12+, FastAPI, uvicorn |
| HTTP | httpx (async) |
| AI | DeepSeek / Anthropic / OpenAI (abstraction layer) |
| Config | pydantic-settings (.env) |
| Deploy | Docker, docker-compose |

## Project Structure

```
pushpals/
├── backend/
│   ├── app/
│   │   ├── api/           # HTTP endpoints (webhook, ws)
│   │   ├── core/          # Config, security
│   │   ├── agents/        # AI orchestration, provider abstraction
│   │   ├── services/      # GitHub API client
│   │   ├── schemas/       # Pydantic models
│   │   └── main.py        # FastAPI app
│   ├── tests/             # pytest suite (24 tests)
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/              # Pixel-art UI (future)
├── docker-compose.yml
├── Makefile
└── CLAUDE.md              # Contexto para Claude Code
```

## Example Feedback

```
## 🤖 Agent Team Review

### 🐛 QA
Falta validar campos vacíos en formulario de login.
Sugerir test: test_login_empty_fields.

### 🔍 Code Review
Función authenticate_user demasiado larga (>50 líneas).
Considerar dividir en helper functions.

### 📚 Documentation
Agregar docstring a authenticate_user.
Añadir sección "Login" en README.
```

## Future

Frontend pixel-art agent visualization — see [FUTURE.md](FUTURE.md).
