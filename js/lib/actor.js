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
    actor.stop();
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
