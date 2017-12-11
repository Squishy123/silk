/**
 * An DOM object with it's own layer of interactivity
 *
 * @author Christian Wang
 * @version 1.0
 **/
class Actor extends SilkObject {
  /**
   * Creates a new Actor with a div element
   **/
  constructor(element) {
    super(element);
    //World stuff
    this.stage = null;
  }

  //Actor Processes
  preload() {}
  render() {}
  update() {}
  destroy() {}
}
