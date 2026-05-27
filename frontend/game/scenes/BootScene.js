window.PushPals = window.PushPals || {};

PushPals.BootScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function() {
    Phaser.Scene.call(this, { key: 'BootScene' });
  },

  create: function() {
    var loadingText = this.add.text(480, 300, 'GENERATING TEXTURES...', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#00ff88',
    });
    loadingText.setOrigin(0.5);

    // Generate all pixel art textures from code
    var count = PushPals.TextureGen.generateAll(this);
    loadingText.setText('GENERATED ' + count + ' TEXTURES');

    this.time.delayedCall(300, function() {
      this.scene.start('MainScene');
    }, [], this);
  }
});
