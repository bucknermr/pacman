import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 616;
  canvas.height = 682;

  new Game(canvas);
});
