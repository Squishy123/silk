//Custom WebFoot Errors
class WebFootError extends Error {}

class WebObject {
  constructor(element) {
    this.bindElement(element);
  }

  bindElement(element) {
    this.element = element;
  }

  styleElement(styles) {
    Object.assign(this.element.style, styles);
  }
}
