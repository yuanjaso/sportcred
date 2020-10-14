import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { all_routes } from '../../global/routing-statics';
import { getLoginToken, setLoginToken } from '../auth/store/actions';
import { AppState } from '../store/reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private titleService: Title, private store: Store<AppState>) {
    this.titleService.setTitle(all_routes.login.title);
  }
  signin() {
    if (!this.form.valid) return;
    let username = this.form.controls.username.value;
    let password = this.form.controls.password.value;
    console.log(username, password);
  }
  ngOnInit(): void {
    this.store.dispatch(getLoginToken({ password: 'blah', username: 'blah' }));
    this.store.dispatch(setLoginToken({ token: 'it works!' }));
  }
}
