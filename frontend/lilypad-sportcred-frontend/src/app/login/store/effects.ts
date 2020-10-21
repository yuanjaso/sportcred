import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, first } from 'rxjs/operators';
import { LoginService } from '../login.service';
import * as actions from './actions';
import {
  generalRegistrationInfo,
  questionaireRegistrationInfo,
} from '../models';
import { setUserInfo } from '../../auth/store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { selectUserInfo } from '../../auth/store/selectors';
import { Router } from '@angular/router';
import { all_routes } from '../../../global/routing-statics';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      mergeMap(() => {
        //wait for token to be valid, once its valid we can reroute
        //This is done to avoid race condition, as we can NOT route before token is stored.
        // the auth guard will just kick us out to login
        return this.store.select(selectUserInfo).pipe(
          first((a) => !!a?.token),
          mergeMap(() => {
            this.router.navigate([all_routes.zone.url]);
            return [];
          })
        );
      })
    )
  );

  tryRegisterBasic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.tryRegisterBasic),
      mergeMap((info: generalRegistrationInfo) => {
        return this.loginService.tryRegisterBasic(info).pipe(
          mergeMap((payload) => {
            this.loginService.$registrationStatus.next(true);
            return [
              {
                type: setUserInfo.type,
                payload,
              },
              {
                type: actions.login.type,
              },
            ];
          }),
          catchError(() => {
            //inform the dialog that email is already taken
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
            questionaire: questions,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
