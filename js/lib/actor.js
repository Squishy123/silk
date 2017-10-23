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

}
