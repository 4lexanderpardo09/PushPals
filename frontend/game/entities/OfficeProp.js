// OfficeProp entity — places a texture at isometric (tx, ty) with depth sorting
window.PushPals = window.PushPals || {};
window.PushPals.OfficeProp = (function() {

  function create(scene, key, tx, ty, tz) {
    var iso = PushPals.Iso;
    var pos = iso.tileToScreenZ(tx, ty, tz);
    var img = scene.add.image(pos.x, pos.y, key);
    img.setOrigin(0.5, 1); // bottom-center anchor

    // Depth: order by isometric y, higher tz = higher depth (renders on top)
    img.setDepth(ty + tx + tz * 10);

    return img;
  }

  return {
    create: create,
  };
})();
