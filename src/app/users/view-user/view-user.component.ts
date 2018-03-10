
/* ---------------------------------------------------------------------------*/
/* MODULES           
/* ActivatedRoute - Get router info about the current route we are on
/*                  We can grab things like: url, data, params, queryParams,...
/* ---------------------------------------------------------------------------*/

import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { UsersService }             from '../users.service';
import { AuthService }              from '../auth.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  // properties
  user: any; 
	paramsObserver: any;
  errorMessage: string;
  viewUser: boolean = true; //Indica que estamos en la vista de edicion

  // inject dependencies needed
  constructor(private _usersService: UsersService,
              private _authService: AuthService,
              private _router:Router,
              private _activatedRoute: ActivatedRoute) {             
  }

  // Method launched immediately after the instantiation of this compoment
  ngOnInit() {

    //to avoid error (undefined before grabbing data)
    this.user = {}; 

    // grab the current promotor
		this.paramsObserver = this._activatedRoute.params.subscribe(params => {

      let username = params['username'];
      //console.log("Recupero el username: " + username);

			this._usersService
				  .read(username)
				  .subscribe((user) => {
            //console.log(user);
            this.user = user;
						//this.allowEdit = (this.user && this.user._id === this.article.creator._id);
		 			},
					  (error) => this._router.navigate(['/users'])
				);
		});
  } // ngOnInit()

  //
  get isAdmin() { 
    return this._authService.isAdmin();
  }

  ngOnDestroy() {
		this.paramsObserver.unsubscribe();
  }
  
  goBack() {
    //window.history.back();
    this._router.navigate(['/users'])
  }
}
