import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './sellers/dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService, 
    AuthGuard,
  ],
})
export class TemplateModule {  }
