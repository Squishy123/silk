class Player extends Actor {
  constructor() {
    super();
  }

  init(obj) {
    obj.vx = 0;
    obj.vy = 0;
    obj.x = 0;
    obj.y = 0;

    obj.grounded = true;

    obj.colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    obj.colorCount = 0;

    obj.styleElement({
      "position": 'absolute',
      "top": '0px',
      "left": '0px',
      "height": '50px',
      "width": '50px',
      "background-color": 'red',
      "transition": "background-color 1s"
    });

    document.addEventListener("keydown", function(event) {
      if (event.which == 65) obj.vx += -2.5;
      else if (event.which == 68) obj.vx += 2.5;

      if (event.which == 87) {
        if (obj.grounded) obj.y -= 400;
      }
      //if (event.which == 83) obj.vy -= 2.5;
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

    if (obj.getLocation().x > obj.element.parentElement.clientWidth - obj.element.style["width"].replace("px", "")) {
      console.log("hit")
      obj.vx *= -1;
    } else if (obj.getLocation().x < 0) {
      console.log("hit")
      obj.vx *= -1
    };


    if (obj.getLocation().y > obj.element.parentElement.clientHeight - obj.element.style["height"].replace("px", "")) {
      obj.grounded = true;
      obj.vy *= -0.85;
    } else if (obj.getLocation().y < 0) {
      obj.grounded = false;
      console.log("hit")
      obj.vy *= -0.85;
    } else obj.grounded = false;

    if (!obj.grounded) {
      obj.vy += 1;
    }

    obj.setLocation(obj.x + obj.vx, obj.y + obj.vy);
  }
}
