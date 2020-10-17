import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoginService } from '../login.service';
import * as actions from './actions';
import {
  generalRegistrationInfo,
  questionaireRegistrationInfo,
} from '../models';

@Injectable()
export class LoginEffects {
  tryRegisterBasic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.tryRegisterBasic),
      mergeMap((info: generalRegistrationInfo) => {
        return this.loginService.tryRegisterBasic(info).pipe(
          map(() => {
            this.loginService.$registrationStatus.next(true);
            return {
              type: '',
            };
          }),
          //todo catch this error
          catchError(() => {
            this.loginService.$registrationStatus.next(false);
            return EMPTY;
          })
        );
      })
    )
  );

  tryRegisterQuestionaire$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.tryRegisterQuestionaire),
      mergeMap((info: questionaireRegistrationInfo) => {
        return this.loginService.tryRegisterQuestionaire(info).pipe(
          map(() => ({
            type: '',
          })),
          //todo catch this error
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
