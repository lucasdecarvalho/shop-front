import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SignupModule { 
}
