import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { profileACSHistoryURL, profileURL } from 'src/global/api.types';
import { HttpClientWrapper } from '../../../http/http-client-wrapper';
import {
  ACSHistory,
  Profile,
  RadarList,
  UpdateProfilePayload
} from './profile.types';

@Injectable()
export class ProfileService {
  radarList$ = new Subject<RadarList>();

  constructor(private httpClient: HttpClientWrapper) {}

  $hotProfile = new Subject<Profile>();
  $hotACSHistory = new Subject<ACSHistory[]>();
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

  getACSHistory(userId: number): Observable<ACSHistory[]> {
    return this.httpClient.get<ACSHistory[]>(profileACSHistoryURL(userId), {
      group_by_date: true,
    });
  }

  updateProfile(profile: UpdateProfilePayload): Observable<Profile> {
    return this.httpClient.patch(profileURL, profile);
  }

  getRadarList(userId: number): Observable<RadarList> {
    return this.httpClient.get(`profile/${userId}/radar`).pipe(
      mapTo({
        id: 1,
        followers: [
          { id: 1, username: 'Jhon' },
          { id: 2, username: 'Jhon' },
          { id: 3, username: 'Jordan' },
        ],
        following: [
          { id: 1, username: 'Bron' },
          { id: 14, username: 'Dwade' },
        ],
      })
    );
  }
}
