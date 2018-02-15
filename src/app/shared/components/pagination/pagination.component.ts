import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  /*
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>; */


  // DON'T KNOW how to GET the current page so that i can send it to the PARENT
  p: number = 3; 

  // @Output some data to a parent component
  //         Must have the same name that in the parent ('onAlterPage')
  //@Output() onAlterPage = new EventEmitter(); 
  @Output() onAlterPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
 
  sendAlterPageEvent(evt){
    this.onAlterPage.emit(evt);
  } 
  
  sendPageNumber(evt){
    this.onAlterPage.emit(this.p);
  }
  
}
