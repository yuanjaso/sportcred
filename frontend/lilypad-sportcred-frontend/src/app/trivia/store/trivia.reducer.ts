import { Action, createReducer, on } from '@ngrx/store';
import { ACS } from '../../profile/profile.types';
import { TriviaInstance, TriviaQuestions } from '../trivia.types';
import * as TriviaActions from './trivia.actions';

export interface TriviaState {
  triviaQuestions: TriviaQuestions[];
  updatedACS: ACS;
  triviaInstance: TriviaInstance;
}

export const initialState: TriviaState = {
  triviaQuestions: undefined,
  updatedACS: undefined,
  triviaInstance: undefined,
};

const reducer = createReducer<TriviaState>(
  initialState,
  on(TriviaActions.setTriviaInstance, (state, { triviaInstance }) => ({
    ...state,
    triviaInstance,
  })),
  on(TriviaActions.setUpdatedACS, (state, { acs }) => ({
    ...state,
    updatedACS: acs,
  })),
  on(TriviaActions.setTriviaQuestions, (state, { triviaQuestions }) => ({
    ...state,
    triviaQuestions,
  }))
);

export function triviaReducer(state: TriviaState, action: Action): TriviaState {
  return reducer(state, action);
}

export const triviaFeatureKey = 'trivia';
