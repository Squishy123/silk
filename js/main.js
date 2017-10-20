let s = new Stage(document.getElementById("stage"));
s.styleElement({
  "position": "relative",
  "width": "500px",
  "height": "500px",
  "background-color": "#000000"
});

let p1 = new Player();
s.addObject(p1);

console.log(s.getObjects());
