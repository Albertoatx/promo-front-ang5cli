import { Injectable }         from '@angular/core';

// http Angular imports
import { Http, Headers, Request, RequestMethod, RequestOptions, Response } from '@angular/http';

// rxJS imports
import { Observable } 	       from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ObrasService {

  // properties
  private _baseURL = 'http://localhost:3000/api/promociones';
  
  // So far I haven't needed to use this configuration options, if any time
  //    then "this.http.get(`${this._baseURL}`, options).subscribe(....)"
  private _headers = new Headers({ 'Content-Type': 'application/json' });
  private _options = new RequestOptions({headers: this._headers, 
                                         withCredentials: true }); //for CORS

  // constructor (inject dependencies here)
  constructor (private _http: Http) {
	}

	// error handling -----------------------------------------------------------
	private handleError(error: Response) {
		return Observable.throw(error.json().message || 'Server error');
  }

  // grab list of Obras -------------------------------------------------------
  list(): Observable<any> {

		return this._http
			.get(this._baseURL)
			.map((res: Response) => res.json())
			.catch(this.handleError);
  }
  

  // grab list of Obras managed by a Promotor ---------------------------------
  listObrasPromotor(promotorId: string): Observable<any> {

		return this._http
			.get(`${this._baseURL}/${promotorId}`)
			.map((res: Response) => res.json())
			.catch(this.handleError);
  }

  // grab detail of Obra  -----------------------------------------------------
  //return $http.get('/api/promociones/' + id + '/' + codObra);
	read(promotorId: string, obraId: string): Observable<any> {

    let finalURL = `${this._baseURL}/${promotorId}/${obraId}`;
    //console.log(finalURL); 
    
		return this._http
			.get(`${this._baseURL}/${promotorId}/${obraId}`)
			.map((res: Response) => res.json())
			.catch(this.handleError);
  }
  
  // create a new Obra inside a Promotor -------------------------------------
  //      $http.post('/api/promociones/add/' + id, obraData);
	create(promotorId: string, obra: any): Observable<any> {
		return this._http
			.post(`${this._baseURL}/add/${promotorId}`, obra)
			.map((res: Response) => res.json())
			.catch(this.handleError);
  } 

  // edit an existing Obra --------------------------------------------------
  //     object 'obra' does NOT have the promotorId, that's why we need arguments
  //     $http.put('/api/promociones/' + id + '/' + codObra, obraData);
	update(promotorId: string, obraId: string, obra: any): Observable<any> {

    //console.log(promotorId);
    //console.log(obraId);

		return this._http
			.put(`${this._baseURL}/${promotorId}/${obraId}`, obra)
			.map((res: Response) => res.json())
			.catch(this.handleError); 
	}
	
  // delete an existing promotor --------------------------------------------
  // IMPORTANT: Send a 'post' request because is NOT a deletion of all the document
  //            (we only delete the embedded document (obra)) so the back-end
  //            expects a 'post' request for this (if we send a 'delete' will give 404)
  //    $http.post('/api/promociones/' + id + '/' + codObra)
	delete(promotorId: string, obraId: string, obra: any): Observable<any> {

		return this._http
    //.delete(`${this._baseURL}/${promotorId}/${obraId}`) //ojo, "POST" no DELETE
      .post(`${this._baseURL}/${promotorId}/${obraId}`, obra) //ojo, "POST" no DELETE
			.map((res: Response) => res.json())
			.catch(this.handleError);
  }	 
  
}
