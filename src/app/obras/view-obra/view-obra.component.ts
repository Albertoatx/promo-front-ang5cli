/* ---------------------------------------------------------------------------*/
/* MODULES          
/* ActivatedRoute - Get router info about the current route we are on
/*                  We can grab things like: url, data, params, queryParams,...
/* ---------------------------------------------------------------------------*/

import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { ObrasService }             from '../obras.service';

@Component({
  selector: 'app-view-obra',
  templateUrl: './view-obra.component.html',
  styleUrls: ['./view-obra.component.css']
})
export class ViewObraComponent implements OnInit {

  // variables
  obra: any;
  promotorId: string;
  obraId: string;
	routingObserver: any;
  errorMessage: string;
  viewObra: boolean = true; //Indica que estamos en la vista de lectura

  // inject dependencies needed
  constructor(private _obrasService: ObrasService,
              private _router:Router,
              private _activatedRoute: ActivatedRoute) {
  }

  // launched immediately after the instantiation of this compoment -----------
  ngOnInit() {

    //to avoid error (undefined before grabbing data)
    this.obra = {}; 

    // grab the current promotor
		this.routingObserver = this._activatedRoute.params.subscribe(params => {

      this.promotorId = params['promotorId'];  //$scope.promotorId = $routeParams.id;
      this.obraId     = params['obraId'];     //$scope.codigoObra = $routeParams.cod;

      //console.log("Recupero el promotorID: " + promotorId);
      //console.log("Recupero el obraID: "     + obraId);

			this._obrasService
				  .read(this.promotorId, this.obraId)
				  .subscribe((obra) => {
            // The object I get does NOT have the id or any other promotor data
            //console.log(obra);
						this.obra = obra.promociones[0];
						//this.allowEdit = (this.user && this.user._id === this.article.creator._id);
		 			},
					  (error) => this._router.navigate(['/obras'])
				);
		});

  } 

  ngOnDestroy() {
		this.routingObserver.unsubscribe();
  }
  
  goBack() {
    //window.history.back();
    this._router.navigate(['/obras']);
  }

}
