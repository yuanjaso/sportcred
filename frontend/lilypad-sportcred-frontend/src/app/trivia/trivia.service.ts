import { Injectable } from '@angular/core';
import { fill, random } from 'lodash';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClientWrapper } from '../http/http-client-wrapper';
import { ACS } from '../profile/profile.types';
import { TriviaInstance, TriviaResults } from './trivia.types';

@Injectable()
export class TriviaService {
  constructor(private httpClient: HttpClientWrapper) {}

  /**
   * Returns null when the game was for multiple players
   * @param results
   */
  submitTriviaResults(results: TriviaResults): Observable<ACS | null> {
    // return this.httpClient.post('trivia/answers', results);
    // ! hardcoded, waiting for backend to implement
    return of({ average: 455, basketball: 12 }).pipe(delay(1500));
  }

  queryForTriviaGames(): Observable<TriviaInstance[]> {
    // return this.httpClient.get('trivia');
    // ! hardcoded, waiting for backend to implement
    const sampleQuestion = {
      id: 4,
      question_content: 'Who is the GOAT?',
      correct_answer: { id: 5, answer_content: 'Michael Jordan' },
      answers: [
        { id: 5, answer_content: 'Michael Jordan' },
        { id: 6, answer_content: 'LeBron James' },
        { id: 8, answer_content: 'Steph Curry' },
        { id: 10, answer_content: 'Kevin Durant' },
      ],
    };
    const a: TriviaInstance = {
      score: null,
      id: 4,
      date: new Date().toISOString(),
      user: { id: 2, username: 'John' },
      other_user: { id: 3, username: 'Bob' },
      is_completed: false,
      sport: { id: 1, name: 'Basketball' },
      questions: [
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
      ],
    };
    const b: TriviaInstance = {
      score: '6-5',
      id: 5,
      date: new Date().toISOString(),
      user: { id: 2, username: 'John' },
      other_user: { id: 3, username: 'Daniel' },
      is_completed: true,
      sport: { id: 1, name: 'Football' },
      questions: [
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
        sampleQuestion,
      ],
    };
    // each time there will be a random number of instances from 1 - 10 for fun
    const instances: TriviaInstance[] = fill(Array(random(1, 5)), a).concat(
      fill(Array(random(1, 4)), b)
    );
    return of(instances).pipe(delay(500));
  }
}
