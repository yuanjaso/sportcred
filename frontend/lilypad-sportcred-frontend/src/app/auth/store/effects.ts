import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import * as actions from './actions';

@Injectable()
export class AuthEffects {
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
