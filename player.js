class Player {
  constructor(x,y,len1,len2,canvas) {
    this.xdir = x;
    this.ydir = y;
    this.len1 = len1;
    this.len2 = len2;
    this.canvas = canvas;
    this.bulletImage = loadImage('assets/asteroids_bullet.png');
  }

  updateDir(x, y) {
    if(this.xdir > 0 && this.xdir < this.canvas.x){
      this.xdir = this.xdir + x;
    } else {
      if(this.xdir == this.canvas.x) this.xdir = this.canvas.x - 1;
      else if(this.xdir == 0) this.xdir = 1;
    }

    if(this.ydir > 0 && this.ydir < this.canvas.y){
      this.ydir = this.ydir + y;
    } else {
      if(this.ydir == this.canvas.y) this.ydir = this.canvas.y - 1;
      else if(this.ydir == 0) this.ydir = 1;
    }
  }

  show() {
    fill(color(0, 150, 125));
    ellipse(this.xdir, this.ydir, this.len1, this.len2);
  }

  shoot() {
    new Tiro(this.xdir, this.ydir, this.bulletImage);
  }
}
