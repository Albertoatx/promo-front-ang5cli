import { Injectable }         from '@angular/core';

// http Angular imports
import { Http, Headers, Request, Response }   from '@angular/http';
import { RequestMethod, RequestOptions }      from '@angular/http';

// rxJS imports
import { Observable } 	      from 'rxjs/Observable';
import 'rxjs/add/operator/map'; //map the Observable response to another Observable in a format we can use in our views: json
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw'; 

@Injectable()
export class AuthService {

  // For Authentication (if we want to save the user GLOBALLY in Window object)
  //public user = window['user']; // AUTENTICACION (PUBLIC)

  private _baseURL = 'http://localhost:3000/auth';

  // For Authentication (if we want to store the username in Local Storage)
  private loggedIn: boolean = false;
  private adminRol: boolean = false;
  private currentUser: string = '';

  // So far I haven't needed to use this configuration options, if any time
  //    then "this.http.get(`${this._baseURL}`, options).subscribe(....)"
  private _headers = new Headers({ 'Content-Type': 'application/json' });
  private _options = new RequestOptions({ headers: this._headers, 
                                          withCredentials: true }); //for CORS

  // constructor (inject dependencies here) -----------------------------------
  constructor (private _http: Http) {

    // look at localStorage to check if the user is logged in
    //console.log('constructor servicio auth: miramos en LS si existe usuario logeado');
    this.loggedIn = !!localStorage.getItem('auth_user'); 
    this.currentUser = localStorage.getItem('auth_user');
    this.adminRol = (this.currentUser === 'admin');
    //console.log('constructor servicio auth, valor de current user es: ' + this.currentUser);
  }
  
	// to handle errors that come back from our back-end server -----------------
	private handleError(error: Response) {
		console.error(error);
    //return Observable.throw(error.json().message || 'Server error'); 
    return Observable.throw(error.text() || 'Server error'); 
  } 

  // Check if the user is logged in ------------------------------------------
  isLoggedIn() { // using LOCAL STORAGE (will be used in components that need to check)
    return this.loggedIn;
  }

  //isUserLoggedIn(): boolean { //using WINDOW object
	//	return (!!this.user);
  //}
    
  /* In AngularJS
  isLoggedIn: function () {
    return $http.get('/auth/sessionUsername');
  } */

  // Check if the user has 'admin' privileges ---------------------------------
  isAdmin() { 
    return this.adminRol;
  }

  getCurrentUser(){
    return this.currentUser;
  }

  // ----------------------------------------------------------------------------
  // Back-end is sending back ONLY the 'username' as a 'String' (use res.text())
	// If the back-end would send back an 'Object' in response body (use res.json())
	login(credentials: any): Observable<any> {

		//console.log('User en SERVICIO');
		//console.log(credentials);

		return this._http
			.post(`${this._baseURL}/login`, credentials, this._options)
      //.map((res: Response) => res.json())  //BE CAREFUL (use this if back-end sends back a Json Object)
      .map((res: Response) => res.text())  //BE CAREFUL (use this if back-end sends back a String)
      .do(username => {
          if (username) {
            //console.log('Servicio auth: inserto el usuario en LS ');

            localStorage.setItem('auth_user', username);
            this.currentUser = username;
            this.loggedIn = true;

            if (username === 'admin')
              this.adminRol = true;
          }
      })
			.catch(this.handleError);
  }


  // logout -----------------------------------------------------------------
  // Backend does not send a response body (destroys session in server)
  // It will be called from the entry point (does not have a view so no need to map response)
  logout(): Observable<any> {
		return this._http
      .get(`${this._baseURL}/logout`, this._options)
      .do(res => {
        //console.log('Servicio auth: elemino el usuario del LS ');

        localStorage.removeItem('auth_user');
        this.loggedIn = false;
        this.adminRol = false;
        this.currentUser = '';
      })
			.catch(this.handleError);
  }

}
