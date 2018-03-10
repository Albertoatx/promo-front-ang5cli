import { Component, OnInit }          from '@angular/core';

import { Router }                     from '@angular/router';

import { AuthService }               from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = { username: '', password: '' };

  errorMessage:   string = '';

  constructor(private _authService: AuthService,
              private _router: Router) { 
  }

  ngOnInit() {
  }

  // Login a user
  login() {
    this.errorMessage = '';

    this._authService.login(this.credentials)
      .subscribe(
        (data) => {

          console.log('Login exitoso, se ha logeado con el usuario: ' + data); 

          /* In AngularJS I worked in the component doing this (now DON'T do that)
          $rootScope.authenticated = true;
          $rootScope.current_user = res.data;
          if (res.data == 'admin')
              $rootScope.administrator = true;
          */

          this._router.navigate(['promotores']);
        },
        (error) => {
          this.errorMessage = error;
          this.clearMessages();
        }
      );
  } // login

  // clear messsages after 5 seconds
  clearMessages() {
    setTimeout(() => {
      this.errorMessage   = '';
    }, 5000);
  }

}
