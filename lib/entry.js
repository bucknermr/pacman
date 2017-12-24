import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 616;
  canvas.height = 682;

  const game = new Game(canvas);
  const newGame = document.getElementById('new-game');
  newGame.addEventListener('click', () => {
    game.setup();
    game.start();
  });
});
