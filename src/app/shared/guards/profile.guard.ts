
import { Injectable }             from '@angular/core';

import { Router, CanActivate }    from '@angular/router'; //to protect my routes
import { ActivatedRouteSnapshot } from '@angular/router';

import { AuthService }            from '../../users/auth.service'; 

// the guard class is a Service
@Injectable()
export class ProfileGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router){

  }

  // put our logic for the route -------------------------------------------
  canActivate(activatedRoute: ActivatedRouteSnapshot) {

    let username    = activatedRoute.params['username'];
    let currentUser = this._authService.getCurrentUser();
    //console.log('username en el Profile Guard es: ' + username);

    if (currentUser !== username && currentUser !== 'admin'){
      alert("¡No tienes permisos para acceder a otro perfil de usuario! Le envio al suyo");
      this._router.navigate(['/users/view', currentUser]);
      return false;
    } 
    else {
      //console.log("El usuario ha accedido correctamente a los datos de su perfil");
      return true;
    }
  }

}