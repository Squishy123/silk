/**
 * An DOM object with it's own layer of interactivity
 *
 * @author Christian Wang
 * @version 1.0
 **/
class CanvasActor extends CanvasObject {
  /**
   * Creates a new Actor with a div element
   **/
  constructor(element) {
    super(element);
    //World stuff
    this.stage = null;

    //create
    this.create();
  }

  //Actor Processes
  create() {}
  init() {}
  render() {}
  update() {}
  destroy() {}
}
