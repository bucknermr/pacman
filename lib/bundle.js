/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TileSpot {
  constructor(pos) {
    this.fScore = 0;
    this.gScore = 0;
    this.hScore = 0;
    this.pos = pos;
    this.parent = null;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TileSpot);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const LEFT = [0, -1];
/* unused harmony export LEFT */

const UP = [-1, 0];
/* unused harmony export UP */

const RIGHT = [0, 1];
/* unused harmony export RIGHT */

const DOWN = [1, 0];
/* unused harmony export DOWN */



class Sprite {
  constructor(tileSize) {
    this.img = new Image();

    this.tileSize = tileSize;

    this.up = UP;
    this.down = DOWN;
    this.left = LEFT;
    this.right = RIGHT;
  }

  wrapPosition() {
    if (this.position[1] === 27.75) {
      this.position[1] = -0.75;
    } else if (this.position[1] === -0.75) {
      this.position[1] = 27.75;
    }
  }

  directionToString() {
    let direction;
    switch(this.direction) {
      case this.right:
        return 'right';
      case this.left:
        return 'left';
      case this.up:
        return 'up';
      case this.down:
        return 'down';
    }
  }

  checkCollision() {
    return false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Sprite);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 616;
  canvas.height = 682;

  new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](canvas);
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pacman__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ghost__ = __webpack_require__(7);




class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.map = new __WEBPACK_IMPORTED_MODULE_0__map_js__["a" /* default */];

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
    this.pacman = new __WEBPACK_IMPORTED_MODULE_1__pacman__["a" /* default */](this.map.tileSize);
    this.ghosts = [
      new __WEBPACK_IMPORTED_MODULE_2__ghost__["a" /* default */](this.map.tileSize, { color: 'orange', position: [14, 14] }),
      new __WEBPACK_IMPORTED_MODULE_2__ghost__["a" /* default */](this.map.tileSize, { color: 'red', position: [14, 12] }),
      new __WEBPACK_IMPORTED_MODULE_2__ghost__["a" /* default */](this.map.tileSize, { color: 'blue', position: [14, 13] }),
      new __WEBPACK_IMPORTED_MODULE_2__ghost__["a" /* default */](this.map.tileSize, { color: 'pink', position: [14, 15] })
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maze_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tile_spot__ = __webpack_require__(0);




class Map {
  constructor() {
    this.tileSize = 22;
    this.tiles = __WEBPACK_IMPORTED_MODULE_0__maze_js__["a" /* default */];
    this.rows = __WEBPACK_IMPORTED_MODULE_0__maze_js__["a" /* default */].length;
    this.cols = __WEBPACK_IMPORTED_MODULE_0__maze_js__["a" /* default */][0].length;
  }

  findTile(pos) {
    return this.tiles[pos[0]][pos[1]];
  }

  setTile(pos, val) {
    this.tiles[pos[0]][pos[1]] = val;
  }

  getAdjacentOpenTiles(pos) {
    if (pos[1] === 0) {
      return [[14, 1], [14, 27]];
    } else if (pos[1] === 27) {
      return [[14, 0], [14, 26]];
    }

    const positions = [
      [pos[0], pos[1] + 1],
      [pos[0], pos[1] - 1],
      [pos[0] + 1, pos[1]],
      [pos[0] - 1, pos[1]]
    ];

    return positions.filter(tilePos => this.findTile(tilePos) !== 0);
  }

  gridOfTileSpots() {
    const arr = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      arr[i] = [];
      for (let j = 0; j < this.cols; j++) {
        if (this.findTile([i, j]) !== 0) {
          arr[i].push(new __WEBPACK_IMPORTED_MODULE_1__tile_spot__["a" /* default */]([i, j]));
        } else {
          arr[i].push(null);
        }
      }
    }

    return arr;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Map);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MAZE = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, -1, -1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, -1, -1, -1, -1, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, -1, -1, -1, -1, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 3, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 3, 0],
  [0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/* harmony default export */ __webpack_exports__["a"] = (MAZE);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(1);


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

class Pacman extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(tileSize) {
    super(tileSize);
    this.position = [23, 13.5];

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


  checkCollision(map) {
    if (this.position.every(coor => coor % 1 === 0)) {
      const tile = map.findTile(this.position);
      if (tile > 1) {
        map.setTile(this.position, 1);
        return tile;
      }
    }
  }

  rotate() {
    this.rotation = this.directionToString();

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


/* harmony default export */ __webpack_exports__["a"] = (Pacman);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tile_spot__ = __webpack_require__(0);




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

class Ghost extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
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

        Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* deleteFromArray */])(open, currentTileSpot);
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

/* harmony default export */ __webpack_exports__["a"] = (Ghost);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const deleteFromArray = (arr, el) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === el) { arr.splice(i, 1); }
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = deleteFromArray;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map