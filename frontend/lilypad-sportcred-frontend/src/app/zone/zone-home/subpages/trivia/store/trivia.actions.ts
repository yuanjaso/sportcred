import { createAction, props } from '@ngrx/store';
import { ACS } from '../../../../subpages/profile/profile.types';
import {
  TriviaInstance,
  TriviaQuestions,
  TriviaResults,
} from '../trivia.types';

export const getTriviaQuestions = createAction('[Trivia] Get Trivia Questions');
export const setTriviaQuestions = createAction(
  '[Trivia] Set Trivia Questions',
  props<{ triviaQuestions: TriviaQuestions[] }>()
);

export const setTriviaInstance = createAction(
  '[Trivia] Set Trivia Instance',
  props<{ triviaInstance: TriviaInstance }>()
);

export const submitTriviaResults = createAction(
  '[Trivia] Submit Trivia Results',
  props<{ results: TriviaResults }>()
);
export const setUpdatedACS = createAction(
  '[Trivia] Set Updated ACS',
  props<{ acs: ACS }>()
);
