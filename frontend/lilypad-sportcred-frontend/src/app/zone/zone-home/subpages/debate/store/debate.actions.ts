import { createAction, props } from '@ngrx/store';
import { DebateTopic } from './../debate.types';

export const getDebateTopics = createAction('[Debate] Get Debate Topics');
export const setDebateTopics = createAction(
  '[Trivia] Set Debate Topics',
  props<{ topics: DebateTopic[] }>()
);

export const getDebateDiscussion = createAction(
  '[Debate] Get Debate Discussion',
  props<{ topic_id: number }>()
);
