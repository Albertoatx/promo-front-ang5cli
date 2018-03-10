import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { PromotoresService }  from '../promotores.service';

export class Address {
  callep : string;
  pueblo  : string;
  provincia: string;
  codpostal: string;
}

export class Promotor {
  codigop: string;
  nombrep: string;
  creado_por: string;
  actualizado_por: string;
  cifp: string;
  telefp: string;
  emailp: string;
  direcp: Address;
  promociones: any[];
  creado_el: Date;
  actualizado_el: Date;
}

@Component({
  selector: 'app-create-promo',
  templateUrl: './create-promo.component.html',
  styleUrls: ['./create-promo.component.css']
})
export class CreatePromoComponent implements OnInit {

  promotor: any;
  //promotor: Promotor;
  errorMessage: string;
  pantallaAddP: boolean = true;
  submitted: boolean = false;

  constructor(private _promotoresService: PromotoresService,
              private _router:Router) { 
  }

  ngOnInit() {
    //to avoid error (undefined before grabbing data)
    //this.promotor = {}; 
    //this.promotor.direcp = {};
    this.promotor = { codigop: '', nombrep: '', cifp: '', telefp: '', emailp: '',  
                      direcp: {callep: '', pueblo: '', provincia: '', codpostal: ''}
    };

    //This is how to work with Typescript classes for model
    /*
    this.promotor         = new Promotor();
    this.promotor.direcp  = new Address();
    this.promotor.codigop = '';
    this.promotor.nombrep = ''
    this.promotor.creado_por = '';
    this.promotor.actualizado_por = '';
    this.promotor.cifp = '';
    this.promotor.telefp = '';
    this.promotor.emailp = '';
    this.promotor.direcp.callep = '';
    this.promotor.direcp.pueblo = '';
    this.promotor.direcp.provincia = '';
    this.promotor.direcp.codpostal = '';
    this.promotor.promociones = [];
    this.promotor.creado_el = new Date();
    this.promotor.actualizado_el = new Date(); */
  
  }

  savePromotor() {
    //console.log('Datos del promotor a GUARDAR');
    //console.log(this.promotor);

    this._promotoresService
        .create(this.promotor)
        .subscribe((createdPromotor) => {
                      //console.log('Se ha creado el siguiente promotor');
                      //console.log(createdPromotor);
                      this.submitted = true;
                      this._router.navigate(['/promotores/view', createdPromotor._id]);
                  },
                   (error) =>  {
                      console.log(error);
                      this.errorMessage = error;
                  }
        );
  }
  
  goBack() {
    //window.history.back();
    this._router.navigate(['/promotores']);
  }

  //to check ngModel double binding is working
  get diagnostic() {
    return JSON.stringify(this.promotor);
  }

}
