import { Injectable } from '@angular/core';

//import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} 	from 'rxjs/Observable';

import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';

@Injectable()
export class PromotoresService {

  // private _baseUrlForDevNode = ""; 
  private _baseURL = 'http://localhost:3000/api/promotores';

  constructor (private _http: Http) {
	}

	// error handling
	private handleError(error: Response) {
		return Observable.throw(error.json().message || 'Server error');
  }

  // grab list of promotors -----------------------------------------------
  list(): Observable<any> {
		return this._http
			.get(this._baseURL)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}

  // grab detail of a promotor ---------------------------------------------
	read(promotorId: string): Observable<any> {
		return this._http
			.get(`${this._baseURL}/${promotorId}`)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}

	// create a new promotor ------------------------------------------------
	create(promotor: any): Observable<any> {
		return this._http
			.post(`${this._baseURL}/add`, promotor)
			.map((res: Response) => res.json())
			.catch(this.handleError);
  }

	// edit an existing promotor ----------------------------------------------
	update(promotor: any): Observable<any> {
		return this._http
			.put(`${this._baseURL}/${promotor._id}`, promotor)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}
	
	// delete an existing promotor --------------------------------------------
	delete(promotorId: any): Observable<any> {
		return this._http
			.delete(`${this._baseURL}/${promotorId}`)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}	

}
