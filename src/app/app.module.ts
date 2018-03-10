// modules
import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';

// 3rd party modules
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule }        from 'ngx-order-pipe';

// my app modules
import { AppRoutingModule }   from './app-routing.module';
import { PromotoresModule }   from './promotores/promotores.module';
import { ObrasModule }        from './obras/obras.module';
import { UsersModule }        from './users/users.module';

// components
import { AppComponent }       from './app.component';
import { HomeComponent }      from './home/home.component';
import { ErrorComponent }     from './error/error.component';

// pipes
//import { AppFilterPipe }      from './app-filter.pipe'; // DOES NOT WORK
import { AppFilterModule }      from './app-filter.module';

// services
import { PassDataService }       from '../app/shared/pass-data.service';
import { AuthGuard }             from '../app/shared/guards/auth.guard';
import { AdminGuard }            from '../app/shared/guards/admin.guard';
import { ProfileGuard }          from '../app/shared/guards/profile.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //AppFilterPipe,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    PromotoresModule,
    FormsModule,
    AppFilterModule,
    OrderModule,
    ObrasModule,
    UsersModule
  ],
  providers: [PassDataService, AuthGuard, AdminGuard, ProfileGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
