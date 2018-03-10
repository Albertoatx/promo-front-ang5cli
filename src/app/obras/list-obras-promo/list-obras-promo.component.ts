import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { ObrasService }             from '../obras.service';

//import { AppFilterPipe }          from '../../app-filter.pipe';

@Component({
  selector: 'app-list-obras-promo',
  templateUrl: './list-obras-promo.component.html',
  styleUrls: ['./list-obras-promo.component.css']
})
export class ListObrasPromoComponent implements OnInit {

    // Properties ----------------------------------------------------------------
  obras: any[] = [];      // to store the list of Obras
  //data: any[] = [];       // brings the obra (an object) plus ALL the info of the Promotor
  promotorId: string;
  errorMessage: string;
  paramsObserver: any;
  countObrasPromotor: number;

  // Filtering
  //filterInput: string;

  // Sorting
  sortKey: string = '';     // set default order column 
  reverse: boolean = false;
  
  // Pagination
  numItemsPerPage: number = 10;
  p: number = 1;            // set the current page
  
  // Constructor --------------------------------------------------------------
  constructor(private _obrasService: ObrasService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 
  }


  ngOnInit() {

    this.paramsObserver = this._activatedRoute.params.subscribe(params => {
        
      this.promotorId = params['promotorId'];
      //console.log('Id del promotor del que mostrare sus obras: ' + this.promotorId)
      
      /* The back-end sends an Array filled ONLY with Obras (no Promotor), so
      /* this solution is valid for the PIPE filter (no need to mock data) */
      this._obrasService
          .listObrasPromotor(this.promotorId)
          .subscribe(
            (obras) => { 
              //console.log(obras);
              this.obras  = obras; 
              this.countObrasPromotor = this.obras.length;
            }
      ); 
    });
  }

  ngOnDestroy() {
		this.paramsObserver.unsubscribe();
  }
  
  // -----------------------------------------------------------------------
  sort(key){
    this.sortKey = key;
    this.reverse  = !this.reverse;
  }

  goBack() {
    //window.history.back();
    this._router.navigate(['/promotores']);
  }

}
