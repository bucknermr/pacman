import MAZE from './maze.js';
import { Pacman } from './sprites';

const MAP = {
  rows: 31,
  cols: 28,
  tileSize: 22,
  tiles: MAZE,
};

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.map = MAP;


    this.drawSprite = this.drawSprite.bind(this);



    this.pacman = new Pacman();
    this.draw();
    // this.run();
  }

  run() {
    this.update();
    this.draw();
  }

  update() {

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
            this.ctx.fillStyle = 'blue';
            this.ctx.fillRect(
              pos[1],
              pos[0],
              this.map.tileSize,
              this.map.tileSize);
            break;
          case -1:
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(
              pos[1],
              pos[0],
              this.map.tileSize,
              this.map.tileSize);
        }
        pos[1] += this.map.tileSize;
      });
      pos[0] += this.map.tileSize;
      pos[1] = 0;
    });
  }

  renderSprites() {
    this.pacman.img.onload = this.drawSprite;
  }


  drawSprite() {
    this.pacman.render(this.ctx, this.map.tileSize);
  }
}

export default Game;
