import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import { AppState } from '../../reducers';
import { AuthActions } from '../store/action-types';

export interface LoginForm {
  email: string,
  password: string
};

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {
      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });
  }

  ngOnInit() {}

  login() {
    this.auth.login(this.formValue.email, this.formValue.password)
      .pipe(
        tap(user => {
          // Utlizar método dispatch para disparar actions para a store. E modificar/atualizar o state.
          this.store.dispatch(AuthActions.login({user}));
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop,
        () => console.error('Erro ao efetuar o login!')
      );
  }

  get formValue(): LoginForm {
    return this.form.value;
  }
}
