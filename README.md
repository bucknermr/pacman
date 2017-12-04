# Pacman

### Overview

This project is a tribute to the 1980's classic arcade game. Pacman maneuvers around the screen eating dots, while avoiding the ghosts who are chasing him.

### Features & MVP's

* User controls pacman with the keyboard
* Pacman eats dots for points
* Ghosts have an AI to chase pacman, increasing in difficulty after each level
* Sound effects played for various events, including for eating dots and dying

### Technologies

* Vanilla javascript for game logic
* HTML5 Canvas for game rendering
* Web Audio API for sound effects
* Webpack for bundling script files

### Implementation Timeline

Day 1:
* Get file structure up and running with Webpack
* Draw game space with Canvas
* Draw boundaries with tiles in the canvas element
* Get a moving object and try to have collision detection happening with the drawn boundaries

Day 2:
* Get sprites for pacman in the game and moving around
* Add ghosts sprites and get them to chase pacman around

Day 3:
* Add dots to the game
* Get pacman to eat the dots, and increase points for each dot eaten
* Add large dots that turn the ghosts blue

Day 4:
* Use web audio api to load sound effects
* Synchronize sounds with game events
* Polish up web page look
