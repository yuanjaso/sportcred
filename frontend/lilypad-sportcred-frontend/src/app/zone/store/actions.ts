import { createAction, props } from '@ngrx/store';
import { Team, Player } from '../zone.types';

export const getAllSportsTeams = createAction('[Zone] Get All Sports Teams');
export const setAllSportsTeams = createAction(
  '[Zone] Set All Sports Teams',
  props<{ teams: Team[] }>()
);

export const getAllPlayers = createAction('[Zone] Get All Players');

export const setAllPlayers = createAction(
  '[Zone] Set All Players',
  props<{ players: Player[] }>()
);
