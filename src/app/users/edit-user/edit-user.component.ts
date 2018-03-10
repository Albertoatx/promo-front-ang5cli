import { Component, OnInit }           from '@angular/core';

import { Router, ActivatedRoute }      from '@angular/router';

import { UsersService }               from '../users.service';
import { AuthService }                from '../auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  // properties
  user: any = {};
  today = new Date();
  todayString: string;
  errorMessage: string;
  paramsObserver: any;
  editUser: boolean = true; //Indica que estamos en la vista de edicion

  constructor(private _usersService: UsersService,
              private _authService: AuthService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 
  }

  // Get today date (max 'date' for 'birth' input html) -----------------------
  setTodayDate() {

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

  // Grab promotor data (show on screen to UPDATE it later) -------------------
  ngOnInit() {

    //to avoid error (undefined before grabbing data)
    this.user = {}; 
    
    this.setTodayDate();

    this.paramsObserver = this._activatedRoute.params.subscribe(params => {
      
      let username = params['username'];
      //console.log('Id del usuario que queremos editar: ' + promotorId);
      
      this._usersService
          .read(username)
          .subscribe((user) => {
                      this.user = user;
                      //console.log(this.user);
                      //console.log(this.user.datebirth);  //string en formato '1979-10-30T23:00:00.000Z'
                      
                      //We are forced to send 'date' with this format 'yyyy-MM-dd" (at least in Chrome)
                      // Does NOT work!
                      //let dateOfBirth  = new Date(this.user.datebirth); //transforms string to date output format
                      //let yearOfBirth  = dateOfBirth.getFullYear();    // yyyy
                      //let monthOfBirth = dateOfBirth.getMonth();  // month (0..11)
                      //let dayOfBirth   = dateOfBirth.getDate()    // day (0..31)
                      //let dateFormatted = new Date();
                      //dateFormatted.setFullYear(yearOfBirth, monthOfBirth, dayOfBirth);
                      //console.log(dateFormatted);

                      // Does NOT work
                      /*
                      let dateOfBirth  = new Date(this.user.datebirth); //transforms string to date output format
                      let yearOfBirth  = dateOfBirth.getFullYear();    // yyyy
                      let monthOfBirth = dateOfBirth.getMonth() + 1;  
                      let dayOfBirth   = dateOfBirth.getDate()   
                      let dateString = yearOfBirth + '-' + monthOfBirth + '-' + dayOfBirth;
                      let dateISO    = new Date(dateString);  //new Date("2015-03-25");

                      console.log('year: ' + yearOfBirth);
                      console.log('month: ' + monthOfBirth);
                      console.log('day: ' + dayOfBirth);
                      console.log(dateString);
                      console.log(dateISO);
                      this.user.datebirth = dateISO;
                      */

                      // DOES WORK
                      if (this.user.datebirth) {
                        let dateString = this.user.datebirth.substring(0, 10)
                        this.user.datebirth = dateString;
                        //console.log(dateString);
                      }
										},
										(error) => {
                      this._router.navigate(['/users']);
                    }
          );
    });
    
  } // ngOnInit()

  // Check if the user logged is Admin
  get isAdmin() { 
    return this._authService.isAdmin();
  }

  // unsubscribe from param observer ------------------------------------------
  ngOnDestroy() {
		this.paramsObserver.unsubscribe();
  }
  
  // update promotor ----------------------------------------------------------
  updateUser() {
    //console.log("Edición del usuario");
    this._usersService
        .update(this.user)
        .subscribe((editedUser) => {
                    this._router.navigate(['/users/view', editedUser.username]);
                   },
							 		 (error) => {
                    this.errorMessage = error;
                  }  
        );
	} // editPromotor()
  
  
  goBack() {
    //window.history.back();
    this._router.navigate(['/users']);
  }

  // to check [(ngModel)] double binding is working ----------------------------
  get diagnostic() {
    return JSON.stringify(this.user);
  }

}
