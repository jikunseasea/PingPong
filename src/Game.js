import Ball from './Ball';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ball = new Ball(this.ctx);
    console.log('jikunfasdf fasdf sfsdf')
  }

  update() {}
}

export default Game;