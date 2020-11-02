import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, first, mergeMap } from 'rxjs/operators';
import { LoginService } from '../../login/login.service';
import { LoginInfo } from '../../login/login.types';
import { login } from '../../login/store/actions';
import { User } from '../auth.types';
import * as actions from './actions';

@Injectable()
export class AuthEffects {
  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getUserInfo),
      mergeMap((info: LoginInfo) =>
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
