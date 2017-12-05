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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 896;
  canvas.height = 992;
  const ctx = canvas.getContext('2d');

  new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maze_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sprites__ = __webpack_require__(3);



const MAP = {
  rows: 31,
  cols: 28,
  tileSize: 22,
  tiles: __WEBPACK_IMPORTED_MODULE_0__maze_js__["a" /* default */],
};

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.map = MAP;


    this.drawSprite = this.drawSprite.bind(this);



    this.pacman = new __WEBPACK_IMPORTED_MODULE_1__sprites__["a" /* Pacman */]();
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
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
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 3, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 3, 0],
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// class Sprite {
//   constructor({ position, direction, image }) {
//     this.position = position;
//     this.direction = direction;
//     this.image = new Image();
//     this.image.src = image;
//   }
// }



class Pacman {
  constructor() {
    this.position = [14, 23];
    this.direction = [0, 1];
    // this.newDir;
    this.img = new Image();
    this.img.src = './assets/pacman.png';
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    switch(e.which) {
      case 37:
        this.newDir = [0, -1];
        this.direction = [0, -1];
        break;
      case 38:
        this.newDir = [1, 0];
        this.direction = [1, 0];
        break;
      case 39:
        this.newDir = [0, 1];
        this.direction = [0, 1];
        break;
      case 40:
        this.newDir = [-1, 0];
        this.direction = [-1, 0];
        break;
    }

    this.position[0] += this.direction[0];
    this.position[1] += this.direction[1];
  }

  move() {

  }

  rotate() {

  }

  render(ctx, dim) {

    ctx.drawImage(
      this.img,
      402, 17,
      160, 160,
      this.position[0] * dim, this.position[1] * dim, dim, dim);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pacman;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map