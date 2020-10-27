import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapper } from '../http/http-client-wrapper';
import { TriviaResults } from './trivia.types';

@Injectable()
export class TriviaService {
  constructor(private httpClient: HttpClientWrapper) {}

  submitTriviaResults(results: TriviaResults): Observable<unknown> {
    return this.httpClient.post('trivia/answers', results);
  }
}
