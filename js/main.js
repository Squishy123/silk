let s = new Stage(document.getElementById("stage"));
s.styleElement({
  "background-color": "#000000"
});

s.setBounds({
  width: "75vh",
  height: "75vh",
  x: "50%",
  y: "50%"
});

s.start();

let tiles = [new Tile(), new Tile(), new Tile()];
tiles.forEach(function(t) {
  s.addObject(t);
});

let p1 = new Player();
s.addObject(p1);
