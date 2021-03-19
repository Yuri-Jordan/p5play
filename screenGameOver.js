class ScreenGameOver {
    constructor(canvas, gameScreens) {
        this.canvas = canvas;
        this.gameScreens = gameScreens;
        this.currenScreenID = gameScreens.GAMEOVER
        this.backImage = loadImage('assets/images/background/game-over.png');
        this.fontsize = 60;
    }

    draw() {
        background(this.backImage);
    }
}
