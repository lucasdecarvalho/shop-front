import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './shared/card/card.component';
import { HomeComponent } from './template/home/home.component';
import { LoginComponent } from './template/login/login.component';
import { SignupComponent } from './template/signup/signup.component';


const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
