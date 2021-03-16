class Canvas {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    createCanvas(x, y).parent('tela-centro');
  }
}
