import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { selectUserInfo } from '../../../../auth/store/selectors';
import { AppState } from '../../../../store/reducer';
import {
  getPredictions,
  lockInResults,
  updateUserPredictions,
} from './store/picks.actions';
@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss'],
})
export class PicksComponent implements OnInit {
  isAdmin: boolean;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.getPredictions();

    // this flag determines which endpoint we use for submitting the picks/prediction results
    this.isAdmin = this.router.url.includes('admin');
  }

  /**
   * Get the predictions for the current year for the current user
   * This same request will be used for locking in results and viewing/updating user results
   */
  private getPredictions(): void {
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
  }
}
