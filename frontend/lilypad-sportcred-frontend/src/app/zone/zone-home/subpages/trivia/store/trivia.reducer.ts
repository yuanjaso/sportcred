import { Action, createReducer, on } from '@ngrx/store';
import { ACS } from '../../../../subpages/profile/profile.types';
import { TriviaInstance } from '../trivia.types';
import * as TriviaActions from './trivia.actions';

export interface TriviaState {
  // all historical games + unplayed invites
  allTriviaInstances: TriviaInstance[];
  updatedACS: ACS;
  // active game
  triviaInstance: TriviaInstance;
}

export const initialState: TriviaState = {
  allTriviaInstances: undefined,
  updatedACS: undefined,
  triviaInstance: undefined,
};

const reducer = createReducer<TriviaState>(
  initialState,
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
