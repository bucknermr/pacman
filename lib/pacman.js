import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 616;
  canvas.height = 682;
  const ctx = canvas.getContext('2d');

  new Game(ctx);
});
