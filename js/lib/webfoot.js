//Custom WebFoot Errors
class WebFootError extends Error {}

class WebObject {
  constructor(element) {
    this.bindElement(element);
  }

  bindElement(element) {
    this.element = element;
  }

  styleElement(styles) {
    Object.assign(this.element.style, styles);
  }
}

class Actor extends WebObject {
  constructor(element) {
    super(element);
  }

  init() {
    //Add all the default styles
    this.styleElement({
      "position": 'absolute',
      "top": '0px',
      "left": '0px'
    });
  }

  create() {

  }

  setLocation(x, y) {
    //sets the variables
    this.x = x;
    this.y = y;

    //sets the element style properties
    this.element.style["top"] = y + "px";
    this.element.style["left"] = x + "px";
  }

  getLocation() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

class Player extends Actor {
  constructor(element) {
    super(element);
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
    obj.setLocation(obj.x + obj.vx, obj.y + obj.vy);

    if (obj.getLocation().x > window.innerWidth - 100) {
      obj.vx *= -1;
    } else if (obj.getLocation().x < 0) {
      obj.vx *= -1
    };

    if (obj.getLocation().y > window.innerHeight - 100) {
      obj.vy *= -1;
    } else if (obj.getLocation().y < 0) {
      obj.vy *= -1
    }

  }
}

class Bundler {
  constructor(actor) {
    this.actor = actor;
  }

  start(updateTicksPerSecond, renderTicksPerSecond) {
    this.actor.init(this.actor);
    let update = () => {
      this.actor.update(this.actor)
    };
    this.refreshUpdate = new Refresh(update, updateTicksPerSecond);
    let render = () => {
      this.actor.render(this.actor)
    };
    this.refreshRender = new Refresh(render, renderTicksPerSecond);

    this.refreshUpdate.start();
    this.refreshRender.start();
  }
}
