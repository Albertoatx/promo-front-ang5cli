import { Component } from '@angular/core';

import { OnInit } from '@angular/core'; /* mio */
import { Http, Headers, RequestOptions }   from '@angular/http';
import { Router }                     from '@angular/router';

import { PassDataService }        from '../app/shared/pass-data.service';
import { AuthService }            from '../app/users/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//export class AppComponent {
export class AppComponent implements OnInit {  
  title = 'app';
  filterInput: string;

  //authenticated: boolean = false; NO CREAR VARIABLE asociado al componente (mirar AL SERVICIO ya que es el punto central)

  successMessage: string = '';
  errorMessage:   string = '';
  currentUser: string = '';

  //baseUrlForDevNode = "http://localhost:3000"; 

  constructor(private _passDataService: PassDataService, 
              private _authService: AuthService,
              private _router: Router,
              private http: Http){
    
    //ERROR currentUser es 'null' ya que va a buscar al servicio ANTES de que se haga el login
    //this.currentUser = this._authService.getCurrentUser(); 
    //console.log('currentUser es: ' + this.currentUser );
  }

  ngOnInit() {
    //this._passDataService.setSharedData(this.filterInput);
    //console.log(this._passDataService.getSharedData);

    //verificar si enlazamos con promotores del back-end
    /*
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true }); //for CORS

    this.http.get(`${this.baseUrlForDevNode + '/api/promotores'}`, options)
             .subscribe(data => {console.log(data.json());
             });
    */

    //this.authenticated = this._authService.isLoggedIn();
  }

  signout(){
    console.log('Entra en metodo para logout, aqui debo usar el servicio global');
    this._authService
        .logout()
        .subscribe(
          () => {
            this.successMessage = 'Logout existoso';
            //EVITAR ESTO (esta a nivel componente, lo queremos a nivel global)
            //this.authenticated = false;  

            /* En AngularJS aqui trabajaba con 'rootScope'
            $rootScope.administrator = false;
            $rootScope.authenticated = false;
            $rootScope.current_user = '';
            $location.path('/'); */

            this.clearMessages();
            this._router.navigate(['/']); 
          },
          (error) => {
            this.errorMessage = error;
            console.error(error);
            this.clearMessages();
          }
        );
  }

  get isLoggedIn() { //VITAL: THIS IS WHAT TELLS ME IF USER IS AUTHENTICATED (looks a property in LS)
    return this._authService.isLoggedIn();
  }

  get isAdmin() { //VITAL: THIS IS WHAT TELLS ME IF USER IS AUTHENTICATED (looks a property in LS)
    return this._authService.isAdmin();
  }

  get currentUsername(){ //WHOA! 'get' para que consiga valor actualizado (el que haya en el servicio tras el login)
    return this._authService.getCurrentUser(); 
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

  // Metodo para busqueda global desde la barra navegacion, le llega lo que escribamos 
  // No funciona como quiero asi que lo comento
  /*
  onSearchChange(searchValue : string ) {  
    if (this.filterInput) {
      this._passDataService.sharedData.navBarSearchText = searchValue;
      console.log(this._passDataService.getSharedData());
    }
  }
  */

  
  // Clear all messages after 5 seconds
  clearMessages() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage   = '';
    }, 5000);
  }

}
