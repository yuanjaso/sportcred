import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  profileACSHistoryURL,
  profilePictureURL,
  profileURL,
} from 'src/global/api.types';
import { HttpClientWrapper } from '../../../http/http-client-wrapper';
import {
  ACSHistory,
  Profile,
  RadarList,
  UpdateProfilePayload,
} from './profile.types';

@Injectable()
export class ProfileService {
  radarList$ = new Subject<RadarList>();
  refreshRadarList$ = new Subject<void>();

  $hotProfile = new Subject<Profile>();
  $hotACSHistory = new Subject<ACSHistory[]>();

  constructor(private httpClient: HttpClientWrapper) {}

  getProfile(userId: number): Observable<Profile> {
    return this.httpClient
      .get<any>(profileURL, { user_id: userId })
      .pipe(
        // ! temporary solution to get right payload
        map((profile) => ({
          ...profile,
          profilepicture: profile?.profilepicture?.url
            ? environment.backendUrl + profile.profilepicture.url
            : 'https://startupheretoronto.com/wp-content/uploads/2019/07/default-user-image.png',

          //todo --------mock data-------------
          acs: 945,
          favourite_sports: [
            { id: 1, name: 'Basketball' },
            { id: 2, name: 'Football' },
            { id: 3, name: 'Soccer' },
          ],
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
  updateProfilePicture(picture: File): Observable<Profile> {
    console.log(picture);
    let formData = new FormData();
    formData.append('media', picture);
    return this.httpClient.put(profilePictureURL, formData);
  }
  getRadarList(userId: number): Observable<RadarList> {
    return this.httpClient
      .get<{
        id: string;
        followers: { user: { id: number; username: string } }[];
        following: { id: number; username: string }[];
      }>(`profile/${userId}/radar`)
      .pipe(
        map((response) => ({
          ...response,
          followers: response.followers.map((el) => el.user),
          id: Number(response.id),
        }))
      );
  }

  addUserToRadarList(userId: number): Observable<unknown> {
    return this.httpClient.put(`profile/${userId}/radar`, null);
  }

  removeUserFromRadarList(userId: number): Observable<unknown> {
    return this.httpClient.delete(`profile/${userId}/radar`);
  }
}
