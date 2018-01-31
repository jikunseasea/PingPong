import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { filter, withLatestFrom, takeUntil } from 'rxjs/operators';
import { animationFrameScheduler } from 'rxjs/Scheduler';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import Vector from './Vector';
import Ball from './Ball';
import ComputerPlayer from './ComputerPlayer';
import ManualPlayer from './ManualPlayer';
import Score from './Score';
import Level from './Level';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.ball = new Ball(this.canvas);
    this.level = new Level(this.canvas);
    this.score = new Score(this.canvas, this.level);
    this.computerPlayer = new ComputerPlayer(this.ball, this.canvas);
    this.manualPlayer = new ManualPlayer(this.ball, this.canvas, this.level, this.score);

    this.listenUpdate();

    this.lose$ = this.ball.left$.pipe(filter(left => left < 0));


    this.listenMouseClick();
    this.listenEnd();
  }
  
  drawBackground() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  listenUpdate() {
    interval(0, animationFrameScheduler)
      .subscribe(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.ball.update();
        this.manualPlayer.update();
        this.score.update();
        this.level.update();
      });
  }

  listenEnd() {
    this.lose$
      .subscribe(() => {
        this.ball.resetPosAndVelocity();
        this.manualPlayer.initPos();
        this.score.reset();
        this.level.reset();
      });
  }

  listenMouseMove() {
    fromEvent(this.canvas, 'mousemove').pipe(
        withLatestFrom(this.manualPlayer.pos$, (e, { x }) => ({ e, x })),
        takeUntil(this.lose$)
      )
      .subscribe(({ e, x }) => {
        this.manualPlayer.emitPos(new Vector(x, e.offsetY))
      });
  }

  listenMouseClick() {
    const randomVelocity = () => Math.random() > .5 ? 1 : -1;
    fromEvent(this.canvas, 'click')
      .subscribe(() => {
        const [vx, vy] = [randomVelocity(), randomVelocity()];
        this.ball.emitVelocity(new Vector(vx, vy));
        this.listenMouseMove();
      });
  }

}

export default Game;