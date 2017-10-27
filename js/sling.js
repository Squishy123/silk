class Sling extends Actor {
  constructor() {
    super();
  }

  init() {
    super.init();
    this.styleElement({
      "border-style": "solid",
      "border-color": "green"
    });

    this.width = 10;
    this.height = 100;
    this.x = 0;
    this.y = this.stage.y + 300;
    this.setBounds({
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y
    });

    this.inputHandler = new InputHandler();
    this.inputHandler.targetEvents(document, {
      keydown: true,
      keyup: true
    });
  }

  update() {
    if(this.inputHandler.keys[32]) {
      this.launch();
    }
  }

  launch() {
    this.stage.addObject(new Bird(this.x, this.y, 100, 10));
  }
}
