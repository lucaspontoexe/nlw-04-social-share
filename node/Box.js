class Box {
  /**
   * @param {number} y
   * @param {number} x
   * @param {number} width
   * @param {number} height
   */
  constructor(y, x, width, height) {
    this.top = y;
    this.left = x;
    this.width = width;
    this.height = height;
    //aliases
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
  }

  get right() {
    return this.left + this.width;
  }

  get bottom() {
    return this.top + this.height;
  }
}

module.exports = Box;
