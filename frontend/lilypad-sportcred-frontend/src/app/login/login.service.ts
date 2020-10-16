import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as models from './models';
import * as apis from '../../global/api.models';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  tryLogin(info: models.loginInfo) {
    console.log(info);
    return this.http.get('/login');
  }
  tryRegister(info: models.registrationInfo) {
    console.log(info);
    return this.http.post('/register', {});
  }
  getQuestionaire() {
    return this.http.get(apis.getQuestionaireApi);
  }
}
