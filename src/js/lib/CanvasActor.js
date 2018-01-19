/**
 * An Canvas object with it's own layer of interactivity
 *
 * @author Christian Wang
 * @version 1.0
 **/
class CanvasActor extends CanvasObject {
  /**
   * Creates a new Actor with a div element
   **/
  constructor() {
    super();
    //World stuff
    this.stage = null;

    //preload
    this.preload();
  }

  //Actor Processes
  preload() {}
  render() {}
  update() {}
  destroy() {}
}
