import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';

// components at app module
import { HomeComponent }              from './home/home.component';
import { ErrorComponent }             from './error/error.component';

// components from other modules
import { ListPromoComponent }         from './promotores/list-promo/list-promo.component';
import { ViewPromoComponent }         from './promotores/view-promo/view-promo.component';
import { CreatePromoComponent }       from './promotores/create-promo/create-promo.component';
import { EditPromoComponent }         from './promotores/edit-promo/edit-promo.component';
import { DeletePromoComponent }       from './promotores/delete-promo/delete-promo.component';

// routing
const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  /* OLD 
  {
    path: 'promotores', 
    component: ListPromoComponent
  },
  {
    path: 'promotores/view/:promotorId', 
    component: ViewPromoComponent
  },
  */
  {
    path: 'promotores',
    //component: ArticlesComponent,  //NO HACE FALTA
    children: [
      { path: '', 
        component: ListPromoComponent
      },
      { path: 'view/:promotorId', 
        component: ViewPromoComponent
      },
      { path: 'create', 
        component: CreatePromoComponent
      },
      { path: 'edit/:promotorId', 
        component: EditPromoComponent
      },
      { path: 'delete/:promotorId', 
        component: DeletePromoComponent
      }
    ]
  },
  {
    path: '**', 
    component: ErrorComponent  //el ** debe ser el ultimo path
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
