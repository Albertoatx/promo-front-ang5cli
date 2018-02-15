// modules
import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule }         from '@angular/router'; 
import { FormsModule }          from '@angular/forms';

// services
import { PromotoresService }    from './promotores.service';

// components
import { PromotoresComponent }  from './promotores.component';
import { ListPromoComponent }   from './list-promo/list-promo.component';
import { ViewPromoComponent }   from './view-promo/view-promo.component';
import { CreatePromoComponent } from './create-promo/create-promo.component';
import { EditPromoComponent }   from './edit-promo/edit-promo.component';
import { DeletePromoComponent } from './delete-promo/delete-promo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    PromotoresComponent, 
    ListPromoComponent, 
    ViewPromoComponent, 
    CreatePromoComponent, 
    EditPromoComponent, DeletePromoComponent
  ],
  providers: [PromotoresService]
})
export class PromotoresModule { }
