// Generate pixel art textures as offscreen canvases
window.PushPals = window.PushPals || {};
window.PushPals.TextureGen = (function() {

  var PX = 2;

  function createCanvas(w, h) {
    var c = document.createElement('canvas');
    c.width = w * PX;
    c.height = h * PX;
    return c;
  }

  function dr(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * PX, y * PX, w * PX, h * PX);
  }

  // Desk (24x12)
  function genDesk() {
    var c = createCanvas(24, 12);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#553322';
    ctx.fillRect(0, 0, 24 * PX, 12 * PX);
    dr(ctx, 2, 0, 20, 2, '#664433');
    dr(ctx, 2, 8, 3, 4, '#332211');
    dr(ctx, 19, 8, 3, 4, '#332211');
    return c;
  }

  // Monitor (14x10)
  function genMonitor() {
    var c = createCanvas(14, 10);
    var ctx = c.getContext('2d');
    dr(ctx, 5, 7, 4, 3, '#555555');
    dr(ctx, 1, 1, 12, 7, '#333333');
    dr(ctx, 2, 2, 10, 5, '#112244');
    dr(ctx, 3, 3, 8, 3, '#1a3366');
    // Screen lines
    ctx.fillStyle = '#224488';
    ctx.fillRect(3 * PX, 5 * PX, 8 * PX, 1 * PX);
    return c;
  }

  // Server (18x18)
  function genServer() {
    var c = createCanvas(18, 18);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#222244';
    ctx.fillRect(0, 0, 18 * PX, 18 * PX);
    dr(ctx, 2, 2, 14, 5, '#1a1a38');
    dr(ctx, 2, 10, 14, 6, '#1a1a38');
    dr(ctx, 4, 3, 3, 2, '#00ff88');
    dr(ctx, 10, 3, 3, 2, '#44aaff');
    dr(ctx, 4, 11, 3, 2, '#00ff88');
    dr(ctx, 10, 11, 3, 2, '#ff8844');
    dr(ctx, 2, 8, 14, 1, '#333366');
    return c;
  }

  // Plant (12x14)
  function genPlant() {
    var c = createCanvas(12, 14);
    var ctx = c.getContext('2d');
    dr(ctx, 2, 9, 8, 5, '#884422');
    dr(ctx, 3, 8, 6, 2, '#995533');
    ctx.fillStyle = '#33aa55';
    ctx.fillRect(2 * PX, 0, 4 * PX, 4 * PX);
    ctx.fillRect(6 * PX, 1, 4 * PX, 3 * PX);
    ctx.fillRect(4 * PX, 0, 4 * PX, 5 * PX);
    ctx.fillRect(3 * PX, 2, 6 * PX, 4 * PX);
    dr(ctx, 5, 5, 2, 4, '#336633');
    return c;
  }

  // Cabinet (10x14)
  function genCabinet() {
    var c = createCanvas(10, 14);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#444466';
    ctx.fillRect(0, 0, 10 * PX, 14 * PX);
    dr(ctx, 1, 2, 8, 1, '#555577');
    dr(ctx, 1, 7, 8, 1, '#555577');
    dr(ctx, 3, 4, 4, 1, '#888899');
    dr(ctx, 3, 9, 4, 1, '#888899');
    return c;
  }

  // Bookshelf (14x18)
  function genBookshelf() {
    var c = createCanvas(14, 18);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#554433';
    ctx.fillRect(0, 0, 14 * PX, 18 * PX);
    dr(ctx, 1, 5, 12, 1, '#664455');
    dr(ctx, 1, 11, 12, 1, '#664455');
    var colors = ['#cc4444','#4488cc','#44cc88','#ccaa44'];
    for (var i = 0; i < colors.length; i++) {
      ctx.fillStyle = colors[i];
      ctx.fillRect((2 + i*3) * PX, 1 * PX, 2 * PX, 4 * PX);
    }
    var colors2 = ['#8844cc','#44cccc','#cc8844'];
    for (var j = 0; j < colors2.length; j++) {
      ctx.fillStyle = colors2[j];
      ctx.fillRect((2 + j*4) * PX, 7 * PX, 3 * PX, 4 * PX);
    }
    return c;
  }

  // Water Cooler (8x16)
  function genWaterCooler() {
    var c = createCanvas(8, 16);
    var ctx = c.getContext('2d');
    dr(ctx, 1, 10, 6, 6, '#666688');
    ctx.fillStyle = '#4488cc';
    ctx.fillRect(2 * PX, 1 * PX, 4 * PX, 10 * PX);
    dr(ctx, 3, 2, 2, 7, '#66aadd');
    return c;
  }

  // Signage — generic sign with text on dark background
  function genSign(text, fgColor, bgColor, w, h) {
    var W = w || 32;
    var H = h || 10;
    var c = createCanvas(W, H);
    var ctx = c.getContext('2d');
    // Background
    ctx.fillStyle = bgColor || '#111122';
    ctx.fillRect(0, 0, W * PX, H * PX);
    // Border glow
    ctx.fillStyle = fgColor || '#00ff88';
    ctx.fillRect(0, 0, W * PX, 1 * PX);
    ctx.fillRect(0, (H-1) * PX, W * PX, 1 * PX);
    ctx.fillRect(0, 0, 1 * PX, H * PX);
    ctx.fillRect((W-1) * PX, 0, 1 * PX, H * PX);
    // Text
    ctx.font = 'bold ' + (8 * PX) + 'px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fgColor || '#00ff88';
    ctx.fillText(text, W/2 * PX, H/2 * PX);
    return c;
  }

  // PushPals big sign (48x12)
  function genPushPalsSign() {
    var c = createCanvas(48, 12);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 48 * PX, 12 * PX);
    // Top accent line
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(0, 0, 48 * PX, 1 * PX);
    ctx.fillRect(0, 11 * PX, 48 * PX, 1 * PX);
    // Text
    ctx.font = 'bold ' + (7 * PX) + 'px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#00ff88';
    ctx.fillText('PUSHPALS', 24 * PX, 4 * PX);
    ctx.font = 'bold ' + (4 * PX) + 'px monospace';
    ctx.fillText('AI CODE REVIEW', 24 * PX, 9 * PX);
    return c;
  }

  // System screen (32x16)
  function genSystemScreen() {
    var c = createCanvas(32, 16);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 32 * PX, 16 * PX);
    ctx.fillStyle = '#333366';
    ctx.fillRect(0, 0, 32 * PX, 1 * PX);
    ctx.fillRect(0, 15 * PX, 32 * PX, 1 * PX);
    ctx.font = 'bold ' + (4 * PX) + 'px monospace';
    ctx.fillStyle = '#00ff88';
    ctx.fillText('SYSTEM STATUS', 2 * PX, 3 * PX);
    var items = ['GITHUB OK','WEBHOOK OK','AI ONLINE','AGENTS OK'];
    var colors = ['#44ff88','#44ff88','#44ff88','#44ff88'];
    for (var i = 0; i < items.length; i++) {
      ctx.fillStyle = colors[i];
      ctx.fillText(items[i], 2 * PX, (7 + i * 3) * PX);
    }
    return c;
  }

  // Agent character generator (12x20 px)
  // colors: { hat, body, pants, shoe, skin }
  function genAgent(colors) {
    var W = 12, H = 20;
    var c = createCanvas(W, H);
    var ctx = c.getContext('2d');
    var p = colors;

    // Background transparent
    ctx.clearRect(0, 0, W * PX, H * PX);

    // Shoes
    dr(ctx, 2, 17, 3, 3, p.shoe);
    dr(ctx, 7, 17, 3, 3, p.shoe);
    // Pants
    dr(ctx, 2, 13, 3, 4, p.pants);
    dr(ctx, 7, 13, 3, 4, p.pants);
    // Body
    ctx.fillStyle = p.body;
    ctx.fillRect(3 * PX, 7 * PX, 6 * PX, 6 * PX);
    // Arms
    dr(ctx, 1, 8, 2, 4, p.skin);
    dr(ctx, 9, 8, 2, 4, p.skin);
    // Head
    ctx.fillStyle = p.skin;
    ctx.fillRect(3 * PX, 2 * PX, 6 * PX, 5 * PX);
    // Hat/hair
    ctx.fillStyle = p.hat;
    ctx.fillRect(2 * PX, 0, 8 * PX, 3 * PX);
    // Eyes
    ctx.fillStyle = '#222222';
    ctx.fillRect(4 * PX, 4 * PX, 2 * PX, 1 * PX);
    // Hat brim
    dr(ctx, 1, 2, 10, 1, p.hat);

    return c;
  }

  // Cardboard box (8x8)
  function genBox() {
    var c = createCanvas(8, 8);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#886644';
    ctx.fillRect(0, 0, 8 * PX, 8 * PX);
    dr(ctx, 2, 0, 4, 3, '#997755');
    dr(ctx, 0, 3, 8, 1, '#664422');
    dr(ctx, 3, 0, 2, 3, '#aa8866');
    return c;
  }

  // Trash bin (6x8)
  function genTrash() {
    var c = createCanvas(6, 8);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#445566';
    ctx.fillRect(0, 0, 6 * PX, 8 * PX);
    dr(ctx, 0, 0, 6, 1, '#556677');
    dr(ctx, 0, 7, 6, 1, '#334455');
    dr(ctx, 2, 1, 2, 3, '#223344');
    return c;
  }

  // Framed picture (12x10)
  function genPicture() {
    var c = createCanvas(12, 10);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#664433';
    ctx.fillRect(0, 0, 12 * PX, 10 * PX);
    ctx.fillStyle = '#886655';
    ctx.fillRect(1 * PX, 1 * PX, 10 * PX, 8 * PX);
    // Abstract art inside
    ctx.fillStyle = '#44aaff';
    ctx.fillRect(3 * PX, 3 * PX, 3 * PX, 3 * PX);
    ctx.fillStyle = '#ff8844';
    ctx.fillRect(7 * PX, 2 * PX, 2 * PX, 4 * PX);
    ctx.fillStyle = '#44ff88';
    ctx.fillRect(4 * PX, 6 * PX, 4 * PX, 2 * PX);
    return c;
  }

  // Improved GitHub logo (16x16) — Octocat silhouette
  function genGitHub() {
    var c = createCanvas(16, 16);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#111122';
    ctx.fillRect(0, 0, 16 * PX, 16 * PX);
    // Octocat body circle
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4 * PX, 4 * PX, 8 * PX, 8 * PX);
    // Ears
    ctx.fillRect(3 * PX, 3 * PX, 2 * PX, 2 * PX);
    ctx.fillRect(11 * PX, 3 * PX, 2 * PX, 2 * PX);
    // Eyes
    ctx.fillStyle = '#111122';
    ctx.fillRect(5 * PX, 6 * PX, 2 * PX, 2 * PX);
    ctx.fillRect(9 * PX, 6 * PX, 2 * PX, 2 * PX);
    // Mouth
    ctx.fillRect(5 * PX, 9 * PX, 6 * PX, 1 * PX);
    // Body
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(5 * PX, 12 * PX, 2 * PX, 3 * PX);
    ctx.fillRect(9 * PX, 12 * PX, 2 * PX, 3 * PX);
    return c;
  }

  // Generate ALL textures, register with Phaser scene
  function generateAll(scene) {
    var textures = {
      desk: genDesk(),
      monitor: genMonitor(),
      server: genServer(),
      plant: genPlant(),
      cabinet: genCabinet(),
      bookshelf: genBookshelf(),
      water_cooler: genWaterCooler(),
      pushpals_sign: genPushPalsSign(),
      system_screen: genSystemScreen(),
      mission_board: genSign('MISSION: REVIEW', '#88aaff', '#111133', 28, 12),
      live_feed: genSign('LIVE FEED', '#44ddff', '#0a1122', 28, 12),
      github_logo: genGitHub(),
      qa_sign: genSign('QA', '#ff6644', '#1a1122', 14, 8),
      reviewer_sign: genSign('REV', '#66dd88', '#112211', 14, 8),
      docs_sign: genSign('DOCS', '#ff88aa', '#221122', 14, 8),
      qa_agent: genAgent({ hat:'#ff6644', body:'#44aaff', pants:'#224466', shoe:'#553322', skin:'#ffcc88' }),
      reviewer_agent: genAgent({ hat:'#885522', body:'#66dd88', pants:'#334422', shoe:'#553322', skin:'#ffcc88' }),
      docs_agent: genAgent({ hat:'#774433', body:'#ff88aa', pants:'#553344', shoe:'#553322', skin:'#ffcc88' }),
      cardboard_box: genBox(),
      trash_bin: genTrash(),
      framed_picture: genPicture(),
    };

    for (var key in textures) {
      // Remove existing if stale
      if (scene.textures.exists(key)) {
        scene.textures.remove(key);
      }
      scene.textures.addCanvas(key, textures[key]);
    }

    return Object.keys(textures);
  }

  return { generateAll: generateAll };
})();
