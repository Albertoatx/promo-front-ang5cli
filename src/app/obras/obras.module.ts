// modules
import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { RouterModule }             from '@angular/router'; //for routerLink use, etc
import { FormsModule }              from '@angular/forms';

// services
import { ObrasService }             from './obras.service';

// my modules
import { AppFilterModule }          from '../app-filter.module';

// 3rd party modules
import { OrderModule }              from 'ngx-order-pipe';
import { NgxPaginationModule }      from 'ngx-pagination';

// my components
import { ListObrasComponent }       from './list-obras/list-obras.component';
import { CreateObraComponent }      from './create-obra/create-obra.component';
import { EditObraComponent }        from './edit-obra/edit-obra.component';
import { DeleteObraComponent }      from './delete-obra/delete-obra.component';
import { ViewObraComponent }        from './view-obra/view-obra.component';
import { ListObrasPromoComponent } from './list-obras-promo/list-obras-promo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AppFilterModule,
    OrderModule,
    NgxPaginationModule
  ],
  declarations: [
    ListObrasComponent,
    CreateObraComponent,
    EditObraComponent,
    DeleteObraComponent,
    ViewObraComponent,
    ListObrasPromoComponent
  ],
  providers: [ObrasService]
})
export class ObrasModule { }
