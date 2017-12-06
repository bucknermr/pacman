import Sprite from './sprite';

class Ghost extends Sprite {
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

export default Ghost;
