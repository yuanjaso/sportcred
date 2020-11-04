import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { all_routes } from '../../../../../global/routing-statics';
import { AppState } from '../../../../store/reducer';
import { selectSports } from '../../../store/selectors';
import { ACS } from '../../../subpages/profile/profile.types';
import { Sport } from '../../../zone.types';
import {
  createTriviaInstance,
  submitTriviaResults
} from './store/trivia.actions';
import { selectUpdatedACS } from './store/trivia.selectors';
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

  constructor(private store: Store<AppState>) {}

  // ! temporary function just to show that displaying updated ACS works
  example(): void {
    this.acs$ = this.store.select(selectUpdatedACS);

    this.store.dispatch(
      submitTriviaResults({
        results: {
          questions: [
            {
              id: 4,
              submission_answer: 5,
              submission_time: new Date().toISOString(),
            },
            {
              id: 5,
              submission_answer: 2,
              submission_time: new Date().toISOString(),
            },
          ],
          start_time: new Date().toISOString(),
          trivia_instance: 1,
        },
      })
    );
  }

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
  }
}
