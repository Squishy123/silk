let s = new Stage(document.getElementById("stage"));
s.styleElement({
  "position": "relative",
  "background-color": "#000000"
});

s.setDimensions({
  width: 500,
  height: 500
})

s.start();

let p1 = new Player();
s.addObject(p1);
