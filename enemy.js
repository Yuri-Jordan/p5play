class Enemy {
  constructor(canvas, num_enemies) {
    this.enemyX = [];
    this.enemyY = [];
    this.direction = [];
    this.canvas = canvas;
    this.speed = int((second()+10)/10);
    this.num_enemies = num_enemies; 


    for(let i = 0; i < num_enemies; i = i + 1){
      this.enemyX[i] = int(random(640));
      this.enemyY[i] = int(random(200));
      this.direction[i] = true;
    }
  }

  moveEnemy(x, i, canvas) {
    if(x > canvas.x){
      this.direction[i] = false;
      return canvas.x - 1;
    } else if(x < 0){
      this.direction[i] = true;
      return 1;
    } else {
      if(this.direction[i]){
        return x + 1*this.speed;
      } else {
        return x - 1*this.speed;
      }
    }
  }

  update(){
    fill(color(255,0,0))
    for(let i = 0; i < this.num_enemies; i = i + 1){
      square(this.enemyX[i], this.enemyY[i], 25);
      this.enemyX[i] = this.moveEnemy(this.enemyX[i], i, this.canvas);
    }
  }

  show() {
    fill(color(0, 150, 125));
    ellipse(this.xdir, this.ydir, this.len1, this.len2);
  }
}
