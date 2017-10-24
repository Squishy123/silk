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


    this.inputHandler = new InputHandler();
    this.inputHandler.targetEvents({
      keydown: true,
      keyup: true
    });

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
    if (this.inputHandler.keys[87]) this.y -= this.vy;
    if (this.inputHandler.keys[83]) this.y += this.vy;
    if (this.inputHandler.keys[65]) this.x -= this.vx;
    if (this.inputHandler.keys[68]) this.x += this.vx;

    this.setLocation({
      x: this.x,
      y: this.y
    });

    /** IF YOU WANT TO COLLIDE
    if (this.stage.checkCollisions(this)[0] instanceof Tile) {
      this.setLocation(before);
    }
    **/
  }
}
