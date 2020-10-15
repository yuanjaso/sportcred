import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authInfo, registrationInfo } from './models';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  tryLogin(info: authInfo) {
    console.log(info);
    return this.http.get('/login');
  }
  tryRegister(info: registrationInfo) {
    console.log(info);
    return this.http.get('/register');
  }
}
