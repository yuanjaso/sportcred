import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { all_routes } from '../../global/routing-statics';
import { FormGroup, FormControl } from '@angular/forms';
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
  constructor(private titleService: Title) {
    this.titleService.setTitle(all_routes.login.title);
  }
  signin() {
    if (!this.form.valid) return;
    let username = this.form.controls.username.value;
    let password = this.form.controls.password.value;
    console.log(username, password);
  }
  ngOnInit(): void {}
}
