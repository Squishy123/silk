  class Logo extends Actor {
    constructor() {
      super(document.createElement('img'));
      this.preload();
    }

    preload() {
      this.element.src = "res/silk-logo.png";

      this.styleElement({
        "position": 'absolute'
      });

      this.setBounds({
        width: 200,
        height: 200
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

    update() {
    }
  }

  class Info extends Actor {
    constructor() {
      super(document.createElement('h1'));
      this.preload();
    }

    preload() {
      this.element.innerHTML = "Coming Soon"

      this.styleElement({
        "position": 'absolute'
      });
    }

    render() {
      let [width, height] = [window.innerWidth, window.innerHeight];
      this.setBounds({
        x: width / 2 - this.getBounds().width / 2,
        y: height * 0.75
      });
    }
  }

  class Page extends Stage {
    constructor() {
      super(document.getElementById('stage'));
    }

    start(renderTicks, updateTicks) {
      this.preload();
      super.start(renderTicks, updateTicks);
    }

    preload() {
      let logo = new Logo();
      let [width, height] = [window.innerWidth, window.innerHeight];
      this.addActor(logo, {
        x: width / 2 - logo.getBounds().width / 2,
        y: height / 2 - logo.getBounds().height / 2
      });
      /**
            let info = new Info();
            this.addActor(info, {
              x: width / 2,
              y: height * 0.75
            })
            **/
    }
  }

  let main = new Page();
  main.start(30, 30);
