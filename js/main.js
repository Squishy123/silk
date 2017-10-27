let c = new Stage(document.getElementById("colliding-demo"));
c.styleElement({
  "background-color": "#000000",
  "position": "relative",
  "border-style": "solid",
  "border-color": "white"
});

c.setBounds({
  width: 500,
  height: 500,
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


let s = new Stage(document.getElementById("angry-birds"));
s.styleElement({
  "background-color": "#000000",
  "position": "relative",
  "border-style": "solid",
  "border-color": "white"
});

s.setBounds({
  width: 500,
  height: 500,
  x: 0,
  y: 500
});

s.start();

let sling = new Sling();
s.addObject(sling);

let tilesd = [new Tile(), new Tile(), new Tile()];
tilesd.forEach(function(t) {
  s.addObject(t);
});

let p2 = new Player();
s.addObject(p2);
