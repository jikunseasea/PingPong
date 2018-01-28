import Rect from './Rect';

class Ball extends Rect {
  constructor(ctx) {
    super(10, 10);
    this.ctx = ctx;

    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.size.x, this.size.y);

    console.log('ballfsd')
  }
}


export default Ball;