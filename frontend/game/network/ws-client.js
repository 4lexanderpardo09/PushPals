// WebSocket client — bridges backend events to game scene
window.PushPals = window.PushPals || {};
window.PushPals.WSClient = (function() {

  var ws = null;
  var reconnectTimer = null;
  var sceneRef = null;

  function connect(scene) {
    sceneRef = scene;
    var host = document.body.dataset.backendHost || 'localhost:8000';
    var proto = host.includes('localhost') || host.includes('127.0.0.1') ? 'ws:' : 'wss:';
    var url = proto + '//' + host + '/ws';

    ws = new WebSocket(url);
    ws.onopen = function() {
      updateBadge('on');
      if (sceneRef && sceneRef.onConnectionChange) {
        sceneRef.onConnectionChange(true);
      }
    };
    ws.onclose = function() {
      updateBadge('off');
      if (sceneRef && sceneRef.onConnectionChange) {
        sceneRef.onConnectionChange(false);
      }
      reconnectTimer = setTimeout(function() { connect(sceneRef); }, 3000);
    };
    ws.onerror = function() { ws.close(); };
    ws.onmessage = function(e) {
      try {
        var evt = JSON.parse(e.data);
        if (sceneRef && sceneRef.onAgentEvent) {
          sceneRef.onAgentEvent(evt);
        }
      } catch(err) {
        // ignore malformed messages
      }
    };
  }

  function disconnect() {
    if (reconnectTimer) clearTimeout(reconnectTimer);
    if (ws) ws.close();
    ws = null;
  }

  function updateBadge(state) {
    var badge = document.getElementById('connection-badge');
    if (!badge) return;
    badge.textContent = state === 'on' ? 'Connected' : 'Disconnected';
    badge.className = 'badge badge-' + state;
  }

  function updateAgentDot(agentKey, state) {
    var dot = document.getElementById('dot-' + agentKey);
    if (!dot) return;
    dot.className = 'dot ' + (state || 'idle');
  }

  return {
    connect: connect,
    disconnect: disconnect,
    updateAgentDot: updateAgentDot,
  };
})();
