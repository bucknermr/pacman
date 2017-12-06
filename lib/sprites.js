import filter from 'lodash/filter';

export const LEFT = [0, -1];
export const UP = [-1, 0];
export const RIGHT = [0, 1];
export const DOWN = [1, 0];


class Sprite {
  constructor() {
    this.img = new Image();

    this.up = [-1, 0];
    this.down = [1, 0];
    this.left = [0, -1];
    this.right = [0, 1];
  }

  wrapPosition() {
    if (this.position[1] === 27.75) {
      this.position[1] = -0.75;
    } else if (this.position[1] === -0.75) {
      this.position[1] = 27.75;
    }
  }
}



export class Ghost extends Sprite {
  constructor({ color, position }) {
    super();
    this.color = color;
    this.img.src = `./assets/${color}.png`;
    this.position = position;

    this.dirs = [this.left, this.up, this.right, this.down];
    this.direction = this.randomDirection();

    this.speed = 0.125;
  }


  render(ctx, dim) {

    ctx.drawImage(
      this.img,
      40, 40,
      263, 263,
      this.position[1] * dim - 3, this.position[0] * dim - 3, dim * 1.4, dim * 1.4);
  }

  randomDirection() {
    return this.dirs[Math.floor(Math.random() * 4)];
  }

  reverse(dir) {
    switch(dir) {
      case this.right:
        return this.left;
      case this.left:
        return this.right;
      case this.up:
        return this.down;
      case this.down:
        return this.up;
    }
  }


  move(map) {
    this.calculateMove(map);
      this.position[0] += (this.direction[0] * this.speed);
      this.position[1] += (this.direction[1] * this.speed);

      this.wrapPosition();
  }



  calculateMove(map) {
    const possibleDirs = this.dirs.filter(dir => {
      if (dir === this.reverse(this.direction)) { return false; }

      const projectedTile = this.getProjectedTile(dir);
      const destination = projectedTile ? map.findTile(projectedTile) : null;

      return destination > 0 || destination < 0;
    });

    this.direction = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
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






}


















export class Pacman extends Sprite {
  constructor() {
    super();
    this.position = [23, 14];

    this.direction = this.right;
    this.newDir = null;

    this.img.src = './assets/pacman.png';

    this.speed = 0.125;

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

      this.wrapPosition();
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
      this.position[1] * dim - 3, this.position[0] * dim - 3, dim * 1.4, dim * 1.4);
  }
}
