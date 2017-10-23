class Player extends Actor {
  constructor() {
    super();
  }

  init(obj) {
    super.init();
    obj.vx = 5;
    obj.vy = 5;
    obj.x = 200;
    obj.y = 200;

    obj.styleElement({
      "background-color": 'red',
    });

    obj.setDimensions({
      height: 50,
      width: 50
    });

    obj.keys = [];

    document.addEventListener("keydown", function(e) {
      obj.keys[e.which] = true;
    }, false);

    document.addEventListener("keyup", function(e) {
      obj.keys[e.which] = false;
    }, false);

    obj.tile = new Tile();
    obj.stage.addObject(obj.tile);
  }

  render(obj) {
    if (obj.stage.checkCollision(obj, obj.tile)) obj.styleElement({
      "background-color": 'green'
    })
    else obj.styleElement({
      "background-color": "red"
    });
  }

  update(obj) {
    if(obj.keys[87]) obj.y -= obj.vy;
    if(obj.keys[83]) obj.y += obj.vy;
    if(obj.keys[65]) obj.x -= obj.vx;
    if(obj.keys[68]) obj.x += obj.vx;

    obj.setLocation({
      x: obj.x,
      y: obj.y
    });
  }
}
