import { merge } from 'rxjs/operators';

import Rect from "./Rect";
import Vector from './Vector';


class Player extends Rect {
  constructor(ball, canvas) {
    super(0, 0, 20, 100);
    this.ball = ball;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }
  
  initPos(x, y) {
    this.pos$.next(new Vector(this.initX, this.initY));
  }

  static increaseVelocity(velocity) {
    velocity.length *= 1.05;
    velocity.x *= -1;
  }
}

export default Player;