let hero;

function setup() {
  hero = new Player(320, 455, 33, 25, new Canvas(640, 480));
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

  fill(color(255,0,0));
  square(320, 10, 25);

  controls();
  hero.show();
}
