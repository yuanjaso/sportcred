import { Action, createReducer, on } from '@ngrx/store';
import { TriviaQuestions } from '../trivia.models';
import * as TriviaActions from './actions';

export interface TriviaState {
  triviaQuestions: TriviaQuestions[];
}

export const initialState: TriviaState = {
  triviaQuestions: undefined,
};

const reducer = createReducer<TriviaState>(
  initialState,
  on(TriviaActions.setTriviaQuestions, (state, { triviaQuestions }) => ({
    ...state,
    triviaQuestions,
  }))
);

export function triviaReducer(state: TriviaState, action: Action): TriviaState {
  return reducer(state, action);
}

export const triviaFeatureKey = 'trivia';
