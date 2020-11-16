import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DebateService } from '../debate.service';
import { DebateDiscussion, DebateTopic } from '../debate.types';
import * as actions from './debate.actions';
@Injectable()
export class DebateEffects {
  constructor(
    private actions$: Actions,
    private debateService: DebateService
  ) {}

  getDebateTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getDebateTopics),
      mergeMap(() => {
        return this.debateService.getAllDebates().pipe(
          map((topics: DebateTopic[]) => ({
            type: actions.setDebateTopics.type,
            topics,
          })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  getDebateDiscussion$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.getDebateDiscussion),
        mergeMap((id: { topics_id: number }) => {
          return this.debateService.getDebateDiscussion(id.topics_id).pipe(
            map((discussion: DebateDiscussion) =>
              this.debateService.hotDebateDiscussion$.next(discussion)
            ),
            catchError(() => EMPTY)
          );
        })
      ),
    { dispatch: false }
  );
}
