import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './modules/store/store.component';
import { HomeComponent } from './modules/store/components/home/home.component';

const routes: Routes = [
  { 
    path: '',
        component: StoreComponent,
        children: [
            {
              path: '',
              component: HomeComponent,
            }
        ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
exports: [RouterModule]
})
export class AppRoutingModule { }
