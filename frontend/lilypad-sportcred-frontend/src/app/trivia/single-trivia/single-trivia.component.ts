import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-single-trivia',
  templateUrl: './single-trivia.component.html',
  styleUrls: ['./single-trivia.component.scss'],
})
export class SingleTriviaComponent implements OnInit {
  singleQuestionTime = 14;
  numberOfQuestions = 10;
  displayTimer = '00:00';

  triviaAnswers: { answer: string }[] = [
    { answer: "Answer 1"},
    { answer: "Answer 2"},
    { answer: "Answer 3"},
    { answer: "Answer 4"},
  ]

  constructor() {}

  ngOnInit(): void {
    this.questionTimer(this.singleQuestionTime);
  }

  questionTimer(timePerQuestion: number): void {
    const seconds$ = interval(1000);
    //const totalTime$ = timer(timePerQuestion * 1000 * this.numberOfQuestions);

    const timer$ = seconds$.pipe(take(timePerQuestion + 1));

    const subscriber = timer$.subscribe((val) => {
      //console.log(timePerQuestion - val);
      const result = timePerQuestion - val;
      this.displayTimer = new Date(result * 1000).toISOString().substr(14, 5);
    });
  }
}
