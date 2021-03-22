class ScreenFinalLevel {
    constructor(canvas) {
        this.canvas = canvas;
        this.backImage = loadImage('assets/images/background/space1.png');
    }

    draw() {
        background(this.backImage);
    }
}
