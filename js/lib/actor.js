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

    //By default it is set to
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
      "position": 'absolute'
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
    if (location.x)
      boundProperties.x = location.x;

    if (location.y)
      boundProperties.y = location.y;
    //sets the element style properties
    this.element.style["top"] = location.y + "px";
    this.element.style["left"] = location.x + "px";

    //updateBounds
    this.bounds.updateBounds(boundProperties);
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

  getBounds() {
    return this.bounds;
  }
}
