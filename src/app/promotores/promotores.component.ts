import { Component, OnInit }  from '@angular/core';

import { PromotoresService }  from './promotores.service';

@Component({
  selector: 'app-promotores',
  templateUrl: './promotores.component.html',
  //template: '<router-outlet></router-outlet>',
  styleUrls: ['./promotores.component.css']
  //,providers: [PromotoresService]
})
export class PromotoresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
