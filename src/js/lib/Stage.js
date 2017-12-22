/**
 * An DOM object that houses actors and manages
 * their runtime states
 *
 * @author Christian Wang
 * @version 1.0
 **/
class Stage extends SilkObject {
  /**
   * Creates a new Stage with a given element
   **/
  constructor(element) {
    super(element);
    this.actors = [];
    this.running = false;

    //Timers for ticks
    this.renderTimer = new Timer();
    this.updateTimer = new Timer();

    this.renderTicks = 0;
    this.updateTicks = 0;

    //FPS TESTER
    this.fps = 0;

    //started time
    this.then;
    this.now;
  }

  /**
   * Creates a new QuadTree and sets it to the current bounds
   **/
  start(renderTicks, updateTicks) {
    this.renderTicks = renderTicks;
    this.updateTicks = updateTicks;
    this.running = true;
    this.then = Date.now();
    this.render();
    this.update();
  }

  render() {
    if (!this.running) return;
    window.requestAnimationFrame(this.render.bind(this));
    if (this.renderTimer.millisecondsElapsed() > (1000 / this.renderTicks)) {
      this.renderTimer.mark();
      this.actors.forEach(function(actor) {
        if (actor.render)
          actor.render();
      });
      this.render();
    }
  }

  update() {
    if (!this.running) return;
    window.requestAnimationFrame(this.update.bind(this));
    if (this.updateTimer.millisecondsElapsed() > (1000 / this.updateTicks)) {
      this.updateTimer.mark();

      //fps
      this.now = Date.now();
      let elapsed = this.now - this.then;
      this.then = this.now;
      this.fps = 1 / elapsed;

      this.actors.forEach(function(actor) {
        if (actor.update)
          actor.update();
      });
      this.update();
    }
  }

  /**
   * Stops the actors in this stage from looping
   **/
  stop() {
    this.actors.forEach(function(e) {
      e.actor.stop();
    });
  }

  /**
   * Adds an actor to this stage
   **/
  addActor(actor, bounds) {
    actor.stage = this;
    this.actors.push(actor);
    this.element.appendChild(actor.element);
    if (bounds != null)
      actor.setBounds(bounds);
  }

  /**
   * Removes an Actor from this stage
   **/
  removeActor(actor) {
    actor.stage = null;
    actor.stop();
    for (let i = 0; i < this.actors.length; i++) {
      if (Object.is(actor, this.actors[i]))
        this.actors.splice(i, 1);
    }
    actor.destroy();
    this.element.removeChild(actor.element);
  }
}
