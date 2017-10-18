/**
 * An Entity is an object that exists in the app
 * It has an init() function that is called on instantiation
 * It has an update() function that is called every render cycle
 **/
class WebObject {

  bindToElement(element) {
    this.element = element;
  }

  styleElement(element, styles) {
    Object.assign(element.style, styles);
  }

  styleElement(styles) {
    Object.assign(this.element.style, styles);
  }

}

/**
 * An Actor is an object that exists in a Stage
 * it has an HTML element that can be manipulated through functions
 **/
class Actor extends WebObject {
  //Calls the init() function before anything else
  constructor() {
    super();
    this.init();
  }

  //Called before actor is added to the stage
  init() {}

  //Called every update tick
  update() {}

  //Called every render tick
  render() {}

  /**
   * Set the position of the actor
   **/
  setLocation(x, y) {
    //sets the variables
    this.x = x;
    this.y = y;

    //sets the element style properties
    this.element.style["top"] = y + "px";
    this.element.style["left"] = x + "px";
  }

  getLocation() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

/**
 * A Stage is an object that manages the rendering
 * and updating of multiple Actors
 **/
class Stage extends WebObject {
  constructor() {
    super();
    this.init();
  }

  //Starts the loops
  start(updateTicksPerSecond, renderTicksPerSecond) {
    this.refreshUpdate = new Refresh(this.update, updateTicksPerSecond);
    this.refreshRender = new Refresh(this.render, renderTicksPerSecond);
    this.refreshUpdate.start();
    this.refreshRender.start();
  }

  init() {}

  update() {}

  render() {}

  addObject(obj) {
    this.element.appendChild(obj.element);
    if (this.objects)
      this.objects.push(obj);
    else
      this.objects = new Array(obj);

    console.log(this.objects);
  }
}
