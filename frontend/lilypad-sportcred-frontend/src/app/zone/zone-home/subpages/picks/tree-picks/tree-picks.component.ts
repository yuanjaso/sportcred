import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { groupBy } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../../../../../store/reducer';
import { selectTeams } from '../../../../store/selectors';
import { Team } from '../../../../zone.types';
import {
  PlayoffPrediction,
  PlayoffRound,
  PredictionFeature,
  Predictions,
  UpdatePredictionPayload,
} from '../picks.types';
import { lockInResults, updateUserPredictions } from '../store/picks.actions';
import { selectPredictions } from '../store/picks.selectors';

@Component({
  selector: 'app-tree-picks',
  templateUrl: './tree-picks.component.html',
  styleUrls: ['./tree-picks.component.scss'],
})
export class TreePicksComponent implements OnInit, PredictionFeature {
  // two cases
  // if admin page, don't display the current result
  // if not admin page, display the current result if exists
  @Input() isAdmin: boolean;
  predictions: Predictions;

  year: number = new Date().getFullYear();
  sport: 'Basketball' = 'Basketball';
  playoff: { id: number; team: number }[];

  teams$: Observable<Team[]>;
  // this will give all you need to get the user's picks from the past
  existingPlayoffPredictions: {
    [round in PlayoffRound]?: PlayoffPrediction;
  } = {};
  // use this to determine who is on the first round , it is mocked but fine for the minimum viable product
  firstRound: { [round in PlayoffRound]?: { home: string; away: string } } = {
    'east_first_round-1-8': { home: 'Toronto Raptors', away: 'Boston Celtics' },
    'east_first_round-2-7': { home: 'Toronto Raptors', away: 'Boston Celtics' },
    'east_first_round-3-6': { home: 'Toronto Raptors', away: 'Boston Celtics' },
    'east_first_round-4-5': { home: 'Toronto Raptors', away: 'Boston Celtics' },
    'west_first_round-1-8': { home: 'Toronto Raptors', away: 'Boston Celtics' },
    'west_first_round-2-7': { home: 'Toronto Raptors', away: 'Boston Celtics' },
    'west_first_round-3-6': { home: 'Toronto Raptors', away: 'Boston Celtics' },
    'west_first_round-4-5': { home: 'Toronto Raptors', away: 'Boston Celtics' },
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.setPreviousPrediction();
    this.teams$ = this.store.select(selectTeams);

    // ! HARDCODED MOCK DATA FOR DEMO
    this.exampleSubmit();
  }

  submit(
    year: number,
    sport: 'Basketball',
    playoff: { id: number; team: number }[]
  ): void {
    const payload: UpdatePredictionPayload = {
      year,
      sport,
      playoff,
    };
    if (this.isAdmin) {
      this.store.dispatch(
        lockInResults({
          results: payload,
        })
      );
    } else {
      this.store.dispatch(
        updateUserPredictions({
          predictions: payload,
        })
      );
    }
  }

  private setPreviousPrediction(): void {
    this.store
      .select(selectPredictions)
      .pipe(
        tap(({ year, sport, playoff }) => {
          this.year = year;
          this.sport = sport;
          this.existingPlayoffPredictions = {};
          playoff.forEach((round) => {
            this.existingPlayoffPredictions[round.title] = round;
          });
        })
      )
      .subscribe();
  }

  private exampleSubmit(): void {
    this.playoff = [];
    this.submit(this.year, this.sport, this.playoff);
  }
}
