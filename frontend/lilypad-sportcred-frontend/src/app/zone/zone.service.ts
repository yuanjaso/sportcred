import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { playersURL, sportsURL, teamsURL } from '../../global/api.types';
import { HttpClientWrapper } from '../http/http-client-wrapper';
@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private http: HttpClientWrapper) {}

  /*SUBJECTS */

  //emit false to contract,
  //emit true to expand,
  //emit nothing to toggle
  $sidenavToggle = new Subject<boolean>();

  /* HTTP REQUESTS*/
  getAllPlayers() {
    return this.http.get(playersURL);
  }
  getAllTeams() {
    return this.http.get(teamsURL);
  }
  getAllSports() {
    return this.http.get(sportsURL);
  }
}
