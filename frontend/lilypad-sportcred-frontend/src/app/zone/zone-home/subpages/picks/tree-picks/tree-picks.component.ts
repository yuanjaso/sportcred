import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AppState } from '../../../../../store/reducer';
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
export class TreePicksComponent
  implements OnInit, OnDestroy, PredictionFeature {
  // two cases
  // if admin page, don't display the current result
  // if not admin page, display the current result if exists
  @Input() isAdmin: boolean;
  predictions: Predictions;

  year: number = new Date().getFullYear();
  sport: 'Basketball' = 'Basketball';
  // TODO: fill this out with what the user selected
  playoff: { id: number; team: number }[];

  // this will give all you need to get the user's picks from the past
  existingPlayoffPredictions: {
    [round in PlayoffRound]?: PlayoffPrediction;
  } = {};
  // use this to determine who is on the first round , it is mocked but fine for the minimum viable product
  firstRound: {
    [round in PlayoffRound]?: {
      home: { id: number; name: string };
      away: { id: number; name: string };
    };
  } = {
    'east_first_round-1-8': {
      home: { name: 'Milwaukee Bucks', id: 1 },
      away: { name: 'Orlando Magic', id: 2 },
    },
    'east_first_round-2-7': {
      home: { name: 'Toronto Raptors', id: 3 },
      away: { name: 'Brooklyn Nets', id: 4 },
    },
    'east_first_round-3-6': {
      home: { name: 'Boston Celtics', id: 5 },
      away: { name: 'Philadelphia 76ers', id: 6 },
    },
    'east_first_round-4-5': {
      home: { name: 'Indiana Pacers', id: 7 },
      away: { name: 'Miami Heat', id: 8 },
    },
    'west_first_round-1-8': {
      home: { name: 'Los Angeles Lakers', id: 9 },
      away: { name: 'Portland Trailblazers', id: 10 },
    },
    'west_first_round-2-7': {
      home: { name: 'Los Angeles Clippers', id: 11 },
      away: { name: 'Dallas Mavericks', id: 12 },
    },
    'west_first_round-3-6': {
      home: { name: 'Denver Nuggets', id: 13 },
      away: { name: 'Utah Jazz', id: 14 },
    },
    'west_first_round-4-5': {
      home: { name: 'Houston Rockets', id: 15 },
      away: { name: 'Oklahoma City Thunder', id: 16 },
    },
  };

  private subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.setPreviousPrediction();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    const sub$ = this.store.select(selectPredictions).pipe(
      filter((data) => data !== undefined),
      map(cloneDeep),
      tap(({ year, sport, playoff }) => {
        this.year = year;
        this.sport = sport;
        // initial setting of playoff will be the user's predictions,
        // if they don't modify and resubmit then we will send back the unchanged predictions
        this.playoff = playoff;
        this.existingPlayoffPredictions = {};
        playoff.forEach((round) => {
          this.existingPlayoffPredictions[round.title] = round;
        });
      })
    );
    this.subscription.add(sub$.subscribe());
  }
}
