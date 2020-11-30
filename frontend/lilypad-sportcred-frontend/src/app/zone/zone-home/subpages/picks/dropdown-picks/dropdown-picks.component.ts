import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../../store/reducer';
import { getAllPlayers } from '../../../../store/actions';
import { selectPlayers } from '../../../../store/selectors';
import { Player } from '../../../../zone.types';
import { Predictions, UpdatePredictionPayload } from '../picks.types';
import { lockInResults, updateUserPredictions } from '../store/picks.actions';

@Component({
  selector: 'app-dropdown-picks',
  templateUrl: './dropdown-picks.component.html',
  styleUrls: ['./dropdown-picks.component.scss'],
})
export class DropdownPicksComponent implements OnInit {
  // for dropdown lists
  players$: Observable<Player[]>;
  rookies$: Observable<Player[]>;
  // for the backend
  year: number = new Date().getFullYear();
  sport: 'Basketball' = 'Basketball';
  mvp: number;
  rookie: number;

  @Input() isAdmin: boolean;
  // two cases
  // if admin page, dont display the current result
  // if not admin page, display the current result if exists
  @Input() predictions: Predictions;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
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

  private grabDataForDropdowns(): void {
    // the players list is already retrieved when the app loads so we just need to grab rookies
    this.store.dispatch(getAllPlayers({ rookies: true }));
    this.players$ = this.store.select(selectPlayers);
    this.rookies$ = this.store.select(selectPlayers);
  }

  // ! HARDCODED
  private exampleSubmit(): void {
    this.submit(this.year, this.sport, 1, 1);
  }
}
