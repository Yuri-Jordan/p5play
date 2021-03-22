class WinScreen {
    constructor(canvas, gameScreens) {
        this.canvas = canvas;
        this.gameScreens = gameScreens;
        this.backImage = loadImage('assets/images/background/bg5.jpg');
        this.fontsize = 60;
    }

    draw(score) {
        background(this.backImage);

        textSize(this.fontsize);
        textAlign(CENTER);
        fill(255, 255, 255);
        text('NOME JOGO', this.canvas.x / 2, this.canvas.y / 4);
        this.fontsize = 30;
        text('Você venceu! Sua ponuação foi ' + int(score), this.canvas.x / 2, this.canvas.y / 1.5);
    }
}
