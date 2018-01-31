import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  withLatestFrom,
  scan,
  merge,
  switchMap,
  combineLatest
} from 'rxjs/operators';

import Rect from './Rect';
import Vector from './Vector';

class Ball extends Rect {
  constructor(canvas) {
    super(0, 0, 15, 15);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.interval$ = new Subject();
  
    this.velocity$ = new BehaviorSubject(new Vector());
    this.initPos();
    this.listenVelocity();

    this.listenPos();

    this.draw(this.ctx);
  }

  emitVelocity(vector) {
    this.velocity$.next(vector);
  }

  initPos() {
    this.pos$.next(new Vector(this.canvas.width / 2, this.canvas.height / 2));
  }

  resetPosAndVelocity() {
    this.velocity$.next(new Vector());
    this.initPos();
  }

  updateVelocity(c, velocity, low, up) {
    const v = velocity.y;
    if (c < low && v > 0) {
       this.velocity$.next(new Vector(velocity.x, v));
    } else if (c < low && v < 0) {
      this.velocity$.next(new Vector(velocity.x, -v));
    } else if (c > up && v > 0) {
      this.velocity$.next(new Vector(velocity.x, -v));
    } else if (c > up && v < 0) {
      this.velocity$.next(new Vector(velocity.x, v));
    }
  }

  listenVelocity() {
    this.top$.pipe(
        merge(this.bottom$),
        withLatestFrom(this.velocity$)
      )
      .subscribe(([y, velocity]) => {
        this.updateVelocity(y, velocity, 0, this.canvas.height);
      })
  }

  listenPos() {
    this.interval$.pipe(
        withLatestFrom(this.pos$, this.velocity$, (_, pos, velocity) => ({ pos, velocity }))
      )
      .subscribe(({ pos, velocity }) => {
        this.pos$.next(pos.add(velocity));
      })
  }

  update() {
    this.interval$.next();
  }
}


export default Ball;