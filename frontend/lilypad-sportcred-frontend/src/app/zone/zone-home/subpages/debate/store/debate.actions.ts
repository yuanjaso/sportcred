import { createAction, props } from '@ngrx/store';
import {
  DebateCommentRating,
  DebatePostCommentPayload,
  DebateTopic,
} from './../debate.types';

export const getDebateTopics = createAction('[Debate] Get Debate Topics');
export const setDebateTopics = createAction(
  '[Trivia] Set Debate Topics',
  props<{ topics: DebateTopic[] }>()
);

export const getDebateDiscussion = createAction(
  '[Debate] Get Debate Discussion',
  props<{ topic_id: number }>()
);

export const postDebateComment = createAction(
  '[Debate] Post Debate Comment',
  props<{ payload: DebatePostCommentPayload }>()
);

export const rateDebateComment = createAction(
  '[Debate] Rate Debate Comment',
  props<{ payload: DebateCommentRating }>()
);
