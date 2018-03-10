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
import { LoginComponent }             from './users/login/login.component';

import { AuthGuard }                  from './shared/guards/auth.guard';
import { AdminGuard }                 from './shared/guards/admin.guard';
import { ProfileGuard }               from './shared/guards/profile.guard';

// routing
const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  // Promotores routing ------------------- 
  {
    path: 'promotores',
    //component: PromotoresComponent,  //Este componente NO HACE FALTA
    children: [
      { path: '', 
        component: ListPromoComponent,
        canActivate: [AuthGuard]
      },
      { path: 'view/:promotorId', 
        component: ViewPromoComponent,
        canActivate: [AuthGuard]
      },
      { path: 'create', 
        component: CreatePromoComponent,
        canActivate: [AuthGuard]
      },
      { path: 'edit/:promotorId', 
        component: EditPromoComponent,
        canActivate: [AuthGuard]
      },
      { path: 'delete/:promotorId', 
        component: DeletePromoComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  // Obras routing -------------------
  {
    path: 'obras',
    children: [
      { path: '', 
        component: ListObrasComponent,
        canActivate: [AuthGuard]
      },
      { path: ':promotorId', 
        component: ListObrasPromoComponent,
        canActivate: [AuthGuard]
      },
      { path: 'view/:promotorId/:obraId', 
        component: ViewObraComponent,
        canActivate: [AuthGuard]
      },
      { path: 'create/:promotorId', 
        component: CreateObraComponent,
        canActivate: [AuthGuard]
      },
      { path: 'edit/:promotorId/:obraId', 
        component: EditObraComponent,
        canActivate: [AuthGuard]
      },
      { path: 'delete/:promotorId/:obraId', 
        component: DeleteObraComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  // Users routing -------------------
  {
    path: 'users',
    children: [
      { path: '', 
        component: ListUsersComponent,
        canActivate: [AdminGuard]
      },
      { path: 'view/:username', //'username' has to be the name used in 'routerLink'
        component: ViewUserComponent,
        canActivate: [AuthGuard, ProfileGuard] //check both BEFORE activating this route
      },
      { path: 'create', 
        component: CreateUserComponent
      },
      { path: 'edit/:username', 
        component: EditUserComponent,
        canActivate: [AuthGuard, ProfileGuard]
      },
      { path: 'delete/:username', 
        component: DeleteUserComponent,
        canActivate: [AdminGuard]
      },
      { path: 'login', 
        component: LoginComponent
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
