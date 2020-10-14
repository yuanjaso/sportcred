import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actions from './actions';
import { AuthService } from '../auth.service';
@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getLoginToken.type),
      mergeMap(() =>
        this.authService.test().pipe(
          map((token) => ({
            type: actions.setLoginToken.type,
            payload: token,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
