import Map from './map.js';
import { Pacman } from './sprites.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.map = new Map;

    this.drawSprite = this.drawSprite.bind(this);
    // this.update = this.update.bind(this);

    this.pacman = new Pacman();
    this.draw();
    this.run();
  }

  run() {
    this.update();
    this.draw();
    requestAnimationFrame(this.run.bind(this));
  }

  update() {
    this.pacman.move(this.map);
  }

  draw() {
    this.renderMaze();
    this.renderSprites();
  }

  renderMaze() {
    const pos = [0, 0];

    this.map.tiles.forEach(row => {
      row.forEach(tile => {
        switch(tile) {
          case 0:
            this.ctx.fillStyle = 'darkblue';
            this.ctx.fillRect(
              pos[1],
              pos[0],
              this.map.tileSize,
              this.map.tileSize);
            break;
          case -1:
            this.ctx.fillStyle = 'grey';
            this.ctx.fillRect(
              pos[1],
              pos[0],
              this.map.tileSize,
              this.map.tileSize);
            break;
          case 1:
          case 2:
          case 3:
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(
              pos[1],
              pos[0],
              this.map.tileSize,
              this.map.tileSize);
            break;
        }
        pos[1] += this.map.tileSize;
      });
      pos[0] += this.map.tileSize;
      pos[1] = 0;
    });
  }

  renderSprites() {
    if (this.pacman.img.complete) {
      this.drawSprite();
    } else {
      this.pacman.img.onload = this.drawSprite;
    }
  }


  drawSprite() {
    this.pacman.render(this.ctx, this.map.tileSize);
  }
}

export default Game;
