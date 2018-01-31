import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest, map } from 'rxjs/operators';

import Vector from './Vector';
import { publishReplay } from 'rxjs/operators/publishReplay';
import { refCount } from 'rxjs/operators/refCount';

export default class Rect {
  constructor(x, y, w, h) {
    this.pos$ = new BehaviorSubject(new Vector(x, y));
    this.size$ = new BehaviorSubject(new Vector(w, h));

    this._outline$ = this.pos$.pipe(combineLatest(this.size$));
  }

  get left$() {
    return this._outline$.pipe(map(([pos, size]) => pos.x - size.x / 2));
  }

  get right$() {
    return this._outline$.pipe(map(([pos, size]) => pos.x + size.x / 2));
  }

  get top$() {
    return this._outline$.pipe(map(([pos, size]) => pos.y - size.y / 2));
  }

  get bottom$() {
    return this._outline$.pipe(map(([pos, size]) => pos.y + size.y / 2));
  }

  draw(ctx) {
    this.left$
    .pipe(combineLatest(this.top$, this.size$))
    .subscribe(([left, top, size]) => {
      ctx.fillStyle = '#fff';
      ctx.fillRect(left, top, size.x, size.y);
    });
  }
}