import MAZE from './maze.js';


class Map {
  constructor() {
    this.rows = 31;
    this.cols = 28;
    // this.tileSize = 36;
    this.tileSize = 22;
    this.tiles = MAZE;
  }

  findTile(pos) {
    return this.tiles[pos[0]][pos[1]];
  }
}

export default Map;
