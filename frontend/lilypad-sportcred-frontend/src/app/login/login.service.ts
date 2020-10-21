import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as models from './models';
import * as apis from '../../global/api.models';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  /*SUBJECTS */
  $registrationStatus = new Subject<boolean>();
  $loginStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  /* HTTP REQUESTS*/
  tryLogin(info: models.loginInfo) {
    return this.http.post(apis.loginURL, info);
  }
  tryRegisterBasic(info: models.generalRegistrationInfo) {
    return this.http.post(apis.usersURL, info);
  }
  tryRegisterQuestionaire(info: models.questionaireRegistrationInfo) {
    return this.http.post(apis.questionaireURL, info.questionaire);
  }
  getQuestionaire() {
    return this.http.get(apis.questionaireURL);
  }
}
