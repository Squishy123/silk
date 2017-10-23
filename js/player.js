class Player extends Actor {
  constructor() {
    super();
  }

  init() {
    super.init();
    this.vx = 5;
    this.vy = 5;
    this.x = 200;
    this.y = 200;

    this.styleElement({
      "background-color": 'red',
    });

    this.setDimensions({
      height: 50,
      width: 50
    });

    this.keys = [];
    let keys = this.keys;
    document.addEventListener("keydown", function(e) {
      keys[e.which] = true;
    }, false);

    document.addEventListener("keyup", function(e) {
      keys[e.which] = false;
    }, false);

  }

  render() {
    if (this.stage.checkCollisions(this).length > 0) this.styleElement({
      "background-color": 'green'
    });
    else this.styleElement({
      "background-color": "red"
    });
  }


  update() {
    if (this.keys[87]) this.y -= this.vy;
    if (this.keys[83]) this.y += this.vy;
    if (this.keys[65]) this.x -= this.vx;
    if (this.keys[68]) this.x += this.vx;

    this.setLocation({
      x: this.x,
      y: this.y
    });
  }
}
