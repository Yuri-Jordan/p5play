let hero;
let enemies;
let canvas;
let lifeObject;
let cameracontrol;
const ESPACE_KEY_CODE = 32;
let levelChanged = true;
let lifeBoss = 10;
let controlsTypeSelected;
let firstTimeInGame = true;

var controlsType = {
  KEYBOARD: 0,
  GESTURES: 1
};

var gameScreens = {
  MAIN: 0,
  GAME: 1,
  GAMEOVER: 2,
  GAMEWIN: 3,
  GAMESECONDLEVEL: 4,
  GAMEFINALLEVEL: 5
};

var gameLevels = {
  FIRST: 1,
  SECOND: 2,
  FINAL: 3
};

let life = 30;
let pontos = 0;
let level = gameLevels.FIRST;

let currentScreenID = gameScreens.MAIN;
let mainScreen;
let gameOverScreen;
let gameWinScreen;
let gameSecondLevelScreen;
let gameFinalLevelScreen;

let backImage;

this.backSound;
this.heroShootSound;
this.enemyShootSound;
this.spaceExplosion;
this.powerUpLife;
this.hitSound;
this.gameOverSound;

function preload() {
  this.backSound = loadSound('assets/sounds/alienblues.mp3');
  this.heroShootSound = loadSound('assets/sounds/laserfire01.ogg');
  this.enemyShootSound = loadSound('assets/sounds/laserfire02.ogg');
  this.spaceExplosion = loadSound('assets/sounds/space-explosion.flac');
  this.powerUpLife = loadSound('assets/sounds/powerup-life.wav');
  this.hitSound = loadSound('assets/sounds/hit_sound.wav');
  this.gameOverSound = loadSound('assets/sounds/gameover.ogg');
}

function setup(level = gameLevels.FIRST) {

  canvas = new Canvas(640, 480);
  backImage = loadImage('assets/images/background/backgroundSpace.png');

  mainScreen = new ScreenMain(canvas, gameScreens, controlsType);
  gameOverScreen = new ScreenGameOver(canvas, gameScreens);
  gameWinScreen = new WinScreen(canvas, gameScreens);
  gameSecondLevelScreen = new ScreenSecondLevel(canvas);
  gameFinalLevelScreen = new ScreenFinalLevel(canvas);


  hero = new Player(320, 435, canvas, { shoot: this.heroShootSound });
  enemies = new Enemy(canvas, { shoot: this.enemyShootSound }, level);
  lifeObject = new Life(canvas);
}

function keyPressed() {
  if (!backSound.isPlaying() &&
    (currentScreenID == gameScreens.MAIN || currentScreenID == gameScreens.GAME)) {
    backSound.loop();
  }
}

function controls() {
  if (keyIsDown(LEFT_ARROW)) {
    hero.updateDir(true);
  } else if (keyIsDown(RIGHT_ARROW)) {
    hero.updateDir(false);
  } else if (keyWentDown(ESPACE_KEY_CODE)) {
    hero.shoot();
  }

  drawSprites();
}

function changeLevel(gameLevel) {
  level = gameLevel;
  levelChanged = false;
  hero.remove();
  this.setup(gameLevel);
  if (controlsTypeSelected == controlsType.GESTURES) cameracontrol.setHero(hero);
}


function draw() {

  if (currentScreenID == gameScreens.MAIN) {

    mainScreen.draw();
    currentScreenID = mainScreen.getScreenID();
    controlsTypeSelected = mainScreen.getControlsType();
    return;
    
  } else if (currentScreenID == gameScreens.GAME) {

    background(backImage);

  } else if (currentScreenID == gameScreens.GAMEOVER) {

    gameOverScreen.draw();
    return;

  } else if (currentScreenID == gameScreens.GAMEWIN) {

    gameWinScreen.draw(pontos);
    return;

  } else if (currentScreenID == gameScreens.GAMESECONDLEVEL) {

    gameSecondLevelScreen.draw();
    if (levelChanged) {
      changeLevel(gameLevels.SECOND);
      return;
    }

  } else if (currentScreenID == gameScreens.GAMEFINALLEVEL) {

    gameFinalLevelScreen.draw();
    if (levelChanged) {
      changeLevel(gameLevels.FINAL);
      return;
    }
  }

  if (controlsTypeSelected == controlsType.GESTURES) {

    if (firstTimeInGame) {
      cameracontrol = new Cameracontrol(hero);
      cameracontrol.createCamera();
      firstTimeInGame = false;
    }

    if(!cameracontrol.camIsReady()) return;

    cameracontrol.update();

  } else {
    controls();
  }  
  
  enemies.update();
  lifeObject.update();
  updateGUI();
  enemies.enemiesGroup.overlap(hero.bullets, hit);
  enemies.bulletsGroup.overlap(hero.hero, damage);
  lifeObject.lifesGroup.overlap(hero.hero, health);
}

function hit(enemy, bullet) {
  bullet.remove();

  if (level != gameLevels.FINAL) {
    enemy.remove();
  } else {
    lifeBoss -= 1;
    if (lifeBoss == 0) {
      backSound.stop();
      enemy.remove();
    }
  }
  spaceExplosion.play();
  pontos += 1;

  if (enemies.enemiesGroup.length == 0) {

    if (currentScreenID == gameScreens.GAME) {
      currentScreenID = gameScreens.GAMESECONDLEVEL;
    } else if (currentScreenID == gameScreens.GAMESECONDLEVEL) {
      levelChanged = true;
      currentScreenID = gameScreens.GAMEFINALLEVEL;
    } else if (currentScreenID == gameScreens.GAMEFINALLEVEL) {
      currentScreenID = gameScreens.GAMEWIN;
    }
  }
}

function damage(bullet) {
  hitSound.setVolume(0.5);
  hitSound.play();
  hero.heroDamagedAnimation();
  bullet.remove();
  life -= 1;
  pontos -= 1;
  if (life == 0) {
    backSound.stop();
    gameOverSound.play();
    currentScreenID = gameScreens.GAMEOVER;
  }
}

function health(lifeCatch) {
  powerUpLife.setVolume(0.2);
  powerUpLife.play();
  lifeCatch.remove();
  life += 1;
}

function updateGUI() {
  fill(255, 255, 255)
  text('VIDAS: ' + life, canvas.x - 80, canvas.y - 50)
  fill(255, 255, 255)
  text('PONTOS: ' + pontos, canvas.x - 80, canvas.y - 30)
  fill(255, 255, 255)
  text('NÍVEL: ' + level, canvas.x - 80, canvas.y - 10)
}
