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
  }

  /**
   * Starts render and update cycles
   **/
  start(renderTicks, updateTicks) {
    this.renderTicks = renderTicks;
    this.updateTicks = updateTicks;
    this.running = true;
    window.requestAnimationFrame(this.render.bind(this));
    window.requestAnimationFrame(this.update.bind(this));
  }

  render() {
    if (this.renderTimer.millisecondsElapsed() > (1000 / this.renderTicks)) {
      this.renderTimer.mark();
      this.actors.forEach(function(actor) {
        if (actor.render)
          actor.render();
      });
    }
    window.requestAnimationFrame(this.render.bind(this));
  }

  update() {
    if (this.updateTimer.millisecondsElapsed() > (1000 / this.updateTicks)) {
      this.updateTimer.mark();
      this.actors.forEach(function(actor) {
        if (actor.update)
          actor.update();
      });

    }
    window.requestAnimationFrame(this.update.bind(this));
  }

  /**
   * Stops the actors in this stage from looping
   **/
  stop() {
    this.running = false;
    /**
    this.actors.forEach(function(e) {
      e.actor.stop();
    });**/
    window.cancelAnimationFrame(this.render);
    window.cancelAnimationFrame(this.update);
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
