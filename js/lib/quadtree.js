/**
 *Quadtree Implementation
 *
 * @author Christian Wang
 * @version 1.0
 **/
class QuadTree {
  /**
   * Creates a new QuadTree with a reference to an existing webObject,
   * the current level the node exists in and the bounds(dimensions and location) it has
   **/
  constructor(webObject, level, bounds) {
    //Reference to webObject
    this.webObject = webObject;

    //how many objects a node can hold before it splits
    this.MAX_OBJECTS = 10;
    //the deepest level subnode
    this.MAX_LEVELS = 5;

    //current node level
    this.level = level;
    //the 2D space this node occupies
    this.bounds = bounds;
    //Objects in this node
    this.objects = [];
    //reference to the 4 subnodes
    this.nodes = new Array(4);
  }

  /**
   * Clears the quadtree
   **/
  clear() {
    //Clear objects array
    this.objects = [];

    //Clear each node setting it's reference to null
    this.nodes.forEach(function(node) {
      if (node != null) {
        node.clear()
        node = null;
      }
    });
  }

  /**
   * Splits this node into 4 subnodes
   **/
  split() {
    let subWidth = this.bounds.width / 2;
    let subHeight = this.bounds.height / 2;
    let x = this.bounds.x;
    let y = this.bounds.y;

    //Subdivide the area into 4 subregions according to cartesian plane quadrant order
    this.nodes[0] = new QuadTree(this.level + 1, {
      x: x + subWidth,
      y: y + subHeight,
      width: subWidth,
      height: subHeight
    });
    this.nodes[1] = new QuadTree(this.level + 1, {
      x: x,
      y: y + subHeight,
      width: subWidth,
      height: subHeight
    });
    this.nodes[2] = new QuadTree(this.level + 1, {
      x: x,
      y: y,
      width: subWidth,
      height: subHeight
    });
    this.nodes[3] = new QuadTree(this.level + 1, {
      x: x + subWidth,
      y: y,
      width: subWidth,
      height: subHeight
    });
  }

  /**
   * Return the index of the object given bounds
   **/
  getIndex(bounds) {
    //If index is -1, the object can't fit in any child nodes and must be part of the parent node
    let index = -1;
    let verticalMidPoint = this.bounds.x + (this.bounds.width / 2);
    let horizontalMidPoint = this.bounds.y + (this.bounds.height / 2);

    //Boolean: if the object can fit in the top quadrants
    let topQuadrant = (bounds.y < horizontalMidPoint && bounds.y + bounds.height < horizontalMidPoint);
    //Boolean: if the object can fit in the bottom quadrants
    let bottomQuadrant = (bounds.y > horizontalMidPoint);

    //Object can fit within the left quadrants
    if (bounds.x < verticalMidPoint && bounds.x + bounds.width < verticalMidPoint) {
      if (topQuadrant) index = 1;
      else if (bottomQuadrant) index = 2;
    }
    //Object can fit within the left quadrants
    else if (bounds.x > verticalMidPoint) {
      if (topQuadrant) index = 0;
      else if (bottomQuadrant) index = 3;
    }
    return index;
  }

  /**
   * Insert an object into the QuadTree
   * If the node exceeds the capacity, it will split
   * and add all objects to their corresponding nodes
   **/
  insert(actor, bounds) {
    if (this.nodes[0] != null) {
      let index = getIndex(bounds);
      if (index != -1) {
        this.nodes[index].insert(this, bounds);
        return;
      }
    }

    this.objects.push(actor, bounds);

    if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
      if (this.nodes[0] == null) {
        this.split();
      }

      let i = 0;
      while (i < this.objects.length) {
        let index = this.getIndex(this.objects[i]);
        if (index != -1) {
          this.nodes[index].insert(this.objects.splice(i, 1));
        } else i++;
      }
    }
  }

  /**
   * Return a list of objects that could collide with a given object
   **/
  retrieve(returnObjects, bounds) {
    let index = this.getIndex(bounds);
    if (index != -1 && this.nodes[0] != null) {
      this.nodes[index].retrieve(returnObjects, bounds);
    }

    returnObjects = this.objects;
    return returnObjects;
  }
}
