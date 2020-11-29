import { Action, createReducer, on } from '@ngrx/store';
import { Predictions } from '../picks.types';
import * as PicksActions from './picks.actions';

export type PicksState = {
  predictions: Predictions;
};

export const initialState: PicksState = {
  predictions: undefined,
};

const reducer = createReducer<PicksState>(
  initialState,
  on(PicksActions.setPredictions, (state, { predictions }) => ({
    ...state,
    predictions,
  }))
);

export function picksReducer(state: PicksState, action: Action): PicksState {
  return reducer(state, action);
}

export const picksFeatureKey = 'picks';
