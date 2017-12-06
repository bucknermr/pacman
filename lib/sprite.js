export const LEFT = [0, -1];
export const UP = [-1, 0];
export const RIGHT = [0, 1];
export const DOWN = [1, 0];


class Sprite {
  constructor(tileSize) {
    this.img = new Image();

    this.tileSize = tileSize;

    this.up = UP;
    this.down = DOWN;
    this.left = LEFT;
    this.right = RIGHT;
  }

  wrapPosition() {
    if (this.position[1] === 27.75) {
      this.position[1] = -0.75;
    } else if (this.position[1] === -0.75) {
      this.position[1] = 27.75;
    }
  }

  directionToString() {
    let direction;
    switch(this.direction) {
      case this.right:
        return 'right';
      case this.left:
        return 'left';
      case this.up:
        return 'up';
      case this.down:
        return 'down';
    }
  }

  checkCollision() {
    return false;
  }
}

export default Sprite;
