import { Action, createReducer } from '@ngrx/store';

export interface ProfileState {}

export const initialState: ProfileState = {};

const reducer = createReducer<ProfileState>(initialState);

export function profileReducer(
  state: ProfileState,
  action: Action
): ProfileState {
  return reducer(state, action);
}

export const profileFeatureKey = 'profile';
