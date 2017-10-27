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
let tiles = [new Tile(), new Tile(), new Tile()];
let p1 = new Player();

function start() {
  s.start();
  tiles.forEach(function(t) {
    s.addObject(t);
  });
  s.addObject(p1);
}

function stop() {
  s.stop();
}
