import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DebateService } from '../debate.service';
import { DebateComment, DebateTopic } from '../debate.types';
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
        mergeMap((id: { topic_id: number }) => {
          return this.debateService.getDebateDiscussion(id.topic_id).pipe(
            map((discussion: DebateComment[]) =>
              this.debateService.hotDebateDiscussion$.next(discussion)
            ),
            catchError(() => EMPTY)
          );
        })
      ),
    { dispatch: false }
  );

  postDebateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.postDebateComment),
      mergeMap(({ payload }) => this.debateService.postDebateComment(payload)),
      mergeMap((payload) =>
        from([
          // easy way to refresh comment list
          actions.getDebateDiscussion({ topic_id: payload.debate_id }),
          // refresh the main component for fields like # of comments
          actions.getDebateTopics(),
        ])
      )
    )
  );

  rateDebate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.rateDebate),
      mergeMap(({ payload }) => this.debateService.rateDebate(payload)),
      mergeMap((payload) =>
        from([
          // easy way to refresh comment list
          actions.getDebateDiscussion({ topic_id: payload.debate_id }),
        ])
      )
    )
  );
}
