class Tile extends Actor {
  init(obj) {
    obj.styleElement({
      "position": 'absolute',
      "top": '0px',
      "left": '0px',
      "height": '100px',
      "width": '100px',
      "background-color": 'yellow'
    });

    obj.x = Math.floor(Math.random() * 5) * 100;
    obj.y = Math.floor(Math.random() * 5) * 100;
    obj.setLocation(obj.x, obj.y);
  }

}
