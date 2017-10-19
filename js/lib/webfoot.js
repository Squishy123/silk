/**
 * Counts the amount of seconds between a starting event
 * and an ending event
 *
 * @author Christian Wang
 * @version Sept 2016
 */
class Timer {
  /**
   * Default constructor for timer object
   * Starts the timer
   */
  constructor() {
    this.mark();
  }

  /**
   * Starts the timer and sets the starttime value to current time
   */
  mark() {
    this.startTime = Date.now();
  }

  /**
   * Returns the amount of seconds that passed
   * Since the starting event
   */
  secondsElapsed() {
    return (Date.now() - this.startTime) / 1000;
  }

  /**
   * Returns the amount of millisecondss that passed
   * Since the starting event
   */
  millisecondsElapsed() {
    return Date.now() - this.startTime;
  }
}

/**
 * Controls the rate at which a function is looped
 *
 * @author Christian Wang
 * @version Oct 2017
 **/
class Refresh {
  //Function that is to be run at RPS(refreshes per seconds)
  constructor(funct, rps) {
    this.funct = funct;
    this.rps = rps;
  }

  start() {
    this.running = false;
    this.rpsInterval = 1000 / this.rps;
    this.timer = new Timer();
    if (this.rps > 0)
      this.loop();
    else
      console.log(new WebFootError("Your RPS is at 0 so I'm not even gonna start"));
  }

  stop() {
    this.running = true;
  }

  loop() {
    if (this.running) return;
    //Request a frame refresh
    window.requestAnimationFrame(this.loop.bind(this));

    //If enough time has passed call the function
    let millisElapsed = this.timer.millisecondsElapsed();
    this.currentRPS = millisElapsed / this.rpsInterval * this.rps;
    if (millisElapsed > this.rpsInterval) {
      this.timer.mark();

      //If the function is undefined output an error and running running
      if (!this.funct) {
        this.running = true;
        console.log(new WebFootError("The function you are trying to refresh is undefined"));
      } else {
        this.funct();
      }
    }
  }
}

//Custom WebFoot Errors
class WebFootError extends Error {}

class WebObject {
  constructor(element) {
    this.bindElement(element);
  }

  bindElement(element) {
    this.element = element;
  }

  styleElement(styles) {
    Object.assign(this.element.style, styles);
  }
}

class Actor extends WebObject {
  constructor() {
    super(document.createElement('div'));
  }

  init() {
    //Add all the default styles
    this.styleElement({
      "position": 'relative',
      "top": '0px',
      "left": '0px'
    });
  }



  setLocation(x, y) {
    //sets the variables
    this.x = x;
    this.y = y;

    //sets the element style properties
    this.element.style["top"] = y + "px";
    this.element.style["left"] = x + "px";
  }

  getLocation() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

class Stage extends WebObject {
  constructor(element) {
    super(element);
    this.actorsInStage = [];
  }

  addObject(bundle) {
    this.actorsInStage.push({
      "actor": bundle.actor,
      "bundler": bundle
    });
    this.element.appendChild(bundle.actor.element);
  }
}

class Bundler {
  constructor(actor) {
    this.actor = actor;
  }

  start(updateTicksPerSecond, renderTicksPerSecond) {
    this.actor.init(this.actor);
    if (this.actor.update) {
      let update = () => {
        this.actor.update(this.actor)
      };
      this.refreshUpdate = new Refresh(update, updateTicksPerSecond);
    } else console.log(new WebFootError("Bundled actor has no update function"));

    if (this.actor.render) {
      let render = () => {
        this.actor.render(this.actor)
      };
      this.refreshRender = new Refresh(render, renderTicksPerSecond);

      this.refreshUpdate.start();
      this.refreshRender.start();
    } else console.log(new WebFootError("Bundled actor has no render function"));
  }
}
