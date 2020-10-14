import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export interface AuthState {
  authtoken: string;
}
export const initialState: AuthState = {
  authtoken: '',
};

const reducer = createReducer<AuthState>(
  initialState,
  on(actions.setLoginToken, (state, { token }) => ({ ...state, token }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}

export const authFeatureKey = 'auth';
