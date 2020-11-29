import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { PicksSerivce } from '../picks.service';
import * as PicksActions from './picks.actions';

@Injectable()
export class TriviaEffects {
  lockInResults$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PicksActions.lockInResults),
        mergeMap(({ results }) => this.picksService.lockInPicks(results))
      ),
    { dispatch: false }
  );

  getPredictions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PicksActions.getPredictions),
      switchMap(({ user_id, year }) =>
        this.picksService.getPredictions(user_id, year)
      ),
      map((predictions) => PicksActions.setPredictions({ predictions }))
    )
  );

  constructor(private actions$: Actions, private picksService: PicksSerivce) {}
}
