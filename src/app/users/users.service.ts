import { Injectable }         from '@angular/core';

// http Angular imports
import { Http, Headers, Request, Response }   from '@angular/http';
import { RequestMethod, RequestOptions }      from '@angular/http';

// rxJS imports
import { Observable } 	      from 'rxjs/Observable';
import 'rxjs/add/operator/map'; //map the Observable response to another Observable in a format we can use in our views: json
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 

@Injectable()
export class UsersService {

  // properties
	//private _baseURL = 'http://localhost:3000/auth/users';
	private _baseURL = 'http://localhost:3000/auth';

	// IN CASE I want to store the new registered user GLOBALLY
	public user = window['user'];
  
  // So far I haven't needed to use this configuration options, if any time
  //    then "this.http.get(`${this._baseURL}`, options).subscribe(....)"
  private _headers = new Headers({ 'Content-Type': 'application/json' });
  private _options = new RequestOptions({headers: this._headers, 
                                         withCredentials: true }); //for CORS

  // constructor (inject dependencies here) -----------------------------------
  constructor (private _http: Http) {
	}

	/*
	private isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
	}
	*/

	// error handling -----------------------------------------------------------
	// to handle errors that come back from our back-end server

	private handleError(error: Response) {
		//console.error(error);
		return Observable.throw(error.json().message || 'Server error'); 
  } 
  
  /* --------------------------------------------------------------------------*/
	// Handle any errors from the API
	/* ---------------------------------------------------------------------------*/
	/*
  private handleError(err: any) {
		let errMessage: string;
		console.log(err);
		

		// if a 'Response error' (there is a body) --> err.json() should exist 
    if (err instanceof Response) {

			console.log('HandleError: Dentro de instanceof Response');
			
			if (this.isJsonString(err)){
				let body   = err.json() || err.text();
				let error  = body.error || JSON.stringify(body);
				errMessage = `${err.status} - ${err.statusText || ''} - ${error}`;
			} else {
				let body = err.text();
				errMessage = `${err.status} - ${err.statusText || ''} - ${body}`;
			}
			
			//let body = err.text();
			//let body   = err.text() || err.json();  //SyntaxError: Unexpected token E in JSON at position 0
		 // console.log(body); // {mensaje: "Ese usuario ya existe en el sistema"}

			// Grab whatever is in the body (if it doesn't exist Stringfify whatever it comes back)
			//let error  = body.error || JSON.stringify(body);
			
			//errMessage = `${err.status} - ${err.statusText || ''} - ${body}`;
			//errMessage = `${err.status} - ${err.statusText || ''} -  ${error}`;

		 //errMessage  = err.toString(); //Valor errMessage es: Response with status: 401 Unauthorized for URL: http://localhost:3000/auth/signup
		 //errMessage  = JSON.stringify(err); //Valor errMessage es: {"_body":"Ese usuario ya existe en el sistema","status":401 ....
		 //errMessage = `${err.status} - ${err.statusText || ''} ${err.url}`;  //Valor errMessage es: 401 - Unauthorized http://localhost:3000/auth/signup
		 //errMessage = err.json() || '';  //SyntaxError: Unexpected token E in JSON at position 0
		 //errMessage = err.json();   //Unexpected token E in JSON at position 0
		} 

		// Not a 'Response error' --> err.json() does NOT exist
		else {
			console.log('HandleError: Fuera de instanceof Response');
			// the message that comes from the server (otherwise take whatever comes from and convert it to a string
      errMessage = err.message ? err.message : err.toString();
    }

		console.log('Valor errMessage es: ' + errMessage );
    return Observable.throw(errMessage);
	} 
	*/
	
	// to handle errors that come back from our back-end server -----------------
	// all my backend errors come in 'text' format and not in 'json'
	private handleTextError(error: Response) {
			//console.error(error);
			return Observable.throw(error.text() || 'Server error'); 
	} 

  // grab list of users -------------------------------------------------------
  list(): Observable<any> {
		return this._http
			.get(`${this._baseURL}/users`, this._options)
			.map((res: Response) => res.json())
			.catch(this.handleError);
  }
  
    // grab detail of a user ---------------------------------------------
	read(username: string): Observable<any> {
		return this._http
			.get(`${this._baseURL}/users/${username}`, this._options)
			.map((res: Response) => res.json()) 
			.catch(this.handleError);
	}

	// ----------------------------------------------------------------------------
	// create new user with back-end sending ONLY the 'username' as a 'String'
	//       (in this case we must NOT do the 'map': there is no Object to apply .json()) 
	//       Make sure back-end sends an Object in the body, we can apply function .json()
	create(user: any): Observable<any> {

		//console.log('User en SERVICIO');
		//console.log(user);

		return this._http
			.post(`${this._baseURL}/signup`, user, this._options)
			// THIS WAS GIVING ERROR (Back-end was sending a String in the body (username), not a Json object)
			.map((res: Response) => res.json())  
		//.map(user => this.user = user)  //In case we want to store it GLOBALLY in 'user' public property
		// Showed wrong message when a username already exists (because it comes in text not in JSON).
		//.catch(this.handleError); 
			.catch(this.handleTextError); 
	}

	// edit an existing user ----------------------------------------------
	update(user: any): Observable<any> {
		return this._http
			.put(`${this._baseURL}/users/${user._id}`, user, this._options)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}
	
	// delete an existing user --------------------------------------------
	delete(userId: any): Observable<any> {
		return this._http
			.delete(`${this._baseURL}/users/${userId}`, this._options)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}	

}
