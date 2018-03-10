
import { Injectable }           from '@angular/core';

import { Router, CanActivate }  from '@angular/router'; //to protect my routes

 //to use 'isAdmin' function
import { AuthService }          from '../../users/auth.service';

// the guard class is a Service
@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router){
  }

  // put our logic for the route
  canActivate() {

    //console.log('canActivate Guard! i am checking to see if you are logged in');

    if (this._authService.isLoggedIn() && this._authService.isAdmin()){
      //console.log("Usuario logeado y con rol de administrador para consultar esta ruta");
      return true;
    } 
    else if (this._authService.isLoggedIn()) {
      // your are logged but not with admin rol
      alert("No tienes permisos para acceder aquí: son necesarios permisos de administrador");
      this._router.navigate(['/']);
      return false;
    }
    else {
      alert("¡No tienes permisos para acceder aquí! Antes debes entrar en el sistema como administrador");
      // you are not logged in
      this._router.navigate(['/users/login']);
      return false;
    }
  }
}