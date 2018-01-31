import { combineLatest } from 'rxjs/observable/combineLatest';
import { withLatestFrom } from 'rxjs/operators';

import Vector from './Vector';
import Player from './Player';

class ComputerPlayer extends Player {
  constructor(ball, canvas) {
    super(ball, canvas);
    [this.initX, this.initY] = [this.canvas.width - 20, this.canvas.height / 2];
    this.initPos();
    // this.listenReset();
    this.listenY();
    this.listenCollision();

    this.draw(this.ctx);
  }

  listenY() {
    this.ball.pos$.pipe(
        withLatestFrom(this.pos$)
      )
      .subscribe(([ballPos, thisPos]) => {
        this.pos$.next(new Vector(thisPos.x, ballPos.y))
      });
  }

  listenCollision() {
    const { right$: ballRight$, velocity$ } = this.ball;
    const { left$: thisLeft$ } = this;

    combineLatest(ballRight$, thisLeft$).pipe(
        withLatestFrom(velocity$, ([ballRight, thisLeft], velocity) => (
          { ballRight, thisLeft, velocity }
        ))
      )
      .subscribe(({ ballRight, thisLeft, velocity }) => {
        if (velocity.x > 0 && ballRight > thisLeft) {
          Player.increaseVelocity(velocity);
          velocity$.next(velocity);
        }
      });
  }
}

export default ComputerPlayer;