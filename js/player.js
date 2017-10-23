class Player extends Actor {
  constructor() {
    super();
  }

  init(obj) {
    super.init();
    obj.vx = 0;
    obj.vy = -5;
    obj.x = 0;
    obj.y = 0;

    obj.colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    obj.colorCount = 0;

    obj.styleElement({
      "background-color": 'red',
      "transition": "background-color 1s"
    });

    //Set the size
    obj.setDimensions({
      "height": '50',
      "width": '50'
    })
  }

  render(obj) {
    if (obj.colorCount === obj.colors.length) obj.colorCount = 0;
    obj.styleElement({
      "background-color": obj.colors[obj.colorCount]
    });
    obj.colorCount++;
    //obj.stage.updateQuadTree();
  }

  update(obj) {
    console.log(obj.checkGrounded(obj));

    if (obj.checkGrounded(obj)) {
      obj.setLocation({
        y: 10
      })
    } else obj.vy = 5;

    obj.setLocation({
      y: (obj.y + obj.vy)
    });
  }

  checkGrounded(obj) {
    if (obj.y >= (obj.stage.height - obj.height)) return true;
    return false;
  }
}
