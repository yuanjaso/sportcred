import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AppState } from '../../../../../store/reducer';
import { getAllPlayers } from '../../../../store/actions';
import { selectPlayers, selectRookies } from '../../../../store/selectors';
import { Player } from '../../../../zone.types';
import {
  PredictionFeature,
  Predictions,
  UpdatePredictionPayload,
} from '../picks.types';
import { lockInResults, updateUserPredictions } from '../store/picks.actions';
import { selectPredictions } from '../store/picks.selectors';

@Component({
  selector: 'app-dropdown-picks',
  templateUrl: './dropdown-picks.component.html',
  styleUrls: ['./dropdown-picks.component.scss'],
})
export class DropdownPicksComponent
  implements OnInit, OnDestroy, PredictionFeature {
  // for dropdown lists
  players$: Observable<Player[]>;
  rookies$: Observable<Player[]>;

  // for the backend
  year: number = new Date().getFullYear();
  sport: 'Basketball' = 'Basketball';
  mvp: number;
  rookie: number;

  predictions: Predictions;

  // two cases
  // if admin page, don't display the current result
  // if not admin page, display the current result if exists
  @Input() isAdmin: boolean;

  private subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.setVariables();
    this.grabDataForDropdowns();

    // ! HARDCODED MOCK FOR DEMO
    this.exampleSubmit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Use this function to send the payload to the backend, call this from the template
   */
  submit(year: number, sport: 'Basketball', mvp: number, rookie: number): void {
    const payload: UpdatePredictionPayload = {
      year,
      sport,
      mvp: { id: this.predictions.mvp.id, player: mvp },
      rookie: { id: this.predictions.rookie.id, player: rookie },
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

  private setVariables(): void {
    const sub$ = this.store.select(selectPredictions).pipe(
      filter((data) => data !== undefined),
      map(cloneDeep),
      tap((predictions) => {
        this.year = predictions.year;
        this.sport = predictions.sport;
        this.predictions = predictions;

        if (!this.isAdmin) {
          this.mvp = predictions.mvp.player;
          this.rookie = predictions.rookie.player;
        }
      })
    );
    this.subscription.add(sub$.subscribe());
  }

  private grabDataForDropdowns(): void {
    // the players list is already retrieved when the app loads so we just need to grab rookies
    this.store.dispatch(getAllPlayers({ rookies: true }));
    this.players$ = this.store.select(selectPlayers);
    this.rookies$ = this.store.select(selectRookies);
  }

  // ! HARDCODED
  private exampleSubmit(): void {
    this.mvp = 1;
    this.rookie = 2;
    this.submit(this.year, this.sport, this.mvp, this.rookie);
  }
}
