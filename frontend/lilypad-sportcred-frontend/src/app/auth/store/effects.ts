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
import { User } from '../models';
@Injectable()
export class AuthEffects {
  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getUserInfo),
      mergeMap((info: loginInfo) =>
        this.loginService.tryLogin(info).pipe(
          first(),
          mergeMap((payload: User) => {
            return [
              {
                //we set the login token
                type: actions.setUserInfo.type,
                payload,
              },
              {
                //also dispatch the login action, which sole purpose
                // is to wait for the token in the store to change, then routing accordingly
                type: login.type,
              },
            ];
          }),
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
