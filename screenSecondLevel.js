class ScreenSecondLevel {
    constructor(canvas) {
        this.canvas = canvas;
        this.backImage = loadImage('assets/images/background/bg5.jpg');
    }

    draw() {
        background(this.backImage);
    }
}
