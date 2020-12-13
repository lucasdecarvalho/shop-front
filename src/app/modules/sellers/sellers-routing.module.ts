import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataConfirmComponent } from './components/data-confirm/data-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SellersComponent } from './sellers.component';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../core/token.interceptor';

const routes: Routes = [
  {
    path: 'vendedores',
        component: SellersComponent,
        children: [
            {
              path: '',
              component: DashboardComponent,
              canActivate: [AuthGuard],
              // canActivate: [AuthGuard, RoleGuard],
              // data: {
              //   expectedRole: 'seller'
              // }
            },
            {
              path: 'cadastro',
              component: SignupComponent
            },
            {
              path: 'confirmar-dados',
              component: DataConfirmComponent,
              canActivate: [AuthGuard],
            },
            {
                path: 'login',
                component: LoginComponent,
            },
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
export class SellersRoutingModule { }
