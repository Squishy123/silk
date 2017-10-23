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
      width: 100,
      height: 100
    });
    obj.setLocation({
      x: 100,
      y: 100
    });

  }

}
