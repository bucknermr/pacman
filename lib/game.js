import Map from './map.js';
import Pacman from './pacman';
import Ghost from './ghost';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.map = new Map;

    this.lives = 3;

    this.points = 0;
    this.dots = 244;
    this.ghostPoints = 200;

    this.setupSprites();
    this.addScore();

    this.draw();
    this.run();
  }

  addScore() {
    const scoreContainer = document.getElementById('score-container');
    const header = document.createElement('h2');
    header.innerHTML = `${this.points}`;
    header.setAttribute('id', 'score');
    scoreContainer.appendChild(header);
    const lives = document.createElement('div');
    lives.setAttribute('id', 'lives');
    const life = document.createElement('div');
    life.setAttribute('class', 'life');
    lives.appendChild(life);
    lives.appendChild(life);
    scoreContainer.appendChild(lives);
  }

  updateScore() {
    document.getElementById('score').innerHTML = `${this.points}`;
  }

  setupSprites() {
    this.pacman = new Pacman(this.map.tileSize);
    this.ghosts = [
      new Ghost(this.map.tileSize, { color: 'orange', position: [14, 14] }),
      new Ghost(this.map.tileSize, { color: 'red', position: [14, 12] }),
      new Ghost(this.map.tileSize, { color: 'blue', position: [14, 13] }),
      new Ghost(this.map.tileSize, { color: 'pink', position: [14, 15] })
    ];

    this.sprites = [this.pacman, ...this.ghosts];
  }

  run() {
    this.updateScore();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();
    this.requestId = requestAnimationFrame(this.run.bind(this));
    if (this.dots === 0) { this.handleWin(); }
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
    const tileType = this.pacman.checkCollision(this.map);
    if (tileType) {
      this.dots -= 1;
      switch(tileType) {
        case 2:
          this.points += 10;
          break;
        case 3:
          this.points += 50;
          this.ghostPoints = 200;
          bigDot = true;
      }
    }
    this.ghosts.forEach(ghost => {
      if (bigDot && ghost.status !== 'eyes') { ghost.scared(); }
      if (ghost.checkCollision(this.pacman.position)) {
        switch(ghost.status) {
          case 'normal':
            this.handleDeath();
            break;
          case 'blue':
          case 'white':
          this.points += this.ghostPoints;
          this.ghostPoints *= 2;
            ghost.retreat();
            break;
        }
      }
    });
  }

  handleWin() {
    cancelAnimationFrame(this.requestId);
    console.log('YOU WIN!');
  }

  handleDeath() {
    cancelAnimationFrame(this.requestId);
    this.lives -= 1;
    if (this.lives > 0) {
      setTimeout(() => {
        this.setupSprites();
        this.run();
      }, 2000);
    } else {
      this.gameOver();
    }
  }

  gameOver() {

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
