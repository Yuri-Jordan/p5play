let hero;
let enemies;
let canvas;
let cameracontrol;
let num_enemies = 3;

let life = 3;
let pontos = 0;
let level = 1;

function setup() {
  canvas = new Canvas(640, 480);
  hero = new Player(320, 455, 33, 25, canvas);
  cameracontrol = new Cameracontrol(hero);
  cameracontrol.createCamera();

  enemies = new Enemy(canvas, num_enemies);
}


function draw() {
  background(0);
  
  enemies.update();
  // controls();
  hero.show();
  cameracontrol.show();
  updateGUI();
}

function updateGUI(){
  fill(255,255,255)
  text('VIDAS: ' + life, canvas.x - 80, canvas.y - 50)
  fill(255,255,255)
  text('PONTOS: ' + pontos, canvas.x - 80, canvas.y - 30)
  fill(255,255,255)
  text('NÍVEL: ' + level, canvas.x - 80, canvas.y - 10)
}
