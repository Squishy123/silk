let a = new Actor();
let e = document.createElement('div');
e.classList.add('player');
a.bindToElement(e);
a.styleElement({
  "height": '100px',
  "width": '100px',
  "backgroundColor": 'blue',
  "position": 'absolute',
  "top": '0px',
  "left": '0px'
});

a.init = function() {
  a.vx = 1;
  a.vy = 1;
  a.x = 100;
  a.y = 100;

  document.addEventListener("keydown", function(event) {
    if (event.which == 65) a.vx = -2.5;
    else if (event.which == 68) a.vx = 2.5;

    if (event.which == 87) a.vy = -2.5;
    if (event.which == 83) a.vy = 2.5;
  });
}

a.update = function() {
  a.setLocation(a.x + a.vx, a.y + a.vy);

  if (a.getLocation().x > window.innerWidth - 100) {
    a.vx *= -1;
  } else if (a.getLocation().x < 0) {
    a.vx *= -1
  };

  if (a.getLocation().y > window.innerHeight - 100) {
    a.vy *= -1;
  } else if (a.getLocation().y < 0) {
    a.vy *= -1
  }



}

let stage = new Stage();
stage.bindToElement(document.getElementById("stage"));
stage.update = function() {
  if (stage.objects)
    stage.objects.forEach(function(obj) {
      obj.update();
    });
}

stage.render = function() {
  if (stage.objects)
    stage.objects.forEach(function(obj) {
      obj.update();
    })
}

a.init();
stage.addObject(a);
stage.start(120, 60);
