class Tiro {
  constructor(heroX, heroY, bulletImage) {
    this.bulletImage = bulletImage;
    this.UP_DIRECTION = -90;
    this.bullet = createSprite(heroX, heroY);
    this.bullet.addImage(this.bulletImage);
    this.bullet.setSpeed(10, this.UP_DIRECTION);
    this.bullet.life = 60;
  }
}
