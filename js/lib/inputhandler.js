/**
 * Manages event listeners for an element
 *
 *@author Christian Wang
 *@version 1.0
 **/
export class InputHandler {
  /**
   * Creates a default InputHandler with properties
   **/
  constructor() {
    this.input = {
      keys: [],
      click: false
    };
  }

  /**
   * Listens on element for events given
   **/
  targetEvents(element, events) {
    let obj = this;
    if (events.keydown)
      element.addEventListener("keydown", function(e) {
        obj.input.keys[e.which] = true;
      });
    if (events.keyup)
      element.addEventListener("keyup", function(e) {
        obj.input.keys[e.which] = false;
        e.preventDefault();
      });
    if (events.click) {
      element.addEventListener("click", function(e) {
        obj.input.click = true;
      });
    }
  }

  /**
   * Returns the keys that are pressed
   **/
  get keys() {
    return this.input.keys;
  }

  /**
   * Returns true if the element has been clicked
   **/
  get click() {
    if (this.input.click) {
      //reset
      this.input.click = false;
      return true;
    }
    return this.input.click;
  }
}
