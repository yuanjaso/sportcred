import { createSelector } from '@ngrx/store';
import { selectFeatureTrivia } from '../../store/selectors';

export const selectUpdatedACS = createSelector(
  selectFeatureTrivia,
  (state) => state.updatedACS
);

export const selectTriviaInstance = createSelector(
  selectFeatureTrivia,
  (state) => state.triviaInstance
);
