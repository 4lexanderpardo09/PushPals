window.PushPals = window.PushPals || {};

(function() {
  var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: 'game-container',
    backgroundColor: '#0a0a1a',
    scene: [PushPals.BootScene, PushPals.MainScene],
    pixelArt: true,
    roundPixels: true,
    antialias: false,
    render: {
      preserveDrawingBuffer: true,
    },
  };

  PushPals.game = new Phaser.Game(config);
})();
