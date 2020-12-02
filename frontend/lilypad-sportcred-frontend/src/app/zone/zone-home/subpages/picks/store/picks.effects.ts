import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectUserInfo } from '../../../../../auth/store/selectors';
import { AppState } from '../../../../../store/reducer';
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

  updateUserPredictions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PicksActions.updateUserPredictions),
      mergeMap(({ predictions }) =>
        this.picksService.updateUserPredictions(predictions)
      ),
      map((predictions) => PicksActions.setPredictions({ predictions }))
    )
  );

  lockInResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PicksActions.lockInResults),
      mergeMap(({ results }) =>
        this.picksService.lockInPicks(results).pipe(
          withLatestFrom(this.store.select(selectUserInfo)),
          map(([, userInfo]) =>
            PicksActions.getPredictions({
              year: results.year,
              user_id: userInfo.user_id,
            })
          )
        )
      )
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private picksService: PicksSerivce
  ) {}
}
