class Bounds {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  updateBounds(boundProperties) {
    if (boundProperties.x)
      this.x = boundProperties.x;
    if (boundProperties.y)
      this.y = boundProperties.y;
    if (boundProperties.width)
      this.width = boundProperties.width;
    if (boundProperties.height)
      this.height = boundProperties.height;
  }
}
