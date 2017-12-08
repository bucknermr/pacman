import MAZE from './maze.js';
import TileSpot from './tile_spot';


class Map {
  constructor() {
    this.tileSize = 22;
    this.tiles = MAZE;
    this.rows = MAZE.length;
    this.cols = MAZE[0].length;
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

    console.log(pos);

    console.log('positions!!!!!!', positions);

    return positions.filter(tilePos => this.findTile(tilePos) !== 0);
  }

  gridOfTileSpots() {
    const arr = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      arr[i] = [];
      for (let j = 0; j < this.cols; j++) {
        if (this.findTile([i, j]) !== 0) {
          arr[i].push(new TileSpot([i, j]));
        } else {
          arr[i].push(null);
        }
      }
    }

    return arr;
  }

}

export default Map;
