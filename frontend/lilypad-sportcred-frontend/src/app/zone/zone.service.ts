import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { playersURL, sportsURL, teamsURL } from '../../global/api.types';
import { HttpClientWrapper } from '../http/http-client-wrapper';
import { Player, PostSearch, SearchResults, UserSearch } from './zone.types';
@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  searchResults$ = new BehaviorSubject<SearchResults>({ users: [], posts: [] });
  sideNavToggle$ = new Subject<boolean>();

  constructor(private http: HttpClientWrapper) {}

  /* HTTP REQUESTS*/
  getAllPlayers(is_rookie: boolean): Observable<Player[]> {
    return this.http.get(playersURL, { is_rookie });
  }
  getAllTeams() {
    return this.http.get(teamsURL);
  }
  getAllSports() {
    return this.http.get(sportsURL);
  }

  /**
   * Using a string search, find users or posts that contain that string
   */
  searchForResults(
    search: string
  ): Observable<{ users: UserSearch[]; posts: PostSearch[] }> {
    const users$ = this.http
      .get<UserSearch[]>('users', {
        username__icontains: search,
      })
      .pipe(
        map((users) =>
          users.map((user) => ({
            ...user,
            acs: 500,
            status: '234234',
            profilepicture:
              'https://miro.medium.com/max/3288/1*Eu8NZH76BTABlaSOac6Tyg.jpeg',
          }))
        )
      );
    // TODO endpoint for get posts
    const posts$ = of([
      {
        id: 1,
        title: 'this is my first post',
        author: {
          id: 1,
          username: 'LeBron james',
        },
      },
      {
        id: 2,
        title: 'this is my second post',
        author: {
          id: 1,
          username: 'Michael Jordan',
        },
      },
    ]);
    return forkJoin([users$, posts$]).pipe(
      map(([users, posts]) => ({ users, posts }))
    );
  }
}
