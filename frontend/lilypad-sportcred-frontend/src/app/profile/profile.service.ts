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
    }).pipe(delay(1500));
  }
}
