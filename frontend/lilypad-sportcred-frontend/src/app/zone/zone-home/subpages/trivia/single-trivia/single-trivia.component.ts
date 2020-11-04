import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducer';
import { selectTriviaInstance } from '../store/trivia.selectors';
import { Answer, TriviaInstance, TriviaQuestion } from '../trivia.types';

@Component({
  selector: 'app-single-trivia',
  templateUrl: './single-trivia.component.html',
  styleUrls: ['./single-trivia.component.scss'],
})
export class SingleTriviaComponent implements OnInit {
  singleQuestionTime = 14;
  numberOfQuestions = 10;
  currentQuestion = 0;
  displayTimer = '00:00';
  displayElementId = 'main-display';

  timerTickSubscriber: Subscription;
  timerQuestionSubscriber: Subscription;

  triviaInstance$: Observable<TriviaInstance>;
  questions: TriviaQuestion[];

  triviaAnswers: Answer[] = [
    { id: 0, content: '' },
    { id: 0, content: '' },
    { id: 0, content: '' },
    { id: 0, content: '' },
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.timerTickSubscriber = this.tickTimer();
    this.timerQuestionSubscriber = this.questionTimer();

    this.pullingTriviaData();
    this.triviaInstance$
      .pipe(first((instances) => instances !== undefined))
      .subscribe((val) => {
        this.questions = val.questions;
        this.displayQuestion(0);
      });
  }

  pullingTriviaData(): void {
    this.triviaInstance$ = this.store.select(selectTriviaInstance);
  }

  displayQuestion(index: number) {
    // Question
    document.getElementById(this.displayElementId).innerHTML = this.questions[
      index
    ].content;
    // Answers
    this.triviaAnswers = this.questions[index].answers;
  }

  /**
   * Timer per tick of a second to change countdown display
   */
  tickTimer(): Subscription {
    const seconds$ = interval(1000);
    // Timer per second (need the extra second so it counts down to zero)
    const timer$ = seconds$.pipe(take(this.singleQuestionTime + 1));

    const subscriber = timer$.subscribe((val) => {
      const result = this.singleQuestionTime - val;
      // Format is mm:ss
      this.displayTimer = new Date(result * 1000).toISOString().substr(14, 5);
    });
    return subscriber;
  }

  /**
   * Actual countdown timer for a trivia question
   */
  questionTimer(): Subscription {
    // Time per question
    const questionTimer$ = timer((this.singleQuestionTime + 1) * 1000);
    // Show next question after singleQuestionTime seconds is up
    const subscriber = questionTimer$.subscribe((val) => {
      // The user has ran out of time and has not clicked on an answer
      console.log('question timer up');
      // Update score
      // Next question
      this.currentQuestion += 1;
      if (this.currentQuestion < this.numberOfQuestions) {
        this.displayQuestion(this.currentQuestion);
        this.restartTimers();
      }
    });
    return subscriber;
  }

  onClickAnswer(answerId: number) {
    if (
      !this.timerTickSubscriber.closed &&
      !this.timerQuestionSubscriber.closed &&
      this.currentQuestion < this.numberOfQuestions
    ) {
      // Stop timers
      this.timerTickSubscriber.unsubscribe();
      this.timerQuestionSubscriber.unsubscribe();
      // Check if correct answer
      if (this.isCorrect(this.currentQuestion, answerId)) {
        console.log('Correct!');
      }
      // Add to final score
      // Go to next question
      this.currentQuestion += 1;
      this.displayQuestion(this.currentQuestion);
      // Restart timers
      this.restartTimers();
    }

    if (this.currentQuestion > this.numberOfQuestions) {
      // Show final results
      console.log('show Results');
    }
  }

  isCorrect(questionIndex: number, answerId: number): boolean {
    const actualAnswerId = this.questions[questionIndex].correct_answer.id;
    return actualAnswerId == answerId;
  }

  restartTimers() {
    this.timerTickSubscriber = this.tickTimer();
    this.timerQuestionSubscriber = this.questionTimer();
  }
}
