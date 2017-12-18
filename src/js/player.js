class Player extends Actor {
  constructor() {
    super(document.createElement('div'));
  }

  preload() {
    this.vx = 10;
    this.vy = 5;

    this.styleElement({
      "position": 'absolute',
      "background-color": 'red',
    });


    this.setBounds({
      height: 50,
      width: 50,
      x: 200,
      y: 200
    });


    this.inputHandler = new InputHandler();
    this.inputHandler.targetEvents(document, {
      keydown: true,
      keyup: true
    });

  }

  render() {
    /**if (this.stage.checkCollisions(this).length > 0) this.styleElement({
      "background-color": 'green'
    });
    else this.styleElement({
      "background-color": "red"
    });**/
  }


  update() {
    if (this.inputHandler.keys[87]) this.y -= this.vy;
    if (this.inputHandler.keys[83]) this.y += this.vy;
    if (this.inputHandler.keys[65]) this.x -= this.vx;
    if (this.inputHandler.keys[68]) this.x += this.vx;
    this.setBounds({
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
