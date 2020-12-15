import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellersComponent } from './sellers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataConfirmComponent } from './components/data-confirm/data-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SellersRoutingModule } from './sellers-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    DashboardComponent,
    DataConfirmComponent,
    LoginComponent,
    SignupComponent,
    SellersComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SellersRoutingModule,
    [SweetAlert2Module.forRoot()],
    NgxSpinnerModule,
  ]
})
export class SellersModule { }
