import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { all_routes } from '../../global/routing-statics';
import { ACS } from '../profile/profile.types';
import { AppState } from '../store/reducer';
import {
  getTriviaQuestions,
  setTriviaInstance,
  setTriviaQuestions,
  submitTriviaResults
} from './store/trivia.actions';
import {
  selectTriviaInstance,
  selectUpdatedACS
} from './store/trivia.selectors';
import { TriviaInstance } from './trivia.types';

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
  triviaInstance$: Observable<TriviaInstance>;

  singleLink = all_routes.trivia.url + '/' + all_routes.single_trivia.url;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.example();
    this.exampleForPullingTriviaData();

    this.store.dispatch(getTriviaQuestions());
    this.store.dispatch(
      setTriviaQuestions({
        triviaQuestions: [
          { answers: ['', 234, null], question: 'asdf', correctAnswer: 'asdf' },
        ],
      })
    );
  }

  exampleForPullingTriviaData(): void {
    this.triviaInstance$ = this.store.select(selectTriviaInstance);

    this.store.dispatch(
      setTriviaInstance({
        triviaInstance: {
          date: new Date().toISOString(),
          id: 3,
          is_completed: false,
          sport: { id: 3, name: 'Basketball' },
          questions: [
            {
              id: 4,
              answers: [
                { id: 4, answer_content: 'Kobe' },
                { id: 5, answer_content: 'Jordan' },
                { id: 6, answer_content: 'LeBron' },
                { id: 7, answer_content: 'Harden' },
              ],
              correct_answer: { id: 4, answer_content: 'Kobe' },
              question_content: 'Who is the GOAT?',
            },
            {
              id: 4,
              answers: [
                { id: 4, answer_content: 'Kobe' },
                { id: 5, answer_content: 'Jordan' },
                { id: 6, answer_content: 'LeBron' },
                { id: 7, answer_content: 'Harden' },
              ],
              correct_answer: { id: 4, answer_content: 'Kobe' },
              question_content: 'Who is the GOAT?',
            },
            {
              id: 4,
              answers: [
                { id: 4, answer_content: 'Kobe' },
                { id: 5, answer_content: 'Jordan' },
                { id: 6, answer_content: 'LeBron' },
                { id: 7, answer_content: 'Harden' },
              ],
              correct_answer: { id: 4, answer_content: 'Kobe' },
              question_content: 'Who is the GOAT?',
            },
            {
              id: 4,
              answers: [
                { id: 4, answer_content: 'Kobe' },
                { id: 5, answer_content: 'Jordan' },
                { id: 6, answer_content: 'LeBron' },
                { id: 7, answer_content: 'Harden' },
              ],
              correct_answer: { id: 4, answer_content: 'Kobe' },
              question_content: 'Who is the GOAT?',
            },
          ],
          user: { id: 4, username: 'LeBron' },
          other_user: { id: 45, username: 'Jordan' },
        },
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
