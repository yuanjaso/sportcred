import { createAction, props } from '@ngrx/store';
import { TriviaQuestions } from '../trivia.types';

export const getTriviaQuestions = createAction('[Trivia] Get Trivia Questions');
export const setTriviaQuestions = createAction(
  '[Trivia] Set Trivia Questions',
  props<{ triviaQuestions: TriviaQuestions[] }>()
);
