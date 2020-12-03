import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  RoundNames,
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
  form: FormGroup = new FormGroup(
    RoundNames.reduce((acc, name) => {
      acc[name] = new FormControl('', [Validators.required]);
      return acc;
    }, {})
  );

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
  competingTeams: {
    name: string;
    id: number;
  };
  RoundNames = RoundNames;
  private subscription = new Subscription();

  constructor(private store: Store<AppState>) {
    //fill competingTeams
    (this.competingTeams as any) = Object.values(this.firstRound).reduce(
      (acc, el) => {
        acc.push(el.home);
        acc.push(el.away);
        return acc;
      },
      []
    );
  }

  ngOnInit(): void {
    this.setPreviousPrediction();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(): void {
    const payload: UpdatePredictionPayload = {
      year: this.year,
      sport: this.sport,
      playoff: Object.keys(this.form.controls).reduce((acc, key) => {
        if (this.form.controls[key].value === null) return acc;
        let payload = {
          id: this.existingPlayoffPredictions[key].id,
          team: this.form.controls[key].value,
        };
        acc.push(payload);
        return acc;
      }, []),
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

        //set the saved predictions into tree
        for (let key of Object.keys(this.existingPlayoffPredictions)) {
          this.form.controls[key].setValue(
            this.existingPlayoffPredictions[key].team
          );
          if (this.existingPlayoffPredictions[key].is_locked)
            this.form.controls[key].disable();
        }
      })
    );
    this.subscription.add(sub$.subscribe());
  }
}
