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
  selector: 'app-delete-promo',
  templateUrl: './delete-promo.component.html',
  styleUrls: ['./delete-promo.component.css']
})
export class DeletePromoComponent implements OnInit {

  // variables
  promotor: any;
	routingObserver: any;
	errorMessage: string;

  // inject dependencies needed
  constructor(private _promotoresService: PromotoresService,
              private _router:Router,
              private _activatedRoute: ActivatedRoute) {             
  }

  // Method launched immediately after the instantiation of this compoment
  ngOnInit() {
    //to avoid error (undefined before grabbing data)
    this.promotor        = {}; 
    this.promotor.direcp = {};

    // grab the current promotor
		this.routingObserver = this._activatedRoute.params.subscribe(params => {
        let promotorId = params['promotorId'];

        this._promotoresService
            .read(promotorId)
            .subscribe(
              (promotor) => { this.promotor = promotor; },
              (error) => this._router.navigate(['/promotores'])
            );
		});
  } // ngOnInit()

  ngOnDestroy() {
		this.routingObserver.unsubscribe();
  }

  deletePromotor() {
    this._promotoresService
        .delete(this.promotor._id)
        .subscribe(
          deletedArticle => this._router.navigate(['/promotores']),
          error          => this.errorMessage = error
        );
	}

  goBack() {
    this._router.navigate(['/promotores']);
  }

}
