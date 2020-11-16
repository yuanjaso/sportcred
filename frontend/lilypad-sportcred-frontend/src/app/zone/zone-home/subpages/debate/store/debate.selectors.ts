import { createSelector } from '@ngrx/store';
import { selectFeatureDebate } from '../../../../../store/selectors';

export const selectDebateTopics = createSelector(
  selectFeatureDebate,
  (state) => state.debateTopics //can maybe do filtering /  sorting here in the future
);
