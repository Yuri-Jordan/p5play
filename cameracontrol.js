class Cameracontrol {
  constructor(hero) {
    this.classifier;
    this.imageModelURL = 'https://teachablemachine.withgoogle.com/models/EQskIKETN/';
    this.video;
    this.flippedVideo;
    this.label = '';
    this.hero = hero;
    this.classificationPromisse;
    this.camReady = false;

    this.loadML5Model();
  }

  loadML5Model() {
    this.classifier = ml5.imageClassifier(this.imageModelURL + 'model.json');
  }

  createCamera() {
    this.video = createCapture(VIDEO);
    this.video.size(100, 80);
    this.video.hide();
    this.flippedVideo = ml5.flipImage(this.video);

    this.classificationPromisse = async () => {
      this.flippedVideo = ml5.flipImage(this.video);
      const a = await this.getClassification();
      this.handleMoviment(a);
      this.flippedVideo.remove();
    };

    this.classificationPromisse();
  }

  getClassification() {
    return this.classifier.classify(this.flippedVideo).then(
      valor => {
        return valor;
      },
      erro => {
        return erro;
      });
  }

  update() {
    image(this.flippedVideo, 0, 0);
    this.classificationPromisse();
  }

  controlsSpace() {
    if (this.label === 'left') {
      this.hero.updateDir(true);
    } else if (this.label === 'right') {
      this.hero.updateDir();
    } else if (this.label === 'up') {
      this.hero.shoot();
    }

    drawSprites();
  }

  handleMoviment(results) {
    if (!results) {
      return;
    }

    // The results are in an array ordered by confidence.
    this.label = (results) ? results[0].label : '';
    this.controlsSpace();
    this.camReady = true;
  }

  camIsReady() {
    return this.camReady;
  }

  setHero(hero) {
    return this.hero = hero;
  }
}