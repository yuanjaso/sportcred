import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClientWrapper } from '../http/http-client-wrapper';
import { ACS } from '../profile/profile.types';
import { TriviaResults } from './trivia.types';

@Injectable()
export class TriviaService {
  constructor(private httpClient: HttpClientWrapper) {}

  submitTriviaResults(results: TriviaResults): Observable<ACS> {
    // return this.httpClient.post('trivia/answers', results);
    // ! hardcoded, waiting for backend to implement
    return of({ average: 455, basketball: 12 }).pipe(delay(1500));
  }
}
