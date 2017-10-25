//Custom WebFoot Errors
class WebFootError extends Error {}

class WebObject {
  constructor(element) {
    this.bindElement(element);
    element.classList.add(this.constructor.name);
    //Default these values are all zero
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }

  bindElement(element) {
    this.element = element;
  }

  styleElement(styles) {
    Object.assign(this.element.style, styles);
  }

  setLocation(location) {
    if (location.x) {
      this.element.style["left"] = location.x + "px";
      this.x = location.x;
    }

    if (location.y) {
      this.element.style["top"] = location.y + "px";
      this.y = location.y;
    }
  }

  setDimensions(dimensions) {
    if (dimensions.width) {
      this.element.style["width"] = dimensions.width + "px";
      this.width = dimensions.width;
    }

    if (dimensions.height) {
      this.element.style["height"] = dimensions.height + "px";
      this.height = dimensions.height;
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
