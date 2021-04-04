import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../core/interceptors/token.interceptor';
import { UsersComponent } from './users.component';
import { DashboardComponent } from '../users/components/dashboard/dashboard.component';
import { UserDataComponent } from './components/user-data/user-data.component';

const routes: Routes = [
  {
    path: 'clientes',
        component: UsersComponent,
        children: [
            {
              path: '',
              component: DashboardComponent,
              // canActivate: [AuthGuard],
              // canActivate: [AuthGuard, RoleGuard],
              // data: {
              //   expectedRole: 'seller'
              // }

              children: [
                {
                  path: '',
                  component: UserDataComponent,
                  // canActivate: [AuthGuard],
                }
              ]
            }
            // ,
            // {
            //   path: 'vendas',
            //   component: DashboardComponent,
            //   canActivate: [AuthGuard],
            //     children: [
            //       {
            //         path: '',
            //         component: SalesComponent,
            //       }
            //     ]
            // },
        ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class UsersRoutingModule { }
