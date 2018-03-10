/* ---------------------------------------------------------------------------*/
/* MODULES          
/* ActivatedRoute - Get router info about the current route we are on
/*                  We can grab things like: url, data, params, queryParams,...
/* ---------------------------------------------------------------------------*/
import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { UsersService }        from '../users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  // variables
  user: any;
	paramsObserver: any;
	errorMessage: string;

  // inject dependencies needed
  constructor(private _usersService: UsersService,
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

        this._usersService
            .read(username)
            .subscribe(
              (user) => { this.user = user; },
              (error) => this._router.navigate(['/users'])
            );
		});
  } // ngOnInit()

  ngOnDestroy() {
		this.paramsObserver.unsubscribe();
  }

  deleteUser() {
    this._usersService
        .delete(this.user._id)
        .subscribe(
          deletedUser => this._router.navigate(['/users']),
          error       => this.errorMessage = error
        );
	}

  goBack() {
    this._router.navigate(['/users']);
  }

}
