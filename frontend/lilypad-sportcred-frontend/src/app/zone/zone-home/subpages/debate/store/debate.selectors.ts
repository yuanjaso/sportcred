import { createSelector } from '@ngrx/store';
import { selectFeatureDebate } from '../../../../../store/selectors';

export const selectAllDebateTopics = createSelector(
  selectFeatureDebate,
  (state) => state.debateTopics
);
export const selectDebateTopic = createSelector(
  selectFeatureDebate,
  (state, props: { debateId }) => {
    if (props.debateId && state.debateTopics) {
      for (let i = 0; i < state.debateTopics.length; i++) {
        if (state.debateTopics[i].id === props.debateId)
          return state.debateTopics[i];
      }
    }
    return undefined;
  }
);
