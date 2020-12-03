import { createSelector } from '@ngrx/store';
import { selectFeaturePicks } from '../../../../../store/selectors';

export const selectPredictions = createSelector(
  selectFeaturePicks,
  (state) => state.predictions
);
