class Bird extends Actor {
  constructor(x, y, vx, vy) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  init() {
    super.init();
    this.styleElement({
      "border-style": "solid",
      "border-color": "red"
    });

    this.width = 50;
    this.height = 50;
    this.gravity = -0.981;
    this.grounded = false;
  }

  update() {
    //Check if it is grounded
    /**
    if (this.y >= (this.stage.height - this.width)) {
      this.grounded = true;
      this.y = this.stage.height - this.width;
    } else this.ground = false;
**/
  //  if (!this.grounded) {
      this.x += this.vx;
      this.y -= this.vy;
      this.vy += this.gravity
    //}

    this.setBounds({
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y
    });
  }

}
