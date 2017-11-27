/**
 * An DOM object that houses actors and manages
 * their runtime states
 *
 * @author Christian Wang
 * @version 1.0
 **/
class Stage extends WebObject {
  /**
   * Creates a new Stage with a given element
   **/
  constructor(element) {
    super(element);
    this.objectsInStage = [];
    //How many times the actors render and update will loop per second
    this.defaultUpdateTicksPerSecond = 60;
    this.defaultRenderTicksPerSecond = 60;
    this.start();
  }

  /**
   * Creates a new QuadTree and sets it to the current bounds
   **/
  start() {
    this.quad = new QuadTree(this, 0, {
      x: 0,
      y: 0,
      width: this.element.getBoundingClientRect().width,
      height: this.height
    });
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
    this.objectsInStage.forEach(function(e) {
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
    this.objectsInStage.push({
      "actor": actor
    });
    this.element.appendChild(actor.element);
    //Add this actor to the quadtree
    this.quad.insert(actor, actor.getBounds());

    actor.start(this.defaultUpdateTicksPerSecond, this.defaultRenderTicksPerSecond);
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
    return this.objectsInStage;
  }
}
