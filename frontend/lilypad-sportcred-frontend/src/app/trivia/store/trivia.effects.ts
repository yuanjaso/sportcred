import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { TriviaService } from '../trivia.service';
import * as TriviaActions from './trivia.actions';

@Injectable()
export class TriviaEffects {
  getTriviaQuestions$ = createEffect(
    () => this.actions$.pipe(ofType(TriviaActions.getTriviaQuestions)),
    { dispatch: false }
  );

  submitTriviaResults$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TriviaActions.submitTriviaResults),
        mergeMap(({ results }) =>
          this.triviaService.submitTriviaResults(results)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private triviaService: TriviaService
  ) {}
}
