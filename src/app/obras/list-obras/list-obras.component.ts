import { Component, OnInit }      from '@angular/core';

import { ObrasService }           from '../obras.service';
//import { PassDataService }        from '../../shared/pass-data.service';

import { AppFilterPipe }          from '../../app-filter.pipe';

// -----------------------------------------------------------------------------
// Creo una clase customizada para mis necesidades para que el PIPE de Filtrado
// funcione bien (dado que el PIPE solo busca en propiedades a nivel 1)
export class ObraMocked {
  _id: string; //OJO, este sera el id del promotor (no de la obra)
  codigop: string;
  codigoobra : string;
  nombreobra  : string;
  creada: string;
}
//-----------------------------------------------------------------------------

@Component({
  selector: 'app-list-obras',
  templateUrl: './list-obras.component.html',
  styleUrls: ['./list-obras.component.css']
})
export class ListObrasComponent implements OnInit {

  // Properties ----------------------------------------------------------------
  obras: any[] = [];              // to store the list of Obras
  data: any[] = [];      // brings the obra (an object) plus ALL the info of the Promotor
  errorMessage: string;
  countObras: number;

  // Filtering
  filterInput: string;

  // Sorting
  sortKey: string = '';     // set default order column 
  reverse: boolean = false;
  
  // Pagination
  numItemsPerPage: number = 10;
  p: number = 1;            // set the current page
  
  // Constructor --------------------------------------------------------------
  constructor(private _obrasService: ObrasService) { 
  }

  // OnInit - Bring the list of Obras -----------------------------------------
  ngOnInit() {
    /* ORIGINAL (aunque listaba OK no trabajaba bien con el PIPE para filtrado )
                 debido a que ese PIPE solo filtra con propiedades a nivel 1  
                 y la promocion es un propio objeto (un Object con propiedades a nivel 2 
                 y por tanto el PIPE no buscaba en esas propiedades (que son justo
                 las que queremos buscar) 
    this._obrasService
    .list()
    .subscribe(
       (obras) => { 
         // MUY IMPORTANTE
         // el back-end hace un "unwind" por lo que con en obra nos llegan tambien
         // los datos de  su promotor (y los datos reales de la Obra estaran en
         // en el objeto 'promociones' que ojo NO es un array)
         console.log(obras);
         this.obras      = obras; 
         this.countObras = this.obras.length;
       }
    ); */
    
    //-------------------------------------------------------------------------
    // Version donde monto objeto con todas las propieades a nivel 1 para que 
    //  el PIPE de filtrado sepa buscar en lo que antes era un objeto a nivel2
    
    this._obrasService
    .list()
    .subscribe(
       (data) => { 
         //console.log(data);
         
         // MUY IMPORTANTE
         // el back-end hace un "unwind" por lo que con en 'data' nos llegan tambien
         // los datos de  su promotor (y los datos reales de la Obra estaran en
         // su objeto 'promociones' que ojo NO es un array)
         this.data        = data; 
         this.countObras  = this.data.length;

         // Intento montar un objeto customizado que con propiedades a nivel1 
         for (var i = 0; i < data.length; i++){
          // console.log(data[i]._id);

          // Esto daban ERROR (al no tener el array 'this.obras' las propiedades definidas).
          //this.obras[i]._id         = data[i]._id;              // es el id Mongo del promotor
          //this.obras[i].codigop     = this.data[i].codigop;     // es el codigo de promotor
          //this.obras[i].promociones = this.data[i].promociones; // datos de las obras (solo viene 1 por 'unwind' del back-end)

          // Definiendo las propiedades inline da Errores
          /*
          this.obras[i] = {'_id'        : data[i]._id,       // OK
                           'codigop'    : data[i].codigop,   // OK
                           //'promociones': data[i].promociones  //ERROR si luego vamos al detalle (undefined)
                           //'promociones.codigoobra ': data[i].promociones.codigoobra, // DA ERROR (undefined)
                           //'promociones.nombreobra ': data[i].promociones.nombreobra, // DA ERROR (undefined)
                           //'promociones.creada '    : data[i].promociones.creada    
                          };
          */

          // Otra opcion es definir una clase TypeScript (pongo todos los campos a nivel raiz sin objetos para facilitar el filtro)
          this.obras[i]            = new ObraMocked();
          this.obras[i]._id        = data[i]._id;     // el id del Promotor
          this.obras[i].codigop    = data[i].codigop; // el codigo de Promotor
          this.obras[i].codigoobra = data[i].promociones.codigoobra;
          this.obras[i].nombreobra = data[i].promociones.nombreobra;
          this.obras[i].creada     = data[i].promociones.creada
         }
         
       }  // for loop
    ); // subscribe ()
    
  } // ngOnInit 

  // sort Obras ---------------------------------------------------------------
  sort(key){
    this.sortKey = key;
    this.reverse  = !this.reverse;
  }

}
