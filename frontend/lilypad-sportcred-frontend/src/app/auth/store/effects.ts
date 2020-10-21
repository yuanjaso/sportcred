import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, act } from '@ngrx/effects';
import { EMPTY, from, fromEventPattern } from 'rxjs';
import { catchError, map, mergeMap, first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LoginService } from '../../login/login.service';
import * as actions from './actions';
import { loginInfo } from '../../login/models';
import { NONE_TYPE } from '@angular/compiler';
import { Router } from '@angular/router';
import { login } from '../../login/store/actions';
@Injectable()
export class AuthEffects {
  getLoginToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getLoginToken),
      mergeMap((info: loginInfo) =>
        this.loginService.tryLogin(info).pipe(
          first(),
          mergeMap((payload) => [
            {
              //we set the login token
              type: actions.setLoginToken.type,
              token: (payload as any).token,
            },
            {
              //also dispatch the login action, which sole purpose
              // is to wait for the token in the store to change, then routing accordingly
              type: login.type,
            },
          ]),
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
