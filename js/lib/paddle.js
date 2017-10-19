class Paddle extends Actor {
  constructor() {
    super();
  }

  init(obj) {
    super.init();
    obj.x = 0;
    obj.y = obj.element.parentElement.clientHeight / 2;
    obj.vx = 0;
    obj.vy = 0;

    obj.styleElement({
      "height": "100px",
      "width": "10px",
      "background-color": "#fff"
    });
    obj.setLocation({
      x: 0,
      y: obj.y
    });
    obj.listener = document.addEventListener("keydown", function(event) {
        if (event.which == 87) {
          //if (obj.getLocation().y < obj.element.parentElement.clientHeight - obj.getDimensions().height) {
            obj.vy = -10;
            obj.setLocation({
              x: obj.x,
              y: (obj.y + obj.vy)
            });
          //}
        } else if (event.which == 83) {
        //  if (obj.getLocation().y > obj.getDimensions().height) {
            obj.vy = 10;
            obj.setLocation({
              x: obj.x,
              y: (obj.y + obj.vy)
            });
        //  }
        }
      });
    }

    update(obj) {
    }

    render(obj) {

    }
  }
