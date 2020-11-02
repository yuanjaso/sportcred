import { Action, createReducer, on } from '@ngrx/store';
import { Profile } from '../profile.types';
import { setProfile } from './profile.actions';

export interface ProfileState {
  profile: Profile;
}

export const initialState: ProfileState = {
  profile: undefined,
};

const reducer = createReducer<ProfileState>(
  initialState,
  on(setProfile, (state, { profile }) => ({ ...state, profile }))
);

export function profileReducer(
  state: ProfileState,
  action: Action
): ProfileState {
  return reducer(state, action);
}

export const profileFeatureKey = 'profile';
