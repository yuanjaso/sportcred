import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../../../../../store/reducer';
import { getAllPlayers } from '../../../../store/actions';
import { selectPlayers } from '../../../../store/selectors';
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
export class DropdownPicksComponent implements OnInit, PredictionFeature {
  // for dropdown lists
  players$: Observable<Player[]>;
  rookies$: Observable<Player[]>;

  // for the backend
  year: number = new Date().getFullYear();
  sport: 'Basketball' = 'Basketball';
  mvp: number;
  rookie: number;

  predictions: Predictions;
  @Input() isAdmin: boolean;
  // two cases
  // if admin page, don't display the current result
  // if not admin page, display the current result if exists

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.setVariables();
    this.grabDataForDropdowns();

    // ! HARDCODED MOCK FOR DEMO
    this.exampleSubmit();
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
    this.store
      .select(selectPredictions)
      .pipe(
        tap(({ year, sport, mvp, rookie }) => {
          this.year = year;
          this.sport = sport;

          if (!this.isAdmin) {
            this.mvp = mvp.player;
            this.rookie = rookie.player;
          }
        })
      )
      .subscribe();
  }

  private grabDataForDropdowns(): void {
    // the players list is already retrieved when the app loads so we just need to grab rookies
    this.store.dispatch(getAllPlayers({ rookies: true }));
    this.players$ = this.store.select(selectPlayers);
    this.rookies$ = this.store.select(selectPlayers);
  }

  // ! HARDCODED
  private exampleSubmit(): void {
    this.mvp = 1;
    this.rookie = 2;
    this.submit(this.year, this.sport, this.mvp, this.rookie);
  }
}
