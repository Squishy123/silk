import Timer from "/js/lib/timer.js";
import Refresh from "/js/lib/refresh.js";
import QuadTree from "/js/lib/quadtree.js";
import WebObject from "/js/lib/webobject.js";
import Actor from "/js/lib/actor.js";
import Stage from "/js/lib/stage.js";
import InputHandler from "/js/lib/inputhandler.js";
import Tile from "/js/tile.js";
import Player from "/js/player.js";

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
