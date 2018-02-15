/* ---------------------------------------------------------------------------*/
/* MODULES          
/* Router         - 
/* ActivatedRoute - Get router info about the current route we are on
/*                  We can grab things like: url, data, params, queryParams,...
/* ---------------------------------------------------------------------------*/

import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { PromotoresService }        from '../promotores.service';

@Component({
  selector: 'app-view-promo',
  templateUrl: './view-promo.component.html',
  styleUrls: ['./view-promo.component.css']
})
export class ViewPromoComponent implements OnInit {

  // variables
  promotor: any;
	routingObserver: any;
  errorMessage: string;
  viewPromotor: boolean = true; //Indica que estamos en la vista de edicion

  // inject dependencies needed
  constructor(private _promotoresService: PromotoresService,
              private _router:Router,
              private _activatedRoute: ActivatedRoute) {             
  }

  // Method launched immediately after the instantiation of this compoment
  ngOnInit() {
    this.promotor = {}; //to avoid error (undefined before grabbing data)
    this.promotor.direcp = {};

    // grab the current promotor
		this.routingObserver = this._activatedRoute.params.subscribe(params => {
      let promotorId = params['promotorId'];
      //console.log("Recupero el promotorID: " + promotorId);

			this._promotoresService
				  .read(promotorId)
				  .subscribe((promotor) => {
            //console.log(promotor);
						this.promotor = promotor;
						//this.allowEdit = (this.user && this.user._id === this.article.creator._id);
		 			},
					  (error) => this._router.navigate(['/promotores'])
				);
		});
  } // ngOnInit()

  ngOnDestroy() {
		this.routingObserver.unsubscribe();
  }
  
  goBack() {
    //window.history.back();
    this._router.navigate(['/promotores'])
  }

}
