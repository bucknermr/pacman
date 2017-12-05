import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 896;
  canvas.height = 992;
  const ctx = canvas.getContext('2d');

  new Game(ctx);
});
