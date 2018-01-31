import { fromEvent } from 'rxjs/observable/fromEvent';
import { combineLatest as staticCombineLatest } from 'rxjs/observable/combineLatest';
import { withLatestFrom, combineLatest, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import Vector from './Vector';
import Player from './Player';

class ManualPlayer extends Player {
  constructor(ball, canvas, level, score) {
    super(ball, canvas);
    this.level = level;
    this.score = score;
    this.interval$ = new Subject();
    [this.initX, this.initY] = [20, this.canvas.height / 2];
    this.initPos();
    this.listenCollision();
    this.draw(this.ctx);
  }


  emitPos(vector) {
    this.pos$.next(vector);
  }

  listenCollision() {
    const { left$: ballLeft$, bottom$: ballBottom$, top$: ballTop$, velocity$ } = this.ball;
    const { right$: thisRight$, bottom$: thisBottom$, top$: thisTop$ } = this;

    staticCombineLatest(ballLeft$, ballBottom$, ballTop$, thisRight$, thisBottom$, thisTop$).pipe(
        withLatestFrom(velocity$, ([ballLeft, ballBottom, ballTop, thisRight, thisBottom, thisTop], velocity) => (
          { ballLeft, ballBottom, ballTop, thisRight, thisBottom, thisTop, velocity }
        ))
      )
      .subscribe(({ ballLeft, ballBottom, ballTop, thisRight, thisBottom, thisTop, velocity }) => {
        if (velocity.x < 0 && ballLeft < thisRight && ballBottom > thisTop && ballTop < thisBottom) {
          Player.increaseVelocity(velocity);
          velocity$.next(velocity);
          this.level.updateCollision();
          this.score.updateCollision(this.level);
        }
      });
  }

  draw() {
    this.interval$.pipe(
        combineLatest(this.left$, this.top$, this.size$)
      )
      .subscribe(([_, left, top, size]) => {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(left, top, size.x, size.y);
      });
  }

  update() {
    this.interval$.next();
  }
}

export default ManualPlayer;