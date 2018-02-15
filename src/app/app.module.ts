// modules
import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';

import { AppRoutingModule }   from './app-routing.module';


// my app modules
import { PromotoresModule }   from './promotores/promotores.module';

// components
import { AppComponent }       from './app.component';
import { HomeComponent }      from './home/home.component';
import { ErrorComponent }     from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    PromotoresModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
