class Player {
  constructor(x,y,len1,len2,plane) {
    this.xdir = x;
    this.ydir = y;
    this.len1 = len1;
    this.len2 = len2;
    this.plane = plane;
  }

  updateDir(x, y) {
    if(this.xdir > 0 && this.xdir < this.plane.x){
      this.xdir = this.xdir + x;
    } else {
      if(this.xdir == this.plane.x) this.xdir = this.plane.x - 1;
      else if(this.xdir == 0) this.xdir = 1;
    }

    if(this.ydir > 0 && this.ydir < this.plane.y){
      this.ydir = this.ydir + y;
    } else {
      if(this.ydir == this.plane.y) this.ydir = this.plane.y - 1;
      else if(this.ydir == 0) this.ydir = 1;
    }
  }

  show() {
    fill(color(0, 150, 125));
    ellipse(this.xdir, this.ydir, this.len1, this.len2);
  }
}
