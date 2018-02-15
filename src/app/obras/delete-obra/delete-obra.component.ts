import { Component, OnInit }            from '@angular/core';

import { Router, ActivatedRoute }       from '@angular/router';

import { ObrasService }                 from '../obras.service';


@Component({
  selector: 'app-delete-obra',
  templateUrl: './delete-obra.component.html',
  styleUrls: ['./delete-obra.component.css']
})
export class DeleteObraComponent implements OnInit {

  obra: any = {};
  promotorId: string;
  obraId: string;
  errorMessage: string;
  paramsObserver: any;
  editObra: boolean = true;  //Indica que estamos en la vista de edicion

  constructor(private _obrasService: ObrasService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 
  }

  // Grab Obra data (show on screen to UPDATE it later) -------------------
  ngOnInit() {

      //to avoid error (undefined before grabbing data)
      this.obra = {}; 
  
      this.paramsObserver = this._activatedRoute.params.subscribe(params => {
        
        this.promotorId = params['promotorId'];
        this.obraId     = params['obraId'];
        //console.log('Id del promotor que queremos editar: ' + promotorId);
    
        this._obrasService
            .read(this.promotorId, this.obraId)
            .subscribe((obra) => {
                      // The object we get does NOT have any promotor data
                        this.obra = obra.promociones[0];
                        console.log(this.obra);
                      },
                      (error) => {
                        this._router.navigate(['/obras']);
                      }
            );
      });
  }

  // unsubscribe from param observer ------------------------------------------
  ngOnDestroy() {
		this.paramsObserver.unsubscribe();
  }

  // delete obra ----------------------------------------------------------  
  deleteObra() {
    console.log("Borrado de la obra");
    console.log(this.obra);

    //Cuando se pinche el boton "Yes" eliminamos y luego redirigimos al listado de obras del promotor
    this._obrasService
        .delete(this.promotorId, this.obraId, this.obra)
        .subscribe((deletedObra) => {
                    // ojo, el DELETE del back-end devuelve el promotor con todas sus obras
                    console.log('OBRA TRAS SER BORRADA');
                    console.log(deletedObra); 
                    this._router.navigate(['/obras']);
                   },
							 		 (error) => {
                    this.errorMessage = error;
                  }  
        ); 
  } // updateObra()
  

  goBack() {
    //window.history.back();

    //Cuando se pinche en el boton "No" redirigimos al detalle de la obra
    //this._router.navigate(['/obras/view', this.promotorId, this.obraId]);
    
    //Cuando se pinche en el boton "No" mejor redirigir al listado de obras
    this._router.navigate(['/obras']);  
  }

}
