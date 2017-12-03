class SilkObject {
  constructor(tagName, options, children) {
    this.tagName = tagName;
    this.options = options;

    //Array full of children elements
    this.children = (children) ? children : [];
  }

  convertToHTML() {
    let html = "";
    if (this.tagName)
      html += `<${this.tagName}>`;
    if (Array.isArray(this.children)) {
      this.children.forEach(function(child) {
        html += child.convertToHTML();
      });
    } else {
      html += this.children;
    }
    if (this.tagName)
      html += `</${this.tagName}>`;

    return html;
  }

  appendChild(childElement) {
    this.children.push(childElement);
  }

  insertChild(childElement, index) {
    this.children.splice(index, 0, childElement);
  }

  removeChild(childElement) {
    let index = this.children.indexOf(childElement);
    if (index > -1) {
      this.children.splice(index, 1);
      return;
    }
    this.children.forEach(function(child) {
      let index = child.children.indexOf(childElement);
      if (index > -1) {
        child.children.splice(index, 1);
        return;
      }
      return child.removeChild(childElement);
    });
  }

  querySelector(selector) {
    return querySelector(selector)[0];
  }

  querySelectors(selector) {
    let selected = [];
    this.children.forEach(function(child) {
      if (child.options[selector]) {
        selected.push(child);
      } else {
        child.querySelector(selector).forEach(function(e) {
          selected.push(e);
        });
      }
    });
    return selected;
  }

  getElementsByTagName(tagName) {
    let elements = [];
    this.children.forEach(function(child) {
      if (child.tagName === tagName) {
        elements.push(child);
      } else {
        child.getElementsByTagName(tagName).forEach(function(e) {
          elements.push(e);
        });
      }
    });
    return elements;
  }
}
