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
  constructor() {
    super(document.createElement('div'));
    //World stuff
    this.stage = null;
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

  render() {

  }

  update() {

  }
}
