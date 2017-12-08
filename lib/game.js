import Map from './map.js';
import Pacman from './pacman';
import Ghost from './ghost';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.map = new Map;

    this.pacman = new Pacman(this.map.tileSize);
    this.ghosts = [
      new Ghost(this.map.tileSize, { color: 'orange', position: [14, 14] }),
      new Ghost(this.map.tileSize, { color: 'red', position: [14, 12] }),
      new Ghost(this.map.tileSize, { color: 'blue', position: [14, 13] }),
      new Ghost(this.map.tileSize, { color: 'pink', position: [14, 15] })
    ];

    this.sprites = [this.pacman, ...this.ghosts];

    this.draw();
    this.run();
  }

  run() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();
    this.requestId = requestAnimationFrame(this.run.bind(this));
    this.checkCollisions();
  }

  update() {
    this.sprites.forEach(sprite => {
      sprite.move(this.map);
    });
  }

  draw() {
    this.renderDots();
    this.renderSprites();
  }

  checkCollisions() {
    let bigDot;
    if (this.pacman.checkCollision(this.map)) {
      bigDot = true;
    }
    this.ghosts.forEach(ghost => {
      if (bigDot) { ghost.scared(); }
      if (ghost.checkCollision(this.pacman.position)) {
        switch(ghost.status) {
          case 'normal':
            cancelAnimationFrame(this.requestId);
            break;
          case 'blue':
          case 'white':
            ghost.retreat();
            break;
        }
      }
    });
  }

  renderDots() {
    const pos = [0, 0];
    this.map.tiles.forEach(row => {
      row.forEach(tile => {
        if (tile === 2 || tile === 3) {
          this.ctx.fillStyle = '#fff';
          this.ctx.beginPath();


          this.ctx.arc(
            pos[0] + (this.map.tileSize / 2),
            pos[1] + (this.map.tileSize / 2),
            tile === 3 ? 7 : 2.5,
            0,
            2 * Math.PI
          );
          this.ctx.fill();
        }

        pos[0] += this.map.tileSize;
      });
      pos[1] += this.map.tileSize;
      pos[0] = 0;
    });
  }

  renderSprites() {
    this.sprites.forEach(sprite => {
      if (sprite.img.complete) {
        sprite.render(this.ctx);
      } else {
        sprite.img.onload = () => sprite.render(this.ctx);
      }
    });
  }
}

export default Game;
