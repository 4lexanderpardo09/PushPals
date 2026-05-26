# PushPals — DevTeam Agent

FastAPI backend that receives GitHub webhooks, runs multi-agent code review via Anthropic Claude, and posts feedback as commit comments.

## Architecture

```
GitHub Push → Webhook POST /webhook → FastAPI
  → Get commit diff from GitHub API
  → Run 3 Claude agents in parallel (QA, Reviewer, Docs)
  → Post combined comment to commit
  → Return 200 immediately (background processing)
```

## Tech Stack

- **Runtime**: Python 3.11+, FastAPI, uvicorn
- **HTTP client**: httpx (async)
- **AI**: multi-provider via abstraction layer (DeepSeek/Anthropic/OpenAI-compatible)
- **Config**: pydantic-settings (.env)
- **Deploy**: ngrok for local dev tunnel

## Project Structure

```
pushpals/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── webhook.py      # POST /webhook handler
│   │   │   └── ws.py           # WebSocket /ws/status (placeholder)
│   │   ├── core/
│   │   │   ├── config.py       # pydantic-settings env loader
│   │   │   └── security.py     # HMAC-SHA256 signature verify
│   │   ├── agents/
│   │   │   ├── orchestrator.py # Parallel agent orchestration
│   │   │   ├── provider.py     # AI provider abstraction (factory pattern)
│   │   │   ├── prompts.py      # System prompts for each agent
│   │   │   └── models.py       # AgentResult pydantic model
│   │   ├── services/
│   │   │   └── github.py       # GitHub API calls (diff, comment)
│   │   ├── schemas/
│   │   │   └── webhook.py      # WebhookPayload, CommitInfo models
│   │   └── main.py             # FastAPI app, startup, health
│   ├── requirements.txt
│   └── .env.example
├── frontend/                    # Pixel-art UI (future)
├── CLAUDE.md
├── README.md
└── FUTURE.md
```

## Conventions

- **Async first**: use `async def`, httpx async client, asyncio.gather
- **Error isolation**: per-agent errors must not block other agents
- **Validation**: webhook signature validated via `X-Hub-Signature-256`
- **Logging**: structured logging per step (event received, agent started, agent done, comment posted)
- **Env vars**: all secrets via environment, never hardcoded
- **Background tasks**: use `BackgroundTasks` from FastAPI for agent orchestration

## Agent Roles

| Agent | Focus |
|-------|-------|
| QA | Bug hunting, missing edge cases, test gaps |
| Code Reviewer | Code quality, structure, performance, patterns |
| Documenter | Missing docs, unclear naming, README gaps |

## Key Decisions

- No DB needed for MVP — stateless, webhook-driven
- Background processing: return 200 immediately, agents run async after response
- Parallel agent calls via `asyncio.gather` with per-task timeout (120s)
- Comment posted to commit SHA, not PR
- **AI provider abstraction**: switch via `AI_PROVIDER` env var (deepseek/anthropic/openai). Each provider implements `complete(system, user) -> str` interface.
- Timeout handled at orchestrator level via `asyncio.wait_for`, not inside provider — ensures consistent timeout behavior across providers.

## Future

Frontend pixel-art agent visualization planned (see FUTURE.md).
