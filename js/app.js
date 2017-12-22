  class Info extends Actor {
    constructor() {
      super(document.createElement('div'));
      //this.preload();
    }

    preload() {
      let logo = document.createElement('img');
      logo.draggable = false;
      logo.src = "res/silk-logo.png";
      logo.style["width"] = '300px';
      logo.style["height"] = '300px';
      this.element.appendChild(logo);

      let info = document.createElement('div');
      info.innerHTML = "<h2 class='bold'>Silk.js</h2><p class='display'><a href='https://github.com/Squishy123/silk'>Silk</a> is a front-end utility library built in javascript.</p> <a class='btn display' href='js/silk.min.js' download>Download Alpha 1.0.0</a>";
      this.element.appendChild(info);

      this.styleElement({
        "position": 'absolute',
        "text-align": 'center'
      });

      this.setBounds({
        width: 500,
        height: 500
      });

      //movement stuff
      this.vx = 5;
      this.vy = 5;
    }

    render() {
      let [width, height] = [window.innerWidth, window.innerHeight];
      this.setBounds({
        x: width / 2 - this.getBounds().width / 2,
        y: height / 2 - this.getBounds().height / 2
      });
    }

    update() {}
  }

  class Page extends Stage {
    constructor() {
      super(document.getElementById('stage'));
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
      let [width, height] = [window.innerWidth, window.innerHeight];
      this.addActor(logo, {
        x: width / 2 - logo.getBounds().width / 2,
        y: height / 2 - logo.getBounds().height / 2
      });
    }
  }

  let main = new Page();
  main.start(30, 30);
