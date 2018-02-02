import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { withLatestFrom, scan } from "rxjs/operators";

class Score {
  constructor(canvas, level) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.level = level;
    this.interval$ = new Subject();

    this.value$ = new BehaviorSubject(0);

    this.collision$ = new Subject();
    this.listenCollision();

    this.draw();
  }

  listenCollision() {
    this.collision$.pipe(
        withLatestFrom(this.level.value$),
        scan((value, [_, level]) => value + level, 0)
      )
      .subscribe((value) => {
        this.value$.next(value);
      })
  }

  reset() {
    this.value$.next(0);
  }

  draw() {
    this.interval$.pipe(
        withLatestFrom(this.value$)
      )
      .subscribe(([_, value]) => {
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`SCORE: ${value}`, this.canvas.width / 2, 50);
      });
  }

  updateCollision() {
    this.collision$.next();
  }


  update() {
    this.interval$.next();
  }
}

export default Score;