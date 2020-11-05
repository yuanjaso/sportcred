import { createAction, props } from '@ngrx/store';
import { UpdateProfilePayload } from '../profile.types';

export const getProfile = createAction(
  '[Profile] Get Profile',
  props<{ userId: number }>()
);
export const getACSHistory = createAction(
  '[Profile] Get ACS history',
  props<{ userId: number }>()
);
export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ profile: UpdateProfilePayload }>()
);

export const getAllUsers = createAction('[Profile] Get All Users');
export const getRadarList = createAction(
  '[Profile] Get Radar List',
  props<{ userId: number }>()
);

export const addUserToRadarList = createAction(
  '[Profile] Add User To Radar List',
  props<{ userId: number }>()
);
export const removeUserFromRadarList = createAction(
  '[Profile] Remove User From Radar List',
  props<{ userId: number }>()
);
