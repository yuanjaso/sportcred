import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { profileACSHistoryURL, profileURL } from 'src/global/api.types';
import { HttpClientWrapper } from '../../../http/http-client-wrapper';
import { ACSHistory, Profile, UpdateProfilePayload } from './profile.types';

@Injectable()
export class ProfileService {
  constructor(private httpClient: HttpClientWrapper) {}

  $hotProfile = new Subject<Profile>();
  $hotACSHistory = new Subject<ACSHistory>();
  getProfile(userId: number): Observable<Profile> {
    return this.httpClient
      .get<Profile>(profileURL, { user_id: userId })
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

  getACSHistory(userId: number): Observable<ACSHistory> {
    return this.httpClient.get<Profile>(profileACSHistoryURL(userId), {
      group_by_date: true,
    });
  }

  updateProfile(profile: UpdateProfilePayload): Observable<Profile> {
    return this.httpClient.patch(profileURL, profile);
  }
}
