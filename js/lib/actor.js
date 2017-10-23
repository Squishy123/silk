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

}
