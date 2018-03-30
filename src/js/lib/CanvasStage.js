/**
 * A Canvas reference that houses canvascanvasActors and manages
 * their runtime states
 *
 * @author Christian Wang
 * @version 1.0
 **/
class CanvasStage extends SilkObject {
  /**
   * Creates a new CanvasStage with a passed canvas reference
   **/
  constructor(canvas) {
    super(canvas);
    //grab context
    this.ctx = canvas.getContext('2d');

    //background is a function(ctx)
    this.background = null;

    this.canvasActors = [];
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

      //render background
      if (this.background)
        this.background(this.ctx);

      let ctx = this.ctx;
      this.canvasActors.forEach(function (actor) {
        if (actor.render)
          actor.render();
        if (actor.style)
          actor.style(ctx);
      });
    }
    window.requestAnimationFrame(this.render.bind(this));
  }

  update() {
    if (this.updateTimer.millisecondsElapsed() > (1000 / this.updateTicks)) {
      this.updateTimer.mark();
      this.canvasActors.forEach(function (actor) {
        if (actor.update)
          actor.update();
      });

    }
    window.requestAnimationFrame(this.update.bind(this));
  }

  /**
   * Stops the canvasActors in this stage from looping
   **/
  stop() {
    this.running = false;
    /**
    this.canvasActors.forEach(function(e) {
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
    this.canvasActors.push(actor);
    if (bounds != null)
      actor.setBounds(bounds);
    actor.init();
  }

  /**
   * Removes an Actor from this stage
   **/
  removeActor(actor) {
    actor.stage = null;
    actor.stop();
    for (let i = 0; i < this.canvasActors.length; i++) {
      if (Object.is(actor, this.canvasActors[i]))
        this.canvasActors.splice(i, 1);
    }
    actor.destroy();
  }
}
