let hero;
let enemies;
let canvas;
let cameracontrol;
let num_enemies = 3;

let life = 5;
let pontos = 0;
let level = 1;

let gameSounds;
var gameScreens = {
  MAIN: 0,
  GAME: 1,
  GAMEOVER: 2,
  GAMEWIN: 3,
};

let currentScreenID;
let mainScreen;
let gameOverScreen;
let gameWinScreen;

let backImage;

function setup() {

  canvas = new Canvas(640, 480);
  backImage = loadImage('assets/images/background/backgroundSpace.png');
  currentScreenID = gameScreens.MAIN;

  mainScreen = new ScreenMain(canvas, gameScreens);
  gameOverScreen = new ScreenGameOver(canvas, gameScreens);
  gameWinScreen = new WinScreen(canvas, gameScreens);

  gameSounds = new Sound();

  hero = new Player(320, 455, canvas, gameSounds.getHeroSounds());

  // cameracontrol = new Cameracontrol(hero);
  // cameracontrol.createCamera();

  enemies = new Enemy(canvas, num_enemies, gameSounds.getEnemySounds());
}

function mousePressed() {
  if (!gameSounds.backSound.isPlaying()) {
    gameSounds.backSound.loop();
  }
}

function controls() {
  if (keyIsDown(LEFT_ARROW)) {
    hero.updateDir(true);
  } else if (keyIsDown(RIGHT_ARROW)) {
    hero.updateDir(false);
  } else if (keyWentDown('x')) {
    hero.shoot();
  } else {
    hero.stopMoving();
  }

  drawSprites();
}


function draw() {

  if (currentScreenID == gameScreens.MAIN) {
    mainScreen.draw();
    currentScreenID = mainScreen.getScreenID();
    return;
  } else if (currentScreenID == gameScreens.GAMEOVER) {
    gameOverScreen.draw();
    return;
  } else if (currentScreenID == gameScreens.GAMEWIN) {
    gameWinScreen.draw();
    return;
  }

  background(backImage);

  enemies.update();
  controls();
  // cameracontrol.update();
  updateGUI();
  enemies.enemiesGroup.overlap(hero.bullets, hit);
  enemies.bulletsGroup.overlap(hero.hero, damage);
}

function hit(enemy, bullet) {
  bullet.remove();
  enemy.remove();
  gameSounds.spaceExplosion.play();
  pontos += 1;
  
  if (enemies.enemiesGroup.length == 0) currentScreenID = gameScreens.GAMEWIN;
}

function damage(bullet) {
  bullet.remove();
  life -= 1;
  pontos -= 1;
  if (life == 0) currentScreenID = gameScreens.GAMEOVER;
}

function updateGUI() {
  fill(255, 255, 255)
  text('VIDAS: ' + life, canvas.x - 80, canvas.y - 50)
  fill(255, 255, 255)
  text('PONTOS: ' + pontos, canvas.x - 80, canvas.y - 30)
  fill(255, 255, 255)
  text('NÍVEL: ' + level, canvas.x - 80, canvas.y - 10)
}
