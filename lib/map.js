import MAZE from './maze.js';


class Map {
  constructor() {
    this.tileSize = 22;
    this.tiles = MAZE;
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

    // if (positions.some(x => !x)) { debugger; }
    // positions.forEach(x => {console.log(x)});

    return positions.filter(tilePos => this.findTile(tilePos) !== 0);
  }

  getGHF() {

  }
}

export default Map;
