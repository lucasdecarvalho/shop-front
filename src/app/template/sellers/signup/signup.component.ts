import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators }  from  '@angular/forms';
import Swal from "sweetalert2";
import { AuthService } from '../../auth.service';
import { Signup } from 'src/app/models/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignup: FormGroup;
  submitted: boolean = false;
  errors: any;
  isValidFlg:boolean = true;
  confirmData: boolean = false;
  dataCompany: Object[];

  constructor(private formBuilder: FormBuilder, private AuthService: AuthService, private router: Router) {  
  }
  
  ngOnInit() {
    this.createForm(new Signup());
  }

  createForm(user: Signup) {
    this.formSignup = this.formBuilder.group({
      cnpj: ['12.239.095/0001-80', [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      email: ['e@u.com', [Validators.required, Validators.email, Validators.maxLength(45)]],
      password: [123123, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      termsCheck: [true, Validators.requiredTrue],
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
            let situacao = response.situacao;

            // @ts-ignore
            let status = response.status;
            
            // @ts-ignore
            let municipio = response.municipio;

            if (situacao == 'ATIVA' && status == 'OK')
            {
              // @ts-ignore
              this.dataCompany = response;

                if(municipio == 'RIO CLARO')
                {
                  this.AuthService.create(this.formSignup.value)
                      .subscribe(response => {

                          Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'Empresa registrada com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          // this.router.navigateByUrl(`/data-confirm`);
                          this.confirmData = true;
                      },
                      error => {
                          this.errors = error.error.errors;
                          
                          for (let property in this.errors){
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: this.errors[property],
                              footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>'
                            })
                          }
                      })
                }
                else {

                    Swal.fire({
                      icon: 'error',
                      title: 'Registro externo',
                      html: 'Sua empresa não está registrada junto à Receita Federal dentro do município de Rio Claro/SP, por esse motivo, não podemos aprovar sua entrada neste momento. Agradecemos o interesse.',
                      footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>'
                    })
                }
            }
            else {

              Swal.fire({
                icon: 'error',
                title: 'CNPJ invalido',
                text: 'Confira o CNPJ digitado e tente novamente',
                footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>'
              })
            }
      },
      error => {
          this.errors = error.error.errors;
          console.log(this.errors);

          if(error.status == 429) {
            let timerInterval;
            Swal.fire({
              title: 'Excesso de tentativas',
              html: 'Por segurança do sistema, <br> aguarde <b>alguns</b> segundos e tente novamente.',
              timer: 45000,
              timerProgressBar: true,
              showConfirmButton: false,
              allowOutsideClick: false,
              willOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  const content = Swal.getContent()
                  if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                      // @ts-ignore
                      b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0)
                    }
                  }
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                // console.log('I was closed by the timer')
              }
            })
          }
      })
  
  }

  validatePhoneNo(field) {
    let phoneNumDigits = field.value.replace(/\D/g, '');
  
    this.isValidFlg = (phoneNumDigits.length == 0 || phoneNumDigits.length == 18);
  
    let formattedNumber = phoneNumDigits;
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

}