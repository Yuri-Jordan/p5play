let hero;
let enemies;
let canvas;
let cameracontrol;
let num_enemies = 3;

let life = 3;
let pontos = 0;
let level = 1;

let backSound;

function setup() {
  canvas = new Canvas(640, 480);
  hero = new Player(320, 455, canvas);
  // cameracontrol = new Cameracontrol(hero);
  // cameracontrol.createCamera();

  enemies = new Enemy(canvas, num_enemies);
  backSound = new Sound().getBackSound();
  
}

function mousePressed() {
  if (backSound.isPlaying()) {
    song.stop();
  } else {
    backSound.loop();
  }
}

function controls() {
  if (keyIsDown(LEFT_ARROW)) {
    hero.updateDir(true);
  } else if (keyIsDown(RIGHT_ARROW)) {
    hero.updateDir(false);
  } else if(keyWentDown('x')){
    hero.shoot();
  } else {
    hero.stopMoving();
  }

  drawSprites();
}


function draw() {
  background(0);
  enemies.enemiesGroup.overlap(hero.bullets, hit);
  enemies.bulletsGroup.overlap(hero.hero, damage);
  
  enemies.update();
  controls();
  // cameracontrol.update();
  updateGUI();
}

function hit(enemy, bullet){
  bullet.remove();
  enemy.remove();
  pontos +=1
}

function damage(bullet){
  bullet.remove();
  life -=1
}

function updateGUI(){
  fill(255,255,255)
  text('VIDAS: ' + life, canvas.x - 80, canvas.y - 50)
  fill(255,255,255)
  text('PONTOS: ' + pontos, canvas.x - 80, canvas.y - 30)
  fill(255,255,255)
  text('NÍVEL: ' + level, canvas.x - 80, canvas.y - 10)
}
