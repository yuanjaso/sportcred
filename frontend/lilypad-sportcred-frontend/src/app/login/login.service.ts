import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as models from './models';
import * as apis from '../../global/api.models';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  /* HTTP REQUESTS*/
  tryLogin(info: models.loginInfo) {
    console.log(info);
    return this.http.get('/login');
  }
  tryRegisterBasic(info: models.generalRegistrationInfo) {
    return this.http.post('/register_basic', info);
  }
  tryRegisterQuestionaire(info: models.questionaireRegistrationInfo) {
    return this.http.post('/register_questionaire', info);
  }
  getQuestionaire() {
    return this.http.get(apis.getQuestionaireApi);
  }

  /*SUBJECTS */
  $registrationStatus = new Subject<boolean>();
}
