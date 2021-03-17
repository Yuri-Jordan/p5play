class Tiro {
  constructor(heroX, heroY, bulletImage, enemyShooted) {
    this.bulletImage = bulletImage;
    this.UP_DIRECTION = -90;
    this.DOWN_DIRECTION = 90;

    this.bullet = createSprite(heroX, heroY);
    this.bullet.addImage(this.bulletImage);
    this.bullet.setSpeed((enemyShooted) ? 3 : 10, (enemyShooted) ? this.DOWN_DIRECTION : this.UP_DIRECTION);
    this.bullet.life = 220;
  }

  getBullet() {
    return this.bullet;
  }
}
