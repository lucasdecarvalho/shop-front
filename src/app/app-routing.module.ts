import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './template/login/login.component';
import { DashboardComponent } from './template/sellers/dashboard/dashboard.component';
import { SignupComponent } from './template/sellers/signup/signup.component';
import { AuthGuard } from './template/auth.guard';
import { HomeComponent } from './template/home/home.component';

const routes: Routes = [
  { 
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'cadastrar',
    component: SignupComponent
  },
  { 
    path: 'home',
    component: HomeComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
exports: [RouterModule]
})
export class AppRoutingModule { }
