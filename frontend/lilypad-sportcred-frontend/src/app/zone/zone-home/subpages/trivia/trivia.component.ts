import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { all_routes } from '../../../../../global/routing-statics';
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

  selectedSportId: number;
  selectedOpponentUserId: number | null = null;

  sports$: Observable<Sport[]>;
  users$: Observable<User[]>;

  // ! temporary variable
  triviaInstance$: Observable<TriviaInstance>;

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
    this.users$ = this.profileService.users$;

    this.store.dispatch(getAllUsers());

    // ! MOCK
    this.exampleForPullingTriviaData();
  }

  exampleForPullingTriviaData(): void {
    this.triviaInstance$ = this.store.select(selectTriviaInstance);
  }
}
