import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as models from './login.types';
import * as apis from '../../global/api.types';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  /*SUBJECTS */
  $registrationStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  /* HTTP REQUESTS*/
  tryLogin(info: models.loginInfo) {
    console.log(apis.loginURL);
    return this.http.post(apis.loginURL, { username: 'bbb', password: '.' });
  }
  tryRegisterBasic(info: models.generalRegistrationInfo) {
    return this.http.post(apis.usersURL, info);
  }
  tryRegisterQuestionaire(info: models.questionaireRegistrationInfo) {
    return this.http.post(apis.questionaireURL, info);
  }
  getQuestionaire() {
    return this.http.get(apis.questionaireURL);
  }
}
