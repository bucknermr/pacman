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
}

export default Map;
