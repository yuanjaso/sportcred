import { createSelector } from '@ngrx/store';
import { selectFeatureDebate } from '../../../../../store/selectors';

export const selectDebateTopics = createSelector(
  selectFeatureDebate,
  (state, props?: { debateId }) => {
    if (props?.debateId) {
      for (let i = 0; i < state.debateTopics.length; i++) {
        if (state.debateTopics[i].id === props.debateId)
          return state.debateTopics[i];
      }
    }
    return state.debateTopics;
  } //can maybe do filtering /  sorting here in the future
);
