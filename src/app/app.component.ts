import { Component } from '@angular/core';

import { OnInit } from '@angular/core'; /* mio */
import { Http, Headers, RequestOptions }   from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//export class AppComponent {
export class AppComponent implements OnInit {  
  title = 'app';

  baseUrlForDevNode = "http://localhost:3000"; 

  constructor(private http: Http){
  }

  ngOnInit() {

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

}
