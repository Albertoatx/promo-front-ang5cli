import { Component, OnInit }      from '@angular/core';

//import { Router }   from '@angular/router';

import { PromotoresService }      from '../promotores.service';

@Component({
  selector: 'app-list-promo',
  templateUrl: './list-promo.component.html',
  styleUrls: ['./list-promo.component.css']
})
export class ListPromoComponent implements OnInit {

  //promotor;
  promotores: any;   // to store the list of promotores
	errorMessage: string;

  constructor(private _promotoresService: PromotoresService) { 
  }

  ngOnInit() {
    this._promotoresService
        .list()
        .subscribe(promotores => this.promotores = promotores);
  }

  getMyPromotors() {
    /* falta descomentar variable + importar ActivatedRoute
    let current_promotor = this.route.snapshot.params['promotorId'];

    this.promotor = promotores.find(function(promotor){
      return promotor.username === current_promotor;
    })
  */
  }

}
