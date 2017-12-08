class TileSpot {
  constructor(pos) {
    this.fScore = 0;
    this.gScore = 0;
    this.hScore = 0;
    this.pos = pos;
    this.parent = null;
  }
}

export default TileSpot;
