import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TermsComponent } from './components/terms/terms.component';

const routes: Routes = [
  {
    path: 'store',
        component: StoreComponent,
        children: [
            {
              path: '',
              component: HomeComponent,
            }
        ]
  },
  { 
    path: 'sobre-nos',
    component: StoreComponent,
        children: [
            {
              path: '',
              component: AboutUsComponent,
            }
        ],
  },
  { 
    path: 'termos-de-uso',
    component: StoreComponent,
        children: [
            {
              path: '',
              component: TermsComponent,
            }
        ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class StoreRoutingModule { }
