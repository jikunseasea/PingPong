export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  get length() {
    return Math.sqrt(this.x ** 2, this.y ** 2);
  }

  set length(v) {
    const fact = v / this.length;
    this.x *= fact;
    this.y *= fact;
  }
}
