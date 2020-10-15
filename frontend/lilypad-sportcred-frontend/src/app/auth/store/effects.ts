import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import * as actions from './actions';
import { authInfo, registrationInfo } from '../models';

@Injectable()
export class AuthEffects {
  getLoginToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getLoginToken),
      mergeMap((info: authInfo) =>
        this.authService.tryLogin(info).pipe(
          map((token) => ({
            type: actions.setLoginToken.type,
            payload: token,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  tryRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.tryRegister),
      mergeMap((info: registrationInfo) =>
        this.authService.tryRegister(info).pipe(
          map(() => ({
            type: '',
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
