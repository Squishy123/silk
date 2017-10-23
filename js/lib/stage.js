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
  }


  start() {
    this.quad = new QuadTree(0, {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    });
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
}
