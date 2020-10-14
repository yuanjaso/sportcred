import { createSelector, createFeatureSelector } from '@ngrx/store';
import { authState, authKey } from './reducers';

export const getAuthState = createFeatureSelector<authState>(authKey);

export const selectAuthToken = createSelector(
  getAuthState,
  (state: authState) => state.authtoken
);
