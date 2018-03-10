import { Injectable } from '@angular/core';

//import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} 	from 'rxjs/Observable';

import {Http, Headers, Request, RequestMethod, RequestOptions, Response} from '@angular/http';

@Injectable()
export class PromotoresService {

  // private _baseUrlForDevNode = ""; 
  private _baseURL = 'http://localhost:3000/api/promotores';

  constructor (private _http: Http) {
	}


	//let headers = new Headers({ 'Content-Type': 'application/json' });
//	let options = new RequestOptions({ headers: headers });

	 // So far I haven't needed to use this configuration options, if any time
  //    then "this.http.get(`${this._baseURL}`, options).subscribe(....)"
  private _headers = new Headers({ 'Content-Type': 'application/json' });
  private _options = new RequestOptions({headers: this._headers, 
                                         withCredentials: true }); //for CORS

	// error handling
	private handleError(error: Response) {
		return Observable.throw(error.json().message || 'Server error');
  }

  // grab list of promotors -----------------------------------------------
  list(): Observable<any> {
		return this._http
			.get(this._baseURL, this._options)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}

  // grab detail of a promotor ---------------------------------------------
	read(promotorId: string): Observable<any> {
		return this._http
			.get(`${this._baseURL}/${promotorId}`, this._options)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}

	// create a new promotor ------------------------------------------------
	create(promotor: any): Observable<any> {
		return this._http
			.post(`${this._baseURL}/add`, promotor, this._options)
			.map((res: Response) => res.json())
			.catch(this.handleError);
  }

	// edit an existing promotor ----------------------------------------------
	update(promotor: any): Observable<any> {
		return this._http
			.put(`${this._baseURL}/${promotor._id}`, promotor, this._options)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}
	
	// delete an existing promotor --------------------------------------------
	delete(promotorId: any): Observable<any> {
		return this._http
			.delete(`${this._baseURL}/${promotorId}`, this._options)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}	

}
