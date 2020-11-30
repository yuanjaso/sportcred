import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action, ActionCreator, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { selectUserInfo } from '../../../../auth/store/selectors';
import { AppState } from '../../../../store/reducer';
import { Predictions } from './picks.types';
import {
  getPredictions,
  lockInResults,
  updateUserPredictions,
} from './store/picks.actions';
import { selectPredictions } from './store/picks.selectors';
@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss'],
})
export class PicksComponent implements OnInit {
  // ! DEMO PURPOSES
  predictions$: Observable<Predictions>;

  isAdmin: boolean;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.exampleGetPredictions();
    this.updateUserPredictions();
    this.lockInPredictions();

    // this flag determines which endpoint we use for submitting the picks/prediction results
    this.isAdmin = this.router.url.includes('admin');
  }

  private exampleGetPredictions(): void {
    const year = new Date().getFullYear();
    this.store
      .select(selectUserInfo)
      .pipe(
        first((data) => data !== undefined),
        tap(({ user_id }) =>
          this.store.dispatch(getPredictions({ year, user_id }))
        )
      )
      .subscribe();

    this.predictions$ = this.store
      .select(selectPredictions)
      .pipe(tap(console.log));
  }

  private updateUserPredictions(): void {
    this.store.dispatch(
      updateUserPredictions({
        predictions: {
          sport: 'Basketball',
          year: 2020,
          mvp: { id: 1, player: 2 },
          rookie: { id: 4, player: 5 },
          playoff: [],
        },
      })
    );
  }

  private lockInPredictions(): void {
    this.store.dispatch(
      lockInResults({
        results: {
          sport: 'Basketball',
          year: 2020,
          mvp: { id: 1, player: 2 },
          rookie: { id: 4, player: 5 },
          playoff: [],
        },
      })
    );
  }
}
