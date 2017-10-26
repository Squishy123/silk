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

  setBounds(bounds) {
    if (bounds.x) {
      this.element.style["left"] = bounds.x + "px";
      this.x = bounds.x;
    }
    if (bounds.y) {
      this.element.style["top"] = bounds.y + "px";
      this.y = bounds.y;
    }
    if (bounds.width) {
      this.element.style["width"] = bounds.width + "px";
      this.width = bounds.width;
    }
    if (bounds.height) {
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
