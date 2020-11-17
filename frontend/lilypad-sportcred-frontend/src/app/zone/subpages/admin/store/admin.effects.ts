import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { getQuestionnaireResponse, submitDebatePost } from './admin.actions';

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
      mergeMap(({ submission }) =>
        this.adminService.submitDebatePost(submission)
      )
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private adminService: AdminService) {}
}
