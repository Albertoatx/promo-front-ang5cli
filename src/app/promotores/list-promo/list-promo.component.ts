import { Component, OnInit, Input } from '@angular/core';

import { PromotoresService }      from '../promotores.service';
import { AuthService }            from '../../users/auth.service';
import { PassDataService }        from '../../shared/pass-data.service';

import { AppFilterPipe }          from '../../app-filter.pipe';
import { AppCounterPipe }         from '../../app-counter.pipe'; //NO USO

@Component({
  selector: 'app-list-promo',
  templateUrl: './list-promo.component.html',
  styleUrls: ['./list-promo.component.css']
})
export class ListPromoComponent implements OnInit {

  //receive data from other component 
 // @Input() navBarSearchText;

  // Properties ----------------------------------------------------------------
  promotores: any;   // to store the list of promotores
  errorMessage: string;
  countPromotores: number;
  countVisualized: number;
  countMisPromotores: number = 0;

  // filtering
  filterInput: string;

  // sorting
  sortKey: string = 'creado_el'; //set default order column 
  reverse: boolean = true;

  // pagination
  numItemsPerPage: number = 10;
  p: number = 1;  //set the current page

  // mis promotores
  activado: boolean = false; // needed if we use the 'checkbox' way
  promotoresCopy: any;      
  misPromotores: any[] = []; 
  executed: boolean = false;
  filterMisPromotores: string; //en vez de hacer toda la logica reusar el filtro
  misPromotoresMsg: string = '';
  flagMisPromos: boolean = false;
  

  // Constructor ---------------------------------------------------------------
  constructor(private _promotoresService: PromotoresService, 
              private _authService: AuthService, 
              private _passDataService: PassDataService) { 
  }

  //----------------------------------------------------------------------------
  ngOnInit() {
    this._promotoresService
        .list()
        .subscribe(
           (promotores) => { 
             this.promotores      = promotores; 
             this.promotoresCopy  = this.promotores; // hago la copia (sera necesario para "mis promotores")
             this.countPromotores = this.promotores.length;
             this.countVisualized = this.countPromotores;
           }
        );

    //NO SIRVE porque RECIBE DATOS solo al cargar, NO tengo un evento que me avise de que cambian
    //los datos en el search la barra de navegacion
    this.filterInput = this._passDataService.sharedData.navBarSearchText;
  }

  // To get username logged (for use in "MisPromotores") -----------------------
  get currentUsername(){ 
    return this._authService.getCurrentUser(); 
  }

  // sort promotores -----------------------------------------------------------
  sort(key){
    this.sortKey = key;
    this.reverse  = !this.reverse;
  }

  // To try to isolate 'pagination' - DOES NOT WORK 
  // this funtion is going to fire when my custom event "onAlterPage" happens
  /*
  receivePageNumber(evt){
    alert('i am trying to alter page number');
    console.log(evt);
    this.p = evt;
    console.log("page number = " + this.p);
  }
  */

  // ---------------------------------------------------------------------------
  // Shabby way of counting real amount of promotors visualized - DOES NOT WORK!
  // (we can't assign an ngFor local variable to a global one directly, so an
  //  alternative way is calling a function with ngIf that always returns true)
  /*
  updateNumberPromotors(numberOfPromos) {
    console.log('entra en updateNumberPromotors con numberOfPromos = ' + numberOfPromos);

    if (this.flagMisPromos) {
      console.log('   entra en flagMisPromos');
      this.countMisPromotores = numberOfPromos;
      this.misPromotoresMsg = ' (este usuario ha creado ' + this.countMisPromotores  + ')';
    }

    return true;
  }
  */

  // ---------------------------------------------------------------------------
  // OPTION RADIOS: Depending on "radio button" show ALL promotores or only MY promotores  
  selectRadioBtnPromotors(queryType, current_user) { 
    //console.log(current_user);

    switch (queryType) {
      case 'allPromos':
          // Using a filter in the *ngFor
          //this.filterMisPromotores = '';
          //this.flagMisPromos = false;
          //this.misPromotoresMsg = '';

          // Without using a filter
          this.promotores = this.promotoresCopy;
          this.countVisualized = this.promotores.length;
          this.misPromotoresMsg = '';
          break;
  
      case 'misPromos':
          //console.log('Dentro de RADIO_BUTTON mis promotores');

          // Using a filter in the *ngFor
          //this.filterMisPromotores = current_user;
          //this.flagMisPromos = true;

          // Without using a filter
          // User has not promotors OR is the first time it search into the Array
          
          if (this.misPromotores.length === 0) {
            //console.log('El usuario no tiene promotores');

            // FILTER: Recorre todo y guarda coincidencias en array "misPromotores"
            //         (FIND: Evita recorrer todo  el Array (aqui no tiene sentido)
            this.misPromotores = this.promotores.filter(
                (promotor) => { return promotor.creado_por === current_user; }
            ); 

            //This current user has promotores 
            if (this.misPromotores.length > 0) { 
              this.promotores = this.misPromotores;
            }

          }  
          // (misPromotores.length > 0)
          else { 
            this.promotores = this.misPromotores;
          } 
          
          //this.countVisualized = this.promotores.length;
          this.countMisPromotores = this.promotores.length;;
          this.misPromotoresMsg = ' (tu usuario ha creado ' + this.countMisPromotores  + ')';
          
          break;

    } // switch
  } // queryPromotors




  // ---------------------------------------------------------------------------
  //OPCION CHECKBOX: Trabajar en memoria, asi no vamos al servidor por "mis promotores
  /*
  getMyPromotors(current_user) {

    //falta descomentar variable + importar ActivatedRoute
    let current_promotor = this.route.snapshot.params['promotorId'];
  
    console.log('----------------------------------------------- ');
    console.log('current_user hardcodeado es: ' + current_user);

    this.activado  = !this.activado;
    
    if (this.activado) {

      console.log('checkbox Activado');

      //Solo busco "mis promotores" con FILTER cuando no hay nada en "misPromotores"
      if (this.misPromotores.length === 0) {
        console.log('El usuario no tiene promotores');

        // FILTER: Recorre todo el Array, guarda coincidencias en nuevo array "misPromotores"
        // FIND:   Evita recorrer todo  el Array (para este caso no tiene sentido)
        this.misPromotores = this.promotores.filter(
            (promotor) => { return promotor.creado_por === current_user; }
        ); 

        //This user has promotores 
        if (this.misPromotores.length > 0) { 
          //this.promotoresCopy = this.promotores;
          this.promotores = this.misPromotores;
        }

      }  // if (misPromotores.length === 0)
      else { 
        this.promotores = this.misPromotores;
      } 
    } // if (this.activado)

    // si checkbox no marcado entonces mostrar todos los promotores
    else { 
      this.promotores = this.promotoresCopy;
    }

  } // getMyPromotors
  */


}
