import filter from 'lodash/filter';

export const LEFT = [0, -1];
export const UP = [-1, 0];
export const RIGHT = [0, 1];
export const DOWN = [1, 0];


class Sprite {
  constructor(tileSize) {
    this.img = new Image();

    this.tileSize = tileSize;

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

  checkColission() {
    return false;
  }


}



export class Ghost extends Sprite {
  constructor(tileSize, { color, position }) {
    super(tileSize);
    this.color = color;
    this.img.src = `./assets/${color}.png`;
    this.position = position;

    this.dirs = [this.left, this.up, this.right, this.down];
    this.direction = this.randomDirection();

    this.speed = 0.125;
  }


  render(ctx) {

    ctx.drawImage(
      this.img,
      40, 40,
      263, 263,
      this.position[1] * this.tileSize - 3,
      this.position[0] * this.tileSize - 3,
      this.tileSize * 1.4,
      this.tileSize * 1.4);
  }

  randomDirection() {
    return this.dirs[Math.floor(Math.random() * 4)];
  }

  checkColission(pacPos) {
    return this.position.every((pos, i) => {
      return Math.abs(pos - pacPos[i]) < .75;
    });
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










const PACMAN = {
  right: [322, 2],
  rightOpen: [354, 2],
  down: [322, 34],
  downOpen: [354, 34],
  left: [322, 66],
  leftOpen: [354, 66],
  up: [322, 98],
  upOpen: [354, 98],
};







export class Pacman extends Sprite {
  constructor(tileSize) {
    super(tileSize);
    this.position = [23, 14];

    this.direction = this.right;
    this.newDir = null;

    this.img.src = './assets/chompersprites.png';

    this.open = true;
    this.mouthId = null;
    this.moveMouth = this.moveMouth.bind(this);

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

      if (!this.mouthId) {
        this.mouthId = setInterval(this.moveMouth, 100);
      }

      this.rotate(this.direction);
      this.wrapPosition();

    } else if (this.mouthId) {
      clearInterval(this.mouthId);
      this.mouthId = null;
    }
  }

  moveMouth() {
    console.log(this.open);
    this.open = !this.open;
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


  checkColission(tiles) {
    if (this.position.every(coor => coor % 1 === 0)) {
      tiles[this.position[0]][this.position[1]] = 1;
    }
    return false;
  }

  rotate() {
    switch(this.direction) {
      case this.right:
        this.rotation = 'right';
        break;
      case this.left:
        this.rotation = 'left';
        break;
      case this.up:
        this.rotation = 'up';
        break;
      case this.down:
        this.rotation = 'down';
        break;
    }

    this.rotation += this.open ? 'Open' : '';
  }

  render(ctx) {

    ctx.drawImage(
      this.img,
      ...PACMAN[this.rotation],
      27, 27,
      this.position[1] * this.tileSize - 3,
      this.position[0] * this.tileSize - 3,
      this.tileSize * 1.4,
      this.tileSize * 1.4);
  }
}
