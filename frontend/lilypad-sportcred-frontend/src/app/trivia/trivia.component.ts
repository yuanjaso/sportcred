import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer';
import { getTriviaQuestions, setTriviaQuestions } from './store/actions';

@Component({
  selector: 'app-trivia',
  template: `<div>hi</div>`,
  styles: [``],
})
export class TriviaComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getTriviaQuestions());
    this.store.dispatch(
      setTriviaQuestions({
        triviaQuestions: [
          { answers: ['', 234, null], question: 'asdf', correctAnswer: 'asdf' },
        ],
      })
    );
  }
}
