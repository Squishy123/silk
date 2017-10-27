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

  //Starts the refresh cycle
  start() {
    this.running = false;
    this.rpsInterval = 1000 / this.rps;
    this.timer = new Timer();
    if (this.rps > 0)
      this.loop();
    else
      console.log(new WebFootError("Your RPS is at 0 so I'm not even gonna start"));
  }

  //Stops the refresh cycle
  stop() {
    this.running = true;
  }

  //Function that is refreshed every cycle
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
 * A basic DOM object
 *
 * @author Christian Wang
 * @version 1.0
 **/
class WebObject {
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
   * Add or set style properties to the elemennt
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
class WebFootError extends Error {}
/**
 * An DOM object with it's own layer of interactivity
 *
 * @author Christian Wang
 * @version 1.0
 **/
class Actor extends WebObject {
  /**
   * Creates a new Actor with a div element
   **/
  constructor() {
    super(document.createElement('div'));
    this.stage = null;
    this.objectsInStage = [];
    this.defaultUpdateTicksPerSecond = 60;
    this.defaultRenderTicksPerSecond = 60;
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

  update() {
    let obj = this;
    if (obj.stage == null) obj.refreshUpdate.stop();
  }

  render() {
    let obj = this;
    if (obj.stage == null) obj.refreshRender.stop();
  }


  /**
   * Starts the update and or render loops of this actor
   * If there is no render or update function, an error is thrown
   **/
  start(updateTicksPerSecond, renderTicksPerSecond) {
    this.init();
    if (this.update) {
      let update = () => {
        this.update()
      };
      this.refreshUpdate = new Refresh(update, updateTicksPerSecond);
    } else console.log(new WebFootError("Actor has no update function"));

    if (this.render) {
      let render = () => {
        this.render()
      };
      this.refreshRender = new Refresh(render, renderTicksPerSecond);

      this.refreshUpdate.start();
      this.refreshRender.start();
    } else console.log(new WebFootError("Actor has no render function"));
  }

  /**
   * Stops the update and or render loops of this actor
   * If there is no render or update function, an error is thrown
   **/
  stop() {
    if (this.refreshUpdate)
      this.refreshUpdate.stop();
    else console.log(new WebFootError("Actor has no update function"));
    if (this.refreshRender)
      this.refreshRender.stop();
    else console.log(new WebFootError("Actor has no render function"));
  }

  /**
   * Adds a child object to this actor
   **/
  addObject(actor) {
    actor.stage = this;
    this.objectsInStage.push({
      "actor": actor
    });
    this.element.appendChild(actor.element);
    //Add this actor to the quadtree
    //  this.quad.insert(actor, actor.getBounds());

    actor.start(this.defaultUpdateTicksPerSecond, this.defaultRenderTicksPerSecond);
  }

  /**
   * Removes a child object from this actor
   **/
  removeObject(actor) {
    actor.stage = null;
    this.objectsInStage = this.objectsInStage.filter(function(element) {
      return element != actor;
    });
    this.element.removeChild(actor.element);
  }

  /**
   * Returns all the child objects in this actor's scope
   **/
  getObjects() {
    return this.objectsInStage;
  }
}
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
