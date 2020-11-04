import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducer';
import { ACS } from 'src/app/zone/subpages/profile/profile.types';
import { submitTriviaResults } from '../store/trivia.actions';
import {
  selectTriviaInstance,
  selectUpdatedACS
} from '../store/trivia.selectors';
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
  displayContent = '';
  finalACS = '';
  gameStartTime = new Date().toISOString();
  totalScore = 0;

  timerTickSubscriber: Subscription;
  timerQuestionSubscriber: Subscription;

  triviaInstance$: Observable<TriviaInstance>;
  triviaInstanceId: any;
  questions: TriviaQuestion[];
  questionStartTime = new Date().toISOString();
  questionSubmitTime = new Date().toISOString();

  acs$: Observable<ACS>;

  triviaAnswers: Answer[] = [
    { id: 0, content: '' },
    { id: 0, content: '' },
    { id: 0, content: '' },
    { id: 0, content: '' },
  ];

  triviaQuestionSubmissions = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.timerTickSubscriber = this.tickTimer();
    this.timerQuestionSubscriber = this.questionTimer();
    this.pullingTriviaData();
    this.triviaInstance$
      .pipe(first((instances) => instances !== undefined))
      .subscribe((val) => {
        console.log(val.questions);
        this.questions = val.questions;
        this.triviaInstanceId = val.id;
        this.displayQuestion(0);
      });
  }

  pullingTriviaData(): void {
    this.triviaInstance$ = this.store.select(selectTriviaInstance);
  }

  displayQuestion(index: number) {
    this.questionStartTime = new Date().toISOString();
    // Question
    this.displayContent = this.questions[index].content;
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
      this.questionSubmitTime = new Date().toISOString();
      // Update score
      this.submitQuestion(
        this.questions[this.currentQuestion].id,
        null,
        this.questionStartTime,
        this.questionSubmitTime
      );
      // Next question
      this.currentQuestion += 1;
      if (this.currentQuestion < this.numberOfQuestions) {
        this.displayQuestion(this.currentQuestion);
        this.restartTimers();
      } else {
        // Show final results
        this.showResults();
      }
    });
    return subscriber;
  }

  onClickAnswer(answerId: number) {
    this.questionSubmitTime = new Date().toISOString();
    if (
      !this.timerTickSubscriber.closed &&
      !this.timerQuestionSubscriber.closed &&
      this.currentQuestion < this.numberOfQuestions
    ) {
      // Stop timers
      this.stopTimers();
      // Check if correct answer
      if (this.isCorrect(this.currentQuestion, answerId)) {
        console.log('Correct!');
        this.totalScore += 1;
      }
      // Add to final results
      this.submitQuestion(
        this.questions[this.currentQuestion].id,
        answerId,
        this.questionStartTime,
        this.questionSubmitTime
      );
      // Go to next question
      this.currentQuestion += 1;
      this.displayQuestion(this.currentQuestion);
      // Restart timers
      this.restartTimers();
    }

    if (this.currentQuestion >= this.numberOfQuestions) {
      // Show final results
      this.stopTimers();
      this.displayTimer = '00:00';
      this.showResults();
    }
  }

  isCorrect(questionIndex: number, answerId: number): boolean {
    const actualAnswerId = this.questions[questionIndex].correct_answer.id;
    console.log(answerId);
    console.log(this.questions[questionIndex].correct_answer.id);
    return actualAnswerId === answerId;
  }

  /**
   * Add to results per question submission
   */
  submitQuestion(
    id: number,
    submission_answer: number,
    start_time: string,
    submission_time: string
  ) {
    const submission = {
      id: id,
      submission_answer: submission_answer,
      start_time: start_time,
      submission_time: submission_time,
    };
    this.triviaQuestionSubmissions[this.currentQuestion] = submission;
  }

  /**
   * Final TriviaResults submission
   */
  submitResults() {
    console.log(this.triviaQuestionSubmissions);
    this.acs$ = this.store.select(selectUpdatedACS);
    this.store.dispatch(
      submitTriviaResults({
        results: {
          start_time: this.gameStartTime,
          trivia_instance: this.triviaInstanceId,
          questions: this.triviaQuestionSubmissions,
        },
      })
    );
  }

  showResults() {
    // Clear displays
    this.displayContent = 'Calculating Results...';
    this.triviaAnswers = [];
    this.submitResults();
    const sub = this.acs$
      .pipe(first((instances) => instances !== undefined))
      .subscribe((val) => {
        console.log(val.average);
        this.displayContent =
          'Score: ' + this.totalScore + ' / ' + this.numberOfQuestions;
        this.finalACS = 'Updated ACS: ' + val.average;
      });
  }

  restartTimers() {
    this.timerTickSubscriber = this.tickTimer();
    this.timerQuestionSubscriber = this.questionTimer();
  }

  stopTimers() {
    this.timerTickSubscriber.unsubscribe();
    this.timerQuestionSubscriber.unsubscribe();
  }
}
