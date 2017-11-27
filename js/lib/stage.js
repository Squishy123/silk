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
   * Creates a new QuadTree and sets it to the current bounds
   **/
  start(renderTicks, updateTicks) {
    this.quad = new QuadTree(this, 0, {
      x: 0,
      y: 0,
      width: this.element.getBoundingClientRect().width,
      height: this.height
    });

    this.renderTicks = renderTicks;
    this.updateTicks = updateTicks;

    this.running = true;
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
    this.objectsInStage.forEach(function(e) {
      e.actor.stop();
    });
  }

  /**
   * Return a list of objects colliding with the given objects
   * Uses SAT algorithm
   **/
  checkCollisions(object1) {
    let quad = this.quad;
    let returnObjs = [];
    let cC = (obj1, obj2) => {
      return this.checkCollision(obj1, obj2)
    };
    this.actors.forEach(function(e) {
      quad.retrieve(returnObjs, object1).forEach(function(obj) {
        if (obj)
          if (obj != object1)
            if (cC(obj, object1))
              returnObjs.push(obj);
      });
    });
    return returnObjs;
  }

  /**
   * Returns true if 2 objects are colliding according to SAT algorithm
   **/
  checkCollision(object1, object2) {
    if (object1 instanceof SilkObject && object2 instanceof SilkObject)
      if (object1.getBounds().x < object2.getBounds().x + object2.getBounds().width && object1.getBounds().x + object1.getBounds().width > object2.getBounds().x &&
        object1.getBounds().y < object2.getBounds().y + object2.getBounds().height && object1.getBounds().y + object1.getBounds().height > object2.getBounds().y) {
        return true;
      }
    return false;
  }

  /**
   * Adds an actor to this stage
   **/
  addObject(actor) {
    actor.stage = this;
    this.actors.push(actor);
    this.element.appendChild(actor.element);
    //Add this actor to the quadtree
    this.quad.insert(actor, actor.getBounds());
    actor.init();
  }

  /**
   * Removes an object from this stage
   **/
  removeObject(actor) {
    actor.stage = null;
    actor.stop();
    let i = this.objectsInStage.findIndex(a => (a.getBounds() === actor.getBounds()));
    if (i != -1) {
      this.objectsInStage.splice(i, 1);
    }
    this.element.removeChild(actor.element);
  }

  /**
   * Returns all the child objects in this stage
   **/
  getObjects() {
    return this.actors;
  }
}
