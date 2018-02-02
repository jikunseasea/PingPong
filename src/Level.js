import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { withLatestFrom, scan } from "rxjs/operators";

class Level {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.interval$ = new Subject();

    this.value$ = new BehaviorSubject(1);

    this.collision$ = new Subject();
    this.listenCollision();

    this.draw();
  }

  listenCollision() {
    const collisionTimesOfIncreasing = 3;
    this.collision$.pipe(
        scan(count => count + 1, 0)
      )
      .subscribe(count => {
        if (count % collisionTimesOfIncreasing === 0) {
          const level = Math.floor(count / collisionTimesOfIncreasing);
          this.value$.next(level + 1);
        }
      })
  }

  reset() {
    this.value$.next(1);
  }

  draw() {
    this.interval$.pipe(
        withLatestFrom(this.value$)
      )
      .subscribe(([_, value]) => {
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`LEVEL: ${value}`, this.canvas.width / 2, this.canvas.height - 30);
      });
  }

  updateCollision() {
    this.collision$.next();
  }

  update() {
    this.interval$.next();
  }
}

export default Level;