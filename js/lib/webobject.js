//Custom WebFoot Errors
class WebFootError extends Error {}

class WebObject {
  constructor(element) {
    this.bindElement(element);
    element.classList.add(this.constructor.name);
  }

  bindElement(element) {
    this.element = element;
    //update initial bounds
    let bounds = element.getBoundingClientRect();
    this.setBounds(bounds);
    console.log(this.getBounds());
  }

  styleElement(styles) {
    Object.assign(this.element.style, styles);
  }

  //Put in any type of value(%, string, px, em)
  setBounds(bounds) {
    if (bounds.x)
      if (typeof bounds.x === "string") {
        this.element.style["left"] = bounds.x;
        this.x = this.element.getBoundingClientRect().x;
      } else {
        //assume its px
        this.element.style["left"] = bounds.x + "px";
        this.x = bounds.x;
      }
    if (bounds.y)
      if (typeof bounds.y === "string") {
        this.element.style["top"] = bounds.y;
        this.y = this.element.getBoundingClientRect().y;
      } else {
        this.element.style["top"] = bounds.y + "px";
        this.y = bounds.y;
      }
    if (bounds.width)
      if (typeof bounds.width === "string") {
        this.element.style["width"] = bounds.width;
        this.width = this.element.getBoundingClientRect().width;
      } else {
        this.element.style["width"] = bounds.width + "px";
        this.width = bounds.width;
      }
    if (bounds.height)
      if (typeof bounds.height === "string") {
        this.element.style["height"] = bounds.height;
        this.height = this.element.getBoundingClientRect().height;
      } else {
        this.element.style["height"] = bounds.height + "px";
        this.height = bounds.height;
      }
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}
