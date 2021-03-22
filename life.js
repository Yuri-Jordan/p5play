class Life {
    constructor(canvas) {
        this.lifeY = 0;
        this.canvas = canvas;
        this.lifesGroup = new Group();
        this.lifeImage = loadImage('assets/images/life.png');
    }

    drawLife() {

        const lifeX = int(random(640));

        const life = createSprite(lifeX, this.lifeY);
        life.scale = 0.1;
        life.addImage(this.lifeImage);
        life.velocity.y = 2.5;
        life.setCollider("rectangle", 0, 0, 370, 320);

        this.lifesGroup.add(life);
    }

    update() {
        var randomBoolean = Math.random() < 0.002;

        if (!randomBoolean) return;

        this.drawLife();
    }
}
