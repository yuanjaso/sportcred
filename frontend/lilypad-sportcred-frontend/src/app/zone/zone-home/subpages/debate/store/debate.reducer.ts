import { Action, createReducer } from '@ngrx/store';
import { DebateTopic } from '../debate.types';

export interface DebateState {
  debateTopics: DebateTopic[];
}

export const initialState: DebateState = {
  debateTopics: undefined,
};

const reducer = createReducer<DebateState>(initialState);

export function debateReducer(state: DebateState, action: Action): DebateState {
  return reducer(state, action);
}

export const debateFeatureKey = 'debate';
