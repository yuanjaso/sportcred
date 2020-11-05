import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { all_routes } from '../../../../../global/routing-statics';
import { AppState } from '../../../../store/reducer';
import { selectSports } from '../../../store/selectors';
import { ProfileService } from '../../../subpages/profile/profile.service';
import { ACS } from '../../../subpages/profile/profile.types';
import { getAllUsers } from '../../../subpages/profile/store/profile.actions';
import { Sport } from '../../../zone.types';
import { createTriviaInstance } from './store/trivia.actions';
import { User } from './trivia.types';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss'],
  // ! to show example
  // template: ` <div>ACS: {{ acs$ | async | json }}</div>
  //   <div>Trivia Instance (JSON): {{ triviaInstance$ | async | json }}</div>`,
})
export class TriviaComponent implements OnInit {
  // ! temporary variable just to show that displaying updated ACS works
  acs$: Observable<ACS>;

  singleLink = `/zone/home/${all_routes.trivia.url}/${all_routes.single_trivia.url}`;

  selectedSportId: number;
  selectedOpponentUserId: number | null = null;

  sports$: Observable<Sport[]>;
  users$: Observable<User[]>;

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService
  ) {}

  /**
   * Send request to backend to initiate a trivia instance
   */
  onCreateGame(): void {
    this.store.dispatch(
      createTriviaInstance({
        sportId: this.selectedSportId,
        opponentUserId: this.selectedOpponentUserId,
      })
    );
  }

  ngOnInit(): void {
    this.sports$ = this.store.select(selectSports);
    // ! HACK
    this.users$ = of([
      { id: 1, username: 'LeBron' },
      { id: 2, username: 'Jordan' },
    ]);
    this.users$ = this.profileService.users$;

    this.store.dispatch(getAllUsers());
  }
}
