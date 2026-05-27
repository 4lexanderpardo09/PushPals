window.PushPals = window.PushPals || {};
window.PushPals.Room = (function() {
  // Tile types
  var T = { VOID: 0, FLOOR: 1, WALL: 2 };

  // 18 x 12 grid — irregular octagon shape
  // . = void (outside), W = wall, F = floor
  var MAP = [
    //tx 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7
    /*0*/[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    /*1*/[0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0],
    /*2*/[0,0,0,0,2,2,1,1,1,1,1,1,1,2,2,0,0,0],
    /*3*/[0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2,0,0],
    /*4*/[0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
    /*5*/[0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
    /*6*/[0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
    /*7*/[0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
    /*8*/[0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2,0,0],
    /*9*/[0,0,0,0,2,2,1,1,1,1,1,1,1,2,2,0,0,0],
    /*10*/[0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0],
    /*11*/[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];

  // Objects placed at (tx, ty) with optional height (tz) and wall side
  // wall: 'back' (top of screen), 'left' (left screen edge), 'right' (right screen edge), null for floor
  var OBJECTS = [
    // Wall-mounted
    { key: 'pushpals_sign',   tx: 7,  ty: 2,  tz: 3,  wall: 'back' },
    { key: 'system_screen',   tx: 11, ty: 2,  tz: 3,  wall: 'back' },
    { key: 'github_logo',     tx: 15, ty: 3,  tz: 3,  wall: 'right' },
    { key: 'live_feed',       tx: 2,  ty: 6,  tz: 3,  wall: 'left' },

    // Central server (elevated platform)
    { key: 'central_server',  tx: 9,  ty: 6,  tz: 1,  wall: null },

    // QA Agent station (bottom-left area)
    { key: 'qa_desk',         tx: 4,  ty: 8,  tz: 0,  wall: null },
    { key: 'qa_monitor',      tx: 4,  ty: 8,  tz: 1,  wall: null },
    { key: 'qa_agent',        tx: 5,  ty: 8,  tz: 0,  wall: null },
    { key: 'qa_sign',         tx: 4,  ty: 8,  tz: 3,  wall: 'back' },

    // Reviewer Agent station (right area)
    { key: 'reviewer_desk',   tx: 14, ty: 5,  tz: 0,  wall: null },
    { key: 'reviewer_monitor',tx: 14, ty: 5,  tz: 1,  wall: null },
    { key: 'reviewer_agent',  tx: 14, ty: 6,  tz: 0,  wall: null },
    { key: 'reviewer_sign',   tx: 14, ty: 5,  tz: 3,  wall: 'right' },

    // Docs Agent station (bottom-center)
    { key: 'docs_desk',       tx: 9,  ty: 9,  tz: 0,  wall: null },
    { key: 'docs_monitor',    tx: 9,  ty: 9,  tz: 1,  wall: null },
    { key: 'docs_agent',      tx: 8,  ty: 9,  tz: 0,  wall: null },
    { key: 'docs_sign',       tx: 9,  ty: 9,  tz: 3,  wall: 'back' },

    // Decorative
    { key: 'plant',           tx: 6,  ty: 3,  tz: 0,  wall: null },
    { key: 'filing_cabinet',  tx: 13, ty: 2,  tz: 0,  wall: null },
    { key: 'mission_board',   tx: 5,  ty: 2,  tz: 2.5,wall: 'back' },
    { key: 'water_cooler',    tx: 3,  ty: 6,  tz: 0,  wall: null },
    { key: 'big_plant',       tx: 3,  ty: 7,  tz: 0,  wall: null },
    { key: 'bookshelf',       tx: 4,  ty: 10, tz: 0,  wall: null },
    { key: 'trash_bin',       tx: 10, ty: 9,  tz: 0,  wall: null },
    { key: 'cardboard_box',   tx: 12, ty: 9,  tz: 0,  wall: null },
    { key: 'framed_picture',  tx: 15, ty: 4,  tz: 2.5,wall: 'right' },
    { key: 'carpet',          tx: 9,  ty: 10, tz: 0,  wall: null },
    { key: 'carpet_text',     tx: 9,  ty: 10, tz: 0,  wall: null },
  ];

  // Cable connections from server to desks
  var CABLES = [
    { from: { tx: 9, ty: 6 }, to: { tx: 4, ty: 8 }, color: 0x00ff88 },
    { from: { tx: 9, ty: 6 }, to: { tx: 14, ty: 5 }, color: 0x44aaff },
    { from: { tx: 9, ty: 6 }, to: { tx: 9, ty: 9 }, color: 0xaa44ff },
  ];

  return {
    T: T,
    MAP: MAP,
    OBJECTS: OBJECTS,
    CABLES: CABLES,
    COLS: MAP[0].length,
    ROWS: MAP.length,
  };
})();
