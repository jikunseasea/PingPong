class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export default class Rect {
  constructor(w, h) {
    this.pos = new Vector();
    this.size = new Vector(w, h);
  }
}