class InputHandler {
  constructor() {
    this.input = {
      keys: [],
      click: false
    };
  }

  targetEvents(element, events) {
    let obj = this;
    if (events.keydown)
      element.addEventListener("keydown", function(e) {
        obj.input.keys[e.which] = true;
      });
    if (events.keyup)
      element.addEventListener("keyup", function(e) {
        obj.input.keys[e.which] = false;
      });
    if (events.click) {
      element.addEventListener("click", function(e) {
        obj.input.click = true;
      });
    }
  }

  get keys() {
    return this.input.keys;
  }

  get click() {
    if (this.input.click) {
      //reset
      this.input.click = false;
      return true;
    }
    return this.input.click;
  }
}
