import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LoginService } from '../../login/login.service';
import * as actions from './actions';
import { loginInfo } from '../../login/models';

@Injectable()
export class AuthEffects {
  getLoginToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getLoginToken),
      mergeMap((info: loginInfo) =>
        this.loginService.tryLogin(info).pipe(
          map((token) => ({
            type: actions.setLoginToken.type,
            payload: token,
          })),
          catchError(() => {
            this.loginService.$loginStatus.next(false);
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private loginService: LoginService) {}
}
