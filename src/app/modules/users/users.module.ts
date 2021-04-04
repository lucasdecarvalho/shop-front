import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { UsersComponent } from './users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [
    UsersComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    UserDataComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxSpinnerService,
    // NgxSpinnerModule,
    HttpClientModule,
    [SweetAlert2Module.forRoot()],
  ]
})
export class UsersModule { }
