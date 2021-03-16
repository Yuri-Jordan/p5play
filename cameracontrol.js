class Cameracontrol {
  constructor(hero) {
    this.classifier;
    this.imageModelURL = 'https://teachablemachine.withgoogle.com/models/EQskIKETN/';
    this.video;
    this.flippedVideo;
    this.label = '';
    this.hero = hero;
    this.classificationPromisse;

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
  }

  controlsSpace() {
    if (this.label === 'left') {
      this.hero.updateDir(-1, 0);
    } else if (this.label === 'right') {
      this.hero.updateDir(1, 0);
    } else if (this.label === 'down') {
      this.hero.updateDir(0, 1);
    } else if (this.label === 'up') {
      this.hero.updateDir(0, -1);
    }
  }

  handleMoviment(results) {
    console.log('results :>> ', results);
    if (!results) {
      return;
    }

    // The results are in an array ordered by confidence.
    this.label = (results) ? results[0].label : '';
    console.log('this.label :>> ', this.label);
    this.controlsSpace();
    this.classificationPromisse();
  }
}