import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export interface authState {
  authtoken: string;
}
export const initialState = {
  authtoken: '',
};

export const authReducer = createReducer(
  initialState,
  on(actions.setLoginToken, (state, { token }) => ({ ...state, token }))
);

export const authKey = 'authReducer';
