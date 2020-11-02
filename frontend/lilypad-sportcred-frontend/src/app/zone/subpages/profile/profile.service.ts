import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../../../http/http-client-wrapper';
import { Profile, UpdateProfilePayload } from './profile.types';

@Injectable()
export class ProfileService {
  constructor(private httpClient: HttpClientWrapper) {}

  getProfile(userId: number): Observable<Profile> {
    return this.httpClient
      .get<Profile>('profile', { id: userId })
      .pipe(
        // ! temporary solution to get right payload
        map((profile) => ({
          ...profile,
          acs: 945,
          favourite_sports: [
            { id: 1, name: 'Basketball' },
            { id: 2, name: 'Football' },
            { id: 3, name: 'Soccer' },
          ],
          profilepicture:
            'https://miro.medium.com/max/3288/1*Eu8NZH76BTABlaSOac6Tyg.jpeg',
        }))
      );
  }

  updateProfile(profile: UpdateProfilePayload): Observable<Profile> {
    return this.httpClient.patch('profile', profile);
  }
}
