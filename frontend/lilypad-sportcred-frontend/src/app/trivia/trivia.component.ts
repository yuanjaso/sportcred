import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ACS } from '../profile/profile.types';
import { AppState } from '../store/reducer';
import { submitTriviaResults } from './store/trivia.actions';
import {
  selectTriviaInstance,
  selectUpdatedACS
} from './store/trivia.selectors';
import { TriviaInstance } from './trivia.types';

@Component({
  selector: 'app-trivia',
  template: ` <div>ACS: {{ acs$ | async | json }}</div>
    <div>Trivia Instance (JSON): {{ triviaInstance$ | async | json }}</div>`,
  styles: [``],
})
export class TriviaComponent implements OnInit {
  // ! temporary variable just to show that displaying updated ACS works
  acs$: Observable<ACS>;
  triviaInstance$: Observable<TriviaInstance>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.example();
    this.exampleForPullingTriviaData();
  }

  exampleForPullingTriviaData(): void {
    this.triviaInstance$ = this.store.select(selectTriviaInstance);
  }

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
}
