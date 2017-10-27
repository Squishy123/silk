/**require("js/lib/refresh.js");
require("js/lib/quadtree.js");
require("js/lib/webobject.js");
require("js/lib/bounds.js");
require("js/lib/stage.js");
**/

class Actor extends WebObject {
  constructor() {
    super(document.createElement('div'));
    this.stage = null;
    this.objectsInStage = [];
    this.defaultUpdateTicksPerSecond = 60;
    this.defaultRenderTicksPerSecond = 60;
  }

  bindElement(element) {
    let temp = this.element;
    this.element = element;
    if (this.stage) {
      this.stage.element.removeChild(temp);
      this.stage.element.appendChild(element);
    }
  }

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

  stop() {
    if (this.refreshUpdate)
      this.refreshUpdate.stop();
    if (this.refreshRender)
      this.refreshRender.stop();
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
