class Player {
  constructor(x, y, canvas) {
    this.xdir = x;
    this.ydir = y;
    this.canvas = canvas;
    this.bulletImage = loadImage('assets/asteroids_bullet.png');
    this.bullets = new Group();

    this.createShip();
  }

  outsideLateralBounds() {
    if (!this.hero) return false;
    return this.hero.position.x >= canvas.x || this.hero.position.x <= 0;
  }

  updateDir(toLeft) {
    this.moove();
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
    this.heroImage = loadImage('assets/asteroids_ship0001.png');

    this.hero = createSprite(this.xdir, this.ydir);
    this.hero.maxSpeed = 6;
    this.hero.friction = 0.98;
    this.hero.rotation = -90;
    this.hero.setCollider('circle', 0, 0, 20);

    this.hero.addImage('normal', this.heroImage);
    this.hero.addAnimation('thrust', 'assets/asteroids_ship0002.png', 'assets/asteroids_ship0007.png');
  }

  moove() {
    this.hero.changeAnimation('thrust');
  }

  stopMoving() {
    this.hero.changeAnimation('normal');
  }

  shoot() {
    const bullet = new Tiro(this.hero.position.x, this.hero.position.y, this.bulletImage);
    this.bullets.add(bullet.getBullet());
  }
}
