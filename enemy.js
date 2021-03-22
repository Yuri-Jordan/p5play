class Enemy {
  constructor(canvas, enemySounds, level) {
    this.enemyX = [];
    this.enemyY = [];
    this.canvas = canvas;
    this.level = int(level);
    this.num_enemies = (this.level == 3) ? 1 : 3 * this.level; 
    this.enemiesGroup;
    this.bulletsGroup;
    this.enemySounds = enemySounds;
    this.firstCall = true;

    this.enemyImages = {
      '1': 'assets/images/enemies/enemyshipred.png',
      '2': 'assets/images/enemies/enemyshipblue.png',
      '3': 'assets/images/enemies/enemyshipgreen.png',
    };

    this.bulletImages = {
      '1': 'assets/images/ChargeShotRedOrange.png',
      '2': 'assets/images/ChargeShotBlue.png',
      '3': 'assets/images/ChargeShotGreen.png',
    };

    this.createEnemies();
  }

  createEnemies(){

    for(let i = 0; i < this.num_enemies; i = i + 1){
      this.enemyX[i] = int(random(640));
      this.enemyY[i] = int(random(200));
    }

    this.enemiesGroup = new Group();
    this.bulletsGroup = new Group();
    this.enemyImage = loadImage(this.enemyImages[this.level]);
    this.bulletImage = loadImage(this.bulletImages[this.level]);
  }

  drawEnemies() {
    for(let i = 0; i < this.num_enemies; i = i + 1){

      const enemy = createSprite(this.enemyX[i], this.enemyY[i]);
      enemy.scale = 0.5;
      enemy.rotation = 180;
      enemy.addImage(this.enemyImage);
      enemy.velocity.x = 5;
      enemy.setCollider("circle", 0, 0, 75);
      this.enemiesGroup.add(enemy);
    }
  }

  update(){

    if(this.firstCall) {
      this.drawEnemies();
      this.firstCall = false;
    }

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
    this.enemySounds.shoot.play();
  }

  outsideLateralBounds(enemy) {
    if(!enemy) return false;
    return enemy.position.x > canvas.x || enemy.position.x < 0;
  }

  changeXdiretction(enemy) {
    enemy.velocity.x = enemy.velocity.x * -1;
  }
}
