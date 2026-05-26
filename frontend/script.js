// Pixel art sprites for each agent
const SPRITES = {
  qa: {
    colors: {
      skin: '#ffcc88',
      hat: '#ff6644',
      body: '#44aaff',
      glass: '#88ccff',
      dark: '#224466',
      eye: '#222',
      shoe: '#553322',
    },
    // 18x24 pixel map: [row][col] = color key or '' for transparent
    // Magnifying glass agent
    data: [
      ['','','','','hat','hat','hat','hat','','','','','','','','','',''],
      ['','','hat','hat','hat','hat','hat','hat','hat','hat','','','','','','','',''],
      ['','','','','skin','skin','skin','skin','','','','','','','','','',''],
      ['','','','skin','skin','skin','skin','skin','skin','','','','','glass','glass','glass','glass','',''],
      ['','','','','skin','eye','skin','eye','skin','','','','glass','','','','glass',''],
      ['','','','','skin','skin','skin','skin','','','','','glass','','','','glass',''],
      ['','','','','','skin','skin','','','','','','','glass','glass','glass','glass',''],
      ['','','','','skin','body','body','skin','','','','','','','','','',''],
      ['','','','skin','body','body','body','body','skin','','','','','','','','',''],
      ['','','','body','body','body','body','body','body','','','','','','','','',''],
      ['','','','','body','body','body','body','','','','','','','','','',''],
      ['','','','','body','body','body','body','','','','','','','','','',''],
      ['','','','skin','','body','body','','skin','','','','','','','','',''],
      ['','','skin','','','body','body','','','skin','','','','','','','',''],
      ['','','','','','body','body','','','','','','','','','','',''],
      ['','','','','','body','body','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
    ],
  },
  reviewer: {
    colors: {
      skin: '#ffcc88',
      hair: '#885522',
      body: '#66dd88',
      tie: '#ff4444',
      clipboard: '#dddddd',
      eye: '#222',
      glass: '#aaccff',
      shoe: '#553322',
    },
    // Clipboard agent
    data: [
      ['','','','','hair','hair','hair','hair','','','','','','','','','',''],
      ['','','','hair','hair','hair','hair','hair','hair','','','','','','','','',''],
      ['','','','glass','skin','glass','skin','glass','','','','','','','','','',''],
      ['','','','','skin','eye','skin','eye','skin','','','','','','','','',''],
      ['','','','','skin','skin','skin','skin','skin','','','','','','','','',''],
      ['','','','','','skin','skin','','','','','','','','','','',''],
      ['','','','','','skin','skin','','','','','','','','','','',''],
      ['','','','','','skin','skin','','','clip','clip','clip','clip','clip','','','',''],
      ['','','','','skin','body','body','skin','','clip','clip','clip','clip','clip','clip','','',''],
      ['','','','skin','body','body','body','body','skin','','clip','clip','clip','clip','clip','','',''],
      ['','','','body','body','body','body','body','body','','clip','clip','clip','clip','clip','','',''],
      ['','','','tie','body','body','body','body','tie','','','clip','clip','clip','','','',''],
      ['','','','','body','body','body','body','','','','','','','','','',''],
      ['','','','skin','','body','body','','skin','','','','','','','','',''],
      ['','','skin','','','body','body','','','skin','','','','','','','',''],
      ['','','','','','body','body','','','','','','','','','','',''],
      ['','','','','','body','body','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
    ],
  },
  docs: {
    colors: {
      skin: '#ffcc88',
      hair: '#886633',
      body: '#ff88aa',
      scroll: '#ffddaa',
      quill: '#dddddd',
      eye: '#222',
      ink: '#4466aa',
      shoe: '#553322',
    },
    // Quill/scroll agent
    data: [
      ['','','','','hair','hair','hair','hair','','','','','','','','','',''],
      ['','','','hair','hair','hair','hair','hair','hair','','','','','','','','',''],
      ['','','','','skin','skin','skin','skin','','','','','','','','','',''],
      ['','','','','skin','eye','skin','eye','skin','','','','','','','','',''],
      ['','','','','skin','skin','skin','skin','skin','','','','','','','','',''],
      ['','','','','','skin','skin','','','','','','','','','','',''],
      ['','','','','','skin','skin','','','','','','','','','','',''],
      ['','','','','skin','body','body','skin','','','','','','','','','',''],
      ['','','','skin','body','body','body','body','body','','','','','','','','',''],
      ['','','','','body','body','body','body','body','','','','','','','','',''],
      ['','','','','','body','body','body','','','','','','','','','',''],
      ['','','','','','body','body','body','','','','','','scroll','scroll','','',''],
      ['','','','','','body','body','body','','','','','scroll','scroll','scroll','','',''],
      ['','','','','','body','body','body','','','','','','scroll','scroll','','',''],
      ['','','','','','body','body','body','','','','','','','','','',''],
      ['','','','','','body','body','body','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','',''],
    ],
  },
};

// Canvas drawing
function drawSprite(canvas, agentKey, pixelOffset = 0) {
  const sprite = SPRITES[agentKey];
  if (!sprite) return;
  const ctx = canvas.getContext('2d');
  const px = 3; // pixel size
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < sprite.data.length; row++) {
    for (let col = 0; col < sprite.data[row].length; col++) {
      const colorKey = sprite.data[row][col];
      if (colorKey && sprite.colors[colorKey]) {
        const y = row * px + Math.round(Math.sin(pixelOffset + row * 0.3 + col * 0.2) * (pixelOffset > 0 ? 2 : 0));
        const x = col * px;
        ctx.fillStyle = sprite.colors[colorKey];
        ctx.fillRect(x, y, px, px);
      }
    }
  }
}

// animation loop per agent
const animFrames = { qa: 0, reviewer: 0, docs: 0 };
const agentStates = { qa: 'idle', reviewer: 'idle', docs: 'idle' };
let eventLog = [];

function animate() {
  for (const key of ['qa', 'reviewer', 'docs']) {
    const canvas = document.getElementById(`sprite-${key}`);
    if (!canvas) continue;
    animFrames[key] += agentStates[key] === 'running' ? 0.1 : 0.02;
    drawSprite(canvas, key, agentStates[key] === 'running' ? animFrames[key] : 0);
  }
  requestAnimationFrame(animate);
}

function setAgentState(agentKey, state, message = '') {
  agentStates[agentKey] = state;
  const card = document.querySelector(`.card[data-agent="${agentKey}"]`);
  if (!card) return;
  card.dataset.state = state;

  const statusEl = document.getElementById(`status-${agentKey}`);
  const timerEl = document.getElementById(`timer-${agentKey}`);

  const labels = {
    idle: 'Esperando...',
    running: 'Trabajando...',
    done: '✅ Completo',
    error: '❌ Error',
  };
  if (statusEl) statusEl.textContent = labels[state] || message;

  if (state === 'running') {
    const start = Date.now();
    const timer = setInterval(() => {
      if (agentStates[agentKey] !== 'running') { clearInterval(timer); return; }
      const sec = ((Date.now() - start) / 1000).toFixed(1);
      if (timerEl) timerEl.textContent = `${sec}s`;
    }, 100);
  }

  if (state === 'done') {
    if (message) { timerEl.textContent = message; }
  }
  if (state === 'error' || state === 'idle') {
    if (timerEl) timerEl.textContent = '';
  }
}

function addLog(agentKey, state, message) {
  const log = document.getElementById('log');
  if (!log) return;
  const entry = document.createElement('div');
  entry.className = `log-entry log-${state}`;
  const icons = { qa: '🐛', reviewer: '🔍', docs: '📚', system: '🤖' };
  const prefix = icons[agentKey] || '';
  entry.textContent = `${prefix} ${message}`;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
} 

// Websocket
function connectWS() {
  const backendHost = document.body.dataset.backendHost || location.host;
  const proto = backendHost.includes('localhost') || backendHost.includes('127.0.0.1') ? 'ws:' : 'wss:';
  const ws = new WebSocket(`${proto}//${backendHost}/ws`);
  const badge = document.getElementById('connection-badge');

  ws.onopen = () => {
    badge.textContent = '🟢 Connected';
    badge.className = 'badge badge-on';
    addLog('system', 'info', 'Conectado al servidor');
  };

  ws.onclose = () => {
    badge.textContent = '🔴 Disconnected';
    badge.className = 'badge badge-off';
    addLog('system', 'error', 'Desconectado. Reconectando en 3s...');
    setTimeout(connectWS, 3000);
  };

  ws.onerror = () => { ws.close(); };

  ws.onmessage = (e) => {
    const evt = JSON.parse(e.data);
    const { event_id, agent_key, agent_name, state, message } = evt;

    if (agent_key === 'system') {
      if (state === 'complete') {
        addLog('system', 'complete', `✅ Revisión completa (${event_id})`);
      }
      return;
    }

    const displayState = state === 'running' ? 'running'
      : state === 'done' ? 'done'
      : state === 'error' ? 'error'
      : 'idle';

    setAgentState(agent_key, displayState, message);
    addLog(agent_key, displayState, `[${event_id}] ${agent_name}: ${displayState}`);
    if (message) addLog(agent_key, displayState, message);
  };
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  for (const key of ['qa', 'reviewer', 'docs']) {
    drawSprite(document.getElementById(`sprite-${key}`), key, 0);
    setAgentState(key, 'idle');
  }
  animate();
  connectWS();
});
