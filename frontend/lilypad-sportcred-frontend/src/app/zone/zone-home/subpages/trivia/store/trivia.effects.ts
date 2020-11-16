import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  filter,
  map,
  mergeMap,
  mergeMapTo,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { AppState } from '../../../../../store/reducer';
import { TriviaService } from '../trivia.service';
import * as TriviaActions from './trivia.actions';
import { setUpdatedACS } from './trivia.actions';
import { selectAllTriviaInstances } from './trivia.selectors';

@Injectable()
export class TriviaEffects {
  createTriviaInstance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TriviaActions.createTriviaInstance),
      switchMap(({ sportId, opponentUserId }) =>
        this.triviaService.createTriviaInstance(sportId, opponentUserId)
      ),
      map((triviaInstance) =>
        TriviaActions.setTriviaInstance({ triviaInstance })
      )
    )
  );

  submitTriviaResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TriviaActions.submitTriviaResults),
      mergeMap(({ results }) =>
        this.triviaService.submitTriviaResults(results)
      ),
      map((acs) => setUpdatedACS({ acs }))
    )
  );

  queryForTriviaGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TriviaActions.queryForTriviaGames),
      // using mergeMapTo because the HTTP request requires no parameters and thus is 'constant'
      mergeMapTo(this.triviaService.queryForTriviaGames()),
      map((newTriviaInstances) =>
        TriviaActions.setAllTriviaInstances({
          allTriviaInstances: newTriviaInstances,
        })
      )
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private triviaService: TriviaService
  ) {}
}
