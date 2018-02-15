import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { AppFilterPipe }    from './app-filter.pipe';
import { AppCounterPipe }   from './app-counter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppFilterPipe, AppCounterPipe
  ],
  exports: [
    AppFilterPipe, AppCounterPipe
  ]
})
export class AppFilterModule { }