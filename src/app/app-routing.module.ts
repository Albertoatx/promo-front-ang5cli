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

import { ListObrasComponent }         from './obras/list-obras/list-obras.component';
import { ViewObraComponent }          from './obras/view-obra/view-obra.component';
import { EditObraComponent }          from './obras/edit-obra/edit-obra.component';
import { CreateObraComponent }        from './obras/create-obra/create-obra.component';
import { DeleteObraComponent }        from './obras/delete-obra/delete-obra.component';
import { ListObrasPromoComponent }    from './obras/list-obras-promo/list-obras-promo.component';

import { ListUsersComponent }         from './users/list-users/list-users.component';
import { CreateUserComponent }        from './users/create-user/create-user.component';
import { EditUserComponent }          from './users/edit-user/edit-user.component';
import { ViewUserComponent }          from './users/view-user/view-user.component';
import { DeleteUserComponent }        from './users/delete-user/delete-user.component';

// routing
const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  // Promotores routing ------------------- 
  {
    path: 'promotores',
    //component: PromotoresComponent,  //NO HACE FALTA
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
  // Obras routing -------------------
  {
    path: 'obras',
    children: [
      { path: '', 
        component: ListObrasComponent
      },
      { path: ':promotorId', 
        component: ListObrasPromoComponent
      },
      { path: 'view/:promotorId/:obraId', 
        component: ViewObraComponent
      },
      { path: 'create/:promotorId', 
        component: CreateObraComponent
      },
      { path: 'edit/:promotorId/:obraId', 
        component: EditObraComponent
      },
      { path: 'delete/:promotorId/:obraId', 
        component: DeleteObraComponent
      }
    ]
  },
  // Users routing -------------------
  {
    path: 'users',
    children: [
      { path: '', 
        component: ListUsersComponent
      },
      { path: 'view/:username', //'username' has to be the name used in 'routerLink'
        component: ViewUserComponent
      },
      { path: 'create', 
        component: CreateUserComponent
      },
      { path: 'edit/:username', 
        component: EditUserComponent
      },
      { path: 'delete/:username', 
        component: DeleteUserComponent
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
