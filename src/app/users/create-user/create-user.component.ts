import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { UsersService }       from '../users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  //user: User = { name: '', username: '', avatar: '' }; // To work with Typescript classes for model
  user: any;
  today: any; 
  todayString: string;
  successMessage: string = '';
  errorMessage:   string = '';

  constructor(private _usersService: UsersService,
              private _router: Router) { 
  }

  //----------------------------------------------------------------------------
  // Get today date (max 'date' for 'birth' input html) 
  todayDate() {

    let yyyy     = this.today.getFullYear();    // yyyy
    let maxMonth = this.today.getMonth() + 1;   // mm 
    let maxDay   = this.today.getDate();        // dd 
    let dd;
    let mm;
    
    // force 'month' to have 2 digits
    if(maxMonth < 10){
      mm = '0' + maxMonth.toString(); 
    } else {
      mm = maxMonth.toString(); 
    }

    // force 'day' to have 2 digits
    if (maxDay < 10) {
      dd = '0' + maxDay.toString(); 
    } else {
      dd = maxDay.toString(); 
    }

    this.todayString = yyyy + '-' + mm + '-' + dd;      // yyyy-mm-dd
    //console.log('todayString: ' + this.todayString);  // 2018-02-16
  }

  //----------------------------------------------------------------------------
  ngOnInit() {
    
    //to avoid error (undefined before grabbing data)
    this.user = {}; 
    this.today = new Date();

    //This is how to work with Typescript classes for model
    /*
    this.user           = new User();
    this.user.username  = = '';           */

    this.todayDate(); 
  }

  //----------------------------------------------------------------------------
  saveUser() {
    this.successMessage = '';
    this.errorMessage   = '';

    console.log('Datos del usuario a GUARDAR ');
    console.log(this.user);
    
    this._usersService
        .create(this.user)
        .subscribe((createdUser) => {
                      //$rootScope.authenticated = true; 
                      //$rootScope.current_user = res.data.username; 
                      this.successMessage = 'Nuevo usuario registrado!';
                      console.log('Se ha creado el siguiente usuario ');
                      console.log(createdUser); //JODER! NO ENTIENDO porque 'undefined' (en PROMOTORES hago lo mismo y si saca)
                      
                      //this._router.navigate(['/users']);
                      this._router.navigate(['/users/view', createdUser.username]);
                  },
                   (error) =>  {
                      console.log('Error en saveUser component');
                    // console.log(error);
                      this.errorMessage = error;
                  }
        ); 
  }
  
  //----------------------------------------------------------------------------
  goBack() {
    //window.history.back();
    this._router.navigate(['/users']);
  }

  //to check ngModel double binding is working
  get diagnostic() {
    return JSON.stringify(this.user);
  }

}
