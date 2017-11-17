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
    if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
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
    this.objectsInStage = this.objectsInStage.filter(function(element) {
      return element != actor;
    });
    this.element.removeChild(actor.element);
  }

  /**
   * Retunrs all the child objects in this stage
   **/
  getObjects() {
    return this.objectsInStage;
  }
}
