import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { Question } from '../login.types';
export interface LoginState {
  registration_questionaire: Question[];
}
export const initialState: LoginState = {
  registration_questionaire: undefined,
};

// note that token and authorization things are in the auth store
const reducer = createReducer<LoginState>(
  initialState,
  on(actions.setQuestionaire, (state, { questionaire }) => ({
    ...state,
    registration_questionaire: questionaire,
  }))
);

export function loginReducer(state: LoginState, action: Action): LoginState {
  return reducer(state, action);
}

export const loginFeatureKey = 'login';
