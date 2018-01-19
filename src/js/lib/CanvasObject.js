class CanvasObject {
  /**
   * Creates a new CanvasObject
   **/
  constructor() {}

  //Pass style as a function(ctx)
  styleElement(style) {
    this.style = style;
  }

  /**
   * Set the bounds(dimension and location) to the given bounds object
   **/
  setBounds(bounds) {
    if (bounds.x)
      this.x = bounds.x;
    if (bounds.y)
      this.y = bounds.y;
    if (bounds.width)
      this.width = bounds.width;
    if (bounds.height)
      this.height = bounds.height;
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
