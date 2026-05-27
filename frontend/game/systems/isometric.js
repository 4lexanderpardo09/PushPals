window.PushPals = window.PushPals || {};
window.PushPals.Iso = (function() {
  var TILE_W = 64;
  var TILE_H = 32;
  var HALF_W = TILE_W / 2;
  var HALF_H = TILE_H / 2;
  var ORIGIN_X = 480;
  var ORIGIN_Y = 100;

  function tileToScreen(tx, ty) {
    return {
      x: ORIGIN_X + (tx - ty) * HALF_W,
      y: ORIGIN_Y + (tx + ty) * HALF_H
    };
  }

  function tileToScreenZ(tx, ty, tz) {
    var p = tileToScreen(tx, ty);
    return { x: p.x, y: p.y - tz * HALF_H };
  }

  function depthSortKey(tx, ty, tz) {
    return ty + tx + tz * 0.01;
  }

  return {
    TILE_W: TILE_W,
    TILE_H: TILE_H,
    HALF_W: HALF_W,
    HALF_H: HALF_H,
    ORIGIN_X: ORIGIN_X,
    ORIGIN_Y: ORIGIN_Y,
    tileToScreen: tileToScreen,
    tileToScreenZ: tileToScreenZ,
    depthSortKey: depthSortKey,
  };
})();
