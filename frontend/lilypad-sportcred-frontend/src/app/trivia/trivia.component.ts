import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTriviaQuestions } from './store/actions';
import { TriviaState } from './store/reducer';

@Component({
  selector: 'app-trivia',
  template: `<div>hi</div>`,
  styles: [``],
})
export class TriviaComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getTriviaQuestions());
    // this.store.dispatch(
    //   setTriviaQuestions({
    //     triviaQuestions: [
    //       { answers: ['', 234, null], question: 'asdf', correctAnswer: 'asdf' },
    //     ],
    //   })
    // );
  }
}
