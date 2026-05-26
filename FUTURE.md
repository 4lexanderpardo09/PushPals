# Future: Pixel-Art Agent Visualization

Post-MVP feature: real-time agent status UI.

## Concept

Web interface (or VS Code extension) showing agent work status:

- **QA** — bug-hunter character, magnifying glass
- **Reviewer** — code inspector character, clipboard
- **Documenter** — scribe character, quill

## States

| State | Animation |
|-------|-----------|
| Idle | Standing, blinking |
| Working | Typing, gears spinning, sweat drops |
| Done | Thumbs up, checkmark, sparkle |
| Error | Head explode, red exclamation |

## Tech

- Canvas or CSS pixel-art sprites
- WebSocket or SSE for real-time status from backend
- Status stream: `agent_started` → `agent_completed` / `agent_failed`

## Backend Changes Needed

- WebSocket endpoint `/ws/status`
- Emit events per agent lifecycle
- Session tracking per webhook event
