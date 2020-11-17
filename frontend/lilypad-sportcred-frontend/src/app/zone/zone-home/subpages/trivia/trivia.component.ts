import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map, skip, tap, withLatestFrom } from 'rxjs/operators';
import { all_routes } from '../../../../../global/routing-statics';
import { selectUserInfo } from '../../../../auth/store/selectors';
import { AppState } from '../../../../store/reducer';
import { selectSports } from '../../../store/selectors';
import { ProfileService } from '../../../subpages/profile/profile.service';
import { ACS } from '../../../subpages/profile/profile.types';
import { getAllUsers } from '../../../subpages/profile/store/profile.actions';
import { Sport } from '../../../zone.types';
import { createTriviaInstance } from './store/trivia.actions';
import { selectTriviaInstance } from './store/trivia.selectors';
import { TriviaInstance, User } from './trivia.types';

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
  multiplayerLink = `/zone/home/${all_routes.trivia.url}/${all_routes.multiplayertrivia.url}`;

  selectedSportId: number | null = null;
  selectedOpponentUserId: number | null = null;

  sports$: Observable<Sport[]>;
  users$: Observable<User[]>;

  // ! temporary variable
  triviaInstance$: Observable<TriviaInstance>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private profileService: ProfileService
  ) {}

  /**
   * Send request to backend to initiate a trivia instance
   */
  onCreateGame(type: 'single' | 'multi'): void {
    if (this.selectedSportId === null) {
      return;
    }
    if (type === 'multi' && this.selectedOpponentUserId === null) {
      return;
    }
    if (type === 'single') {
      this.selectedOpponentUserId = null;
    }

    this.store
      .select(selectTriviaInstance)
      .pipe(
        skip(1),
        first(),
        tap(() => {
          const link =
            type === 'single' ? this.singleLink : this.multiplayerLink;
          this.router.navigate([link]);
        })
      )
      .subscribe();

    this.store.dispatch(
      createTriviaInstance({
        sportId: this.selectedSportId,
        opponentUserId: this.selectedOpponentUserId,
      })
    );
  }

  ngOnInit(): void {
    this.sports$ = this.store.select(selectSports);
    this.users$ = this.profileService.users$.pipe(
      withLatestFrom(this.store.select(selectUserInfo)),
      map(([users, currentUser]) =>
        users.filter((user) => user.id !== currentUser.user_id)
      )
    );

    this.store.dispatch(getAllUsers());

    // ! MOCK
    this.exampleForPullingTriviaData();
  }

  exampleForPullingTriviaData(): void {
    this.triviaInstance$ = this.store.select(selectTriviaInstance);
  }
}
