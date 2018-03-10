// modules
import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { RouterModule }             from '@angular/router'; //for routerLink use, etc
import { FormsModule }              from '@angular/forms';

// services
import { UsersService }             from './users.service';
import { AuthService }              from './auth.service';

// my modules
import { AppFilterModule }          from '../app-filter.module';

// 3rd party modules
import { OrderModule }              from 'ngx-order-pipe';
import { NgxPaginationModule }      from 'ngx-pagination';

// my components
import { ListUsersComponent }       from './list-users/list-users.component';
import { CreateUserComponent }      from './create-user/create-user.component';
import { EditUserComponent }        from './edit-user/edit-user.component';
import { ViewUserComponent }        from './view-user/view-user.component';
import { DeleteUserComponent }      from './delete-user/delete-user.component';
import { LoginComponent }           from './login/login.component';

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
    ListUsersComponent,
    CreateUserComponent,
    EditUserComponent,
    ViewUserComponent,
    DeleteUserComponent,
    LoginComponent
  ],
  providers: [UsersService, AuthService]
})
export class UsersModule { }
