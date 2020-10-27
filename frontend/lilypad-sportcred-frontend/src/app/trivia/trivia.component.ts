import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ACS } from '../profile/profile.types';
import { AppState } from '../store/reducer';
import {
  getTriviaQuestions,
  setTriviaQuestions,
  submitTriviaResults
} from './store/trivia.actions';
import { selectUpdatedACS } from './store/trivia.selectors';

@Component({
  selector: 'app-trivia',
  template: `<div>ACS: {{ acs$ | async | json }}</div>`,
  styles: [``],
})
export class TriviaComponent implements OnInit {
  // ! temporary variable just to show that displaying updated ACS works
  acs$: Observable<ACS>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.example();

    this.store.dispatch(getTriviaQuestions());
    this.store.dispatch(
      setTriviaQuestions({
        triviaQuestions: [
          { answers: ['', 234, null], question: 'asdf', correctAnswer: 'asdf' },
        ],
      })
    );
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
