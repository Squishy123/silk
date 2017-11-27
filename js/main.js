let c = new Stage(document.getElementById("stage"));
c.styleElement({
  "background-color": "#000000",
  "position": "relative",
  "border-style": "solid",
  "border-color": "white"
});

c.setBounds({
  width: 300,
  height:300,
  x: 0,
  y: 0
});

c.start();

let tiles = [new Tile(), new Tile(), new Tile()];
tiles.forEach(function(t) {
  c.addObject(t);
});

let p1 = new Player();
c.addObject(p1);
