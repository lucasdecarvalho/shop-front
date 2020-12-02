import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    [SweetAlert2Module.forRoot()],
  ]
})
export class SignupModule { 
}
