import Map from './map.js';
import { Pacman, Ghost } from './sprites.js';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.map = new Map;

    this.sprites = [
      new Pacman(),
      new Ghost({ color: 'orange', position: [14, 14] }),
      new Ghost({ color: 'red', position: [14, 12] }),
      new Ghost({ color: 'blue', position: [14, 13] }),
      new Ghost({ color: 'pink', position: [14, 15] }),
    ];

    this.draw();
    this.run();
  }

  run() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();
    this.requestId = requestAnimationFrame(this.run.bind(this));
  }

  update() {
    this.sprites.forEach(sprite => {
      sprite.move(this.map);
    });
  }

  draw() {
    // this.renderMaze();
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
            // this.ctx.fillStyle = 'grey';
            // this.ctx.fillRect(
            //   pos[1],
            //   pos[0],
            //   this.map.tileSize,
            //   this.map.tileSize);
            // break;
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
    this.sprites.forEach(sprite => {
      if (sprite.img.complete) {
        sprite.render(this.ctx, this.map.tileSize);
      } else {
        sprite.img.onload = () => sprite.render(this.ctx, this.map.tileSize);
      }
    });
  }
}

export default Game;
