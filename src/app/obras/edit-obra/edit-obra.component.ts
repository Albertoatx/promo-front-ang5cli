import { Component, OnInit }            from '@angular/core';

import { Router, ActivatedRoute }       from '@angular/router';

import { ObrasService }                 from '../obras.service';

@Component({
  selector: 'app-edit-obra',
  templateUrl: './edit-obra.component.html',
  styleUrls: ['./edit-obra.component.css']
})
export class EditObraComponent implements OnInit {

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
                          // The object I get does NOT have the id for promotor
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
  
  // update obra --------------------------------------------------------------
  updateObra() {
    //console.log("Edición de la obra");
    //console.log(this.obra);
    
    this._obrasService
        .update(this.promotorId, this.obraId, this.obra)
        .subscribe((editedObra) => {
                    // ojo, el update del back-end devuelve el promotor con todas sus obras
                    //console.log('OBRA TRAS SER EDITADA');
                    //console.log(editedObra); 
                    this._router.navigate(
                        ['/obras/view', this.promotorId, this.obraId]);
                   },
							 		 (error) => {
                    this.errorMessage = error;
                  }  
        ); 
  } // updateObra()
  

  goBack() {
    //window.history.back();
    this._router.navigate(['/obras', this.promotorId]);  // Deberia ir a "obras promotor"
  }

  // to check [(ngModel)] double binding is working ----------------------------
  get diagnostic() {
    return JSON.stringify(this.obra);
  }

}
