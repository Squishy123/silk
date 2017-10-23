/**require("js/lib/refresh.js");
require("js/lib/quadtree.js");
require("js/lib/webobject.js");
require("js/lib/bounds.js");
require("js/lib/actor.js");
**/
class Stage extends WebObject {
  constructor(element) {
    super(element);
    this.objectsInStage = [];
    this.defaultUpdateTicksPerSecond = 60;
    this.defaultRenderTicksPerSecond = 60;

    this.bounds = new Bounds(0, 0, 0, 0);
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
    //this.updateQuadTree();

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

  updateBounds(boundProperties) {
    this.updateBounds(boundProperties);
  }

  getBounds() {
    return this.bounds;
  }

  //getCollidingObjects
}
