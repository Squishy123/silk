let s = new Stage(document.getElementById("stage"));
s.styleElement({
  "position": "relative",
  "width": "500px",
  "height": "500px",
  "background-color": "#000000"
});
let p = new Player();
let b = new Bundler(p);
s.addObject(b);
b.start(120, 0.5);


let squares = [new Bundler(new Tile()), new Bundler(new Tile()), new Bundler(new Tile())]
squares.forEach(function(e) {
  s.addObject(e);
  e.start(100, 100);
})
console.log(s.actorsInStage);
