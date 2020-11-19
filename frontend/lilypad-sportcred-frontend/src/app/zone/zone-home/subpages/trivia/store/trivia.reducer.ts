import { Action, createReducer, on } from '@ngrx/store';
import { TriviaAnswersResponse, TriviaInstance } from '../trivia.types';
import * as TriviaActions from './trivia.actions';

export interface TriviaState {
  // all historical games + unplayed invites
  allTriviaInstances: TriviaInstance[];
  updatedACS: TriviaAnswersResponse;
  // active game
  triviaInstance: TriviaInstance;
}

export const initialState: TriviaState = {
  allTriviaInstances: undefined,
  // must be set to null instead of undefined, for the skip(2) to work in single trivia
  // and because of how we reset this to undefined on submitTriviaResults
  updatedACS: null,
  triviaInstance: undefined,
};

const reducer = createReducer<TriviaState>(
  initialState,
  // reset the acs score no need to cache anymore as it will get override
  // also need to do this because we can get consecutive values of null but the selector won't realize it
  on(TriviaActions.submitTriviaResults, (state) => ({
    ...state,
    updatedACS: undefined,
  })),
  on(TriviaActions.setAllTriviaInstances, (state, { allTriviaInstances }) => ({
    ...state,
    allTriviaInstances,
  })),
  on(TriviaActions.setTriviaInstance, (state, { triviaInstance }) => ({
    ...state,
    triviaInstance,
  })),
  on(TriviaActions.setUpdatedACS, (state, { acs }) => ({
    ...state,
    updatedACS: acs,
  }))
);

export function triviaReducer(state: TriviaState, action: Action): TriviaState {
  return reducer(state, action);
}

export const triviaFeatureKey = 'trivia';
