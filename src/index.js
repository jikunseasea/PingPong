// import { range } from 'rxjs/observable/range';
// import { filter, scan, take, map } from 'rxjs/operators';


// const source$ = range(0, 10);

// source$.pipe(
//   take(5),
//   filter(x => x % 2 === 0),
//   map(x => x + x),
//   scan((acc, x) => acc + x, 0)
// )
// .subscribe(x => console.log(x))

import Game from './Game';

let game = new Game(
  document.getElementById('canvas')
);


if (module.hot && process.env.NODE_ENV === 'dev') {
  module.hot.accept('./Game', (...args) => {
    console.log('update ====================')
    console.log(args)
    // const canvas = document.getElementById('canvas');
    // canvas.remove();
    // const nextCanvas = canvas.cloneNode();
    // document.body.appendChild(nextCanvas);
    game = new Game(document.getElementById('canvas'));
  });
}