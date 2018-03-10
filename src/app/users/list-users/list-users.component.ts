
import { Component, OnInit, Input } from '@angular/core';

import { UsersService }             from '../users.service';
import { PassDataService }          from '../../shared/pass-data.service';

import { AppFilterPipe }            from '../../app-filter.pipe';
//import { AppCounterPipe }           from '../../app-counter.pipe'; //NO USO

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  // Properties ----------------------------------------------------------------
  users: any;             // to store the list of users
  errorMessage: string;
  countUsers: number;

  // filtering
  filterInput: string;

  // sorting
  sortKey: string = '';   //set default order column 
  reverse: boolean = false;

  sortedByUsername: boolean = false; //to mark which sort is applied (class .active)
  sortedByFirstname: boolean = false;
  sortedByLastname: boolean = false;

  // pagination
  numItemsPerPage: number = 100;
  p: number = 1;  //set the current page


  // Constructor ---------------------------------------------------------------
  constructor(private _usersService: UsersService, 
              private _passDataService: PassDataService) { 
  }

  //----------------------------------------------------------------------------
  ngOnInit() {
    this._usersService
        .list()
        .subscribe(
           (users) => { 
             //console.log(users);
             this.users      = users; 
             this.countUsers = this.users.length;
           }
        );

    //NO SIRVE porque RECIBE DATOS solo al cargar, NO tengo un evento que me avise de que cambian
    //los datos en el search la barra de navegacion
    //this.filterInput = this._passDataService.sharedData.navBarSearchText;
  }

  // sort users  -----------------------------------------------------------
  sort(key){
    this.sortKey = key;
    this.reverse  = !this.reverse;

    switch(key) { 
      case 'username': { 
        this.sortedByUsername = true; 
        this.sortedByFirstname = false;
        this.sortedByLastname = false;
         break; 
      } 
      case 'firstname': { 
        this.sortedByUsername = false; 
        this.sortedByFirstname = true;
        this.sortedByLastname = false;
         break; 
      } 
      case 'lastname': { 
        this.sortedByUsername = false; 
        this.sortedByFirstname = false;
        this.sortedByLastname = true;  
        break; 
      } 
      default: { 
        this.sortedByUsername = false; 
        this.sortedByFirstname = false;
        this.sortedByLastname = false; 
         break; 
      } 
    } 

    
  }

}
