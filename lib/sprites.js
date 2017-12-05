import filter from 'lodash/filter';

// class Sprite {
//   constructor({ position, direction, image }) {
//     this.position = position;
//     this.direction = direction;
//     this.image = new Image();
//     this.image.src = image;
//   }
// }

export const LEFT = [0, -1];
export const UP = [-1, 0];
export const RIGHT = [0, 1];
export const DOWN = [1, 0];


export class Pacman {
  constructor() {
    this.position = [23, 14];

    this.up = [-1, 0];
    this.down = [1, 0];
    this.left = [0, -1];
    this.right = [0, 1];

    this.direction = this.right;
    this.newDir = null;




    this.img = new Image();
    this.img.src = './assets/pacman.png';

    this.speed = 0.25;


    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    switch(e.which) {
      case 37:
        this.newDir = this.left;
        break;
      case 38:
        this.newDir = this.up;
        break;
      case 39:
        this.newDir = this.right;
        break;
      case 40:
        this.newDir = this.down;
        break;
    }
    if (this.newDir === this.direction) {
      this.newDir = null;
    }
  }

  move(map) {
    if (this.calculateMove(map)) {
      this.position[0] += (this.direction[0] * this.speed);
      this.position[1] += (this.direction[1] * this.speed);

      // wrapping
      if (this.position[1] > 27.5) {
        this.position[1] = -0.5;
      } else if (this.position[1] < -0.5) {
        this.position[1] = 27.5;
      }
    }
  }

  calculateMove(map) {
    let projectedTile;
    let destination;
    if (this.newDir) {
      projectedTile = this.getProjectedTile(this.newDir);
      destination = projectedTile ? map.findTile(projectedTile) : null;
    }
    if (destination > 0) {
      this.direction = this.newDir;
      this.newDir = null;
      return true;
    }

    projectedTile = this.getProjectedTile(this.direction);
    destination = map.findTile(projectedTile);
    return destination > 0;
  }

  getProjectedTile(dir) {
    const { position, speed, left, right, up, down } = this;

    const newPos = [];
    let projectedTile;

    newPos.push(position[0] + (dir[0] * speed));
    newPos.push(position[1] + (dir[1] * speed));

    if ((dir === left || dir === right) &&
          newPos[0] % 1 === 0) {
      projectedTile = [newPos[0], Math.floor(newPos[1])];

      if (dir === right && newPos[1] % 1 !== 0) {
        projectedTile[1] += 1;
      }

      // allows for wrapping

      if (projectedTile[1] < 0) {
        projectedTile[1] = 27;
      } else if (projectedTile[1] > 27) {
        projectedTile[1] = 0;
      }


    } else if((dir === up || dir === down) &&
    newPos[1] % 1 === 0) {
      projectedTile = [Math.floor(newPos[0]), newPos[1]];

      if (dir === down && newPos[0] % 1 !== 0) {
        projectedTile[0] += 1;
      }
    }

    return projectedTile;
  }

  rotate() {

  }

  render(ctx, dim) {

    ctx.drawImage(
      this.img,
      402, 17,
      160, 160,
      this.position[1] * dim, this.position[0] * dim, dim, dim);
  }
}
