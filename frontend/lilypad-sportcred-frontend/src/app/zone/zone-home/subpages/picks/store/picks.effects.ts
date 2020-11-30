import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { PicksSerivce } from '../picks.service';
import * as PicksActions from './picks.actions';

@Injectable()
export class PicksEffects {
  getPredictions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PicksActions.getPredictions),
      switchMap(({ user_id, year }) =>
        this.picksService.getPredictions(user_id, year)
      ),
      map((predictions) => PicksActions.setPredictions({ predictions }))
    )
  );

  updateUserPredictions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PicksActions.updateUserPredictions),
        mergeMap(({ predictions }) =>
          this.picksService.updateUserPredictions(predictions)
        )
      ),
    { dispatch: false }
  );

  lockInResults$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PicksActions.lockInResults),
        mergeMap(({ results }) => this.picksService.lockInPicks(results))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private picksService: PicksSerivce) {}
}
