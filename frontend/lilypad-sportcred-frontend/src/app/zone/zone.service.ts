import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientWrapper } from '../http/http-client-wrapper';
import { teamsURL, playersURL } from '../../global/api.types';
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
}
