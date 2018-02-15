import { Component, OnInit }           from '@angular/core';

import { Router, ActivatedRoute }      from '@angular/router';

import { PromotoresService }           from '../promotores.service';

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.css']
})
export class EditPromoComponent implements OnInit {

  promotor: any = {};
  errorMessage: string;
  paramsObserver: any;
  pantallaEditP: boolean = true;
  editPromotor: boolean = true; //Indica que estamos en la vista de edicion

  constructor(private _promotoresService: PromotoresService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 
  }

  // Grab promotor data (show on screen to UPDATE it later) -------------------
  ngOnInit() {

    //to avoid error (undefined before grabbing data)
    this.promotor        = {}; 
    this.promotor.direcp = {};

    this.paramsObserver = this._activatedRoute.params.subscribe(params => {
      
      let promotorId = params['promotorId'];
      //console.log('Id del promotor que queremos editar: ' + promotorId);

      this._promotoresService
          .read(promotorId)
          .subscribe((promotor) => {
                      this.promotor = promotor;
                      //console.log(this.promotor);
										},
										(error) => {
                      this._router.navigate(['/promotores']);
                    }
          );
    });
    
  } // ngOnInit()

  // unsubscribe from param observer ------------------------------------------
  ngOnDestroy() {
		this.paramsObserver.unsubscribe();
  }
  
  // update promotor ----------------------------------------------------------
  updatePromotor() {
    console.log("Edición del promotor");
    this._promotoresService
        .update(this.promotor)
        .subscribe((editedPromo) => {
                    this._router.navigate(['/promotores/view', editedPromo._id]);
                   },
							 		 (error) => {
                    this.errorMessage = error;
                  }  
        );
	} // editPromotor()
  
  
  goBack() {
    //window.history.back();
    this._router.navigate(['/promotores']);
  }

  // to check [(ngModel)] double binding is working ----------------------------
  get diagnostic() {
    return JSON.stringify(this.promotor);
  }

}
