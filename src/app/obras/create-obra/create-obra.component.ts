import { Component, OnInit }            from '@angular/core';

import { Router, ActivatedRoute }       from '@angular/router';

import { ObrasService }                 from '../obras.service';

@Component({
  selector: 'app-create-obra',
  templateUrl: './create-obra.component.html',
  styleUrls: ['./create-obra.component.css']
})
export class CreateObraComponent implements OnInit {

  obra: any;
  //obra: Obra;
  promotorId: string;
  obraId: string;
  errorMessage: string;
  paramsObserver: any;
  submitted: boolean = false;

  constructor(private _obrasService: ObrasService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 
  }

  /* grab the promotorId from the routeParams (we need to insert obras) -------*/
  ngOnInit() {

    this.obra = {}; 

    this.paramsObserver = this._activatedRoute.params.subscribe(params => {
        
      this.promotorId = params['promotorId'];
      console.log('Id del promotor al que quiero añadir obras: ' + this.promotorId);
    });
  }

  saveObra() {
    console.log('Datos de la obra a GUARDAR');
    console.log(this.obra);
  
    this.obraId = this.obra.codigoobra; // lo que metamos en el formulario (lo quiero para redireccion)
    this._obrasService
        .create(this.promotorId, this.obra)
        .subscribe((createdObra) => {
                  //El http.post nos devuelve TODO el promotor donde se ha añadio la obra
                  // (un nombre mas significativo seria 'updatedPromotor')
                      console.log('DATOS DE LA OBRA CREADA');
                      console.log(createdObra);
                      this.submitted = true;
                      this._router.navigate(['/obras/view', this.promotorId, this.obraId]);
                  },
                   (error) =>  {
                      console.log(error);
                      this.errorMessage = error;
                  }
        );
  }
  
  goBack() {
    //window.history.back();
    this._router.navigate(['/obras', this.promotorId]);
  }

  //to check ngModel double binding is working
  get diagnostic() {
    return JSON.stringify(this.obra);
  }

}
