import { Component } from '@angular/core';

import { OnInit } from '@angular/core'; /* mio */
import { Http, Headers, RequestOptions }   from '@angular/http';

import { PassDataService }        from '../app/shared/pass-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//export class AppComponent {
export class AppComponent implements OnInit {  
  title = 'app';
  filterInput: string;

  baseUrlForDevNode = "http://localhost:3000"; 

  constructor(private _passDataService: PassDataService, 
              private http: Http){
  }

  ngOnInit() {
    //this._passDataService.setSharedData(this.filterInput);
    //console.log(this._passDataService.getSharedData);

    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers, withCredentials: true }); //for CORS

    //verificar si enlazamos con promotores del back-end
    /*
    this.http.get(`${this.baseUrlForDevNode + '/api/promotores'}`)
    //this.http.get(`${this.baseUrlForDevNode + '/api/promotores'}`, options)
    //this.http.get(`${this.baseUrlForDevNode + '/api/promotores'}`, {withCredentials: true})
             .subscribe(data => {console.log(data.json());
             });
             */
  }


  /*
  storeNavData() {
    console.log("Dentro de storeNavData");

    if (this.filterInput) {
      this._passDataService.sharedData.navBarSearchText = this.filterInput;
      console.log(this._passDataService.getSharedData());
    }
  }
  */

  onSearchChange(searchValue : string ) {  
    if (this.filterInput) {
      this._passDataService.sharedData.navBarSearchText = searchValue;
      console.log(this._passDataService.getSharedData());
    }
  }



}
