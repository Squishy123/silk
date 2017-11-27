require("js/lib/timer.js");
require("js/lib/quadtree.js");
require("js/lib/silkobject.js");
require("js/lib/actor.js");
require("js/lib/stage.js");
require("js/lib/inputhandler.js");
require("js/tile.js");
require("js/player.js");
require("js/main.js");

function require(src) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.async = false;
  document.getElementsByTagName('body')[0].appendChild(script);
}
