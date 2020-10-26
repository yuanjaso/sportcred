import { createSelector } from '@ngrx/store';
import { selectFeatureZone } from '../../store/selectors';
import { Player, Team } from '../zone.types';
import { ZoneState } from './reducers';

export const selectTeams = createSelector(
  selectFeatureZone,
  (
    state: ZoneState,
    //customFilter is a boolean function
    props?: { sportFilter?: string; customFilter?: (team: Team) => boolean }
  ) => {
    let entire = state.allTeams;
    if (entire === undefined) return undefined;

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
    props?: { sportFilter?: string; customFilter?: (player: Player) => boolean }
  ) => {
    let entire = state.allPlayers;
    if (entire === undefined) return undefined;

    if (props?.sportFilter) {
      entire = entire.filter(
        (player) => player.plays_on[0]?.plays_sport.name === props.sportFilter
      );
    }
    if (props?.customFilter) {
      entire = entire.filter((player) => props.customFilter(player));
    }
    return entire;
  }
);

export const selectSports = createSelector(
  selectFeatureZone,
  (state: ZoneState) => {
    return state.allSports;
  }
);
