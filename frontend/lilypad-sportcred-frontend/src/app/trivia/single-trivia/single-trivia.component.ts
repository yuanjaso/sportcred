import { Component, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-single-trivia',
  templateUrl: './single-trivia.component.html',
  styleUrls: ['./single-trivia.component.scss'],
})
export class SingleTriviaComponent implements OnInit {
  singleQuestionTime = 14;
  numberOfQuestions = 10;
  currentQuestion = 1;
  displayTimer = '00:00';

  timerTickSubscriber: Subscription;
  timerQuestionSubscriber: Subscription;

  triviaAnswers: { answer: string }[] = [
    { answer: 'Answer 1' },
    { answer: 'Answer 2' },
    { answer: 'Answer 3' },
    { answer: 'Answer 4' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.timerTickSubscriber = this.tickTimer();
    this.timerQuestionSubscriber = this.questionTimer();
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
      // Next question
      this.currentQuestion += 1;
      // restart timer
      if (this.currentQuestion <= this.numberOfQuestions) {
        this.restartTimers();
      }
    });
    return subscriber;
  }

  onClickAnswer() {
    if (
      !this.timerTickSubscriber.closed &&
      !this.timerQuestionSubscriber.closed &&
      this.currentQuestion <= this.numberOfQuestions
    ) {
      // Stop timers
      this.timerTickSubscriber.unsubscribe();
      this.timerQuestionSubscriber.unsubscribe();
      // Check if correct answer
      // Add to final score
      // Go to next question
      this.currentQuestion += 1;
      // Restart timers
      this.restartTimers();
    }

    if (this.currentQuestion > this.numberOfQuestions) {
      // Show final results
      console.log('show Results');
    }
  }

  restartTimers() {
    this.timerTickSubscriber = this.tickTimer();
    this.timerQuestionSubscriber = this.questionTimer();
  }
}
