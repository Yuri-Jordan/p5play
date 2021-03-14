function setup() {
  createCanvas(640, 480);
}

function controlsSnake() {
  if (label === 'left') {
    snake.setDir(-1, 0);
  } else if (label === 'right') {
    snake.setDir(1, 0);
  } else if (label === 'down') {
    snake.setDir(0, 1);
  } else if (label === 'up') {
    snake.setDir(0, -1);
  }
}

function draw() {
  background(0);

  fill(color(255,0,0));
  square(320, 10, 25);

  fill(color(0, 150, 125));
  ellipse(320, 455, 25, 25);
}
