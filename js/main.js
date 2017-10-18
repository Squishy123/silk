class Player extends Actor {
  init() {
    let e = document.createElement('div');
    e.classList.add('player');
    this.bindToElement(e);
    this.styleElement({
      "height": '100px',
      "width": '100px',
      "backgroundColor": 'blue',
      "position": 'absolute',
      "top": '0px',
      "left": '0px'
    });

    this.vx = 1;
    this.vy = 1;
    this.x = 100;
    this.y = 100;
  }

  update() {
    this.setLocation(this.x + this.vx, this.y + this.vy);

    if (this.getLocation().x > window.innerWidth - 100) {
      this.vx *= -1;
    } else if (this.getLocation().x < 0) {
      this.vx *= -1
    };

    if (this.getLocation().y > window.innerHeight - 100) {
      this.vy *= -1;
    } else if (this.getLocation().y < 0) {
      this.vy *= -1
    }
  }
}

var HelloWorld = class HelloWorld extends Stage {

  init() {
    this.bindToElement(document.getElementById("stage"));
    this.addObject(new Player());
    this.start(100, 100);
  }

  update() {
    if (this.objects)
      this.objects.forEach(function(obj) {
        obj.update();
      });
  }

  render() {
    if (this.objects)
      this.objects.forEach(function(obj) {
        obj.update();
      });
  }

}

let world = new HelloWorld();
