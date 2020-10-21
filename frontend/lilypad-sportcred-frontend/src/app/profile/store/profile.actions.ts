import { createAction, props } from '@ngrx/store';
import { Profile, UpdateProfilePayload } from '../profile.types';

export const getProfile = createAction(
  '[Profile] Get Profile',
  props<{ userId: number }>()
);
export const setProfile = createAction(
  '[Profile] Set Profile',
  props<{ profile: Profile }>()
);

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ profile: UpdateProfilePayload }>()
);
