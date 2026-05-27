window.PushPals = window.PushPals || {};

PushPals.MainScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function() {
    Phaser.Scene.call(this, { key: 'MainScene' });
    this.agentStates = {};
    this.agentSprites = {};
    this.agentBaseY = {};
    this.liveFeedLines = [];
  },

  create: function() {
    var iso = PushPals.Iso;
    var room = PushPals.Room;
    var g = this.add.graphics();

    // 1. Floor and walls
    for (var ty = 0; ty < room.ROWS; ty++) {
      for (var tx = 0; tx < room.COLS; tx++) {
        var cell = room.MAP[ty][tx];
        if (cell === room.T.FLOOR) drawDiamond(g, tx, ty, 0x1a1a33, 0x0f0f24);
        else if (cell === room.T.WALL) drawBlock(g, tx, ty, 0x222244, 0x2a2a55, 0x1a1a38);
      }
    }

    // 2. Cables from server to desks
    this.cableG = this.add.graphics();
    this.cables = room.CABLES;
    this.cablePhase = Math.random() * Math.PI * 2;

    // 3. Place objects and track agents
    this.placeObjects(g);

    // 4. LIVE FEED (dynamic text instead of static sign)
    var liveFeedPos = iso.tileToScreenZ(2, 6, 3);
    this.liveFeedText = this.add.text(liveFeedPos.x, liveFeedPos.y + iso.HALF_H,
      'LIVE FEED\n---', {
      fontFamily: 'monospace',
      fontSize: '6px',
      color: '#44ddff',
      align: 'left',
      lineSpacing: 2,
    });
    this.liveFeedText.setOrigin(0.5, 0.9);
    this.liveFeedText.setDepth(40);

    // 5. Title
    this.add.text(480, 10, 'PUSHPALS — AI CODE REVIEW AGENTS', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#00ff88',
    }).setOrigin(0.5, 0);

    // 6. Connect WebSocket
    PushPals.WSClient.connect(this);
  },

  // Event handler called by WSClient
  onAgentEvent: function(evt) {
    var agentKey = evt.agent_key;
    var state = evt.state;
    var message = evt.message || '';

    if (agentKey === 'system') {
      if (state === 'complete') {
        this.addLiveFeed('SYSTEM', 'Review complete');
      }
      return;
    }

    var displayState = state === 'running' ? 'running'
      : state === 'done' ? 'done'
      : state === 'error' ? 'error'
      : 'idle';

    this.agentStates[agentKey] = displayState;
    PushPals.WSClient.updateAgentDot(agentKey, displayState);
    this.addLiveFeed(agentKey.toUpperCase(), displayState + (message ? ': ' + message : ''));
  },

  onConnectionChange: function(connected) {
    if (connected) {
      this.addLiveFeed('SYSTEM', 'WebSocket connected');
    } else {
      this.addLiveFeed('SYSTEM', 'Disconnected — retrying...');
    }
  },

  addLiveFeed: function(source, text) {
    var ts = new Date().toLocaleTimeString();
    this.liveFeedLines.unshift(ts + ' ' + source + ' ' + text);
    if (this.liveFeedLines.length > 6) this.liveFeedLines.pop();
    if (this.liveFeedText) {
      this.liveFeedText.setText(this.liveFeedLines.join('\n'));
    }
  },

  // Called each frame by Phaser
  update: function(time) {
    var t = time * 0.001;
    this.drawCables(t);
    this.animateAgents(t);
  },

  drawCables: function(t) {
    var g = this.cableG;
    if (!g || !this.cables) return;
    g.clear();
    var iso = PushPals.Iso;

    for (var i = 0; i < this.cables.length; i++) {
      var c = this.cables[i];
      var from = iso.tileToScreen(c.from.tx, c.from.ty);
      var to = iso.tileToScreen(c.to.tx, c.to.ty);

      // Cable endpoints
      var x1 = from.x, y1 = from.y + iso.HALF_H;
      var x2 = to.x, y2 = to.y + iso.HALF_H;

      // Bezier control point
      var cy = (y1 + y2) / 2 + 20 + 10 * Math.sin(t * 0.5 + i);

      // Draw cable body
      var alpha = 0.25 + 0.15 * Math.sin(t + this.cablePhase + i);
      g.lineStyle(1, c.color, alpha);
      g.beginPath();
      g.moveTo(x1, y1);
      g.lineTo((x1+x2)/2, cy);
      g.lineTo(x2, y2);
      g.strokePath();

      // Glow overlay
      g.lineStyle(3, c.color, alpha * 0.3);
      g.beginPath();
      g.moveTo(x1, y1);
      g.lineTo((x1+x2)/2, cy);
      g.lineTo(x2, y2);
      g.strokePath();
    }
  },

  animateAgents: function(t) {
    for (var key in this.agentSprites) {
      var sprite = this.agentSprites[key];
      var baseY = this.agentBaseY[key] || sprite.y;
      var state = this.agentStates[key] || 'idle';

      switch (state) {
        case 'idle':
          sprite.y = baseY + Math.sin(t * 2) * 1.5;
          sprite.setAlpha(0.9 + 0.1 * Math.sin(t * 1.5));
          break;
        case 'running':
          sprite.y = baseY + Math.sin(t * 8) * 1;
          sprite.x = sprite.x + Math.sin(t * 12) * 0.3; // typing vibration
          sprite.setAlpha(1);
          break;
        case 'done':
          sprite.y = baseY - Math.abs(Math.sin(t * 3)) * 3;
          sprite.setAlpha(1);
          break;
        case 'error':
          sprite.x = sprite.x + (Math.random() - 0.5) * 2;
          break;
      }
    }
  },

  // Place all objects from room layout
  placeObjects: function(g) {
    var iso = PushPals.Iso;
    var room = PushPals.Room;
    var scene = this;

    var sorted = room.OBJECTS.slice().sort(function(a, b) {
      return (a.ty + a.tx + a.tz) - (b.ty + b.tx + b.tz);
    });

    for (var i = 0; i < sorted.length; i++) {
      var obj = sorted[i];
      var img;

      switch (obj.key) {
        case 'carpet':
          drawCarpet(g, obj.tx, obj.ty, '#1a2244', '#00ff88');
          break;
        case 'central_server':
          drawPlatform(g, obj.tx, obj.ty, 0x2a2a55, 0x1a1a38);
          placeTexture(this, 'server', obj.tx, obj.ty, obj.tz, 0.5, 0.85);
          break;
        case 'qa_desk':
        case 'reviewer_desk':
        case 'docs_desk':
          placeTexture(this, 'desk', obj.tx, obj.ty, obj.tz, 0.5, 0.9);
          break;
        case 'qa_monitor':
        case 'reviewer_monitor':
        case 'docs_monitor':
          placeTexture(this, 'monitor', obj.tx, obj.ty, obj.tz, 0.5, 0.9);
          break;
        case 'qa_agent':
        case 'reviewer_agent':
        case 'docs_agent':
          img = placeTexture(this, obj.key, obj.tx, obj.ty, obj.tz || 0, 0.5, 0.85);
          this.agentSprites[obj.key] = img;
          this.agentBaseY[obj.key] = img.y;
          this.agentStates[obj.key] = 'idle';
          break;
        case 'pushpals_sign':
          img = placeTexture(this, 'pushpals_sign', obj.tx, obj.ty, obj.tz, 0.5, 0.9);
          addGlow(this, img, '#00ff88', 3);
          break;
        case 'qa_sign':
          img = placeTexture(this, 'qa_sign', obj.tx, obj.ty, obj.tz, 0.5, 0.9);
          addGlow(this, img, '#ff6644', 2);
          break;
        case 'reviewer_sign':
          img = placeTexture(this, 'reviewer_sign', obj.tx, obj.ty, obj.tz, 0.5, 0.9);
          addGlow(this, img, '#66dd88', 2);
          break;
        case 'docs_sign':
          img = placeTexture(this, 'docs_sign', obj.tx, obj.ty, obj.tz, 0.5, 0.9);
          addGlow(this, img, '#ff88aa', 2);
          break;
        case 'filing_cabinet':
          placeTexture(this, 'cabinet', obj.tx, obj.ty, obj.tz, 0.5, 0.9);
          break;
        case 'big_plant':
          placeTexture(this, 'plant', obj.tx, obj.ty, obj.tz, 0.5, 0.9);
          break;
        case 'carpet_text':
          var cp = iso.tileToScreen(obj.tx, obj.ty);
          this.add.text(cp.x, cp.y + iso.HALF_H + 6, 'SHIP · REVIEW · IMPROVE', {
            fontFamily: 'monospace', fontSize: '5px', color: '#335566'
          }).setOrigin(0.5).setDepth(50).setAlpha(0.6);
          break;
        case 'trash_bin':
        case 'cardboard_box':
        case 'framed_picture':
          placeTexture(this, obj.key, obj.tx, obj.ty, obj.tz || 0, 0.5, 0.9);
          break;
        default:
          if (this.textures.exists(obj.key)) {
            placeTexture(this, obj.key, obj.tx, obj.ty, obj.tz, 0.5, 0.9);
          }
          break;
      }
    }
  },
});

// --- Helper functions ---

function placeTexture(scene, key, tx, ty, tz, ox, oy) {
  var iso = PushPals.Iso;
  var pos = iso.tileToScreenZ(tx, ty, tz || 0);
  var x = pos.x;
  var y = pos.y + iso.HALF_H;
  var img = scene.add.image(x, y, key);
  img.setOrigin(ox || 0.5, oy || 1);
  img.setDepth(ty + tx + (tz || 0) * 10);
  return img;
}

function drawDiamond(g, tx, ty, color, edgeColor) {
  var iso = PushPals.Iso;
  var pos = iso.tileToScreen(tx, ty);
  var x = pos.x, y = pos.y;
  var hw = iso.HALF_W, hh = iso.HALF_H;
  g.fillStyle(color, 1);
  g.beginPath();
  g.moveTo(x, y); g.lineTo(x - hw, y + hh);
  g.lineTo(x, y + hh * 2); g.lineTo(x + hw, y + hh);
  g.closePath(); g.fillPath();
  g.lineStyle(1, edgeColor, 0.7);
  g.strokePath();
}

function drawBlock(g, tx, ty, topColor, leftColor, rightColor) {
  var iso = PushPals.Iso;
  var pos = iso.tileToScreen(tx, ty);
  var x = pos.x, y = pos.y;
  var hw = iso.HALF_W, hh = iso.HALF_H, bh = hh * 0.4;
  g.fillStyle(topColor, 1);
  g.beginPath();
  g.moveTo(x, y); g.lineTo(x - hw, y + hh);
  g.lineTo(x, y + hh * 2); g.lineTo(x + hw, y + hh);
  g.closePath(); g.fillPath();
  g.fillStyle(leftColor, 1);
  g.beginPath();
  g.moveTo(x - hw, y + hh); g.lineTo(x, y + hh * 2);
  g.lineTo(x, y + hh * 2 + bh); g.lineTo(x - hw, y + hh + bh);
  g.closePath(); g.fillPath();
  g.fillStyle(rightColor, 1);
  g.beginPath();
  g.moveTo(x + hw, y + hh); g.lineTo(x, y + hh * 2);
  g.lineTo(x, y + hh * 2 + bh); g.lineTo(x + hw, y + hh + bh);
  g.closePath(); g.fillPath();
}

function drawPlatform(g, tx, ty, leftColor, rightColor) {
  var iso = PushPals.Iso;
  var pos = iso.tileToScreen(tx, ty);
  var x = pos.x, y = pos.y;
  var hw = iso.HALF_W, hh = iso.HALF_H, ph = hh * 0.6;
  g.fillStyle(0x333366, 1);
  g.beginPath();
  g.moveTo(x, y + hh * 2 - ph);
  g.lineTo(x - hw, y + hh * 2 - ph * 0.5);
  g.lineTo(x, y + hh * 2);
  g.lineTo(x + hw, y + hh * 2 - ph * 0.5);
  g.closePath(); g.fillPath();
  g.fillStyle(leftColor, 1);
  g.beginPath();
  g.moveTo(x - hw, y + hh * 2 - ph * 0.5);
  g.lineTo(x, y + hh * 2);
  g.lineTo(x, y + hh * 2 + ph);
  g.lineTo(x - hw, y + hh * 2 + ph * 0.5);
  g.closePath(); g.fillPath();
  g.fillStyle(rightColor, 1);
  g.beginPath();
  g.moveTo(x + hw, y + hh * 2 - ph * 0.5);
  g.lineTo(x, y + hh * 2);
  g.lineTo(x, y + hh * 2 + ph);
  g.lineTo(x + hw, y + hh * 2 + ph * 0.5);
  g.closePath(); g.fillPath();
}

function drawCarpet(g, tx, ty, color, accent) {
  var iso = PushPals.Iso;
  var pos = iso.tileToScreen(tx, ty);
  var x = pos.x, y = pos.y;
  var hw = iso.HALF_W * 1.5, hh = iso.HALF_H * 1.5;
  g.fillStyle(Phaser.Display.Color.HexStringToColor(color).color, 0.4);
  g.beginPath();
  g.moveTo(x, y - hh * 0.3); g.lineTo(x - hw, y + hh * 0.7);
  g.lineTo(x, y + hh * 1.7); g.lineTo(x + hw, y + hh * 0.7);
  g.closePath(); g.fillPath();
  g.lineStyle(1, Phaser.Display.Color.HexStringToColor(accent).color, 0.2);
  g.beginPath();
  g.moveTo(x - hw * 0.7, y + hh * 0.3);
  g.lineTo(x, y + hh * 0.8);
  g.lineTo(x + hw * 0.7, y + hh * 0.3);
  g.closePath(); g.strokePath();
}

function addGlow(scene, img, color, layers) {
  if (!img || !img.texture) return;
  var n = layers || 3;
  var hexColor = Phaser.Display.Color.HexStringToColor(color || '#00ff88').color;
  for (var i = 0; i < n; i++) {
    var g = scene.add.image(img.x, img.y, img.texture.key);
    g.setOrigin(img.originX, img.originY);
    g.setScale(1 + (i + 1) * 0.08);
    g.setAlpha(0.08 / (i + 1));
    g.setTint(hexColor);
    g.setDepth(img.depth - 1 - i);
  }
}
