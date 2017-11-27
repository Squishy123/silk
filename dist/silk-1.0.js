/**
 * Counts the amount of seconds between a starting event
 * and an ending event
 *
 * @author Christian Wang
 * @version 1.0
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
 *Quadtree Implementation
 *
 * @author Christian Wang
 * @version 1.0
 **/
class QuadTree {
  /**
   * Creates a new QuadTree with a reference to an existing webObject,
   * the current level the node exists in and the bounds(dimensions and location) it has
   **/
  constructor(webObject, level, bounds) {
    //Reference to webObject
    this.webObject = webObject;

    //how many objects a node can hold before it splits
    this.MAX_OBJECTS = 10;
    //the deepest level subnode
    this.MAX_LEVELS = 5;

    //current node level
    this.level = level;
    //the 2D space this node occupies
    this.bounds = bounds;
    //Objects in this node
    this.objects = [];
    //reference to the 4 subnodes
    this.nodes = new Array(4);
  }

  /**
   * Clears the quadtree
   **/
  clear() {
    //Clear objects array
    this.objects = [];

    //Clear each node setting it's reference to null
    this.nodes.forEach(function(node) {
      if (node != null) {
        node.clear()
        node = null;
      }
    });
  }

  /**
   * Splits this node into 4 subnodes
   **/
  split() {
    let subWidth = this.bounds.width / 2;
    let subHeight = this.bounds.height / 2;
    let x = this.bounds.x;
    let y = this.bounds.y;

    //Subdivide the area into 4 subregions according to cartesian plane quadrant order
    this.nodes[0] = new QuadTree(this.level + 1, {
      x: x + subWidth,
      y: y + subHeight,
      width: subWidth,
      height: subHeight
    });
    this.nodes[1] = new QuadTree(this.level + 1, {
      x: x,
      y: y + subHeight,
      width: subWidth,
      height: subHeight
    });
    this.nodes[2] = new QuadTree(this.level + 1, {
      x: x,
      y: y,
      width: subWidth,
      height: subHeight
    });
    this.nodes[3] = new QuadTree(this.level + 1, {
      x: x + subWidth,
      y: y,
      width: subWidth,
      height: subHeight
    });
  }

  /**
   * Return the index of the object given bounds
   **/
  getIndex(bounds) {
    //If index is -1, the object can't fit in any child nodes and must be part of the parent node
    let index = -1;
    let verticalMidPoint = this.bounds.x + (this.bounds.width / 2);
    let horizontalMidPoint = this.bounds.y + (this.bounds.height / 2);

    //Boolean: if the object can fit in the top quadrants
    let topQuadrant = (bounds.y < horizontalMidPoint && bounds.y + bounds.height < horizontalMidPoint);
    //Boolean: if the object can fit in the bottom quadrants
    let bottomQuadrant = (bounds.y > horizontalMidPoint);

    //Object can fit within the left quadrants
    if (bounds.x < verticalMidPoint && bounds.x + bounds.width < verticalMidPoint) {
      if (topQuadrant) index = 1;
      else if (bottomQuadrant) index = 2;
    }
    //Object can fit within the left quadrants
    else if (bounds.x > verticalMidPoint) {
      if (topQuadrant) index = 0;
      else if (bottomQuadrant) index = 3;
    }
    return index;
  }

  /**
   * Insert an object into the QuadTree
   * If the node exceeds the capacity, it will split
   * and add all objects to their corresponding nodes
   **/
  insert(actor, bounds) {
    if (this.nodes[0] != null) {
      let index = this.getIndex(bounds);
      if (index != -1) {
        this.nodes[index].insert(this, bounds);
        return;
      }
    }

    this.objects.push(actor, bounds);

    if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
      if (this.nodes[0] == null) {
        this.split();
      }

      let i = 0;
      while (i < this.objects.length) {
        let index = this.getIndex(this.objects[i]);
        if (index != -1) {
          this.nodes[index].insert(this.objects.splice(i, 1));
        } else i++;
      }
    }
  }

  /**
   * Return a list of objects that could collide with a given object
   **/
  retrieve(returnObjects, bounds) {
    let index = this.getIndex(bounds);
    if (index != -1 && this.nodes[0] != null) {
      this.nodes[index].retrieve(returnObjects, bounds);
    }

    returnObjects = this.objects;
    return returnObjects;
  }
}
/**
 *
 *
 * @author Christian Wang
 * @version 1.0
 **/
class SilkObject {
  /**
   * Creates a new WebObject passing in an existing DOM element
   **/
  constructor(element) {
    this.bindElement(element);
    element.classList.add(this.constructor.name);
  }

  /**
   * Set this object's element to a new given element and
   * recalculate the new bounds
   **/
  bindElement(element) {
    this.element = element;
    //update initial bounds
    let bounds = element.getBoundingClientRect();
    this.setBounds(bounds);
  }

  /**
   * Add or set style properties to the element
   **/
  styleElement(styles) {
    Object.assign(this.element.style, styles);
  }

  /**
   * Set the bounds(dimension and location) to the given bounds object
   **/
  setBounds(bounds) {
    if (bounds.x)
      if (typeof bounds.x === "string") {
        this.element.style["left"] = bounds.x;
        this.x = this.element.getBoundingClientRect().x;
      } else {
        //assume its px
        this.element.style["left"] = bounds.x + "px";
        this.x = bounds.x;
      }
    if (bounds.y)
      if (typeof bounds.y === "string") {
        this.element.style["top"] = bounds.y;
        this.y = this.element.getBoundingClientRect().y;
      } else {
        this.element.style["top"] = bounds.y + "px";
        this.y = bounds.y;
      }
    if (bounds.width)
      if (typeof bounds.width === "string") {
        this.element.style["width"] = bounds.width;
        this.width = this.element.getBoundingClientRect().width;
      } else {
        this.element.style["width"] = bounds.width + "px";
        this.width = bounds.width;
      }
    if (bounds.height)
      if (typeof bounds.height === "string") {
        this.element.style["height"] = bounds.height;
        this.height = this.element.getBoundingClientRect().height;
      } else {
        this.element.style["height"] = bounds.height + "px";
        this.height = bounds.height;
      }
  }

  /**
   * Return the bounds(dimensions and location) of this object
   **/
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}

/**
 * Custom Errors
 *
 * @author Christian Wang
 * @version 1.0
 **/
class SilkError extends Error {}
/**
 * An DOM object with it's own layer of interactivity
 *
 * @author Christian Wang
 * @version 1.0
 **/
class Actor extends SilkObject {
  /**
   * Creates a new Actor with a div element
   **/
  constructor() {
    super(document.createElement('div'));
    //World stuff
    this.stage = null;
  }

  /**
   * Sets this object's element to a new given element,
   * recalculates the new element bounds and
   * removes the old element
   **/
  bindElement(element) {
    let temp = this.element;
    super.bindElement(element);
    //Removes the old element and adds the new element
    if (this.stage) {
      this.stage.element.removeChild(temp);
      this.stage.element.appendChild(this.element);
    }
  }

  init() {
    this.styleElement({
      "position": 'absolute'
    });
  }

  render() {

  }

  update() {

  }
}
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
    this.fpsTimer = new Timer();
    this.fps = 0;
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
    if(this.fpsTimer.millisecondsElapsed() >= 1000) {
      this.fpsTimer.mark();
      console.log(this.fps);
      this.fps = 0;
    }
    if (this.updateTimer.millisecondsElapsed() > (1000 / this.updateTicks)) {
      this.updateTimer.mark();
      this.fps++;
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
/**
 * Manages event listeners for an element
 *
 *@author Christian Wang
 *@version 1.0
 **/
class InputHandler {
  /**
   * Creates a default InputHandler with properties
   **/
  constructor() {
    this.input = {
      keys: [],
      click: false
    };
  }

  /**
   * Listens on element for events given
   **/
  targetEvents(element, events) {
    let obj = this;
    if (events.keydown)
      element.addEventListener("keydown", function(e) {
        obj.input.keys[e.which] = true;
      });
    if (events.keyup)
      element.addEventListener("keyup", function(e) {
        obj.input.keys[e.which] = false;
      });
    if (events.click) {
      element.addEventListener("click", function(e) {
        obj.input.click = true;
      });
    }
  }

  /**
   * Returns the keys that are pressed
   **/
  get keys() {
    return this.input.keys;
  }

  /**
   * Returns true if the element has been clicked
   **/
  get click() {
    if (this.input.click) {
      //reset
      this.input.click = false;
      return true;
    }
    return this.input.click;
  }
}
