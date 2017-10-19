class Player extends Actor {
  constructor() {
    super(() => {
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
      this.x = 10
      this.y = 10;
    }, () => {
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
    }, null);
  }
}

class HelloWorld extends Stage {
  constructor() {
    super(() => {
      this.bindToElement(document.getElementById("stage"));
      this.styleElement({
        "height": '500px',
        "width": '500px',
        "backgroundColor": 'black',
      });
    }, () => {
      console.log("run");
      if (this.objects)
        this.objects.forEach(function(obj) {
          obj.update();
        });
    }, () => {
      if (this.objects)
        this.objects.forEach(function(obj) {
          obj.update();
        });
    });
  }
}

let world = new HelloWorld();
world.addObject = new Player();
world.start(100, 100);
