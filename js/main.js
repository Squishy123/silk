let s = new Stage(document.getElementById("stage"));
s.styleElement({
  "position": "relative",
  "width": "500px",
  "height": "500px",
  "background-color": "#000000"
});

let p1 = new Paddle();
s.addObject(p1);
p1.start(100,100);

let p2 = new Paddle();
s.addObject(p2);
p2.start(100,100);
p2.setLocation({x: p2.element.parentElement.clientWidth-p2.getDimensions().width, y: p2.y});
