class Sound {
  constructor() {
    this.backSound = loadSound('assets/sounds/alienblues.mp3');
    this.heroShootSound = loadSound('assets/sounds/laserfire01.ogg');
    this.enemyShootSound = loadSound('assets/sounds/laserfire02.ogg');
    this.spaceExplosion = loadSound('assets/sounds/space-explosion.flac');
    this.powerUpLife = loadSound('assets/sounds/powerup-life.wav');
    this.hitSound = loadSound('assets/sounds/hit_sound.wav');
  }

  getHeroSounds() {
    return { shoot: this.heroShootSound };
  }

  getEnemySounds() {
    return { 
      shoot: this.enemyShootSound
     };
  }

  getPowerUpSounds() {
    this.powerUpLife.setVolume(0.2);
    return { 
      life: this.powerUpLife
     };
  }

  getHitSound() {
    this.hitSound.setVolume(0.5);
    return this.hitSound;
  }

}
