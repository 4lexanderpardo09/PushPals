# PushPals 🤖

Multi-agent code review bot. GitHub webhook → 3 Claude agents (QA, Reviewer, Documenter) → commit comment with feedback.

## How It Works

1. Dev pushes code to GitHub
2. GitHub sends webhook to PushPals
3. Backend fetches commit diff from GitHub API
4. 3 Claude agents review the diff **in parallel**
5. Combined feedback posted as comment on the commit

```
┌─────────┐    webhook     ┌───────────┐    ┌──────────────┐
│  GitHub  │ ────────────→ │ PushPals  │ → │ Get diff     │
│  Push    │    POST /     │ (FastAPI) │    │ from GitHub  │
└─────────┘    webhook     └───────────┘    └──────┬───────┘
                         return 200 instantly      │
                         ┌─────────────────────────▼────────┐
                         │  Claude Agents (parallel)        │
                         │  ┌──────┐ ┌──────┐ ┌──────────┐ │
                         │  │  QA  │ │Review│ │ Document │ │
                         │  └──┬───┘ └──┬───┘ └────┬─────┘ │
                         └─────┼────────┼───────────┼───────┘
                               └────────┼───────────┘
                                        ▼
                               ┌────────────────┐
                               │ Post comment   │
                               │ to commit SHA  │
                               └────────────────┘
```

## Requirements

- Python 3.11+
- GitHub account + personal access token
- Anthropic API key
- ngrok (for local testing)

## Setup

```bash
# Clone
git clone <repo> && cd pushpals

# Create virtualenv
python -m venv .venv && source .venv/bin/activate

# Install deps
cd backend && pip install -r requirements.txt

# Configure env
cp .env.example .env
# Edit .env with your keys (see below)
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude |
| `GITHUB_TOKEN` | GitHub PAT with repo scope |
| `WEBHOOK_SECRET` | Secret for verifying webhook signatures |

### Run Locally

```bash
cd backend && uvicorn app.main:app --reload --port 8000
```

### Expose with ngrok

```bash
ngrok http 8000
# → https://xxxx.ngrok.io
```

### Configure GitHub Webhook

1. Repo → Settings → Webhooks → Add webhook
2. Payload URL: `https://xxxx.ngrok.io/webhook`
3. Content type: `application/json`
4. Secret: same as `WEBHOOK_SECRET`
5. Events: **Just the push event**
6. Active: ✅

## API

### `POST /webhook`

Receives GitHub push events. Returns 200 immediately.

Background: fetches diff, runs agents, posts comment.

### `GET /`

Health check. Returns `{"status": "ok"}`.

## Example Feedback

```
## 🤖 Agent Team Review

### 🐛 QA
Falta validar campos vacíos en formulario de login.
Sugerir test: `test_login_empty_fields`.

### 🔍 Code Review
Función `authenticate_user` demasiado larga (>50 líneas).
Considerar dividir en helper functions.

### 📚 Documentation
Agregar docstring a `authenticate_user`.
Añadir sección "Login" en README.
```

## Future

Frontend pixel-art visualization planned — see [FUTURE.md](FUTURE.md).
# PushPals
