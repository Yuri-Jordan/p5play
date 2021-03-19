class Sound {
  constructor() {
    this.backSound = loadSound('assets/sounds/alienblues.mp3');
    this.heroShootSound = loadSound('assets/sounds/laserfire01.ogg');
    this.enemyShootSound = loadSound('assets/sounds/laserfire02.ogg');
    this.spaceExplosion = loadSound('assets/sounds/space-explosion.flac');
  }

  getHeroSounds() {
    return { shoot: this.heroShootSound };
  }

  getEnemySounds() {
    return { 
      shoot: this.enemyShootSound
     };
  }

}
