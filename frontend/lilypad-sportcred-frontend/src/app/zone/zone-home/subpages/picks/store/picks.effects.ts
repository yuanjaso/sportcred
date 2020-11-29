import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { PicksSerivce } from '../picks.service';
import { lockInResults } from './picks.actions';

@Injectable()
export class TriviaEffects {
  lockInResults$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(lockInResults),
        mergeMap(({ results }) => this.picksService.lockInPicks(results))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private picksService: PicksSerivce) {}
}
