class Player {
  constructor(x, y, canvas, heroSounds) {
    this.xdir = x;
    this.ydir = y;
    this.canvas = canvas;
    this.bulletImage = loadImage('assets/images/ChargeShotGreen.png');
    this.bullets = new Group();
    this.heroSounds = heroSounds;

    this.createShip();
  }

  outsideLateralBounds() {
    if (!this.hero) return false;
    return this.hero.position.x >= canvas.x || this.hero.position.x <= 0;
  }

  updateDir(toLeft) {
    (toLeft) ? this.toLeft() : this.toRight();
  }

  toRight() {
    if (this.hero.position.x >= canvas.x) {
      return;
    }
    this.hero.position.x = this.hero.position.x + 3;
  }

  toLeft() {
    if (this.hero.position.x <= 0) {
      return;
    }
    this.hero.position.x = this.hero.position.x - 3;
  }

  createShip() {
    this.heroImage = loadImage('assets/images/ship5.png');

    this.hero = createSprite(this.xdir, this.ydir);
    this.hero.maxSpeed = 6;
    this.hero.friction = 0.98;
    this.hero.scale = 0.2;
    this.hero.setCollider('circle', 0, 0, 20);

    this.hero.addImage(this.heroImage);
  }

  shoot() {
    const bullet = new Tiro(this.hero.position.x, this.hero.position.y, this.bulletImage);
    this.bullets.add(bullet.getBullet());
    this.heroSounds.shoot.play();
  }

  remove() {
    this.hero.remove();
  }

  heroDamagedAnimation() {
    setTimeout(() => {
    
      this.hero.position.y += 15;
    }, 1);
    setTimeout(() => {
      
      this.hero.position.y -= 15;
    }, 100);
    setTimeout(() => {
      
      this.hero.position.y -= 15;
    }, 100);
    setTimeout(() => {
      
      this.hero.position.y += 15;
    }, 100);
  }
}
