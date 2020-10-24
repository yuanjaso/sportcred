import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { ZoneService } from '../zone.service';
import * as actions from './actions';
import { Team, Player, Sport } from '../zone.types';

@Injectable()
export class ZoneEffects {
  getAllSportsTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getAllSportsTeams),
      mergeMap(() =>
        this.zoneService.getAllTeams().pipe(
          first(),
          map((teams: Team[]) => {
            return {
              type: actions.setAllSportsTeams.type,
              teams: (teams as any).results,
            };
          }),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  getAllPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getAllPlayers),
      mergeMap(() =>
        this.zoneService.getAllPlayers().pipe(
          first(),
          map((players: Player[]) => {
            return {
              type: actions.setAllPlayers.type,
              players: (players as any).results,
            };
          }),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  getAllSports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getAllSports),
      mergeMap(() =>
        this.zoneService.getAllSports().pipe(
          first(),
          map((sports: Sport[]) => {
            return {
              type: actions.setAllSports.type,
              sports: (sports as any).results,
            };
          }),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );
  constructor(private actions$: Actions, private zoneService: ZoneService) {}
}
