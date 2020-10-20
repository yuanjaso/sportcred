import { createSelector } from '@ngrx/store';
import { selectFeatureLogin } from '../../store/selectors';
import { LoginState } from './reducers';

export const selectQuestionaire = createSelector(
  selectFeatureLogin,
  (state: LoginState) => state.registration_questionaire
);
