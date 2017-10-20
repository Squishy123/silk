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

class Bounds {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  updateBounds(boundProperties) {
    if (boundProperties.x)
      this.x = boundProperties.x;
    if (boundProperties.y)
      this.y = boundProperties.y;
    if (boundProperties.width)
      this.width = boundProperties.width;
    if (boundProperties.height)
      this.height = boundProperties.height;
  }
}

//Quadtree Implementation
//TODO Allow quadtree to have a reference to an actor
class QuadTree {
  constructor(level, bounds) {
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
    this.nodes[0] = new QuadTree(this.level + 1, new Bounds(x + subWidth, y + subHeight, subWidth, subHeight));
    this.nodes[1] = new QuadTree(this.level + 1, new Bounds(x, y + subHeight, subWidth, subHeight));
    this.nodes[2] = new QuadTree(this.level + 1, new Bounds(x, y, subWidth, subHeight));
    this.nodes[3] = new QuadTree(this.level + 1, new Bounds(x + subWidth, y, subWidth, subHeight));
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
  insert(bounds) {
    if (this.nodes[0] != null) {
      let index = getIndex(bounds);
      if (index != -1) {
        this.nodes[index].insert(bounds);
        return;
      }
    }

    this.objects.push(bounds);

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
    this.stage = null;
    this.bounds = new Bounds(0, 0, 0, 0);
  }

  start(updateTicksPerSecond, renderTicksPerSecond) {
    this.init(this);
    if (this.update) {
      let update = () => {
        this.update(this)
      };
      this.refreshUpdate = new Refresh(update, updateTicksPerSecond);
    } else console.log(new WebFootError("Actor has no update function"));

    if (this.render) {
      let render = () => {
        this.render(this)
      };
      this.refreshRender = new Refresh(render, renderTicksPerSecond);

      this.refreshUpdate.start();
      this.refreshRender.start();
    } else console.log(new WebFootError("Actor has no render function"));
  }

  init() {
    //Add all the default styles
    this.styleElement({
      "position": 'absolute',
      "top": '0px',
      "left": '0px'
    });
  }

  update(obj) {
    if (obj.stage == null) obj.refreshUpdate.stop();
  }

  render(obj) {
    if (obj.stage == null) obj.refreshRender.stop();
  }

  setLocation(location) {
    let boundProperties = {};
    //sets the variables
    if (location.x) {
      this.x = location.x;
      boundProperties.x = location.x;
    }

    if (location.y) {
      this.y = location.y;
      boundProperties.y = location.y;
    }
    //sets the element style properties
    this.element.style["top"] = location.y + "px";
    this.element.style["left"] = location.x + "px";

    //updateBounds
    this.bounds.updateBounds(boundProperties);
  }

  getLocation() {
    return {
      x: this.x,
      y: this.y
    };
  }

  getDimensions() {
    return {
      width: this.element.style["width"].replace("px", ""),
      height: this.element.style["height"].replace("px", "")
    }
  }

  setDimensions(dimensions) {
    let boundProperties = {};

    if (dimensions.width) {
      this.element.style["width"] = dimensions.width + "px";
      boundProperties.width = dimensions.width;
    }

    if (dimensions.height) {
      this.element.style["height"] = dimensions.height + "px";
      boundProperties.height = dimensions.height;
    }
    //updateBounds
    this.bounds.updateBounds(boundProperties);
  }
}

class Stage extends WebObject {
  constructor(element) {
    super(element);
    this.objectsInStage = [];
    this.defaultUpdateTicksPerSecond = 60;
    this.defaultRenderTicksPerSecond = 60;
  }

  start() {
    this.quad = new QuadTree(0, new Bounds(0, 0, this.getDimensions().width, this.getDimensions().height));
  }

  updateQuadTree() {
    let quad = this.quad;
    if (this.objectsInStage)
      this.objectsInStage.forEach(function(obj) {
        if (quad) {
          quad.clear();
          quad.insert(obj.actor.bounds);
        }
      });

    //Testing
    //console.log("X: " + this.quad.objects[0].x + " Y: " + this.quad.objects[0].y);
  }

  addObject(actor) {
    actor.stage = this;
    this.objectsInStage.push({
      "actor": actor
    });
    this.element.appendChild(actor.element);


    //updateQuadTree
    this.updateQuadTree();

    //Start the actor's cycles
    actor.start(this.defaultUpdateTicksPerSecond, this.defaultRenderTicksPerSecond);
  }

  removeObject(actor) {
    actor.stage = null;
    this.objectsInStage = this.objectsInStage.filter(function(element) {
      return element != actor;
    });
    this.element.removeChild(actor.element);
  }

  getObjects() {
    return this.objectsInStage;
  }

  getDimensions() {
    return {
      width: this.element.style["width"].replace("px", ""),
      height: this.element.style["height"].replace("px", "")
    }
  }

  setDimensions(dimensions) {
    let boundProperties = {};

    if (dimensions.width) {
      this.element.style["width"] = dimensions.width + "px";
      boundProperties.width = dimensions.width;
    }

    if (dimensions.height) {
      this.element.style["height"] = dimensions.height + "px";
      boundProperties.height = dimensions.height;
    }
    //updateBounds
    this.bounds.updateBounds(boundProperties);
  }

  //getCollidingObjects
}
