// class Sprite {
//   constructor({ position, direction, image }) {
//     this.position = position;
//     this.direction = direction;
//     this.image = new Image();
//     this.image.src = image;
//   }
// }



export class Pacman {
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
