import { Action, createReducer, on } from '@ngrx/store';
import { DebateTopic } from '../debate.types';
import { setDebateTopics } from './debate.actions';
export interface DebateState {
  debateTopics: DebateTopic[];
}

export const initialState: DebateState = {
  debateTopics: undefined,
};

const reducer = createReducer<DebateState>(
  initialState,
  on(setDebateTopics, (state, { topics }) => ({
    ...state,
    registration_questionaire: topics,
  }))
);

export function debateReducer(state: DebateState, action: Action): DebateState {
  return reducer(state, action);
}

export const debateFeatureKey = 'debate';
