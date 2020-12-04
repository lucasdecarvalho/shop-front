import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DataConfirmComponent } from '../data-confirm/data-confirm.component';

@NgModule({
  declarations: [
    SignupComponent,
    DataConfirmComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    [SweetAlert2Module.forRoot()],
  ]
})
export class SignupModule { 
}
