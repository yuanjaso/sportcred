import { createAction, props } from '@ngrx/store';
import { ACS } from '../../profile/profile.types';
import { TriviaQuestions, TriviaResults } from '../trivia.types';

export const getTriviaQuestions = createAction('[Trivia] Get Trivia Questions');
export const setTriviaQuestions = createAction(
  '[Trivia] Set Trivia Questions',
  props<{ triviaQuestions: TriviaQuestions[] }>()
);

export const submitTriviaResults = createAction(
  '[Trivia] Submit Trivia Results',
  props<{ results: TriviaResults }>()
);
export const setUpdatedACS = createAction(
  '[Trivia] Set Updated ACS',
  props<{ acs: ACS }>()
);
