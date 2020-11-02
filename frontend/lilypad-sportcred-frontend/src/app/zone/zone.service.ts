import { Injectable } from '@angular/core';
import { playersURL, sportsURL, teamsURL } from '../../global/api.types';
import { HttpClientWrapper } from '../http/http-client-wrapper';
@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private http: HttpClientWrapper) {}

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
