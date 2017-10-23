class Tile extends Actor {
  constructor() {
    super();
  }

  init(obj) {
    super.init();
    obj.styleElement({
      "position": 'absolute',
      "background-color": 'yellow'
    });
    obj.setDimensions({
      width: 50,
      height: 50
    });
    obj.setLocation({
      x: Math.floor(Math.random() * 450),
      y: Math.floor(Math.random() * 450)
    });

  }

}