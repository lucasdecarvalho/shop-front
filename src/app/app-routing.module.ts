import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './modules/store/store.component';
import { HomeComponent } from './modules/store/components/home/home.component';
import { CompanyComponent } from './modules/store/components/company/company.component';
import { DetailsComponent } from './modules/store/components/details/details.component';

const routes: Routes = [
  { 
    path: '',
        component: StoreComponent,
        children: [
            {
              path: '',
              component: HomeComponent,
            }
        ],
  },
  { 
    path: 'loja/:store',
        component: StoreComponent,
        children: [
            {
              path: '',
              component: CompanyComponent,
              
            },
            {
              path: ':prodId',
              component: DetailsComponent,
              
            },
        ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
exports: [RouterModule]
})
export class AppRoutingModule { }
