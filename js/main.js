let s = new Stage(document.getElementById("stage"));
s.styleElement({
  "background-color": "#000000"
});


s.setDimensions({
  width: 500,
  height: 500
})


s.start();

let tiles = [new Tile(), new Tile(), new Tile()];
tiles.forEach(function(t) {
  s.addObject(t);
});

let p1 = new Player();
s.addObject(p1);
