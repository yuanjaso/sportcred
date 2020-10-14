import { createSelector } from '@ngrx/store';
import { selectFeatureAuth } from '../../store/selectors';
import { AuthState } from './reducers';

export const selectAuthToken = createSelector(
  selectFeatureAuth,
  (state: AuthState) => state.authtoken
);
