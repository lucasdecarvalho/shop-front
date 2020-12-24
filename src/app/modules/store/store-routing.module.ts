import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'store',
        component: StoreComponent,
        children: [
            {
              path: '',
              component: HomeComponent,
            },
            {
              path: 'detalhes',
              component: HomeComponent,
            }
        ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class StoreRoutingModule { }
