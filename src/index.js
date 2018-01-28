import { range } from 'rxjs/observable/range';
import { filter, scan, take } from 'rxjs/operators';


const source$ = range(0, 10);

source$.pipe(
  take(5),
  filter(x => x % 2 === 0),
  map(x => x + x),
  scan((acc, x) => acc + x, 0)
)
.subscribe(x => console.log(x))