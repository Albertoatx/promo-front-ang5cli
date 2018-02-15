// modules
import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router'; 
import { FormsModule }            from '@angular/forms';

// services
import { PromotoresService }      from './promotores.service';

// components
import { PromotoresComponent }    from './promotores.component';  //NO HACE FALTA (no se usa)
import { ListPromoComponent }     from './list-promo/list-promo.component';
import { ViewPromoComponent }     from './view-promo/view-promo.component';
import { CreatePromoComponent }   from './create-promo/create-promo.component';
import { EditPromoComponent }     from './edit-promo/edit-promo.component';
import { DeletePromoComponent }   from './delete-promo/delete-promo.component';
import { PaginationComponent }    from '../shared/components/pagination/pagination.component';

// pipes
//import { AppFilterPipe }        from '../app-filter.pipe'; //only worked when PIPE declared here (but not in AppModule)

// my modules
import { AppFilterModule }        from '../app-filter.module';

// 3rd party modules
import { OrderModule }            from 'ngx-order-pipe';
import { NgxPaginationModule }    from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppFilterModule,
    OrderModule,
    NgxPaginationModule
  ],
  declarations: [
    PromotoresComponent, 
    ListPromoComponent, 
    ViewPromoComponent, 
    CreatePromoComponent, 
    EditPromoComponent, 
    DeletePromoComponent,
    PaginationComponent
    //AppFilterPipe
  ],
  providers: [PromotoresService]
})
export class PromotoresModule { }
