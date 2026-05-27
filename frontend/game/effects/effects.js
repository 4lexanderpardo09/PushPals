// Visual effects: neon glow, cable rendering, particles
window.PushPals = window.PushPals || {};
window.PushPals.Effects = (function() {

  // Neon glow via layered alpha spill (works on both Canvas + WebGL)
  // Places transparent copies behind the main image
  function addNeonGlow(scene, img, color, layers) {
    if (!img || !img.texture) return img;
    var numLayers = layers || 3;
    var parent = img.parentContainer || null;

    for (var i = 0; i < numLayers; i++) {
      var scale = 1 + (i + 1) * 0.08;
      var alpha = 0.08 / (i + 1);
      var glow = scene.add.image(img.x, img.y, img.texture.key);
      glow.setOrigin(img.originX, img.originY);
      glow.setScale(scale);
      glow.setAlpha(alpha);
      glow.setTint(Phaser.Display.Color.HexStringToColor(color || '#00ff88').color);
      glow.setDepth(img.depth - 1 - i);
      if (img.tintFill !== undefined) glow.setTintFill(Phaser.Display.Color.HexStringToColor(color || '#00ff88').color);
    }

    return img;
  }

  // Animate circuit line pulse along a path
  // Returns a graphics object that updates each frame
  function createCircuitAnimation(scene, points, color) {
    var g = scene.add.graphics();
    var phase = Math.random() * Math.PI * 2;

    g.update = function(t) {
      g.clear();
      var alpha = 0.15 + 0.35 * Math.abs(Math.sin(t * 1.5 + phase));
      g.lineStyle(1, Phaser.Display.Color.HexStringToColor(color || '#00ff88').color, alpha);
      g.beginPath();
      g.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i++) {
        g.lineTo(points[i].x, points[i].y);
      }
      g.strokePath();

      // Pulsing dot traveling along the path
      var t2 = (t * 0.5 + phase) % 1;
      var idx = t2 * (points.length - 1);
      var ai = Math.floor(idx);
      var frac = idx - ai;
      if (ai < points.length - 1) {
        var px = points[ai].x + (points[ai+1].x - points[ai].x) * frac;
        var py = points[ai].y + (points[ai+1].y - points[ai].y) * frac;
        g.fillStyle(Phaser.Display.Color.HexStringToColor(color || '#00ff88').color, 0.8);
        g.fillCircle(px, py, 2);
      }
      g.setDepth(9999);
    };

    return g;
  }

  return {
    addNeonGlow: addNeonGlow,
    createCircuitAnimation: createCircuitAnimation,
  };
})();
