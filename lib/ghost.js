import Sprite from './sprite';
import { deleteFromArray } from './util';
import TileSpot from './tile_spot';

const GHOST = {
  right: {
    a: [3, 0],
    b: [35, 0]
  },
  down: {
    a: [3, 32],
    b: [35, 32]
  },
  left: {
    a: [3, 64],
    b: [35, 64]
  },
  up: {
    a: [3, 95],
    b: [35, 95]
  },
  blue: {
    a: [386, 0],
    b: [418, 0]
  },
  white: {
    a: [386, 32],
    b: [418, 32]
  },
  eyes: [386, 70]
};

class Ghost extends Sprite {
  constructor(tileSize, { color, position }) {
    super(tileSize);
    this.color = color;
    this.img.src = './assets/chompersprites.png';
    this.flutter = 'a';
    this.startingPosition = position;
    this.position = position.slice(0);
    this.getSpritePosition = this.getSpritePosition.bind(this);

    this.dirs = [this.left, this.up, this.right, this.down];
    this.direction = this.randomDirection();

    this.speedRate = 0.0625;
    this.speed = 2;
    this.status = 'normal';
    this.toggleFlutter();

    this.asyncIds = [];
    this.clearAsync = this.clearAsync.bind(this);
    this.flashing = this.flashing.bind(this);
    this.path = [];
  }

  toggleFlutter() {
    setInterval(() => {
      this.flutter = this.flutter === 'a' ? 'b' : 'a';
    }, 100);
  }

  getSpritePosition() {
    if (this.status === 'blue') { return GHOST['blue'][this.flutter]; }
    if (this.status === 'white') { return GHOST['white'][this.flutter]; }
    if (this.status === 'eyes') { return GHOST['eyes']; }

    const direction = this.directionToString();
    let position = GHOST[direction][this.flutter];
    switch(this.color) {
      case 'red':
        return position;
      case 'orange':
        return [position[0] + 64, position[1]];
      case 'pink':
        return [position[0] + 128, position[1]];
      case 'blue':
        return [position[0] + 192, position[1]];
    }
  }

  clearAsync() {
    this.asyncIds.forEach(id => {
      clearTimeout(id);
      clearInterval(id);
    });
  }

  scared() {
    this.clearAsync();
    this.status = 'blue';
    const timeoutId = setTimeout(this.flashing, 5000);
    this.asyncIds.push(timeoutId);
  }

  flashing() {
    const id = setInterval(() => {
      this.status = this.status === 'blue' ? 'white' : 'blue';
    }, 500);
    this.asyncIds.push(id);
    this.asyncIds.push(setTimeout(() => {
      this.clearAsync();
      this.status = 'normal';
    }, 4000));
  }

  retreat() {
    this.status = 'eyes';
    this.clearAsync();
  }

  render(ctx) {
    const dim = [26, 32];

    ctx.drawImage(
      this.img,
      ...this.getSpritePosition(),
      ...dim,
      this.position[1] * this.tileSize - 3,
      this.position[0] * this.tileSize - 3,
      this.tileSize * 1.4,
      this.tileSize * 1.4);
  }

  randomDirection() {
    return this.dirs[Math.floor(Math.random() * 4)];
  }

  checkCollision(pacPos) {
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
    let speed;
    switch(this.status) {
      case 'blue':
      case 'white':
        speed = 1;
        break;
      case 'eyes':
        speed = 4;
        break;
      default:
        speed = 2;
    }

    for (let i = 0; i < speed; i++) {
      this.calculateMove(map);

      this.position[0] += (this.direction[0] * this.speedRate);
      this.position[1] += (this.direction[1] * this.speedRate);

      this.wrapPosition();
    }
  }



  calculateMove(map) {
    if (!this.onExactTile()) { return; }

    if (this.status === 'eyes' && this.path.length === 0) {
      this.findPath(map);
    }

    if (this.path.length > 0) {
      const nextPos = this.path.shift();
      this.direction = this.calcDirectionToPos(this.position, nextPos);
      if (this.path.length === 0) { this.status = 'normal'; }

    } else {
      const possibleDirs = this.calcPossibleDirs(map);
      this.direction = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
    }
  }

  calcDirectionToPos(from, to) {
    if (from[0] < to[0]) { return this.down; }
    if (from[0] > to[0]) { return this.up; }
    if (from[1] < to[1]) { return this.right; }
    return  this.left;
  }

  calcPossibleDirs(map) {
    const openTiles = map.getAdjacentOpenTiles(this.position);
    let dirs;
    if (this.inTunnel()) {
      dirs = [this.right, this.left];
    } else {
      dirs = openTiles.map(tile => this.calcDirectionToPos(this.position, tile));
    }
    return dirs.filter(dir => dir !== this.reverse(this.direction));
  }

  inTunnel() {
    return this.position[1] === 0 || this.position[1] === 27;
  }

  findPath(map, endPos) {
    endPos = endPos || this.startingPosition;
    const grid = map.gridOfTileSpots();
    const start = grid[this.position[0]][this.position[1]];
    const end = grid[endPos[0]][endPos[1]];
    const open = [start];
    const closed = [];

    while (open.length > 0) {
      let found = false;
      let lowestIdx = 0;
      for (let i = 0; i < open.length; i++) {
        if (open[i].fScore < open[lowestIdx].fScore) {
          lowestIdx = i;
        }

        let currentTileSpot = open[lowestIdx];

        if (currentTileSpot === end) {
          console.log('FOUND!');
          // find the path
          this.tracePath(currentTileSpot);

          found = true;
          break;
        }

        deleteFromArray(open, currentTileSpot);
        closed.push(currentTileSpot);
        let neighbors = [];
        map.getAdjacentOpenTiles(currentTileSpot.pos).forEach(pos => {
          neighbors.push(grid[pos[0]][pos[1]]);
        });

        neighbors.forEach(neighbor => {
          if (!closed.includes(neighbor)) {
            const tempGScore = currentTileSpot.gScore + 1;
            if (!open.includes(neighbor)) {
              neighbor.gScore = tempGScore;
              neighbor.parent = currentTileSpot;
              open.push(neighbor);
            } else if (tempGScore < neighbor.gScore) {
              neighbor.gScore = tempGScore;
              neighbor.parent = currentTileSpot;
            }

            neighbor.hScore = this.calcHScore(neighbor.pos, endPos);
            neighbor.fScore = neighbor.gScore + neighbor.hScore;
          }
        });

      }
      if (found) { break; }
    }
  }

  calcHScore(tile, destination) {
    return Math.abs(tile[0] - destination[0]) + Math.abs(tile[1] - destination[1]);
  }


  tracePath(end) {
    let currentTile = end;
    this.path = [];
    while (currentTile.parent) {
      this.path.unshift(currentTile.pos);
      currentTile = currentTile.parent;
    }
  }


  onExactTile() {
    return this.position.every(coor => coor % 1 === 0);
  }
}

export default Ghost;
