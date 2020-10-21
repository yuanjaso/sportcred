import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { User } from '../models';
export interface AuthState {
  userinfo: User;
}
export const initialState: AuthState = {
  userinfo: undefined,
};

const reducer = createReducer<AuthState>(
  initialState,
  on(actions.setUserInfo, (state, { payload: userinfo }) => {
    return { ...state, userinfo };
  }),
  on(actions.clearLoginToken, (state) => {
    return { ...state, userinfo: undefined };
  })
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}

export const authFeatureKey = 'auth';
