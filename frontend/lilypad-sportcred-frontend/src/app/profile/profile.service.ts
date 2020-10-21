import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Profile } from './profile.types';

@Injectable()
export class ProfileService {
  constructor() {}

  getProfile(userId: number): Observable<Profile> {
    return of({
      username: 'LeBron James',
      status: 'Go Raptors!!!',
      acs: 945,
      pictureURL:
        'https://miro.medium.com/max/3288/1*Eu8NZH76BTABlaSOac6Tyg.jpeg',
      about:
        'Hi, I am LeBron James. I am the best. I play basketball. I have three kids. I am 35 years old. I play for the Lakers. I am the best. I am the best.',
    }).pipe(delay(1500));
  }
}
