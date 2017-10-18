let a = new Actor();
a.bindToElement(document.getElementById("player"));
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

stage.addObject(a);

stage.update = function() {
  //  if (stage.objects)
  stage.objects.forEach(function(obj) {
    obj.update();
  });
  console.log(stage.refreshUpdate.currentRPS);
}

stage.render = function() {
  if (stage.objects)
    stage.objects.forEach(function(obj) {
      obj.update();
    })
}

stage.start(120, 60);
