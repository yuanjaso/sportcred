import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoginService } from '../login.service';
import * as actions from './actions';
import { fullRegistrationInfo } from '../models';

@Injectable()
export class LoginEffects {
  tryRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.tryRegister),
      mergeMap((info: fullRegistrationInfo) => {
        return this.loginService.tryRegister(info).pipe(
          map(() => ({
            type: '',
          })),
          catchError(() => EMPTY)
        );
      })
    )
  );
  getQuestionaire$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getQuestionaire),
      mergeMap(() =>
        this.loginService.getQuestionaire().pipe(
          map((questions) => ({
            type: actions.setQuestionaire.type,
            payload: questions,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  constructor(private actions$: Actions, private loginService: LoginService) {}
}
