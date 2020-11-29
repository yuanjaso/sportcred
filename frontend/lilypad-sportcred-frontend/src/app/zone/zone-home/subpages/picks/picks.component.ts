import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { selectUserInfo } from '../../../../auth/store/selectors';
import { AppState } from '../../../../store/reducer';
import { Predictions } from './picks.types';
import { getPredictions } from './store/picks.actions';
import { selectPredictions } from './store/picks.selectors';
@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss'],
})
export class PicksComponent implements OnInit {
  // ! DEMO PURPOSES
  protected predictions$: Observable<Predictions>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.exampleGetPredictions();
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
}
