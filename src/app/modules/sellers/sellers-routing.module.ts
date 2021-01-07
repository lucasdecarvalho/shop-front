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
import { TokenInterceptor } from '../../core/interceptors/token.interceptor';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CompanyDataComponent } from './components/company-data/company-data.component';
import { ShortcutsComponent } from './components/shortcuts/shortcuts.component';
import { SalesComponent } from './components/sales/sales.component';

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

              children: [
                {
                  path: '',
                  component: ShortcutsComponent,
                  canActivate: [AuthGuard],
                }
              ]
            },
            {
              path: 'vendas',
              component: DashboardComponent,
              canActivate: [AuthGuard],
                children: [
                  {
                    path: '',
                    component: SalesComponent,
                  }
                ]
            },
            {
              path: 'dados-empresa',
              component: DashboardComponent,
              canActivate: [AuthGuard],
                children: [
                  {
                    path: '',
                    component: CompanyDataComponent,
                  }
                ]
            },
            {
              path: 'lista-produtos',
              component: DashboardComponent,
              canActivate: [AuthGuard],
                children: [
                  {
                    path: '',
                    component: ProductsListComponent,
                  }
                ]
            },
            {
              path: 'adicionar-produtos',
              component: DashboardComponent,
              canActivate: [AuthGuard],
                children: [
                  {
                    path: '',
                    component: AddProductComponent,
                  }
                ]
            },
            {
              path: 'confirmar-dados',
              component: DataConfirmComponent,
              canActivate: [AuthGuard],
            },
            {
              path: 'cadastro',
              component: SignupComponent
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
