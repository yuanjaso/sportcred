import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, mergeMapTo } from 'rxjs/operators';
import { TriviaService } from '../trivia.service';
import * as TriviaActions from './trivia.actions';
import { setUpdatedACS } from './trivia.actions';

@Injectable()
export class TriviaEffects {
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
      map((allTriviaInstances) =>
        TriviaActions.setAllTriviaInstances({ allTriviaInstances })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private triviaService: TriviaService
  ) {}
}
