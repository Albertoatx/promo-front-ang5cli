import { Component, OnInit } from '@angular/core';

import { AuthService }            from '../../app/users/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessage:   string = '';

  constructor(private _authService: AuthService){
  }

  ngOnInit() {
  }

  // I need it here because I have buttons to LOGIN / Register and I need to show-hide them
  get isLoggedIn() { //THIS IS WHAT TELLS ME IF USER IS AUTHENTICATED (looks a property in LS)
    return this._authService.isLoggedIn();
  }

  signout(){
    //console.log('Entra en metodo para logout, aqui debo usar el servicio global');
    this._authService
        .logout()
        .subscribe(
          () => {
            //this._router.navigate(['/']); 
          },
          (error) => {
            this.errorMessage = error;
            //this.clearMessages();
          }
        );
  }

}
