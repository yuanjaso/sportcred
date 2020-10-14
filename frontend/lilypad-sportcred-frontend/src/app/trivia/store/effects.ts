import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TriviaActions from './actions';

@Injectable()
export class TriviaEffects {
  getTriviaQuestions$ = createEffect(
    () => this.actions$.pipe(ofType(TriviaActions.getTriviaQuestions)),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
