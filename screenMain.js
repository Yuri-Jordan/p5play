class ScreenMain {
    constructor(canvas, gameScreens) {
        this.canvas = canvas;
        this.gameScreens = gameScreens;
        this.backImage = loadImage('assets/images/background/backgroundSpace.png');
        this.fontsize = 60;
        this.currenScreenID = gameScreens.MAIN;
        this.boxSelectionX = this.canvas.x / 10;
        this.slideBoxSelectionSizeX = 100;
    }

    draw() {
        background(this.backImage);

        fill(0, 102, 153);
        rect(this.boxSelectionX, this.canvas.y - 215, 200, 80)

        textSize(this.fontsize);
        textAlign(CENTER);
        fill(255, 255, 255);
        text('NOME JOGO', this.canvas.x / 2, this.canvas.y / 4);
        text('Jogar', this.canvas.x / 4, this.canvas.y / 1.5);
        text('Manual', this.canvas.x - 175, this.canvas.y / 1.5);

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
                return this.currenScreenID = gameScreens.GAME;
            }
        }
    }

    getScreenID () {
        return this.currenScreenID;
    }

    outsideRightBoundarie() {
        return this.boxSelectionX >= this.canvas.x / 2;
    }
}
