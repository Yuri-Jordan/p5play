class Enemy {
  constructor(canvas, num_enemies) {
    this.enemyX = [];
    this.enemyY = [];
    this.canvas = canvas;
    this.num_enemies = num_enemies; 
    this.enemiesGroup;
    this.bulletsGroup;

    this.createEnemies();
  }

  createEnemies(){

    for(let i = 0; i < num_enemies; i = i + 1){
      this.enemyX[i] = int(random(640));
      this.enemyY[i] = int(random(200));
    }

    this.enemiesGroup = new Group();
    this.bulletsGroup = new Group();
    this.enemyImage = loadImage('assets/square.png');
    this.bulletImage = loadImage('assets/asteroids_bullet.png');

    for(let i = 0; i < this.num_enemies; i = i + 1){

      const enemy = createSprite(this.enemyX[i], this.enemyY[i]);
      enemy.addImage(this.enemyImage);
      enemy.velocity.x = 5;

      this.enemiesGroup.add(enemy);
    }
  }

  update(){
    for(let i = 0; i < this.num_enemies; i = i + 1){
      const currentEnemy = this.enemiesGroup[i];
      if(this.outsideLateralBounds(currentEnemy)) {
        this.changeXdiretction(currentEnemy);
      }
      this.shoot(currentEnemy);
    }
  }

  shoot(enemy) {
    if(!enemy) return;

    var randomBoolean = Math.random() < 0.01;

    if(!randomBoolean) return;

    const bullet = new Tiro(enemy.position.x, enemy.position.y, this.bulletImage, true);
    this.bulletsGroup.add(bullet.getBullet());
  }

  outsideLateralBounds(enemy) {
    if(!enemy) return false;
    return enemy.position.x > canvas.x || enemy.position.x < 0;
  }

  changeXdiretction(enemy) {
    enemy.velocity.x = enemy.velocity.x * -1;
  }
}
