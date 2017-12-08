import Sprite from './sprite';
import { equalArrays } from './util';
import Path from './path';

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

    this.speed = 0.125;
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
    // this.speed = 0.25;
    // this.speed = this.speed * 2;
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
    this.calculateMove(map);

    this.position[0] += (this.direction[0] * this.speed);
    this.position[1] += (this.direction[1] * this.speed);

    this.wrapPosition();


    // TODO: refactor this repitition

    if (this.status === 'eyes') {
      this.calculateMove(map);

      this.position[0] += (this.direction[0] * this.speed);
      this.position[1] += (this.direction[1] * this.speed);

      this.wrapPosition();
    }
  }



  calculateMove(map) {
    if (!this.onExactTile()) { return; }
    const possibleDirs = this.calcPossibleDirs(map);

    if (this.status === 'eyes' && this.path.length === 0) {
      this.findPath(map);
    }

    this.direction = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];

    // if (this.status === 'eyes') {
    //   this.findWayHome(possibleDirs);
    // } else {
    //   this.direction =
    //     possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
    // }
  }

  calcPossibleDirs(map) {
    return this.dirs.filter(dir => {
      if (dir === this.reverse(this.direction)) { return false; }

      const projectedTile = this.getProjectedTile(dir);
      const destination = projectedTile ? map.findTile(projectedTile) : null;

      return destination > 0 || destination < 0;
    });
  }

  findPath(map, destination) {
    destination = destination || this.startingPosition;
    const start = this.onExactTile() ? (
      this.position) : (this.getProjectedTile(this.direction));
    start.gScore = 0;
    const closed = { [start]: true };
    debugger;
    let adjacentTiles = map.getAdjacentOpenTiles(start);
    let open = [...adjacentTiles];
    open.forEach(tile => {tile.parent = start; });
    open = open.filter(tile => !closed[tile]);

    while (!closed[destination]) {
      open.forEach(tile => {
        closed[tile] = true;
        this.getScores(tile, destination);
      });
      if (!closed[destination]) {
        const newTiles = [];
        console.log('OPEN: ', open);
        open.forEach(tile => {



          if (!tile) { debugger; }


          adjacentTiles = map.getAdjacentOpenTiles(tile);

          console.log('adjacenttiles!!!!', adjacentTiles);

          adjacentTiles.forEach(t => {
            if (!t) { debugger }
            t.parent = tile;
            if (!newTiles.some(t2 => equalArrays(t, t2))) {
              newTiles.push(t);
            }
          });
        });

        open = newTiles.filter((tile, idx) => {
          return !closed[tile] && newTiles.indexOf(tile) === idx;
        });
      }
    }

    this.path = this.tracePath(closed[destination]);
  }

  tracePath(end) {
    let currentTile = end;
    let path = [currentTile];
    while (currentTile.parent) {
      path.unshift(currentTile);
      currentTile = currentTile.parent;
    }
    return path;
  }

  getScores(tile, destination) {
    tile.gScore = tile.parent.gScore + 1;
    tile.hScore = this.calcHScore(tile, destination);
    tile.fScore = tile.gScore + tile.hScore;
    return tile;
  }

  calcHScore(tile, destination) {
    return Math.abs(tile[0] - destination[0]) + Math.abs(tile[1] - destination[1]);
  }

  onExactTile() {
    return this.position.every(coor => coor % 1 === 0);
  }


  getProjectedTile(dir) {
    const { position, speed, left, right, up, down } = this;

    const newPos = [];
    let projectedTile;

    newPos.push(position[0] + (dir[0] * speed));
    newPos.push(position[1] + (dir[1] * speed));

    // if ((dir === left || dir === right) &&
    //       newPos[0] % 1 === 0) {
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

export default Ghost;



















// findWayHome(possibleDirs) {
//   if (possibleDirs.length === 1) {
//     this.direction = possibleDirs[0];
//     return;
//   }
//
//   const preferredDirs = [];
//   const rowDifference = this.startingPosition[0] - this.position[0];
//   const colDifference = this.startingPosition[1] - this.position[1];
//   if (Math.abs(rowDifference) > Math.abs(colDifference)) {
//     preferredDirs.push(this.calcUpDown(rowDifference));
//     preferredDirs.push(this.calcRightLeft(colDifference));
//   } else {
//     preferredDirs.push(this.calcRightLeft(colDifference));
//     preferredDirs.push(this.calcUpDown(rowDifference));
//   }
//   preferredDirs.forEach(dir => {
//     if (possibleDirs.includes(dir)) {
//       this.direction = dir;
//       return;
//     }
//   });
//
//   this.direction = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
// }
//
// calcRightLeft(colDifference) {
//   return colDifference > 0 ? this.down : this.up;
// }
//
// calcUpDown(rowDifference) {
//   return rowDifference > 0 ? this.left : this.right;
// }
