import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientWrapper } from '../../../../http/http-client-wrapper';
import { Predictions, UpdatePredictionPayload } from './picks.types';

@Injectable()
export class PicksSerivce {
  constructor(private httpClient: HttpClientWrapper) {}

  getPredictions(user_id: number, year: number): Observable<Predictions> {
    // ! HARDCODED
    return of({
      year,
      sport: 'Basketball',
      playoff: [
        {
          id: 1,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'finals',
        },
        {
          id: 2,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'east_conference_finals',
        },
        {
          id: 3,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'west_conference_finals',
        },
        {
          id: 4,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'east_second_round_A',
        },
        {
          id: 5,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'east_second_round_B',
        },
        {
          id: 6,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'west_second_round_A',
        },
        {
          id: 7,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'west_second_round_B',
        },
        {
          id: 9,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'east_first_round-1-8',
        },
        {
          id: 10,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'east_first_round-2-7',
        },
        {
          id: 11,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'east_first_round-3-6',
        },
        {
          id: 12,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'east_first_round-4-5',
        },
        {
          id: 13,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'west_first_round-1-8',
        },
        {
          id: 14,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'west_first_round-2-7',
        },
        {
          id: 15,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'west_first_round-3-6',
        },
        {
          id: 16,
          team: null,
          correct_team: null,
          is_locked: false,
          title: 'west_first_round-4-5',
        },
      ],
      mvp: {
        id: 1,
        correct_player: null,
        player: null,
        title: '',
        is_locked: false,
      },
      rookie: {
        id: 1,
        correct_player: null,
        player: null,
        title: '',
        is_locked: false,
      },
    });
    // return this.httpClient.get('predictions', { user_id, year });
  }

  updateUserPredictions(predictions: UpdatePredictionPayload): Observable<{}> {
    return this.httpClient.put('predictions', predictions);
  }

  lockInPicks(results: UpdatePredictionPayload): Observable<{}> {
    return this.httpClient.put('predictions/admin', results);
  }
}
