class Player extends Actor {
  constructor() {
    super();
  }

  init(obj) {
    obj.vx = 1;
    obj.vy = 1;
    obj.x = 0;
    obj.y = 0;

    obj.colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    obj.colorCount = 0;

    obj.styleElement({
      "position": 'absolute',
      "top": '0px',
      "left": '0px',
      "height": '100px',
      "width": '100px',
      "background-color": 'red',
      "transition": "background-color 1s"
    });

    document.addEventListener("keydown", function(event) {
      if (event.which == 65) obj.vx = -2.5;
      else if (event.which == 68) obj.vx = 2.5;

      if (event.which == 87) obj.vy = -2.5;
      if (event.which == 83) obj.vy = 2.5;
    });
  }

  render(obj) {
    if (obj.colorCount === obj.colors.length) obj.colorCount = 0;
    obj.styleElement({
      "background-color": obj.colors[obj.colorCount]
    });
    obj.colorCount++;
  }

  update(obj) {
    if (obj.getLocation().x > obj.element.parentElement.clientWidth - 100) {
      console.log("hit")
      obj.vx *= -1;
    } else if (obj.getLocation().x < 0) {
      console.log("hit")
      obj.vx *= -1
    };

    if (obj.getLocation().y > obj.element.parentElement.clientHeight - 100) {
      console.log("hit")
      obj.vy *= -1;
    } else if (obj.getLocation().y < 0) {
      console.log("hit")
      obj.vy *= -1
    }

    obj.setLocation(obj.x + obj.vx, obj.y + obj.vy);
  }
}
