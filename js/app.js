class Info extends Actor {
  constructor() {
    super(document.createElement('div'));
    let obj = this;
    (function () {
      var throttle = function (type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function () {
          if (running) {
            return;
          }
          running = true;
          requestAnimationFrame(function () {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
          });
        };
        obj.addEventListener(type, func);
      };

      /* init - you can init any event */
      throttle("resize", "optimizedResize");
    })();

    // handle event
    window.addEventListener("optimizedResize", function () {
      console.log("Resized");
      obj.setBounds({
        width: this.stage.windowWidth * 0.75,
        height: 500
      });
      //recenter
      obj.center();
    });
  }

  preload() {
    let logo = document.createElement('img');
    logo.draggable = false;
    logo.src = "res/silk-logo.png";
    logo.style["width"] = '300px';
    logo.style["height"] = '300px';
    this.element.appendChild(logo);

    let info = document.createElement('div');

    info.innerHTML = "<h2 class='bold'>Silk.js</h2><p class='display' ><a href='https://github.com/Squishy123/silk'>Silk</a> is a front-end utility library built in javascript.</p ><a class='btn display' href='js/silk.min.js' download>Download Alpha 1.0.0</a><a class='btn display' href='js/silk.min.js' download>Docs</a>";

    this.element.appendChild(info);

    this.styleElement({
      "position": 'absolute',
      "text-align": 'center'
    });

    this.setBounds({
      width: window.innerWidth * 0.75,
      height: 500
    });

    //center it first
    this.center();
  }

  center() {
    if (this.stage)
      //let [width, height] = [window.innerWidth, window.innerHeight];
      this.setBounds({
        x: this.stage.windowWidth / 2 - this.getBounds().width / 2,
        y: this.stage.windowHeight / 2 - this.getBounds().height / 2
      });
  }
}

class Square extends Actor {
  constructor(offsetX, offsetY) {
    super(document.createElement('div'));
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  preload() {
    this.styleElement({
      "position": 'absolute',
      "background-color": '#67D9D8',
      "z-index": '-1'
    });

    this.setBounds({
      width: 50,
      height: 50
    });
  }

  update() {
    if (this.stage.windowWidth)
      this.setBounds({
        x: this.stage.windowWidth / 2 + this.stage.windowWidth / 5 * Math.sin(1 / this.offsetX * Date.now()),
        y: this.stage.windowHeight / 2 + this.stage.windowHeight / 5 * Math.cos(1 / this.offsetY * Date.now())
      })
  }
}

class Page extends Stage {
  constructor() {
    super(document.getElementById('stage'));
    (function () {
      var throttle = function (type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function () {
          if (running) {
            return;
          }
          running = true;
          requestAnimationFrame(function () {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
          });
        };
        obj.addEventListener(type, func);
      };

      /* init - you can init any event */
      throttle("resize", "optimizedResize");
    })();
    let obj = this;
    // handle event
    window.addEventListener("optimizedResize", function () {
      //console.log("Resized");
      [obj.windowWidth, obj.windowHeight] = [window.innerWidth, window.innerHeight];
    });
  }

  start(renderTicks, updateTicks) {
    this.preload();
    super.start(renderTicks, updateTicks);
  }

  update() {
    super.update();
    document.getElementById('fps').innerHTML = `FPS: ${this.fps}`;
  }

  preload() {
    let logo = new Info();
    [this.windowWidth, this.windowHeight] = [window.innerWidth, window.innerHeight];
    this.addActor(logo, {
      x: this.windowWidth / 2 - logo.getBounds().width / 2,
      y: this.windowHeight / 2 - logo.getBounds().height / 2
    });
  }
}

let main = new Page();
main.start(120, 120);
for (let i = 1; i < 5; i++) {
  main.addActor(new Square(1000 + (i * 100), 1000 - (i * 100)));
}
