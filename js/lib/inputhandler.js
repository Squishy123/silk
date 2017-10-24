class InputHandler {
  constructor() {
    this.keys = [];
  }

  targetEvents(events) {
    let obj = this;
    if (events.keydown)
      document.addEventListener("keydown", function(e) {
        obj.keys[e.which] = true;
      });
    if (events.keyup)
      document.addEventListener("keyup", function(e) {
        obj.keys[e.which] = false;
      });
  }

}
