
import { Injectable }           from '@angular/core';

import { Router, CanActivate }  from '@angular/router'; //to protect my routes
import { CanActivateChild }     from '@angular/router';

import { AuthService }          from '../../users/auth.service'; //to use 'loggedIn' function

// the guard class is a Service
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router){

  }

  // put our logic for the route ----------------------------------------------
  canActivate() {

    //console.log('canActivate Guard! i am checking to see if you are logged in');

    if (this._authService.isLoggedIn()){
      return true;
    } 
    else {
      this._router.navigate(['/users/login']);
      return false;
    }
  }

}