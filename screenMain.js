class ScreenMain {
    constructor(canvas, gameScreens, controlsType) {
        this.controlsType = controlsType;
        this.gameScreens = gameScreens;
        this.controlsTypeSelected = controlsType.KEYBOARD;
        this.currentScreenID = gameScreens.MAIN;
        this.canvas = canvas;
        this.backImage = loadImage('assets/images/background/backgroundSpace.png');
        this.fontsize = 60;
        this.boxSelectionX = this.canvas.x / 10;
        this.slideBoxSelectionSizeX = 100;
    }

    draw() {
        background(this.backImage);

        fill(0, 102, 153);
        rect(this.boxSelectionX, this.canvas.y - 215, 200, 100)

        textSize(this.fontsize);
        textAlign(CENTER);
        fill(255, 255, 255);
        text('NOME JOGO', this.canvas.x / 2, this.canvas.y / 4);
        textSize(22);
        text('Jogar com teclado', this.canvas.x / 4, this.canvas.y / 1.5);
        text('Jogar com gestos', this.canvas.x - 175, this.canvas.y / 1.5);

        return this.screenControls();
    }

    screenControls() {

        if (keyIsDown(LEFT_ARROW)) {

            this.boxSelectionX = this.canvas.x / 10;

        } else if (keyIsDown(RIGHT_ARROW)) {

            if (this.outsideRightBoundarie()) return;

            this.boxSelectionX += this.slideBoxSelectionSizeX;

        } else if (keyIsDown(ENTER)) {

            if (this.boxSelectionX == this.canvas.x / 10) {
                this.controlsTypeSelected = controlsType.KEYBOARD;
            } else {
                this.controlsTypeSelected = controlsType.GESTURES;
            }
            return this.currentScreenID = gameScreens.GAME;
        }
    }

    getControlsType () {
        return this.controlsTypeSelected;
    }

    getScreenID () {
        return this.currentScreenID;
    }

    outsideRightBoundarie() {
        return this.boxSelectionX >= this.canvas.x / 2;
    }
}
