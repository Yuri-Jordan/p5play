let hero;
let enemies;
let canvas;
let num_enemies = 3;

function setup() {
  canvas = new Canvas(640, 480);
  hero = new Player(320, 455, 33, 25, canvas);

  enemies = new Enemy(canvas, num_enemies);
}

function controls() {
  if (keyIsDown(LEFT_ARROW)) {
    hero.updateDir(-1, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    hero.updateDir(1, 0);
  } else if (keyIsDown(DOWN_ARROW)) {
    hero.updateDir(0, 1);
  } else if (keyIsDown(UP_ARROW)) {
    hero.updateDir(0, -1);
  }
}

function draw() {
  background(0);

  enemies.update();
  controls();
  hero.show();
}
