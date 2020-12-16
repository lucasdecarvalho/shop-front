import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './modules/sellers/components/signup/signup.component';
import { StoreComponent } from './modules/store/store.component';

const routes: Routes = [
  { 
    path: '',
    component: StoreComponent,
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
exports: [RouterModule]
})
export class AppRoutingModule { }
