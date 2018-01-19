 /**
 * @author Christian Wang
 * @version 1.0
 **/
class SilkObject {
  /**
   * Creates a new WebObject passing in an existing DOM element
   **/
  constructor(element) {
    this.bindElement(element);
    element.classList.add(this.constructor.name);
  }

  /**
   * Set this object's element to a new given element and
   * recalculate the new bounds
   **/
  bindElement(element) {
    this.element = element;
    //update initial bounds
    let bounds = element.getBoundingClientRect();
    this.setBounds(bounds);
  }

  /**
   * Add or set style properties to the element
   **/
  styleElement(styles) {
    Object.assign(this.element.style, styles);
  }

  /**
   * Set the bounds(dimension and location) to the given bounds object
   **/
  setBounds(bounds) {
    if (bounds.x)
      if (typeof bounds.x === "string") {
        this.element.style["left"] = bounds.x;
        //recalc based on bounds
        this.x = this.element.getBoundingClientRect().x;
      } else {
        //assume its px
        this.element.style["left"] = bounds.x + "px";
        this.x = bounds.x;
      }
    if (bounds.y)
      if (typeof bounds.y === "string") {
        this.element.style["top"] = bounds.y;
        //recalc based on bounds
        this.y = this.element.getBoundingClientRect().y;
      } else {
        this.element.style["top"] = bounds.y + "px";
        this.y = bounds.y;
      }
    if (bounds.width)
      if (typeof bounds.width === "string") {
        this.element.style["width"] = bounds.width;
        //recalc based on bounds
        this.width = this.element.getBoundingClientRect().width;
      } else {
        this.element.style["width"] = bounds.width + "px";
        this.width = bounds.width;
      }
    if (bounds.height)
      if (typeof bounds.height === "string") {
        this.element.style["height"] = bounds.height;
        //recalc based on bounds
        this.height = this.element.getBoundingClientRect().height;
      } else {
        this.element.style["height"] = bounds.height + "px";
        this.height = bounds.height;
      }
  }

  /**
   * Return the bounds(dimensions and location) of this object
   **/
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}
