import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators }  from  '@angular/forms';
import { Signup } from '../../models/signup';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignup: FormGroup;
  submitted: boolean = false;
  errors: any;
  public isValidFlg:boolean = true;

  constructor(private formBuilder: FormBuilder, private AuthService: AuthService, private router: Router) {  }

  ngOnInit() {
    this.createForm(new Signup());
  }

  validatePhoneNo(field) {
    var phoneNumDigits = field.value.replace(/\D/g, '');
  
    this.isValidFlg = (phoneNumDigits.length==0 || phoneNumDigits.length == 18);
  
    var formattedNumber = phoneNumDigits;
    if (phoneNumDigits.length >= 3)
      formattedNumber = phoneNumDigits.substring(0, 2) + '.' + phoneNumDigits.substring(2);
    if (phoneNumDigits.length >= 6)
      formattedNumber = phoneNumDigits.substring(0, 2) + '.' + phoneNumDigits.substring(2, 5) + '.' + phoneNumDigits.substring(5);
    if (phoneNumDigits.length >= 9)
      formattedNumber = phoneNumDigits.substring(0, 2) + '.' + phoneNumDigits.substring(2, 5) + '.' + phoneNumDigits.substring(5, 8) + '/' + phoneNumDigits.substring(8);
    if (phoneNumDigits.length >= 13)
      formattedNumber = phoneNumDigits.substring(0, 2) + '.' + phoneNumDigits.substring(2, 5) + '.' + phoneNumDigits.substring(5, 8) + '/' + phoneNumDigits.substring(8, 12) + '-' + phoneNumDigits.substring(12);
    if (phoneNumDigits.length >= 14)
      formattedNumber = phoneNumDigits.substring(0, 2) + '.' + phoneNumDigits.substring(2, 5) + '.' + phoneNumDigits.substring(5, 8) + '/' + phoneNumDigits.substring(8, 12) + '-' + phoneNumDigits.substring(12, 14) + phoneNumDigits.substring(14);
  
    field.value = formattedNumber;
  }

  createForm(user: Signup) {
    this.formSignup = this.formBuilder.group({
      cnpj: [user.cnpj, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      email: [user.email, [Validators.required, Validators.email, Validators.maxLength(45)]],
      password: [user.password, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      termsCheck: [false, Validators.requiredTrue],
    })
  }

  get f() { return this.formSignup.controls; }
 
  onSubmit() {

      this.submitted = true;

      if (this.formSignup.invalid) {
          return;
      }

      let cnpj = this.formSignup.value.cnpj;
       
      cnpj = cnpj.replace(/\D/g,'');
      this.formSignup.value.cnpj = this.formSignup.value.cnpj.replace(/\D/g,'');

      this.AuthService.checkCnpj(cnpj)
      .subscribe(response => {

            // @ts-ignore
            let status = response.status;
            
            // @ts-ignore
            let municipio = response.municipio;

            if (status == 'OK')
            {
              console.log("Cnpj valido.");

                if(municipio == 'RIO CLARO')
                {
                  this.AuthService.create(this.formSignup.value)
                      .subscribe(response => {
                          console.log("Empresa registrada.");
                      },
                      error => {
                          this.errors = error.error.errors;
                          
                          for (let property in this.errors){
                            console.log(property + ": " + this.errors[property]);
                          }
                      })
                }
                else {
                    alert("Sua empresa não está registrada no municipio de Rio Claro/SP na Receita Federal, por isso, não podemos aprovar sua entrada. Agradecemos o interesse.");
                }
            }
            else {
              alert("Cnpj invalido");
            }
      },
      error => {
          this.errors = error.error.errors;
          console.log(this.errors);

          if(error.status == 429) {
            alert("Aguarde 1 minuto e tente novamente");
          }
      })
  
  }

}
