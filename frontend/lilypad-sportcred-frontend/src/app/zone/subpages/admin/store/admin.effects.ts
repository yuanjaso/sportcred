import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { getQuestionnaireResponse, submitDebatePost } from './admin.actions';
import { EMPTY } from 'rxjs';
import { getDebateTopics } from 'src/app/zone/zone-home/subpages/debate/store/debate.actions';

@Injectable()
export class AdminEffects {
  getQuestionnaireResponse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getQuestionnaireResponse),
        switchMap((action) =>
          this.adminService.getQuestionnaireResponses(action.question_id)
        ),
        map((resp) => this.adminService.$freshQuestionnairResponses.next(resp))
      ),
    { dispatch: false }
  );

  submitDebatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitDebatePost),
      mergeMap(({ submission }) => {
        return this.adminService.submitDebatePost(submission).pipe(
          map((payload) => {
            return {
              type: getDebateTopics.type,
            };
          }),
          catchError(() => {
            return EMPTY;
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private adminService: AdminService) {}
}
