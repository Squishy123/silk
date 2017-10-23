class Player extends Actor {
  constructor() {
    super();
  }

  init(obj) {
    super.init();
    obj.vx = 0;
    obj.vy = 0;
    obj.x = 200;
    obj.y = 200;

    obj.styleElement({
      "background-color": 'red',
    });

    obj.setDimensions({
      height: 50,
      width: 50
    });

    obj.listener = document.addEventListener("keydown", function(e) {
      if (e.which == 87) obj.y += -10;
      if (e.which == 83) obj.y += 10;
      if (e.which == 68) obj.x += 10;
      if (e.which == 65) obj.x += -10;
    });

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
    obj.setLocation({
      x: obj.x + obj.vx,
      y: obj.y + obj.vy
    });
  }
}
