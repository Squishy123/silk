class Tile extends Actor {
  constructor() {
    super();
  }

  init() {
    super.init();
    let obj = this;
    obj.styleElement({
      "position": 'absolute',
      "background-color": 'yellow'
    });
    obj.setBounds({
      width: 50,
      height: 50,
      x: Math.floor(Math.random() * (this.stage.getBounds().width - 50)),
      y: Math.floor(Math.random() * (this.stage.getBounds().height - 50))
    });
  }

}
