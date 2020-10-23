import { createSelector } from '@ngrx/store';
import { selectFeatureZone } from '../../store/selectors';
import { ZoneState } from './reducers';
import { sportTypes } from '../zone.types';

export const selectTeams = createSelector(
  selectFeatureZone,
  (
    state: ZoneState,
    //customFilter is a boolean function
    props?: { sportFilter?: sportTypes; customFilter?: Function }
  ) => {
    let entire = state.allTeams;
    if (props?.sportFilter) {
      entire = entire.filter(
        (team) => team.plays_sport.name === props.sportFilter
      );
    }
    if (props?.customFilter) {
      entire = entire.filter((team) => props.customFilter(team));
    }
    return entire;
  }
);

export const selectPlayers = createSelector(
  selectFeatureZone,
  (
    state: ZoneState,
    //customFilter is a boolean function
    props?: { sportFilter?: sportTypes; customFilter?: Function }
  ) => {
    let entire = state.allplayers;
    if (props?.sportFilter) {
      entire = entire.filter(
        (player) => player.plays_on.plays_sport.name === props.sportFilter
      );
    }
    if (props?.customFilter) {
      entire = entire.filter((player) => props.customFilter(player));
    }
    return entire;
  }
);
