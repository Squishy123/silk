class SilkTree {
  constructor() {
    this.SilkObjects = [];
    this.SilkProcesses = [];
  }

  createElement(tagName, options, children) {
    let createdElement = new SilkObject(tagName, options, children);
    this.SilkObjects.push(createdElement);
    return createdElement;
  }

  updateTree() {

  }
}
